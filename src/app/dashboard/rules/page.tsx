"use client";

import { api } from "~/trpc/react";
import Link from "next/link";

export default function ApprovalRulesPage() {
  const { data: rules, isLoading } = api.approval.listRules.useQuery();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Approval Rules</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Define dynamic approval workflows for expenses
          </p>
        </div>
        <Link href="/dashboard/rules/new" className="btn btn-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Rule
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-text-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      ) : rules && rules.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 stagger-children">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:shadow-lg"
              style={{
                border: "1px solid rgba(33, 33, 47, 0.06)",
                boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)",
              }}
            >
              {rule.isDefault && (
                <div
                  className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl px-3 py-1.5 text-[10px] font-bold text-white tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, #3872E1, #00DDB0)",
                    boxShadow: "0 2px 8px rgba(56, 114, 225, 0.3)",
                  }}
                >
                  DEFAULT
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-bold text-text-primary pr-16">{rule.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="badge badge-draft">{rule.ruleType}</span>
                  {rule.isManagerFirst && (
                    <span className="badge badge-under-review">Manager Gate</span>
                  )}
                  {rule.ruleType !== "SEQUENTIAL" && rule.requiredPercent && (
                    <span className="badge badge-submitted">{rule.requiredPercent}% Required</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  Workflow Steps
                </div>

                {rule.isManagerFirst && (
                  <div
                    className="flex items-center text-sm p-2.5 rounded-xl"
                    style={{
                      background: "rgba(245, 158, 11, 0.06)",
                      border: "1px solid rgba(245, 158, 11, 0.12)",
                      color: "#6B7194",
                    }}
                  >
                    <span
                      className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                      style={{ background: "rgba(245, 158, 11, 0.15)", color: "#D97706" }}
                    >
                      0
                    </span>
                    Employee&apos;s Direct Manager
                  </div>
                )}

                <div className="space-y-2">
                  {rule.steps.map((step) => (
                    <div
                      key={step.id}
                      className="flex items-center text-sm p-2.5 rounded-xl transition-colors duration-200"
                      style={{
                        background: "rgba(33, 33, 47, 0.02)",
                        border: "1px solid rgba(33, 33, 47, 0.06)",
                        color: "#6B7194",
                      }}
                    >
                      <span
                        className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ background: "rgba(56, 114, 225, 0.08)", color: "#3872E1" }}
                      >
                        {rule.ruleType === "SEQUENTIAL" ? step.stepOrder : "•"}
                      </span>
                      <div className="flex-1 truncate">
                        <span className="font-medium text-text-primary">{step.approver.name ?? step.approver.designation ?? "Unknown Approver"}</span>
                        {step.approver.designation && <span className="text-text-muted text-xs ml-1">({step.approver.designation})</span>}
                      </div>

                      {rule.specificApproverId === step.approverId && (
                        <span
                          className="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0"
                          style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8B5CF6", border: "1px solid rgba(139, 92, 246, 0.2)" }}
                          title="Designated Approver"
                        >
                          Auto-Approve
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(33, 33, 47, 0.06)" }}>
                <div className="text-sm text-text-muted">
                  {rule._count.expenses} expenses
                </div>
                <button
                  onClick={() => alert('Editing rules coming soon. Use the DB directly for now, or create a new one.')}
                  className="text-sm font-semibold transition-colors duration-200"
                  style={{ color: "#3872E1" }}
                >
                  Edit Rule
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-20">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "rgba(56, 114, 225, 0.08)" }}
          >
            <svg className="h-8 w-8" style={{ color: "#3872E1" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-text-primary">No approval rules built yet</h3>
          <p className="mt-1 text-sm text-text-secondary">Create a rule to automate how expenses get approved.</p>
          <Link href="/dashboard/rules/new" className="btn btn-primary mt-5 inline-flex">
            Create First Rule
          </Link>
        </div>
      )}
    </div>
  );
}
