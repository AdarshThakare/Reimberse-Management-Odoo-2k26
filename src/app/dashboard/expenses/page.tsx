"use client";

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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

export default function ExpensesPage() {
  const { data: session } = useSession();
  const { data: expenses, isLoading } = api.expense.list.useQuery();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">My Expenses</h1>
          <p className="mt-2 text-sm text-text-secondary">
            View and manage your expense claims
          </p>
        </div>
        {!isAdmin && (
          <Link href="/dashboard/expenses/new" className="btn btn-primary w-full sm:w-auto mt-2 sm:mt-0">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Expense
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-text-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
            <span className="text-sm">Loading expenses...</span>
          </div>
        </div>
      ) : expenses && expenses.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="font-semibold text-text-primary">{expense.subject}</td>
                  <td>{expense.category.name}</td>
                  <td>
                    <div className="font-bold text-text-primary">
                      {expense.currency.symbol}
                      {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    {expense.convertedAmount && expense.currencyId !== "INR" && (
                      <div className="text-xs text-text-muted mt-0.5">
                        ≈ ₹{Number(expense.convertedAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    )}
                  </td>
                  <td className="text-text-secondary">
                    {new Date(expense.expenseDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`badge ${STATUS_BADGE[expense.status] ?? ""}`}>
                      {STATUS_LABEL[expense.status] ?? expense.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/expenses/${expense.id}`}
                        className="text-sm font-semibold transition-colors duration-200"
                        style={{ color: "#3872E1" }}
                      >
                        View →
                      </Link>
                      {expense.status === "DRAFT" && (
                        <Link
                          href={`/dashboard/expenses/${expense.id}/edit`}
                          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-20">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "rgba(56, 114, 225, 0.08)" }}
          >
            <svg className="h-8 w-8" style={{ color: "#3872E1" }} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary">No expenses yet</h3>
          <p className="mt-1 text-sm text-text-secondary">Create your first expense claim to get started.</p>
          <Link href="/dashboard/expenses/new" className="btn btn-primary mt-5 inline-flex">
            Create Expense
          </Link>
        </div>
      )}
    </div>
  );
}
