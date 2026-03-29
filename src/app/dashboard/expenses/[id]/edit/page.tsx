"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export default function EditExpensePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const utils = api.useUtils();

  const expenseId = params.id as string;

  const [form, setForm] = useState({
    subject: "",
    description: "",
    expenseDate: "",
    totalAmount: "",
    currencyCode: "",
    categoryId: "",
    remarks: "",
    receiptUrl: "",
  });
  const [error, setError] = useState("");

  const { data: expense, isLoading } = api.expense.getById.useQuery({ id: expenseId });
  const { data: categories } = api.company.listCategories.useQuery();
  const { data: countries } = api.currency.listCountries.useQuery();
  const { data: company } = api.company.get.useQuery();

  const updateMutation = api.expense.update.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.expense.getById.invalidate({ id: expenseId }),
        utils.expense.list.invalidate(),
      ]);
      router.push(`/dashboard/expenses/${expenseId}`);
    },
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    if (!expense) return;

    setForm({
      subject: expense.subject,
      description: expense.description ?? "",
      expenseDate: new Date(expense.expenseDate).toISOString().split("T")[0] ?? "",
      totalAmount: String(Number(expense.totalAmount).toFixed(2)),
      currencyCode: expense.currencyId,
      categoryId: expense.categoryId,
      remarks: expense.remarks ?? "",
      receiptUrl: expense.receiptUrl ?? "",
    });
  }, [expense]);

  const isOwner = expense?.submitterId === session?.user?.id;
  const isDraft = expense?.status === "DRAFT";

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

    updateMutation.mutate({
      id: expenseId,
      subject: form.subject,
      description: form.description.trim() ? form.description : null,
      expenseDate: new Date(form.expenseDate).toISOString(),
      totalAmount: parseFloat(form.totalAmount),
      currencyCode: form.currencyCode,
      categoryId: form.categoryId,
      remarks: form.remarks.trim() ? form.remarks : null,
      receiptUrl: form.receiptUrl || null,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-text-muted">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
          <span className="text-sm">Loading draft...</span>
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

  if (!isOwner || !isDraft) {
    return (
      <div className="mx-auto max-w-xl card text-center py-12">
        <h2 className="text-lg font-bold text-text-primary">This draft cannot be edited</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Only the submitter can edit an expense while it is in Draft status.
        </p>
        <button
          onClick={() => router.push(`/dashboard/expenses/${expenseId}`)}
          className="btn btn-secondary mt-4"
        >
          Back to Expense
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in mx-auto max-w-2xl space-y-6">
      <div>
        <button
          onClick={() => router.push(`/dashboard/expenses/${expenseId}`)}
          className="mb-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
          style={{ color: "#3872E1" }}
        >
          ← Back to expense
        </button>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Edit Draft Expense</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Update the draft details and save your changes.
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl bg-white p-7"
        style={{ border: "1px solid rgba(33, 33, 47, 0.06)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="subject" className="label">
              Subject <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="textarea"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="expenseDate" className="label">
                Expense Date <span style={{ color: "#EF4444" }}>*</span>
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

            <div>
              <label htmlFor="categoryId" className="label">
                Category <span style={{ color: "#EF4444" }}>*</span>
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
            <div>
              <label htmlFor="totalAmount" className="label">
                Total Amount <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                id="totalAmount"
                name="totalAmount"
                type="number"
                step="0.01"
                min="0.01"
                value={form.totalAmount}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="currencyCode" className="label">
                Currency <span style={{ color: "#EF4444" }}>*</span>
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

          <div>
            <label htmlFor="remarks" className="label">Remarks</label>
            <textarea
              id="remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={2}
              className="textarea"
            />
          </div>

          {form.receiptUrl && (
            <div>
              <label className="label">Attached Receipt</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ border: "1px solid rgba(33, 33, 47, 0.08)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
                >
                  <img
                    src={form.receiptUrl}
                    alt="Receipt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Receipt image attached</p>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, receiptUrl: "" }))}
                    className="text-xs font-semibold mt-1 transition-colors cursor-pointer"
                    style={{ color: "#EF4444" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl p-3 text-sm font-medium" style={{ background: "rgba(239, 68, 68, 0.06)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="btn btn-primary flex-1"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/dashboard/expenses/${expenseId}`)}
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
