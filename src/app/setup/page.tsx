"use client";

import { useState } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";

interface CountryCurrency {
  countryName: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}

export default function SetupPage() {
  const [companyName, setCompanyName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CountryCurrency | null>(null);
  const [error, setError] = useState("");

  const { data: countries, isLoading: loadingCountries } =
    api.currency.listCountries.useQuery();

  const setupMutation = api.company.setup.useMutation({
    onSuccess: () => {
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
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #F6F8FC 0%, #ECE9EA 100%)" }}>
      <div className="animate-fade-in w-full max-w-lg">
        <div className="mb-8 text-center">
          {/* Logo */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
            />
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Set up your company
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your company details. The currency will be set based on your
            country.
          </p>
        </div>

        <div
          className="rounded-2xl bg-white p-7"
          style={{
            border: "1px solid rgba(33, 33, 47, 0.06)",
            boxShadow: "0 4px 20px rgba(33, 33, 47, 0.08)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="adminName" className="label">Your Name</label>
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

            <div>
              <label htmlFor="companyName" className="label">Company Name</label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corporation"
                className="input"
              />
            </div>

            <div>
              <label htmlFor="country" className="label">Country</label>
              <input
                id="country"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="input"
              />
            </div>

            {loadingCountries ? (
              <div className="flex items-center justify-center py-8 text-text-muted">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-6 w-6 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
                  <span className="text-xs">Loading countries...</span>
                </div>
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto rounded-xl" style={{ border: "1px solid rgba(33, 33, 47, 0.08)" }}>
                {filtered?.slice(0, 50).map((c) => (
                  <button
                    key={`${c.countryName}-${c.currencyCode}`}
                    type="button"
                    onClick={() => {
                      setSelected(c);
                      setSearch(c.countryName);
                    }}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-all duration-200"
                    style={
                      selected?.countryName === c.countryName
                        ? {
                            background: "rgba(56, 114, 225, 0.06)",
                            color: "#3872E1",
                            fontWeight: 600,
                          }
                        : { color: "#6B7194" }
                    }
                  >
                    <span>{c.countryName}</span>
                    <span className="text-xs text-text-muted">
                      {c.currencyCode} ({c.currencySymbol})
                    </span>
                  </button>
                ))}
              </div>
            )}

            {selected && (
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(56, 114, 225, 0.04)",
                  border: "1px solid rgba(56, 114, 225, 0.15)",
                }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#3872E1" }}>
                  Base Currency
                </div>
                <div className="mt-1 text-lg font-bold text-text-primary">
                  {selected.currencySymbol} {selected.currencyCode} —{" "}
                  {selected.currencyName}
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl p-3 text-sm font-medium" style={{ background: "rgba(239, 68, 68, 0.06)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
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
