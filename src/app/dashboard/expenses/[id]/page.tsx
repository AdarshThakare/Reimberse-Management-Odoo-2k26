"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

const STATUS_BADGE: Record<string, string> = {
  DRAFT: "badge-draft",
  SUBMITTED: "badge-submitted",
  UNDER_REVIEW: "badge-under-review",
  APPROVED: "badge-approved",
  REJECTED: "badge-rejected",
};

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const STEP_COLORS = [
  "bg-slate-200 text-slate-500",
  "bg-brand-600 text-white",
  "bg-emerald-600 text-white",
];

export default function ExpenseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const utils = api.useUtils();

  const { data: expense, isLoading } = api.expense.getById.useQuery({
    id: params.id as string,
  });

  const submitMutation = api.expense.submit.useMutation({
    onSuccess: () => utils.expense.getById.invalidate({ id: params.id as string }),
  });

  const approveMutation = api.approval.approve.useMutation({
    onSuccess: () => {
      void utils.expense.getById.invalidate({ id: params.id as string });
      void utils.expense.listPending.invalidate();
    },
  });

  const rejectMutation = api.approval.reject.useMutation({
    onSuccess: () => {
      void utils.expense.getById.invalidate({ id: params.id as string });
      void utils.expense.listPending.invalidate();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <svg className="h-5 w-5 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
        </svg>
        Loading...
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-semibold text-slate-900">Expense not found</h2>
        <button onClick={() => router.back()} className="btn btn-secondary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  const isDraft = expense.status === "DRAFT";
  const isOwner = expense.submitterId === session?.user?.id;
  const isManagerOrAdmin =
    session?.user?.role === "MANAGER" || session?.user?.role === "ADMIN";

  // Status breadcrumb
  const stages = ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "APPROVED"];
  const rejected = expense.status === "REJECTED";
  const currentIdx = rejected
    ? -1
    : stages.indexOf(expense.status);

  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-6">
      <button
        onClick={() => router.back()}
        className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        ← Back
      </button>

      {/* Status Breadcrumb */}
      <div className="card">
        <div className="flex items-center gap-2">
          {rejected ? (
            <div className="flex items-center gap-2">
              {["Draft", "Submitted", "Rejected"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <span
                    className={`badge ${
                      i < 2
                        ? "bg-slate-700 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {s}
                  </span>
                  {i < 2 && (
                    <svg className="h-4 w-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          ) : (
            stages.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`badge ${
                    i <= currentIdx
                      ? i === currentIdx
                        ? "bg-brand-600 text-white"
                        : "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {STATUS_LABEL[s]}
                </span>
                {i < stages.length - 1 && (
                  <svg className="h-4 w-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Expense Details */}
      <div className="card space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{expense.subject}</h1>
            <p className="mt-1 text-sm text-slate-500">
              Submitted by {expense.submitter.name ?? expense.submitter.email}
              {expense.submitter.designation && ` (${expense.submitter.designation})`}
            </p>
          </div>
          <span className={`badge ${STATUS_BADGE[expense.status]}`}>
            {STATUS_LABEL[expense.status]}
          </span>
        </div>

        <hr className="border-slate-200" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Description" value={expense.description ?? "—"} />
          <Field label="Expense Date" value={new Date(expense.expenseDate).toLocaleDateString()} />
          <Field label="Category" value={expense.category.name} />
          <Field label="Paid By" value={expense.paidBy === "EMPLOYEE" ? "Employee" : "Company"} />
          <div>
            <div className="text-xs font-medium text-slate-500">Amount</div>
            <div className="mt-1 text-lg font-bold text-slate-900">
              {expense.currency.symbol}
              {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <span className="ml-1 text-sm font-normal text-slate-400">
                {expense.currencyId}
              </span>
            </div>
            {expense.convertedAmount && (
              <div className="text-sm text-slate-500">
                ≈ ₹{Number(expense.convertedAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                <span className="text-xs text-slate-400 ml-1">
                  (rate: {Number(expense.exchangeRate).toFixed(4)})
                </span>
              </div>
            )}
          </div>
          <Field label="Remarks" value={expense.remarks ?? "—"} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-3 border-t border-slate-200">
          {isDraft && isOwner && (
            <button
              onClick={() => submitMutation.mutate({ id: expense.id })}
              disabled={submitMutation.isPending}
              className="btn btn-primary"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit for Approval"}
            </button>
          )}
          {expense.status === "UNDER_REVIEW" && isManagerOrAdmin && !isOwner && (
            <>
              <button
                onClick={() =>
                  approveMutation.mutate({
                    expenseId: expense.id,
                    comment: "Approved",
                  })
                }
                disabled={approveMutation.isPending}
                className="btn btn-success"
              >
                {approveMutation.isPending ? "Approving..." : "✓ Approve"}
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
                className="btn btn-danger"
              >
                {rejectMutation.isPending ? "Rejecting..." : "✗ Reject"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Approval History */}
      {expense.approvalActions.length > 0 && (
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Approval History</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Approver</th>
                  <th>Status</th>
                  <th>Comment</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {expense.approvalActions.map((action) => (
                  <tr key={action.id}>
                    <td className="font-medium text-slate-900">
                      {action.approver.name ?? "Unknown"}
                      {action.approver.designation && (
                        <span className="text-xs text-slate-400 ml-1">
                          ({action.approver.designation})
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          action.action === "APPROVED"
                            ? "badge-approved"
                            : "badge-rejected"
                        }`}
                      >
                        {action.action === "APPROVED" ? "✓ Approved" : "✗ Rejected"}
                      </span>
                    </td>
                    <td className="text-slate-500">{action.comment ?? "—"}</td>
                    <td className="text-slate-400 text-xs">
                      {new Date(action.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approval Rule Info */}
      {expense.approvalRule && (
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Approval Rule</h2>
          <div className="text-sm text-slate-600">
            <span className="font-medium">{expense.approvalRule.name}</span>
            <span className="ml-2 badge badge-draft">{expense.approvalRule.ruleType}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {expense.approvalRule.steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {step.stepOrder}
                </span>
                <span className="text-slate-700">{step.approver.name}</span>
                {step.approver.designation && (
                  <span className="text-xs text-slate-400">
                    ({step.approver.designation})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-sm text-slate-900">{value}</div>
    </div>
  );
}
