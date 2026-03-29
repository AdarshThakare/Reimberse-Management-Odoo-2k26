"use client";

import { api } from "~/trpc/react";
import Link from "next/link";

export default function ApprovalsPage() {
  const { data: pending, isLoading } = api.expense.listPending.useQuery();
  const utils = api.useUtils();

  const approveMutation = api.approval.approve.useMutation({
    onSuccess: () => void utils.expense.listPending.invalidate(),
  });

  const rejectMutation = api.approval.reject.useMutation({
    onSuccess: () => void utils.expense.listPending.invalidate(),
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Approval Queue</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Expenses waiting for your approval
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-text-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      ) : pending && pending.length > 0 ? (
        <div className="space-y-4 stagger-children">
          {pending.map((expense) => (
            <div
              key={expense.id}
              className="relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg"
              style={{
                border: "1px solid rgba(33, 33, 47, 0.06)",
                boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
              }}
            >
              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #F59E0B, #00DDB0)" }} />

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-text-primary">
                      {expense.subject}
                    </h3>
                    {expense.approvalRule && (
                      <span className="badge badge-draft text-[10px]">
                        {expense.approvalRule.ruleType}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-text-secondary">
                    Submitted by{" "}
                    <span className="font-semibold text-text-primary">
                      {expense.submitter.name ?? expense.submitter.email}
                    </span>
                    {expense.submitter.designation && (
                      <span className="text-text-muted"> ({expense.submitter.designation})</span>
                    )}
                    {" · "}
                    {expense.category.name}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-text-primary">
                    {expense.currency.symbol}
                    {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  {expense.convertedAmount && (
                    <div className="text-xs text-slate-400">
                      (Submitted in {expense.currency.id}, converted to company base)
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 border-t pt-4" style={{ borderColor: "rgba(33, 33, 47, 0.06)" }}>
                <button
                  onClick={() =>
                    approveMutation.mutate({
                      expenseId: expense.id,
                      comment: "Approved",
                    })
                  }
                  disabled={approveMutation.isPending}
                  className="btn btn-success text-sm"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => {
                    const reason = prompt("Reason for rejection:");
                    if (reason) {
                      rejectMutation.mutate({
                        expenseId: expense.id,
                        comment: reason,
                      });
                    }
                  }}
                  disabled={rejectMutation.isPending}
                  className="btn btn-danger text-sm"
                >
                  ✗ Reject
                </button>
                <Link
                  href={`/dashboard/expenses/${expense.id}`}
                  className="btn btn-ghost text-sm ml-auto"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-20">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "rgba(0, 221, 176, 0.08)" }}
          >
            <svg className="h-8 w-8" style={{ color: "#00DDB0" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary">All caught up!</h3>
          <p className="mt-1 text-sm text-text-secondary">No expenses waiting for your approval.</p>
        </div>
      )}
    </div>
  );
}
