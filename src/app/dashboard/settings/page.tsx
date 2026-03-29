"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";

export default function SettingsPage() {
  const [form, setForm] = useState({ name: "", country: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  
  const utils = api.useUtils();
  const { data: company, isLoading } = api.company.get.useQuery();

  const updateMutation = api.company.update.useMutation({
    onSuccess: () => {
      setMsg({ type: "success", text: "Settings saved successfully!" });
      void utils.company.get.invalidate();
    },
    onError: (err) => setMsg({ type: "error", text: err.message }),
  });

  useEffect(() => {
    if (company) {
      setForm({ name: company.name, country: company.country });
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    updateMutation.mutate(form);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="animate-fade-in max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your organization profile
        </p>
      </div>

      <div className="card space-y-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">General Profile</h2>
          
          <div>
            <label className="label">Company Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">Country</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">Base Currency (Immutable)</label>
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-sm text-slate-700 font-medium">
              {company?.baseCurrency.symbol} {company?.baseCurrency.id} ({company?.baseCurrency.name})
            </div>
            <p className="text-xs text-slate-400 mt-1">Base currency is set at creation and cannot be changed.</p>
          </div>

          {msg.text && (
            <div className={`p-3 rounded-lg text-sm ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {msg.text}
            </div>
          )}

          <div className="pt-4">
            <button type="submit" disabled={updateMutation.isPending} className="btn btn-primary">
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
