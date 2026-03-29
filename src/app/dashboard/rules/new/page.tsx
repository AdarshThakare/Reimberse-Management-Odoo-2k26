"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

type RuleType = "SEQUENTIAL" | "PERCENTAGE" | "SPECIFIC" | "HYBRID";

export default function NewRulePage() {
  const router = useRouter();
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
  const [draggedStepId, setDraggedStepId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const { data: managers } = api.user.listManagers.useQuery();

  const createMutation = api.approval.createRule.useMutation({
    onSuccess: () => {
      void utils.approval.listRules.invalidate();
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

  const moveStep = (fromId: string, toId: string) => {
    if (fromId === toId) return;

    setSteps((prev) => {
      const fromIndex = prev.findIndex((s) => s.id === fromId);
      const toIndex = prev.findIndex((s) => s.id === toId);
      if (fromIndex === -1 || toIndex === -1) return prev;

      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      if (!moved) return prev;
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name) return setError("Rule name is required");
    if (steps.length === 0) return setError("Add at least one approver step");
    if (steps.some((s) => !s.approverId)) return setError("All steps must have an approver selected");

    const approverIds = steps.map(s => s.approverId);
    if (new Set(approverIds).size !== approverIds.length) {
      return setError("Approvers cannot be duplicated in the steps");
    }

    createMutation.mutate({
      name: form.name,
      ruleType: form.ruleType,
      isManagerFirst: form.isManagerFirst,
      isDefault: form.isDefault,
      requiredPercent: ["PERCENTAGE", "HYBRID"].includes(form.ruleType) ? Number(form.requiredPercent) : undefined,
      specificApproverId: ["SPECIFIC", "HYBRID"].includes(form.ruleType) ? form.specificApproverId || undefined : undefined,
      steps: steps.map((s, idx) => ({
        approverId: s.approverId,
        stepOrder: idx + 1,
      })),
    });
  };

  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="mb-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
          style={{ color: "#3872E1" }}
        >
          ← Back to rules
        </button>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Create Approval Rule</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Design the workflow expenses will follow to get approved.
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl bg-white p-7"
        style={{ border: "1px solid rgba(33, 33, 47, 0.06)", boxShadow: "0 1px 2px rgba(33, 33, 47, 0.06)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #3872E1, #00DDB0)" }} />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-text-primary pb-3" style={{ borderBottom: "1px solid rgba(33, 33, 47, 0.06)" }}>
              1. Basic Details
            </h2>

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
                  onChange={(e) => setForm({ ...form, ruleType: e.target.value as RuleType })}
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
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.isManagerFirst}
                  onChange={(e) => setForm({ ...form, isManagerFirst: e.target.checked })}
                  className="h-5 w-5 rounded-lg cursor-pointer accent-[#3872E1]"
                />
                <div>
                  <div className="text-sm font-bold text-text-primary">Manager Gate First</div>
                  <div className="text-xs text-text-secondary">Employee&apos;s direct manager must approve before this rule starts</div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="h-5 w-5 rounded-lg cursor-pointer accent-[#3872E1]"
                />
                <div>
                  <div className="text-sm font-bold text-text-primary">Set as Default Workflow</div>
                  <div className="text-xs text-text-secondary">Apply this automatically to new expenses without a rule specified</div>
                </div>
              </label>
            </div>
          </div>

          {/* Section 2: Rule Configuration */}
          {(form.ruleType !== "SEQUENTIAL") && (
            <div
              className="space-y-4 animate-fade-in p-5 rounded-xl"
              style={{ background: "rgba(33, 33, 47, 0.02)", border: "1px solid rgba(33, 33, 47, 0.06)" }}
            >
              <h2 className="text-base font-bold text-text-primary">Rule Parameters</h2>
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
                    <div className="text-xs text-text-muted mt-1.5">What percentage of approvers below must approve?</div>
                  </div>
                )}
                {["SPECIFIC", "HYBRID"].includes(form.ruleType) && (
                  <div>
                    <label className="label">Designated Override Approver</label>
                    <select
                      value={form.specificApproverId}
                      onChange={(e) => setForm({ ...form, specificApproverId: e.target.value })}
                      className="select"
                    >
                      <option value="">Select an approver...</option>
                      {managers?.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name ?? m.email} {m.designation ? `(${m.designation})` : ""}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-text-muted mt-1.5">If this person approves, the whole expense is approved instantly. Note: must also be included in the workflow steps below.</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 3: Approvers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: "1px solid rgba(33, 33, 47, 0.06)" }}>
              <h2 className="text-lg font-bold text-text-primary">
                {form.ruleType === "SEQUENTIAL" ? "2. Sequential Steps" : "2. Assigned Approvers"}
              </h2>
              <button type="button" onClick={handleAddStep} className="btn btn-secondary text-xs h-9">
                + Add Approver
              </button>
            </div>

            {steps.length === 0 ? (
              <div
                className="text-center py-8 text-sm text-text-muted rounded-xl"
                style={{ border: "2px dashed rgba(33, 33, 47, 0.1)" }}
              >
                Click &quot;+ Add Approver&quot; to assign users to this workflow.
              </div>
            ) : (
              <div className="space-y-3 stagger-children">
                {form.ruleType === "SEQUENTIAL" && (
                  <p className="text-xs text-text-secondary">
                    Drag and drop approvers to set the exact sequential order.
                  </p>
                )}
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex gap-3 items-center group rounded-xl"
                    draggable={form.ruleType === "SEQUENTIAL"}
                    onDragStart={() => {
                      if (form.ruleType !== "SEQUENTIAL") return;
                      setDraggedStepId(step.id);
                    }}
                    onDragOver={(e) => {
                      if (form.ruleType !== "SEQUENTIAL") return;
                      e.preventDefault();
                    }}
                    onDrop={() => {
                      if (form.ruleType !== "SEQUENTIAL" || !draggedStepId) return;
                      moveStep(draggedStepId, step.id);
                      setDraggedStepId(null);
                    }}
                    onDragEnd={() => setDraggedStepId(null)}
                    style={
                      draggedStepId === step.id
                        ? { opacity: 0.55 }
                        : undefined
                    }
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                      style={{ background: "rgba(56, 114, 225, 0.08)", color: "#3872E1" }}
                    >
                      {form.ruleType === "SEQUENTIAL" ? idx + 1 : "•"}
                    </div>

                    {form.ruleType === "SEQUENTIAL" && (
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: "rgba(33, 33, 47, 0.04)", color: "#7A809B" }}
                        title="Drag to reorder"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h.01M14 6h.01M10 12h.01M14 12h.01M10 18h.01M14 18h.01" />
                        </svg>
                      </div>
                    )}

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
                      className="p-2 transition-all duration-200 rounded-lg cursor-pointer"
                      style={{ color: "#9CA0B8" }}
                      title="Remove Step"
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.background = "rgba(239, 68, 68, 0.06)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA0B8"; e.currentTarget.style.background = "transparent"; }}
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

          {error && (
            <div className="rounded-xl p-3 text-sm font-medium" style={{ background: "rgba(239, 68, 68, 0.06)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4" style={{ borderTop: "1px solid rgba(33, 33, 47, 0.06)" }}>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="btn btn-primary flex-1"
            >
              {createMutation.isPending ? "Creating Rule..." : "Create Approval Rule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
