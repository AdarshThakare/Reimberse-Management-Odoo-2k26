"use client";

/**
 * New Expense Page
 *
 * Employees create expense claims here. Supports two workflows:
 *   1. Smart Scan → OCR auto-fills fields from a receipt image
 *   2. Manual Entry → fill in all fields by hand
 *
 * Features:
 *   - Receipt scanning with OCR (Tesseract.js)
 *   - Auto-fill from OCR results
 *   - Receipt image stored as base64 in receiptUrl
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import ReceiptScanner from "./receipt-scanner";
import type { OcrResult } from "./ocr.service";

// ─── Component ───

export default function NewExpensePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    subject: "",
    description: "",
    expenseDate: new Date().toISOString().split("T")[0]!,
    totalAmount: "",
    currencyCode: "",
    categoryId: "",
    remarks: "",
    receiptUrl: "",
  });
  const [error, setError] = useState("");
  const [scannedFields, setScannedFields] = useState<Set<string>>(new Set());
  const [showScanner, setShowScanner] = useState(true);

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

  // ── Form Handlers ──

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name;
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear scanned indicator when user manually edits
    setScannedFields((prev) => {
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  };

  // ── OCR Result Handler ──

  const handleOcrResult = useCallback(
    (result: OcrResult, base64Image: string) => {
      const newScanned = new Set<string>();
      const updates: Partial<typeof form> = {
        receiptUrl: base64Image,
      };

      // Merchant name → Subject
      if (result.merchantName) {
        updates.subject = result.merchantName;
        newScanned.add("subject");
      }

      // Total amount
      if (result.totalAmount) {
        updates.totalAmount = result.totalAmount.toFixed(2);
        newScanned.add("totalAmount");
      }

      // Date
      if (result.date) {
        updates.expenseDate = result.date;
        newScanned.add("expenseDate");
      }

      // Currency
      if (result.currency) {
        updates.currencyCode = result.currency;
        newScanned.add("currencyCode");
      } else if (company?.baseCurrency?.id) {
        updates.currencyCode = company.baseCurrency.id;
        newScanned.add("currencyCode");
      }

      // Category (match by name)
      if (result.suggestedCategory && categories) {
        const matchedCat = categories.find(
          (cat) => cat.name.toLowerCase() === result.suggestedCategory!.toLowerCase(),
        );
        if (matchedCat) {
          updates.categoryId = matchedCat.id;
          newScanned.add("categoryId");
        }
      }

      setForm((prev) => ({ ...prev, ...updates }));
      setScannedFields(newScanned);

      setShowScanner(false);
    },
    [categories, company],
  );

  // ── Submit ──

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
      categoryId: form.categoryId,
      remarks: form.remarks || undefined,
      receiptUrl: form.receiptUrl || undefined,
    });
  };

  // ─── Render ───

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
          Scan a receipt or fill in the details manually. Save as draft and submit later.
        </p>
      </div>

      {/* ── Receipt Scanner ── */}
      {showScanner ? (
        <ReceiptScanner onResult={handleOcrResult} />
      ) : (
        <div className="card flex items-center justify-between py-3 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
              <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900">Receipt scanned successfully</div>
              <div className="text-xs text-slate-500">Fields have been auto-filled from the receipt</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowScanner(true)}
            className="btn btn-ghost text-xs"
          >
            Scan Another
          </button>
        </div>
      )}

      {/* ── Expense Form ── */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="label">
              Subject <span className="text-red-500">*</span>
              {scannedFields.has("subject") && <ScannedBadge />}
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="Business lunch with client"
              className="input"
              autoFocus={!showScanner}
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
                {scannedFields.has("expenseDate") && <ScannedBadge />}
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
                {scannedFields.has("categoryId") && <ScannedBadge />}
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
                {scannedFields.has("totalAmount") && <ScannedBadge />}
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
                {scannedFields.has("currencyCode") && <ScannedBadge />}
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

          {/* Receipt preview thumbnail */}
          {form.receiptUrl && (
            <div>
              <label className="label">Attached Receipt</label>
              <div className="flex items-center gap-3">
                <div className="w-16 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                  <img
                    src={form.receiptUrl}
                    alt="Receipt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Receipt image attached</p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, receiptUrl: "" }));
                    }}
                    className="text-xs text-red-500 hover:text-red-600 mt-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

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

// ─── Sub-components ───

function ScannedBadge() {
  return (
    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-600">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
      OCR
    </span>
  );
}
