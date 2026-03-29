"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function NewExpensePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    subject: "",
    description: "",
    expenseDate: new Date().toISOString().split("T")[0]!,
    totalAmount: "",
    currencyCode: "",
    paidBy: "EMPLOYEE" as "EMPLOYEE" | "COMPANY",
    categoryId: "",
    remarks: "",
  });
  const [error, setError] = useState("");

  const { data: categories } = api.company.listCategories.useQuery();
  const { data: countries } = api.currency.listCountries.useQuery();
  const { data: company } = api.company.get.useQuery();

  // Dedupe currencies from countries list
  const currencies = countries
    ? Array.from(
        new Map(
          countries.map((c) => [
            c.currencyCode,
            { code: c.currencyCode, name: c.currencyName, symbol: c.currencySymbol },
          ]),
        ).values(),
      ).sort((a, b) => a.code.localeCompare(b.code))
    : [];

  const createMutation = api.expense.create.useMutation({
    onSuccess: (data) => router.push(`/dashboard/expenses/${data.id}`),
    onError: (err) => setError(err.message),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.subject || !form.totalAmount || !form.currencyCode || !form.categoryId) {
      setError("Please fill in all required fields.");
      return;
    }

    const selectedCurrency = currencies.find((c) => c.code === form.currencyCode);

    createMutation.mutate({
      subject: form.subject,
      description: form.description || undefined,
      expenseDate: new Date(form.expenseDate).toISOString(),
      totalAmount: parseFloat(form.totalAmount),
      currencyCode: form.currencyCode,
      currencyName: selectedCurrency?.name,
      currencySymbol: selectedCurrency?.symbol,
      paidBy: form.paidBy,
      categoryId: form.categoryId,
      remarks: form.remarks || undefined,
    });
  };

  return (
    <div className="animate-fade-in mx-auto max-w-2xl space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="mb-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          ← Back to expenses
        </button>
        <h1 className="text-2xl font-bold text-slate-900">New Expense</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below. You can save as draft and submit later.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="label">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="Business lunch with client"
              className="input"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief description of the expense..."
              rows={3}
              className="textarea"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Expense Date */}
            <div>
              <label htmlFor="expenseDate" className="label">
                Expense Date <span className="text-red-500">*</span>
              </label>
              <input
                id="expenseDate"
                name="expenseDate"
                type="date"
                value={form.expenseDate}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="categoryId" className="label">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="select"
              >
                <option value="">Select category...</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Total Amount */}
            <div>
              <label htmlFor="totalAmount" className="label">
                Total Amount <span className="text-red-500">*</span>
              </label>
              <input
                id="totalAmount"
                name="totalAmount"
                type="number"
                step="0.01"
                min="0.01"
                value={form.totalAmount}
                onChange={handleChange}
                placeholder="0.00"
                className="input"
              />
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currencyCode" className="label">
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                id="currencyCode"
                name="currencyCode"
                value={form.currencyCode}
                onChange={handleChange}
                className="select"
              >
                <option value="">Select currency...</option>
                {company && (
                  <option value={company.baseCurrency.id}>
                    {company.baseCurrency.id} ({company.baseCurrency.symbol}) — Company Currency
                  </option>
                )}
                {currencies
                  .filter((c) => c.code !== company?.baseCurrency?.id)
                  .map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol}) — {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Paid By */}
          <div>
            <label htmlFor="paidBy" className="label">Paid By</label>
            <select
              id="paidBy"
              name="paidBy"
              value={form.paidBy}
              onChange={handleChange}
              className="select"
            >
              <option value="EMPLOYEE">Employee (reimbursable)</option>
              <option value="COMPANY">Company (direct payment)</option>
            </select>
          </div>

          {/* Remarks */}
          <div>
            <label htmlFor="remarks" className="label">Remarks</label>
            <textarea
              id="remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              placeholder="Any additional notes..."
              rows={2}
              className="textarea"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="btn btn-primary flex-1"
            >
              {createMutation.isPending ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
