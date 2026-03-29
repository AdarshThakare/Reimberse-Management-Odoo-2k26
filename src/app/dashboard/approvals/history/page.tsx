"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const statusColors = {
  DRAFT: "bg-gray-100 text-gray-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const actionColors = {
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

interface ApprovalDetail {
  approver: {
    id: string;
    name: string | null;
    designation: string | null;
    email: string;
  };
  action: "APPROVED" | "REJECTED";
  comment?: string | null;
  createdAt: Date;
}

type ExpenseStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
type ApprovalActionType = "APPROVED" | "REJECTED";

export default function ApprovalHistoryPage() {
  const [page, setPage] = useState(0);
  const [actionFilter, setActionFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const { data, isLoading, error } = api.expense.getManagerApprovalHistory.useQuery({
    skip: page * 50,
    take: 50,
    action: actionFilter as any,
    status: statusFilter as any,
  });

  const expenses = data?.expenses || [];
  const hasMore = data?.hasMore ?? false;

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Approval History</h1>
        <p className="mt-1 text-sm text-slate-500">View all expenses you have approved or rejected</p>
      </div>

      <div className="card">
        <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Action</label>
            <select
              value={actionFilter ?? ""}
              onChange={(e) => {
                setActionFilter(e.target.value || undefined);
                setPage(0);
              }}
              className="input mt-1"
            >
              <option value="">All Actions</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Final Status</label>
            <select
              value={statusFilter ?? ""}
              onChange={(e) => {
                setStatusFilter(e.target.value || undefined);
                setPage(0);
              }}
              className="input mt-1"
            >
              <option value="">All Statuses</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900">Approval Records</h2>
          <p className="text-sm text-slate-500">Total: {data?.total ?? 0} records</p>
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-slate-500">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-600">Error loading approvals</div>
        ) : expenses.length === 0 ? (
          <div className="py-8 text-center text-slate-500">No approval records found</div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="overflow-hidden rounded-lg border border-slate-200">
                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-50"
                  onClick={() => toggleExpanded(expense.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{expense.subject}</h3>
                        <p className="text-sm text-slate-500">
                          {expense.submitter.name ?? expense.submitter.email} • {dateFmt.format(new Date(expense.createdAt))}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">
                          {expense.currency.symbol} {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm text-slate-500">{expense.category.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    <span className={`badge ${statusColors[expense.status as ExpenseStatus]}`}>
                      {expense.status}
                    </span>
                    <svg
                      className={`h-5 w-5 transition-transform ${expandedRows.has(expense.id) ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {expandedRows.has(expense.id) && (
                  <div className="space-y-4 border-t border-slate-200 bg-slate-50 p-4">
                    <div>
                      <h4 className="mb-2 font-medium text-slate-900">Expense Details</h4>
                      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                        <div>
                          <p className="text-slate-500">Description</p>
                          <p className="font-medium text-slate-900">{expense.description || "No description"}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Submitted Date</p>
                          <p className="font-medium text-slate-900">
                            {expense.submittedAt ? dateTimeFmt.format(new Date(expense.submittedAt)) : "-"}
                          </p>
                        </div>
                        {expense.remarks && (
                          <div className="sm:col-span-2">
                            <p className="text-slate-500">Remarks</p>
                            <p className="font-medium text-slate-900">{expense.remarks}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium text-slate-900">Approval Chain</h4>
                      <div className="space-y-3">
                        {expense.approvalRule && (
                          <div className="rounded border border-slate-200 bg-white p-3">
                            <p className="mb-2 text-sm font-medium text-slate-700">
                              Expected Approvers ({expense.approvalRule.ruleType})
                            </p>
                            <div className="space-y-1">
                              {expense.approvalRule.steps?.map((step) => (
                                <div key={step.id} className="flex items-center gap-2 text-sm text-slate-700">
                                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-medium">
                                    {step.stepOrder}
                                  </span>
                                  <span>{step.approver.name ?? step.approver.id}</span>
                                  <span className="text-slate-500">({step.approver.designation ?? "Approver"})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {expense.approvalActions && expense.approvalActions.length > 0 ? (
                          <div className="rounded border border-slate-200 bg-white p-3">
                            <p className="mb-2 text-sm font-medium text-slate-700">Actions Taken</p>
                            <div className="space-y-3">
                              {expense.approvalActions.map((action: ApprovalDetail, idx: number) => (
                                <div key={`${action.approver.id}-${idx}`} className="border-l-2 border-slate-300 pl-3 text-sm">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium text-slate-900">{action.approver.name ?? action.approver.email}</p>
                                      <p className="text-xs text-slate-500">
                                        {action.approver.designation ?? "Approver"} • {action.approver.email}
                                      </p>
                                    </div>
                                    <span className={`badge ${actionColors[action.action as ApprovalActionType]}`}>
                                      {action.action}
                                    </span>
                                  </div>
                                  {action.comment && <p className="mt-1 italic text-slate-700">"{action.comment}"</p>}
                                  <p className="mt-1 text-xs text-slate-500">
                                    {dateTimeFmt.format(new Date(action.createdAt))}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="rounded border border-slate-200 bg-white p-3 text-sm text-slate-500">
                            No actions taken yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {(page > 0 || hasMore) && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              className="btn btn-ghost disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-slate-500">Page {page + 1}</span>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={!hasMore}
              className="btn btn-ghost disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
