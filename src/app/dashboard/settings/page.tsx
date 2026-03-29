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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-text-muted">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Company Settings</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Manage your organization profile
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl bg-white p-7"
        style={{
          border: "1px solid rgba(33, 33, 47, 0.06)",
          boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #3872E1, #00DDB0)" }} />

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-lg font-bold text-text-primary pb-3" style={{ borderBottom: "1px solid rgba(33, 33, 47, 0.06)" }}>
            General Profile
          </h2>

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
            <div
              className="rounded-xl px-4 py-3 text-sm font-semibold"
              style={{
                background: "rgba(33, 33, 47, 0.03)",
                border: "1px solid rgba(33, 33, 47, 0.06)",
                color: "#21212F",
              }}
            >
              {company?.baseCurrency.symbol} {company?.baseCurrency.id} ({company?.baseCurrency.name})
            </div>
            <p className="text-xs text-text-muted mt-1.5">Base currency is set at creation and cannot be changed.</p>
          </div>

          {msg.text && (
            <div
              className="p-3.5 rounded-xl text-sm font-medium"
              style={msg.type === "error" ? {
                background: "rgba(239, 68, 68, 0.06)",
                color: "#EF4444",
                border: "1px solid rgba(239, 68, 68, 0.15)",
              } : {
                background: "rgba(0, 221, 176, 0.06)",
                color: "#00b894",
                border: "1px solid rgba(0, 221, 176, 0.15)",
              }}
            >
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
