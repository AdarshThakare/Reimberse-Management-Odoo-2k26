"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

type ExpenseStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

const expenseStatuses: readonly ExpenseStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
];

function isExpenseStatus(value: string): value is ExpenseStatus {
  return expenseStatuses.includes(value as ExpenseStatus);
}

const statusColors = {
  DRAFT: "bg-gray-100 text-gray-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function ExpenseHistoryPage() {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<ExpenseStatus | undefined>();

  const { data, isLoading, error } = api.expense.getCompanyExpenseHistory.useQuery({
    skip: page * 50,
    take: 50,
    status: statusFilter,
  });

  const expenses = data?.expenses ?? [];
  const hasMore = data?.hasMore ?? false;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Expense History</h1>
        <p className="mt-1 text-sm text-slate-500">View all expenses in your company</p>
      </div>

      <div className="card">
        <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              value={statusFilter ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setStatusFilter(isExpenseStatus(value) ? value : undefined);
                setPage(0);
              }}
              className="input mt-1"
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900">All Expenses</h2>
          <p className="text-sm text-slate-500">Total: {data?.total ?? 0} expenses</p>
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-slate-500">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-600">Error loading expenses</div>
        ) : expenses.length === 0 ? (
          <div className="py-8 text-center text-slate-500">No expenses found</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Submitter</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{dateFmt.format(new Date(expense.createdAt))}</td>
                    <td className="font-medium text-slate-900">{expense.subject}</td>
                    <td>
                      <div className="text-sm">
                        <div className="font-medium text-slate-900">{expense.submitter.name ?? "Unknown"}</div>
                        <div className="text-slate-500">{expense.submitter.email}</div>
                      </div>
                    </td>
                    <td>
                      {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td>{expense.currency.symbol}</td>
                    <td>{expense.category.name}</td>
                    <td>
                      <span className={`badge ${statusColors[expense.status as ExpenseStatus]}`}>
                        {expense.status}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="btn btn-ghost text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
