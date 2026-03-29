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
        <h1 className="text-2xl font-bold text-slate-900">Approval Queue</h1>
        <p className="mt-1 text-sm text-slate-500">
          Expenses waiting for your approval
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <svg className="h-5 w-5 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
          </svg>
          Loading...
        </div>
      ) : pending && pending.length > 0 ? (
        <div className="space-y-4">
          {pending.map((expense) => (
            <div key={expense.id} className="card animate-slide-in">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-slate-900">
                      {expense.subject}
                    </h3>
                    {expense.approvalRule && (
                      <span className="badge badge-draft text-[10px]">
                        {expense.approvalRule.ruleType}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Submitted by{" "}
                    <span className="font-medium text-slate-700">
                      {expense.submitter.name ?? expense.submitter.email}
                    </span>
                    {expense.submitter.designation && (
                      <span className="text-slate-400"> ({expense.submitter.designation})</span>
                    )}
                    {" · "}
                    {expense.category.name}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">
                    {expense.currency.symbol}
                    {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  {expense.convertedAmount && (
                    <div className="text-xs text-slate-400">
                      ≈ ₹{Number(expense.convertedAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })} (company)
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
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
        <div className="card text-center py-16">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">All caught up!</h3>
          <p className="mt-1 text-sm text-slate-500">No expenses waiting for your approval.</p>
        </div>
      )}
    </div>
  );
}
