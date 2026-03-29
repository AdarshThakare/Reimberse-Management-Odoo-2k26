"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";

export default function ApprovalRulesPage() {
  const utils = api.useUtils();
  const { data: rulesData, isLoading } = api.approval.listRules.useQuery();
  const updateRuleMutation = api.approval.updateRule.useMutation();

  const [stepOrderOverrides, setStepOrderOverrides] = useState<Record<string, string[]>>({});
  const [dragging, setDragging] = useState<{ ruleId: string; stepId: string } | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{ ruleId: string; index: number } | null>(null);
  const [savingRuleIds, setSavingRuleIds] = useState<Record<string, boolean>>({});
  const [saveError, setSaveError] = useState("");
  const saveTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    if (!rulesData) return;

    setStepOrderOverrides((prev) => {
      const next: Record<string, string[]> = {};

      for (const rule of rulesData) {
        if (rule.ruleType !== "SEQUENTIAL") continue;

        const serverOrder = rule.steps.map((s) => s.id);
        const existing = prev[rule.id];

        // Keep local re-ordered state if it still matches the same step set.
        if (
          existing?.length === serverOrder.length &&
          existing.every((id) => serverOrder.includes(id))
        ) {
          next[rule.id] = existing;
        } else {
          next[rule.id] = serverOrder;
        }
      }

      return next;
    });
  }, [rulesData]);

  useEffect(() => {
    const timers = saveTimersRef.current;
    return () => {
      Object.values(timers).forEach((timerId) => {
        clearTimeout(timerId);
      });
    };
  }, []);

  const scheduleAutoSave = (ruleId: string, orderedStepIds: string[]) => {
    if (saveTimersRef.current[ruleId]) {
      clearTimeout(saveTimersRef.current[ruleId]);
    }

    setSavingRuleIds((prev) => ({ ...prev, [ruleId]: true }));

    saveTimersRef.current[ruleId] = setTimeout(() => {
      void (async () => {
        const rule = rulesData?.find((r) => r.id === ruleId);
        if (!rule) return;

        const stepsForSave = orderedStepIds
          .map((stepId, idx) => {
            const step = rule.steps.find((s) => s.id === stepId);
            if (!step) return null;
            return {
              approverId: step.approverId,
              stepOrder: idx + 1,
            };
          })
          .filter((s): s is { approverId: string; stepOrder: number } => s !== null);

        try {
          await updateRuleMutation.mutateAsync({
            id: ruleId,
            steps: stepsForSave,
          });
          setSaveError("");
          await utils.approval.listRules.invalidate();
        } catch (err) {
          const message = err instanceof Error ? err.message : "Failed to auto-save sequence";
          setSaveError(message);
        } finally {
          setSavingRuleIds((prev) => ({ ...prev, [ruleId]: false }));
        }
      })();
    }, 1500);
  };

  const getOrderedSteps = (rule: NonNullable<typeof rulesData>[number]) => {
    if (rule.ruleType !== "SEQUENTIAL") return rule.steps;

    const order = stepOrderOverrides[rule.id];
    if (order?.length !== rule.steps.length) return rule.steps;

    const byId = new Map(rule.steps.map((s) => [s.id, s]));
    return order.map((id) => byId.get(id)).filter((s): s is (typeof rule.steps)[number] => Boolean(s));
  };

  const handleDropOnRule = (ruleId: string, fallbackOrder: string[]) => {
    if (dragging?.ruleId !== ruleId) return;
    const currentOrder =
      stepOrderOverrides[ruleId]?.length
        ? stepOrderOverrides[ruleId]
        : fallbackOrder;
    if (currentOrder.length === 0) return;

    const fromIndex = currentOrder.indexOf(dragging.stepId);
    if (fromIndex === -1) return;

    const rawTargetIndex =
      dropIndicator?.ruleId === ruleId ? dropIndicator.index : fromIndex;
    const targetIndex =
      rawTargetIndex > fromIndex ? rawTargetIndex - 1 : rawTargetIndex;

    if (targetIndex === fromIndex) return;

    const reordered = [...currentOrder];
    const [moved] = reordered.splice(fromIndex, 1);
    if (!moved) return;
    reordered.splice(targetIndex, 0, moved);

    setStepOrderOverrides((prev) => ({ ...prev, [ruleId]: reordered }));
    scheduleAutoSave(ruleId, reordered);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    ruleId: string,
    stepId: string,
    fallbackOrder: string[],
  ) => {
    setDragging({ ruleId, stepId });
    const currentOrder =
      stepOrderOverrides[ruleId]?.length
        ? stepOrderOverrides[ruleId]
        : fallbackOrder;
    const currentIndex = currentOrder.indexOf(stepId);
    setDropIndicator({
      ruleId,
      index: currentIndex === -1 ? 0 : currentIndex,
    });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", stepId);
  };

  const handleDragOverStep = (
    e: React.DragEvent<HTMLDivElement>,
    ruleId: string,
    stepIndex: number,
  ) => {
    if (dragging?.ruleId !== ruleId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = e.currentTarget.getBoundingClientRect();
    const cursorInUpperHalf = e.clientY < rect.top + rect.height / 2;
    const nextIndex = cursorInUpperHalf ? stepIndex : stepIndex + 1;

    setDropIndicator((prev) => {
      if (prev?.ruleId === ruleId && prev.index === nextIndex) return prev;
      return { ruleId, index: nextIndex };
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

      {saveError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {saveError}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-text-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      ) : rulesData && rulesData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 stagger-children">
          {rulesData.map((rule) => {
            const orderedSteps = getOrderedSteps(rule);
            const fallbackOrder = orderedSteps.map((s) => s.id);

            return (
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
                  {rule._count.appliedUsers > 0 && (
                    <span className="badge" style={{ background: "rgba(16, 185, 129, 0.08)", color: "#10B981", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                      {rule._count.appliedUsers} {rule._count.appliedUsers === 1 ? "Employee" : "Employees"}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                  Workflow Steps
                </div>

                {rule.ruleType === "SEQUENTIAL" && (
                  <div className="text-[11px] text-text-secondary">
                    Drag approvers to reorder. Changes auto-save in 1.5s.
                    {savingRuleIds[rule.id] && (
                      <span className="ml-2 font-medium" style={{ color: "#3872E1" }}>
                        Saving...
                      </span>
                    )}
                  </div>
                )}

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

                <div
                  className="space-y-2"
                  onDragOver={(e) => {
                    if (rule.ruleType !== "SEQUENTIAL") return;
                    if (dragging?.ruleId !== rule.id) return;
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                  }}
                  onDrop={(e) => {
                    if (rule.ruleType !== "SEQUENTIAL") return;
                    if (dragging?.ruleId !== rule.id) return;
                    e.preventDefault();
                    handleDropOnRule(rule.id, fallbackOrder);
                    setDragging(null);
                    setDropIndicator(null);
                  }}
                >
                  {orderedSteps.map((step, idx) => (
                    <div key={step.id}>
                      {rule.ruleType === "SEQUENTIAL" &&
                        dragging?.ruleId === rule.id &&
                        dropIndicator?.ruleId === rule.id &&
                        dropIndicator.index === idx && (
                          <div
                            className="mb-2 h-3 rounded-lg"
                            style={{
                              background: "rgba(56, 114, 225, 0.16)",
                              border: "1px dashed rgba(56, 114, 225, 0.45)",
                            }}
                          />
                        )}

                      <div
                        className={`flex items-center text-sm p-2.5 rounded-xl transition-colors duration-200 ${
                          rule.ruleType === "SEQUENTIAL" ? "cursor-pointer" : ""
                        }`}
                        draggable={rule.ruleType === "SEQUENTIAL"}
                        onDragStart={(e) => {
                          if (rule.ruleType !== "SEQUENTIAL") return;
                          handleDragStart(e, rule.id, step.id, fallbackOrder);
                        }}
                        onDragOver={(e) => {
                          if (rule.ruleType !== "SEQUENTIAL") return;
                          handleDragOverStep(e, rule.id, idx);
                        }}
                        onDrop={(e) => {
                          if (rule.ruleType !== "SEQUENTIAL") return;
                          e.preventDefault();
                          handleDropOnRule(rule.id, fallbackOrder);
                          setDragging(null);
                          setDropIndicator(null);
                        }}
                        onDragEnd={() => {
                          setDragging(null);
                          setDropIndicator(null);
                        }}
                        style={{
                          background: "rgba(33, 33, 47, 0.02)",
                          border: "1px solid rgba(33, 33, 47, 0.06)",
                          color: "#6B7194",
                          opacity:
                            dragging?.ruleId === rule.id && dragging.stepId === step.id
                              ? 0.55
                              : 1,
                        }}
                      >
                      <span
                        className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ background: "rgba(56, 114, 225, 0.08)", color: "#3872E1" }}
                      >
                        {rule.ruleType === "SEQUENTIAL" ? idx + 1 : "•"}
                      </span>

                      {rule.ruleType === "SEQUENTIAL" && (
                        <span
                          className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: "rgba(33, 33, 47, 0.04)", color: "#7A809B" }}
                          title="Drag to reorder"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h.01M14 6h.01M10 12h.01M14 12h.01M10 18h.01M14 18h.01" />
                          </svg>
                        </span>
                      )}

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
                    </div>
                  ))}

                  {rule.ruleType === "SEQUENTIAL" &&
                    dragging?.ruleId === rule.id &&
                    dropIndicator?.ruleId === rule.id &&
                    dropIndicator.index === orderedSteps.length && (
                      <div
                        className="h-3 rounded-lg"
                        style={{
                          background: "rgba(56, 114, 225, 0.16)",
                          border: "1px dashed rgba(56, 114, 225, 0.45)",
                        }}
                      />
                    )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(33, 33, 47, 0.06)" }}>
                <div className="text-sm text-text-muted">
                  {rule._count.expenses} {rule._count.expenses === 1 ? "expense" : "expenses"}
                </div>
                {rule.appliedUsers.length > 0 && (
                   <div className="flex -space-x-2 overflow-hidden mr-auto ml-4">
                    {rule.appliedUsers.slice(0, 3).map((u) => (
                      <div 
                        key={u.id}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600"
                        title={u.name ?? "User"}
                      >
                        {u.name?.charAt(0).toUpperCase() ?? "U"}
                      </div>
                    ))}
                    {rule.appliedUsers.length > 3 && (
                      <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        +{rule.appliedUsers.length - 3}
                      </div>
                    )}
                   </div>
                )}
                <Link
                  href={`/dashboard/rules/${rule.id}/edit`}
                  className="text-sm font-medium text-brand-600 hover:text-brand-700"
                  style={{ color: "#3872E1" }}

                >
                  Edit Rule
                </Link>
              </div>
            </div>
          );})}
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
