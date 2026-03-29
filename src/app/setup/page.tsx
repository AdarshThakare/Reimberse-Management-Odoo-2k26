"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface CountryCurrency {
  countryName: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}

export default function SetupPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CountryCurrency | null>(null);
  const [error, setError] = useState("");

  const { data: countries, isLoading: loadingCountries } =
    api.currency.listCountries.useQuery();

  const setupMutation = api.company.setup.useMutation({
    onSuccess: () => {
      // Force a full page reload to refresh the session with new companyId
      window.location.href = "/dashboard";
    },
    onError: (err) => setError(err.message),
  });

  const filtered = countries?.filter(
    (c) =>
      c.countryName.toLowerCase().includes(search.toLowerCase()) ||
      c.currencyCode.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!adminName.trim()) {
      setError("Your name is required.");
      return;
    }
    if (!companyName.trim()) {
      setError("Company name is required.");
      return;
    }
    if (!selected) {
      setError("Please select a country.");
      return;
    }

    setupMutation.mutate({
      adminName: adminName.trim(),
      companyName: companyName.trim(),
      country: selected.countryName,
      currencyCode: selected.currencyCode,
      currencyName: selected.currencyName,
      currencySymbol: selected.currencySymbol,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="animate-fade-in w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Set up your company
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter your company details. The currency will be set based on your
            country.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin Name */}
            <div>
              <label htmlFor="adminName" className="label">
                Your Name
              </label>
              <input
                id="adminName"
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="John Doe"
                className="input"
                autoFocus
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="label">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corporation"
                className="input"
              />
            </div>

            {/* Country Search */}
            <div>
              <label htmlFor="country" className="label">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="input"
              />
            </div>

            {/* Country List */}
            {loadingCountries ? (
              <div className="flex items-center justify-center py-8 text-slate-400">
                <svg className="h-5 w-5 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                </svg>
                Loading countries...
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-200">
                {filtered?.slice(0, 50).map((c) => (
                  <button
                    key={`${c.countryName}-${c.currencyCode}`}
                    type="button"
                    onClick={() => {
                      setSelected(c);
                      setSearch(c.countryName);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors ${
                      selected?.countryName === c.countryName
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{c.countryName}</span>
                    <span className="text-xs text-slate-400">
                      {c.currencyCode} ({c.currencySymbol})
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Currency Display */}
            {selected && (
              <div className="rounded-lg bg-brand-50 p-4 border border-brand-200">
                <div className="text-sm font-medium text-brand-700">
                  Base Currency
                </div>
                <div className="mt-1 text-lg font-semibold text-brand-900">
                  {selected.currencySymbol} {selected.currencyCode} —{" "}
                  {selected.currencyName}
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={setupMutation.isPending || !selected || !companyName.trim()}
              className="btn btn-primary w-full"
            >
              {setupMutation.isPending ? "Setting up..." : "Create Company"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
