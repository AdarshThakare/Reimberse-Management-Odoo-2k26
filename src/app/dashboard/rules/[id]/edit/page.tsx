"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "~/trpc/react";

type RuleType = "SEQUENTIAL" | "PERCENTAGE" | "SPECIFIC" | "HYBRID";

export default function EditRulePage() {
  const router = useRouter();
  const params = useParams();
  const ruleId = params.id as string;
  const utils = api.useUtils();

  const [form, setForm] = useState({
    name: "",
    ruleType: "SEQUENTIAL" as RuleType,
    isManagerFirst: true,
    isDefault: false,
    requiredPercent: 100,
    specificApproverId: "",
  });

  const [steps, setSteps] = useState<{ id: string; approverId: string }[]>([]);
  const [appliedUserIds, setAppliedUserIds] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [error, setError] = useState("");

  const { data: rule, isLoading: isRuleLoading } = api.approval.getRuleById.useQuery(
    { id: ruleId },
    { enabled: !!ruleId },
  );

  const { data: managers } = api.user.listManagers.useQuery();
  const { data: users } = api.user.list.useQuery();

  useEffect(() => {
    if (rule) {
      setForm({
        name: rule.name,
        ruleType: rule.ruleType as RuleType,
        isManagerFirst: rule.isManagerFirst,
        isDefault: rule.isDefault,
        requiredPercent: rule.requiredPercent ?? 100,
        specificApproverId: rule.specificApproverId ?? "",
      });
      setSteps(
        rule.steps.map((s) => ({
          id: crypto.randomUUID(),
          approverId: s.approverId,
        })),
      );
      setAppliedUserIds(rule.appliedUsers.map((u) => u.id));
    }
  }, [rule]);

  const updateMutation = api.approval.updateRule.useMutation({
    onSuccess: () => {
      void utils.approval.listRules.invalidate();
      void utils.approval.getRuleById.invalidate({ id: ruleId });
      router.push("/dashboard/rules");
    },
    onError: (err) => setError(err.message),
  });

  const handleAddStep = () => {
    setSteps([...steps, { id: crypto.randomUUID(), approverId: "" }]);
  };

  const handleRemoveStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id));
  };

  const handleStepChange = (id: string, approverId: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, approverId } : s)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name) return setError("Rule name is required");
    if (steps.length === 0) return setError("Add at least one approver step");
    if (steps.some((s) => !s.approverId))
      return setError("All steps must have an approver selected");

    // Check duplicates
    const approverIds = steps.map((s) => s.approverId);
    if (new Set(approverIds).size !== approverIds.length) {
      return setError("Approvers cannot be duplicated in the steps");
    }

    updateMutation.mutate({
      id: ruleId,
      name: form.name,
      ruleType: form.ruleType,
      isManagerFirst: form.isManagerFirst,
      isDefault: form.isDefault,
      requiredPercent: ["PERCENTAGE", "HYBRID"].includes(form.ruleType)
        ? Number(form.requiredPercent)
        : null,
      specificApproverId: ["SPECIFIC", "HYBRID"].includes(form.ruleType)
        ? form.specificApproverId ?? null
        : null,
      steps: steps.map((s, idx) => ({
        approverId: s.approverId,
        stepOrder: idx + 1,
      })),
      appliedUserIds: appliedUserIds.length > 0 ? appliedUserIds : undefined,
    });
  };

  const filteredUsers = users?.filter(u => 
    (u.name?.toLowerCase().includes(userSearch.toLowerCase()) ?? false) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const toggleUser = (userId: string) => {
    setAppliedUserIds(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  if (isRuleLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        Loading Rule...
      </div>
    );
  }

  if (!rule) {
    return (
      <div className="text-center py-16 text-red-500 font-medium animate-fade-in">
        Error: Approval Rule could not be loaded.
      </div>
    );
  }

  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="mb-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          ← Back to rules
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Edit Approval Rule</h1>
        <p className="mt-1 text-sm text-slate-500">
          Modify the dynamic workflow logic for <strong>{rule.name}</strong>.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">1. Basic Details</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Rule Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Executive Travel Flow"
                  className="input"
                />
              </div>

              <div>
                <label className="label">Rule Type</label>
                <select
                  value={form.ruleType}
                  onChange={(e) =>
                    setForm({ ...form, ruleType: e.target.value as RuleType })
                  }
                  className="select"
                >
                  <option value="SEQUENTIAL">Sequential (Step 1 → Step 2 → Step 3)</option>
                  <option value="PERCENTAGE">Percentage (e.g. Any 2 out of 3 approvers)</option>
                  <option value="SPECIFIC">Specific Approver (Wait for everyone, OR specific person overrides)</option>
                  <option value="HYBRID">Hybrid (Percentage met OR Specific Approver overrides)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isManagerFirst}
                  onChange={(e) => setForm({ ...form, isManagerFirst: e.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Manager Gate First</div>
                  <div className="text-xs text-slate-500">Employee&apos;s direct manager must approve before this rule starts</div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Set as Default Workflow</div>
                  <div className="text-xs text-slate-500">Apply this automatically to new expenses without a rule specified</div>
                </div>
              </label>
            </div>
          </div>

          {/* Section 2: Rule Configuration (Conditional based on type) */}
          {(form.ruleType !== "SEQUENTIAL") && (
            <div className="space-y-4 animate-fade-in bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h2 className="text-md font-semibold text-slate-800">Rule Parameters</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                
                {["PERCENTAGE", "HYBRID"].includes(form.ruleType) && (
                  <div>
                    <label className="label">Required Percentage (%)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={form.requiredPercent}
                      onChange={(e) => setForm({ ...form, requiredPercent: Number(e.target.value) })}
                      className="input"
                    />
                    <div className="text-xs text-slate-500 mt-1">What percentage of approvers below must approve?</div>
                  </div>
                )}

                {["SPECIFIC", "HYBRID"].includes(form.ruleType) && (
                  <div>
                    <label className="label">Designated Override Approver</label>
                    <select
                      value={form.specificApproverId}
                      onChange={(e) => setForm({ ...form, specificApproverId: e.target.value })}
                      className="select border-purple-200 focus:ring-purple-500"
                    >
                      <option value="">Select an approver...</option>
                      {managers?.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name ?? m.email} {m.designation ? `(${m.designation})` : ""}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-slate-500 mt-1">If this person approves, the whole expense is approved instantly. Note: must also be included in the workflow steps below.</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 3: Approvers / Steps */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-lg font-semibold text-slate-800">
                {form.ruleType === "SEQUENTIAL" ? "2. Sequential Steps" : "2. Assigned Approvers"}
              </h2>
              <button type="button" onClick={handleAddStep} className="btn btn-secondary text-xs h-8">
                + Add Approver
              </button>
            </div>

            {steps.length === 0 ? (
              <div className="text-center py-6 text-sm text-slate-500 border border-dashed border-slate-300 rounded-lg">
                Click &quot;+ Add Approver&quot; to assign users to this workflow.
              </div>
            ) : (
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex gap-3 items-center animate-fade-in group">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                      {form.ruleType === "SEQUENTIAL" ? idx + 1 : "•"}
                    </div>
                    
                    <select
                      value={step.approverId}
                      onChange={(e) => handleStepChange(step.id, e.target.value)}
                      className="select flex-1"
                    >
                      <option value="">Select a manager...</option>
                      {managers?.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name ?? m.email} {m.designation ? `(${m.designation})` : ""}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => handleRemoveStep(step.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove Step"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Target Employees */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-lg font-semibold text-slate-800">3. Applied Employees</h2>
              <div className="text-xs text-slate-500">
                {appliedUserIds.length} {appliedUserIds.length === 1 ? "employee" : "employees"} selected
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees by name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="input pl-10"
                />
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div 
                className="max-h-60 overflow-y-auto rounded-xl border border-dashed border-slate-200 p-2 space-y-1"
              >
                {filteredUsers?.length === 0 ? (
                  <div className="py-6 text-center text-sm text-slate-400">No employees found.</div>
                ) : (
                  filteredUsers?.map((u) => (
                    <label 
                      key={u.id}
                      className="flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        checked={appliedUserIds.includes(u.id)}
                        onChange={() => toggleUser(u.id)}
                        className="h-4 w-4 rounded cursor-pointer accent-brand-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">
                          {u.name ?? u.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-slate-500 truncate">{u.email}</div>
                          {u.approvalRule && u.approvalRule.id !== ruleId && (
                            <div className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100">
                              Current: {u.approvalRule.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                  ))
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed px-1">
                Note: Selecting an employee who already has a specific rule will move them to this rule. 
                If no employees are selected, this rule can only be triggered if set as the default workflow or manually assigned to an expense.
              </p>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="btn btn-primary flex-1"
            >
              {updateMutation.isPending ? "Updating Rule..." : "Update Approval Rule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
