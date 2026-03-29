"use client";

import { useEffect } from "react";
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
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
          {company ? ` — ${company.name}` : ""}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Expenses" value={stats.total} color="brand" />
        <StatCard label="Drafts" value={stats.draft} color="slate" />
        <StatCard label="Pending" value={stats.pending} color="amber" />
        <StatCard label="Approved" value={stats.approved} color="emerald" />

        {(role === "MANAGER" || role === "ADMIN") && (
          <StatCard
            label="Awaiting My Approval"
            value={stats.awaitingMyApproval}
            color="blue"
            href="/dashboard/approvals"
          />
        )}
        {role === "ADMIN" && (
          <StatCard label="Company-Wide" value={stats.companyTotal} color="purple" />
        )}
        <StatCard label="Rejected" value={stats.rejected} color="red" />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/expenses/new" className="card group flex items-center gap-4 hover:border-brand-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-transform group-hover:scale-110">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">New Expense</div>
            <div className="text-xs text-slate-500">Submit a new expense claim</div>
          </div>
        </Link>

        <Link href="/dashboard/expenses" className="card group flex items-center gap-4 hover:border-brand-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">View Expenses</div>
            <div className="text-xs text-slate-500">See all your expense claims</div>
          </div>
        </Link>

        {(role === "MANAGER" || role === "ADMIN") && (
          <Link href="/dashboard/approvals" className="card group flex items-center gap-4 hover:border-brand-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Approval Queue</div>
              <div className="text-xs text-slate-500">
                {stats.awaitingMyApproval} expense{stats.awaitingMyApproval !== 1 ? "s" : ""} waiting
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Company Info */}
      {company && (
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-900">Company Info</h2>
          <div className="mt-3 grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <span className="text-slate-500">Company</span>
              <div className="font-medium text-slate-900">{company.name}</div>
            </div>
            <div>
              <span className="text-slate-500">Country</span>
              <div className="font-medium text-slate-900">{company.country}</div>
            </div>
            <div>
              <span className="text-slate-500">Base Currency</span>
              <div className="font-medium text-slate-900">
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
  color,
  href,
}: {
  label: string;
  value: number;
  color: string;
  href?: string;
}) {
  const colorMap: Record<string, string> = {
    brand: "bg-brand-50 text-brand-700",
    slate: "bg-slate-100 text-slate-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
  };

  const Wrapper = href ? Link : "div";
  const props = href ? { href } : {};

  return (
    <Wrapper {...(props as any)} className="card">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className={`mt-2 inline-flex items-center rounded-lg px-3 py-1 text-2xl font-bold ${colorMap[color] ?? ""}`}>
        {value}
      </div>
    </Wrapper>
  );
}
