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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Expenses</h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage your expense claims
          </p>
        </div>
        {!isAdmin && (
          <Link href="/dashboard/expenses/new" className="btn btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Expense
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <svg className="h-5 w-5 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
          </svg>
          Loading expenses...
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
                  <td className="font-medium text-slate-900">{expense.subject}</td>
                  <td>{expense.category.name}</td>
                  <td>
                    <div className="font-semibold text-slate-900">
                      {expense.currency.symbol}
                      {Number(expense.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    {expense.convertedAmount && (
                      <div className="text-xs text-slate-400">
                        (Submitted in {expense.currencyId})
                      </div>
                    )}
                  </td>
                  <td className="text-slate-500">
                    {new Date(expense.expenseDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`badge ${STATUS_BADGE[expense.status] ?? ""}`}>
                      {STATUS_LABEL[expense.status] ?? expense.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      {!isAdmin && (
                        <>
                          <Link
                            href={`/dashboard/expenses/${expense.id}`}
                            className="text-sm font-medium text-brand-600 hover:text-brand-700"
                          >
                            View →
                          </Link>
                          {expense.status === "DRAFT" && (
                            <Link
                              href={`/dashboard/expenses/${expense.id}/edit`}
                              className="text-sm font-medium text-slate-600 hover:text-slate-800"
                            >
                              Edit
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-16">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No expenses yet</h3>
          <p className="mt-1 text-sm text-slate-500">Create your first expense claim to get started.</p>
          <Link href="/dashboard/expenses/new" className="btn btn-primary mt-4">
            Create Expense
          </Link>
        </div>
      )}
    </div>
  );
}
