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
 *   - Expense line items (add / edit / delete rows)
 *   - Auto-fill from OCR results
 *   - Receipt image stored as base64 in receiptUrl
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import ReceiptScanner from "./receipt-scanner";
import type { OcrResult } from "./ocr.service";

// ─── Types ───

interface LineItem {
  id: string; // client-side key
  description: string;
  amount: string;
}

// ─── Component ───

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
    receiptUrl: "",
  });
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
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

  // ── Line Items ──

  const addLineItem = useCallback(() => {
    setLineItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: "", amount: "" },
    ]);
  }, []);

  const updateLineItem = useCallback(
    (id: string, field: "description" | "amount", value: string) => {
      setLineItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      );
    },
    [],
  );

  const removeLineItem = useCallback((id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Auto-update total from line items
  const lineItemsTotal = lineItems.reduce((sum, item) => {
    const amount = parseFloat(item.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const syncTotalFromLines = useCallback(() => {
    if (lineItems.length > 0 && lineItemsTotal > 0) {
      setForm((prev) => ({ ...prev, totalAmount: lineItemsTotal.toFixed(2) }));
    }
  }, [lineItems, lineItemsTotal]);

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

      // Set line items from OCR
      if (result.lineItems.length > 0) {
        setLineItems(
          result.lineItems.map((item) => ({
            id: crypto.randomUUID(),
            description: item.description,
            amount: item.amount.toFixed(2),
          })),
        );
      }

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

    const validLines = lineItems
      .filter((item) => item.description.trim() && parseFloat(item.amount) > 0)
      .map((item) => ({
        description: item.description.trim(),
        amount: parseFloat(item.amount),
      }));

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
      receiptUrl: form.receiptUrl || undefined,
      lines: validLines.length > 0 ? validLines : undefined,
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

          {/* ── Line Items ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="label mb-0">Expense Line Items</label>
                <p className="text-xs text-slate-400 mt-0.5">
                  Break down the expense into individual items
                </p>
              </div>
              <button
                type="button"
                onClick={addLineItem}
                className="btn btn-ghost text-xs"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Item
              </button>
            </div>

            {lineItems.length > 0 ? (
              <div className="space-y-2">
                {lineItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 animate-fade-in"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-slate-400 bg-slate-200/60 flex-shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.amount}
                      onChange={(e) => updateLineItem(item.id, "amount", e.target.value)}
                      placeholder="0.00"
                      className="w-28 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-right focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeLineItem(item.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Line items total */}
                <div className="flex items-center justify-between px-3 pt-2 border-t border-slate-200">
                  <span className="text-xs font-medium text-slate-500">Line Items Total</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">
                      {lineItemsTotal.toFixed(2)}
                    </span>
                    {lineItemsTotal > 0 && lineItemsTotal.toFixed(2) !== form.totalAmount && (
                      <button
                        type="button"
                        onClick={syncTotalFromLines}
                        className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        Sync to total ↑
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 py-6 text-center">
                <svg className="mx-auto h-6 w-6 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-xs text-slate-400">
                  No line items yet. Add items for a detailed breakdown.
                </p>
              </div>
            )}
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
