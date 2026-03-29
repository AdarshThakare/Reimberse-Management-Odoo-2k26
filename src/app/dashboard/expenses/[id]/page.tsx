"use client";

/**
 * Expense Detail Page
 *
 * Displays full details for a single expense:
 *   - Status breadcrumb (lifecycle tracker)
 *   - Expense metadata (amount, date, category, etc.)
 *   - Receipt image (if attached via OCR or upload)
 *   - Expense line items breakdown
 *   - Approval workflow info & history
 *   - Action buttons (Submit / Approve / Reject)
 */

import { useState } from "react";
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

      {/* ── Receipt Image ── */}
      {expense.receiptUrl && (
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Attached Receipt</h2>
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => setReceiptModal(true)}
              className="group relative w-32 rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <img
                src={expense.receiptUrl}
                alt="Receipt"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                  View Full Size
                </span>
              </div>
            </button>
            <div className="text-xs text-slate-500">
              <p className="font-medium text-slate-700">Scanned receipt</p>
              <p className="mt-1">Click to view full-size image</p>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptModal && expense.receiptUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setReceiptModal(false)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReceiptModal(false)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={expense.receiptUrl}
              alt="Receipt full size"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* ── Line Items ── */}
      {expense.lines && expense.lines.length > 0 && (
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Expense Breakdown</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expense.lines.map((line, idx) => (
                  <tr key={line.id}>
                    <td className="text-slate-400 font-medium">{idx + 1}</td>
                    <td className="text-slate-900">{line.description}</td>
                    <td className="text-right font-semibold text-slate-900">
                      {expense.currency.symbol}
                      {Number(line.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold">
                  <td></td>
                  <td className="text-slate-700">Total</td>
                  <td className="text-right text-slate-900">
                    {expense.currency.symbol}
                    {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

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
