"use client";

import { useEffect, useRef } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const role = session?.user?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [router, status]);

  const { data: company } = api.company.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: expenses } = api.expense.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: pending } = api.expense.listPending.useQuery(undefined, {
    enabled: isAuthenticated && (role === "MANAGER" || role === "ADMIN"),
  });
  const { data: allExpenses } = api.expense.listAll.useQuery(undefined, {
    enabled: isAuthenticated && role === "ADMIN",
  });

  const stats = {
    total: expenses?.length ?? 0,
    draft: expenses?.filter((e) => e.status === "DRAFT").length ?? 0,
    pending: expenses?.filter((e) => e.status === "UNDER_REVIEW" || e.status === "SUBMITTED").length ?? 0,
    approved: expenses?.filter((e) => e.status === "APPROVED").length ?? 0,
    rejected: expenses?.filter((e) => e.status === "REJECTED").length ?? 0,
    awaitingMyApproval: pending?.length ?? 0,
    companyTotal: allExpenses?.length ?? 0,
  };

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Dashboard</h1>
          {company && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: "rgba(56, 114, 225, 0.08)",
                color: "#3872E1",
                border: "1px solid rgba(56, 114, 225, 0.15)",
              }}
            >
              {company.name}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-text-secondary">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}! Here&apos;s your financial overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        <StatCard
          label="Total Expenses"
          value={stats.total}
          gradient="linear-gradient(135deg, rgba(56, 114, 225, 0.08), rgba(56, 114, 225, 0.03))"
          accentColor="#3872E1"
          icon="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <StatCard
          label="Drafts"
          value={stats.draft}
          gradient="linear-gradient(135deg, rgba(156, 160, 184, 0.1), rgba(156, 160, 184, 0.03))"
          accentColor="#6B7194"
          icon="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
        <StatCard
          label="Pending"
          value={stats.pending}
          gradient="linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))"
          accentColor="#F59E0B"
          icon="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <StatCard
          label="Approved"
          value={stats.approved}
          gradient="linear-gradient(135deg, rgba(0, 221, 176, 0.08), rgba(0, 221, 176, 0.02))"
          accentColor="#00DDB0"
          icon="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />

        {(role === "MANAGER" || role === "ADMIN") && (
          <StatCard
            label="Awaiting My Approval"
            value={stats.awaitingMyApproval}
            gradient="linear-gradient(135deg, rgba(56, 114, 225, 0.1), rgba(0, 221, 176, 0.05))"
            accentColor="#3872E1"
            href="/dashboard/approvals"
            icon="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
          />
        )}
        {role === "ADMIN" && (
          <StatCard
            label="Company-Wide"
            value={stats.companyTotal}
            gradient="linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.02))"
            accentColor="#8B5CF6"
            icon="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        )}
        <StatCard
          label="Rejected"
          value={stats.rejected}
          gradient="linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.02))"
          accentColor="#EF4444"
          icon="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          <Link
            href="/dashboard/expenses/new"
            className="group relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg"
            style={{
              border: "1px solid rgba(33, 33, 47, 0.06)",
              boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
            }}
          >
            <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-[80px] transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(56, 114, 225, 0.06), rgba(0, 221, 176, 0.06))" }} />
            <div className="relative flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #3872E1, #2b5bc0)",
                  boxShadow: "0 4px 14px rgba(56, 114, 225, 0.3)",
                }}
              >
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-text-primary">New Expense</div>
                <div className="text-xs text-text-secondary mt-0.5">Submit a new expense claim</div>
              </div>
            </div>
          </Link>

          <Link
            href={role === "ADMIN" ? "/dashboard/expenses/history" : "/dashboard/expenses"}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg"
            style={{
              border: "1px solid rgba(33, 33, 47, 0.06)",
              boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
            }}
          >
            <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-[80px] transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(0, 221, 176, 0.06), rgba(0, 221, 176, 0.03))" }} />
            <div className="relative flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #00DDB0, #00b894)",
                  boxShadow: "0 4px 14px rgba(0, 221, 176, 0.3)",
                }}
              >
                <svg className="h-5 w-5 text-[#21212F]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-text-primary">
                  {role === "ADMIN" ? "View Expense History" : "View Expenses"}
                </div>
                <div className="text-xs text-text-secondary mt-0.5">
                  {role === "ADMIN" ? "See all company-wide expense records" : "See all your expense claims"}
                </div>
              </div>
            </div>
          </Link>

          {(role === "MANAGER" || role === "ADMIN") && (
            <Link
              href="/dashboard/approvals"
              className="group relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg"
              style={{
                border: "1px solid rgba(33, 33, 47, 0.06)",
                boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
              }}
            >
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-[80px] transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(245, 158, 11, 0.03))" }} />
              <div className="relative flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B, #D97706)",
                    boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary">Approval Queue</div>
                  <div className="text-xs text-text-secondary mt-0.5">
                    {stats.awaitingMyApproval} expense{stats.awaitingMyApproval !== 1 ? "s" : ""} waiting
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Company Info */}
      {company && (
        <div
          className="relative overflow-hidden rounded-2xl bg-white p-6"
          style={{
            border: "1px solid rgba(33, 33, 47, 0.06)",
            boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: "linear-gradient(90deg, #3872E1, #00DDB0)" }}
          />
          <h2 className="text-sm font-bold text-text-primary mb-4">Company Info</h2>
          <div className="grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">Company</span>
              <div className="mt-1 font-semibold text-text-primary">{company.name}</div>
            </div>
            <div>
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">Country</span>
              <div className="mt-1 font-semibold text-text-primary">{company.country}</div>
            </div>
            <div>
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">Base Currency</span>
              <div className="mt-1 font-semibold text-text-primary">
                {company.baseCurrency.symbol} {company.baseCurrency.id} — {company.baseCurrency.name}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  gradient,
  accentColor,
  icon,
  href,
}: {
  label: string;
  value: number;
  gradient: string;
  accentColor: string;
  icon: string;
  href?: string;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el || value === 0) return;

    let start = 0;
    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      el.textContent = String(start);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  const content = (
    <div
      className="relative overflow-hidden rounded-2xl bg-white p-5 transition-all duration-300 hover:shadow-lg group"
      style={{
        border: "1px solid rgba(33, 33, 47, 0.06)",
        boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: gradient }} />
      <div className="relative flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">{label}</div>
          <div className="mt-2 text-3xl font-bold" style={{ color: accentColor }}>
            <span ref={counterRef}>{value}</span>
          </div>
        </div>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ background: gradient }}
        >
          <svg className="h-5 w-5" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </div>
      </div>
      {href && (
        <div className="mt-3 text-xs font-semibold" style={{ color: accentColor }}>
          View all →
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
