"use client";

import { api } from "~/trpc/react";
import Link from "next/link";

export default function ApprovalRulesPage() {
  const { data: rules, isLoading } = api.approval.listRules.useQuery();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Approval Rules</h1>
          <p className="mt-1 text-sm text-slate-500">
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
        <div className="flex items-center justify-center py-16 text-slate-400">Loading...</div>
      ) : rules && rules.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rules.map((rule) => (
            <div key={rule.id} className="card relative transition-all hover:shadow-md">
              {rule.isDefault && (
                <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-xl bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  DEFAULT
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 pr-16">{rule.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="badge bg-slate-100 text-slate-700">
                    {rule.ruleType}
                  </span>
                  {rule.isManagerFirst && (
                    <span className="badge bg-amber-100 text-amber-700">
                      Manager Gate
                    </span>
                  )}
                  {rule.ruleType !== "SEQUENTIAL" && rule.requiredPercent && (
                    <span className="badge bg-blue-100 text-blue-700">
                      {rule.requiredPercent}% Required
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Workflow Steps
                </div>
                
                {rule.isManagerFirst && (
                  <div className="flex items-center text-sm text-slate-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                    <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">
                      0
                    </span>
                    Employee&apos;s Direct Manager
                  </div>
                )}

                <div className="space-y-2">
                  {rule.steps.map((step) => (
                    <div key={step.id} className="flex items-center text-sm text-slate-700 p-2 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                        {rule.ruleType === "SEQUENTIAL" ? step.stepOrder : "•"}
                      </span>
                      <div className="flex-1 truncate">
                        {step.approver.name ?? step.approver.designation ?? "Unknown Approver"}
                        {step.approver.designation && <span className="text-slate-400 text-xs ml-1">({step.approver.designation})</span>}
                      </div>
                      
                      {/* Specific Approver Badge for Specifc/Hybrid rules */}
                      {rule.specificApproverId === step.approverId && (
                        <span className="ml-2 badge bg-purple-100 text-purple-700 shrink-0" title="Designated Approver">Auto-Approve</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="text-sm text-slate-500">
                  {rule._count.expenses} expenses
                </div>
                <button 
                  onClick={() => alert('Editing rules coming soon. Use the DB directly for now, or create a new one.')} 
                  className="text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Edit Rule
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No approval rules built yet</h3>
          <p className="mt-1 text-sm text-slate-500">Create a rule to automate how expenses get approved.</p>
          <Link href="/dashboard/rules/new" className="btn btn-primary mt-4">
            Create First Rule
          </Link>
        </div>
      )}
    </div>
  );
}
