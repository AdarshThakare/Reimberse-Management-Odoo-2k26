"use client";

/**
 * Expense Detail Page — Premium redesign
 */

import { useState } from "react";
import Link from "next/link";
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

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "#9CA0B8",
  SUBMITTED: "#3872E1",
  UNDER_REVIEW: "#F59E0B",
  APPROVED: "#00DDB0",
  REJECTED: "#EF4444",
};

export default function ExpenseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const utils = api.useUtils();
  const [receiptModal, setReceiptModal] = useState(false);

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
      <div className="flex items-center justify-center py-20 text-text-muted">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg font-bold text-text-primary">Expense not found</h2>
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
  const currentIdx = rejected ? -1 : stages.indexOf(expense.status);

  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-6">
      <button
        onClick={() => router.back()}
        className="text-sm font-medium transition-colors duration-200 cursor-pointer"
        style={{ color: "#3872E1" }}
      >
        ← Back
      </button>

      {/* Status Timeline */}
      <div
        className="rounded-2xl bg-white p-6"
        style={{ border: "1px solid rgba(33, 33, 47, 0.06)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
      >
        <div className="flex items-center gap-1">
          {rejected ? (
            <div className="flex items-center gap-1">
              {["Draft", "Submitted", "Rejected"].map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                    style={
                      i < 2
                        ? { background: "rgba(33, 33, 47, 0.08)", color: "#21212F" }
                        : { background: "rgba(239, 68, 68, 0.1)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.2)" }
                    }
                  >
                    {s}
                  </span>
                  {i < 2 && (
                    <svg className="h-4 w-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          ) : (
            stages.map((s, i) => {
              const color = STATUS_COLORS[s] ?? "#9CA0B8";
              const isCurrentOrPast = i <= currentIdx;
              const isCurrent = i === currentIdx;
              return (
                <div key={s} className="flex items-center gap-1">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all"
                    style={
                      isCurrentOrPast
                        ? {
                            background: isCurrent ? `${color}18` : `${color}10`,
                            color: color,
                            border: isCurrent ? `1px solid ${color}30` : "1px solid transparent",
                            boxShadow: isCurrent ? `0 0 12px ${color}20` : "none",
                          }
                        : { background: "rgba(33, 33, 47, 0.04)", color: "#BFC3D9" }
                    }
                  >
                    {isCurrent && <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: color }} />}
                    {STATUS_LABEL[s]}
                  </span>
                  {i < stages.length - 1 && (
                    <div className="h-[2px] w-8 rounded-full" style={{ background: i < currentIdx ? color : "rgba(33, 33, 47, 0.08)" }} />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Expense Details */}
      <div
        className="rounded-2xl bg-white p-6 space-y-5"
        style={{ border: "1px solid rgba(33, 33, 47, 0.06)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-text-primary">{expense.subject}</h1>
            <p className="mt-1 text-sm text-text-secondary">
              Submitted by {expense.submitter.name ?? expense.submitter.email}
              {expense.submitter.designation && ` (${expense.submitter.designation})`}
            </p>
          </div>
          <span className={`badge ${STATUS_BADGE[expense.status]}`}>
            {STATUS_LABEL[expense.status]}
          </span>
        </div>

        <hr style={{ borderColor: "rgba(33, 33, 47, 0.06)" }} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Description" value={expense.description ?? "—"} />
          <Field label="Expense Date" value={new Date(expense.expenseDate).toLocaleDateString()} />
          <Field label="Category" value={expense.category.name} />
          <div>
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Amount</div>
            <div className="mt-1.5 text-xl font-bold text-text-primary">
              {expense.currency.symbol}
              {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <span className="ml-1.5 text-sm font-normal text-text-muted">
                {expense.currencyId}
              </span>
            </div>
            {expense.convertedAmount && (
              <div className="text-sm text-text-secondary mt-0.5">
                ≈ ₹{Number(expense.convertedAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                <span className="text-xs text-text-muted ml-1">
                  (rate: {Number(expense.exchangeRate).toFixed(4)})
                </span>
              </div>
            )}
          </div>
          <Field label="Remarks" value={expense.remarks ?? "—"} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4" style={{ borderTop: "1px solid rgba(33, 33, 47, 0.06)" }}>
          {isDraft && isOwner && (
            <>
              <Link href={`/dashboard/expenses/${expense.id}/edit`} className="btn btn-secondary">
                Edit Draft
              </Link>
              <button
                onClick={() => submitMutation.mutate({ id: expense.id })}
                disabled={submitMutation.isPending}
                className="btn btn-primary"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit for Approval"}
              </button>
            </>
          )}
          {expense.status === "UNDER_REVIEW" && isManagerOrAdmin && !isOwner && (
            <>
              <button
                onClick={() => approveMutation.mutate({ expenseId: expense.id, comment: "Approved" })}
                disabled={approveMutation.isPending}
                className="btn btn-success"
              >
                {approveMutation.isPending ? "Approving..." : "✓ Approve"}
              </button>
              <button
                onClick={() => {
                  const reason = prompt("Reason for rejection:");
                  if (reason) rejectMutation.mutate({ expenseId: expense.id, comment: reason });
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

      {/* Receipt Image */}
      {expense.receiptUrl && (
        <div
          className="rounded-2xl bg-white p-6"
          style={{ border: "1px solid rgba(33, 33, 47, 0.06)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
        >
          <h2 className="text-sm font-bold text-text-primary mb-4">Attached Receipt</h2>
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => setReceiptModal(true)}
              className="group relative w-32 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
              style={{ border: "1px solid rgba(33, 33, 47, 0.08)" }}
            >
              <img src={expense.receiptUrl} alt="Receipt" className="w-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold bg-black/50 px-2.5 py-1 rounded-lg">
                  View Full Size
                </span>
              </div>
            </button>
            <div className="text-xs text-text-secondary">
              <p className="font-semibold text-text-primary">Scanned receipt</p>
              <p className="mt-1">Click to view full-size image</p>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptModal && expense.receiptUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setReceiptModal(false)}
          style={{ background: "rgba(33, 33, 47, 0.7)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReceiptModal(false)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer"
              style={{ background: "rgba(33, 33, 47, 0.5)", color: "white" }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={expense.receiptUrl} alt="Receipt full size" className="max-w-full h-auto" />
          </div>
        </div>
      )}

      {/* Approval History */}
      {expense.approvalActions.length > 0 && (
        <div
          className="rounded-2xl bg-white p-6"
          style={{ border: "1px solid rgba(33, 33, 47, 0.06)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
        >
          <h2 className="text-sm font-bold text-text-primary mb-4">Approval History</h2>
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
                    <td className="font-semibold text-text-primary">
                      {action.approver.name ?? "Unknown"}
                      {action.approver.designation && (
                        <span className="text-xs text-text-muted ml-1">
                          ({action.approver.designation})
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${action.action === "APPROVED" ? "badge-approved" : "badge-rejected"}`}>
                        {action.action === "APPROVED" ? "✓ Approved" : "✗ Rejected"}
                      </span>
                    </td>
                    <td className="text-text-secondary">{action.comment ?? "—"}</td>
                    <td className="text-text-muted text-xs">
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
        <div
          className="rounded-2xl bg-white p-6"
          style={{ border: "1px solid rgba(33, 33, 47, 0.06)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
        >
          <h2 className="text-sm font-bold text-text-primary mb-3">Approval Rule</h2>
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">{expense.approvalRule.name}</span>
            <span className="ml-2 badge badge-draft">{expense.approvalRule.ruleType}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {expense.approvalRule.steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
                style={{ background: "rgba(33, 33, 47, 0.02)", border: "1px solid rgba(33, 33, 47, 0.06)" }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold"
                  style={{ background: "rgba(56, 114, 225, 0.08)", color: "#3872E1" }}
                >
                  {step.stepOrder}
                </span>
                <span className="text-text-primary font-medium">{step.approver.name}</span>
                {step.approver.designation && (
                  <span className="text-xs text-text-muted">({step.approver.designation})</span>
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
      <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{label}</div>
      <div className="mt-1.5 text-sm text-text-primary">{value}</div>
    </div>
  );
}
