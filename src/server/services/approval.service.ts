/**
 * Approval Engine Service
 *
 * The core business logic for evaluating approval workflows.
 * Handles all 4 rule types:
 *   - SEQUENTIAL: Steps processed in order, all must approve
 *   - PERCENTAGE: X% of approvers must approve (simultaneous)
 *   - SPECIFIC: Designated approver auto-approves
 *   - HYBRID: PERCENTAGE OR SPECIFIC (whichever fires first)
 *
 * Also handles the "manager gate" — when isManagerFirst is true,
 * the employee's direct manager must approve before the rule kicks in.
 */

import type { PrismaClient, ApprovalRuleType } from "../../../generated/prisma";

// ─── Types ───

interface ApprovalResult {
  /** New status for the expense */
  newStatus: "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  /** New step order (for sequential flows) */
  newStepOrder: number | null;
  /** Human-readable message describing what happened */
  message: string;
}

// ─── Public API ───

/**
 * Called when an employee submits an expense.
 * Initializes the approval workflow based on the assigned rule.
 *
 * If isManagerFirst is true and the submitter has a manager,
 * the manager is the first gate (not part of the rule steps).
 */
export async function initializeApproval(
  db: PrismaClient,
  expenseId: string,
): Promise<void> {
  const expense = await db.expense.findUnique({
    where: { id: expenseId },
    include: {
      submitter: true,
      approvalRule: {
        include: { steps: { orderBy: { stepOrder: "asc" } } },
      },
    },
  });

  if (!expense) throw new Error("Expense not found");

  const rule = expense.approvalRule;

  if (!rule) {
    // No approval rule assigned → auto-approve
    await db.expense.update({
      where: { id: expenseId },
      data: { status: "APPROVED" },
    });
    return;
  }

  // If isManagerFirst and user has a manager, the manager gate
  // is handled by setting currentStepOrder to 0 (a sentinel value).
  // Step 0 = manager gate, Step 1+ = rule steps.
  if (rule.isManagerFirst && expense.submitter.managerId) {
    await db.expense.update({
      where: { id: expenseId },
      data: { status: "UNDER_REVIEW", currentStepOrder: 0 },
    });
  } else if (rule.ruleType === "SEQUENTIAL") {
    // Start at step 1
    await db.expense.update({
      where: { id: expenseId },
      data: { status: "UNDER_REVIEW", currentStepOrder: 1 },
    });
  } else {
    // PERCENTAGE, SPECIFIC, HYBRID — all approvers get it simultaneously
    await db.expense.update({
      where: { id: expenseId },
      data: { status: "UNDER_REVIEW", currentStepOrder: null },
    });
  }
}

/**
 * Called when an approver takes action (approve or reject).
 * Evaluates the rule to determine if the expense should advance,
 * be approved, or be rejected.
 */
export async function processApprovalAction(
  db: PrismaClient,
  expenseId: string,
  approverId: string,
  action: "APPROVED" | "REJECTED",
  comment: string | null,
  stepOrder: number,
): Promise<ApprovalResult> {
  // Record the action (immutable audit trail)
  await db.approvalAction.create({
    data: {
      expenseId,
      approverId,
      action,
      comment,
      stepOrder,
    },
  });

  const expense = await db.expense.findUnique({
    where: { id: expenseId },
    include: {
      submitter: true,
      approvalRule: {
        include: {
          steps: { orderBy: { stepOrder: "asc" } },
        },
      },
      approvalActions: true,
    },
  });

  if (!expense) throw new Error("Expense not found");

  const rule = expense.approvalRule;

  // ── Manager Gate (Step 0) ──
  if (expense.currentStepOrder === 0) {
    return handleManagerGate(db, expense, action);
  }

  // ── No Rule → shouldn't happen, but handle gracefully ──
  if (!rule) {
    const status = action === "APPROVED" ? "APPROVED" : "REJECTED";
    await db.expense.update({ where: { id: expenseId }, data: { status } });
    return { newStatus: status, newStepOrder: null, message: `Expense ${status.toLowerCase()}.` };
  }

  // ── Evaluate by rule type ──
  switch (rule.ruleType) {
    case "SEQUENTIAL":
      return evaluateSequential(db, expense, rule, action);
    case "PERCENTAGE":
      return evaluatePercentage(db, expense, rule);
    case "SPECIFIC":
      return evaluateSpecific(db, expense, rule, approverId);
    case "HYBRID":
      return evaluateHybrid(db, expense, rule, approverId);
    default:
      throw new Error(`Unknown rule type: ${rule.ruleType as string}`);
  }
}

/**
 * Determines which approvers should currently see the expense
 * in their approval queue.
 */
export async function getPendingApprovers(
  db: PrismaClient,
  expenseId: string,
): Promise<string[]> {
  const expense = await db.expense.findUnique({
    where: { id: expenseId },
    include: {
      submitter: true,
      approvalRule: {
        include: { steps: { orderBy: { stepOrder: "asc" } } },
      },
      approvalActions: true,
    },
  });

  if (!expense || expense.status !== "UNDER_REVIEW") return [];

  // Manager gate
  if (expense.currentStepOrder === 0 && expense.submitter.managerId) {
    return [expense.submitter.managerId];
  }

  const rule = expense.approvalRule;
  if (!rule) return [];

  if (rule.ruleType === "SEQUENTIAL") {
    const currentStep = rule.steps.find(
      (s) => s.stepOrder === expense.currentStepOrder,
    );
    return currentStep ? [currentStep.approverId] : [];
  }

  // PERCENTAGE, SPECIFIC, HYBRID — all approvers who haven't acted yet
  const actedIds = new Set(expense.approvalActions.map((a) => a.approverId));
  return rule.steps
    .filter((s) => !actedIds.has(s.approverId))
    .map((s) => s.approverId);
}

// ─── Private Evaluation Functions ───

async function handleManagerGate(
  db: PrismaClient,
  expense: ExpenseWithRelations,
  action: "APPROVED" | "REJECTED",
): Promise<ApprovalResult> {
  if (action === "REJECTED") {
    await db.expense.update({
      where: { id: expense.id },
      data: { status: "REJECTED" },
    });
    return {
      newStatus: "REJECTED",
      newStepOrder: null,
      message: "Manager rejected the expense. Workflow ended.",
    };
  }

  // Manager approved → advance to rule evaluation
  const rule = expense.approvalRule;
  if (!rule || rule.steps.length === 0) {
    // No rule steps → approved after manager gate
    await db.expense.update({
      where: { id: expense.id },
      data: { status: "APPROVED", currentStepOrder: null },
    });
    return {
      newStatus: "APPROVED",
      newStepOrder: null,
      message: "Manager approved. No further steps required.",
    };
  }

  if (rule.ruleType === "SEQUENTIAL") {
    await db.expense.update({
      where: { id: expense.id },
      data: { currentStepOrder: 1 },
    });
    return {
      newStatus: "UNDER_REVIEW",
      newStepOrder: 1,
      message: "Manager approved. Moving to approval rule Step 1.",
    };
  }

  // PERCENTAGE, SPECIFIC, HYBRID — advance past manager gate
  await db.expense.update({
    where: { id: expense.id },
    data: { currentStepOrder: null },
  });
  return {
    newStatus: "UNDER_REVIEW",
    newStepOrder: null,
    message: "Manager approved. Expense sent to all rule approvers.",
  };
}

async function evaluateSequential(
  db: PrismaClient,
  expense: ExpenseWithRelations,
  rule: RuleWithSteps,
  action: "APPROVED" | "REJECTED",
): Promise<ApprovalResult> {
  if (action === "REJECTED") {
    await db.expense.update({
      where: { id: expense.id },
      data: { status: "REJECTED" },
    });
    return {
      newStatus: "REJECTED",
      newStepOrder: null,
      message: "Approver rejected. Expense rejected.",
    };
  }

  const currentOrder = expense.currentStepOrder ?? 1;
  const maxOrder = Math.max(...rule.steps.map((s) => s.stepOrder));

  if (currentOrder >= maxOrder) {
    // Last step approved
    await db.expense.update({
      where: { id: expense.id },
      data: { status: "APPROVED", currentStepOrder: null },
    });
    return {
      newStatus: "APPROVED",
      newStepOrder: null,
      message: "All sequential approvers approved. Expense approved.",
    };
  }

  // Advance to next step
  const nextOrder = currentOrder + 1;
  await db.expense.update({
    where: { id: expense.id },
    data: { currentStepOrder: nextOrder },
  });
  return {
    newStatus: "UNDER_REVIEW",
    newStepOrder: nextOrder,
    message: `Step ${currentOrder} approved. Moving to Step ${nextOrder}.`,
  };
}

async function evaluatePercentage(
  db: PrismaClient,
  expense: ExpenseWithRelations,
  rule: RuleWithSteps,
): Promise<ApprovalResult> {
  const totalApprovers = rule.steps.length;
  const requiredPercent = rule.requiredPercent ?? 100;
  const requiredCount = Math.ceil(totalApprovers * (requiredPercent / 100));

  const approvedCount = expense.approvalActions.filter(
    (a) => a.action === "APPROVED",
  ).length;
  const rejectedCount = expense.approvalActions.filter(
    (a) => a.action === "REJECTED",
  ).length;

  if (approvedCount >= requiredCount) {
    await db.expense.update({
      where: { id: expense.id },
      data: { status: "APPROVED" },
    });
    return {
      newStatus: "APPROVED",
      newStepOrder: null,
      message: `${approvedCount}/${totalApprovers} approved (${requiredPercent}% threshold met). Expense approved.`,
    };
  }

  // Check if it's still possible to reach the threshold
  const remaining = totalApprovers - approvedCount - rejectedCount;
  if (approvedCount + remaining < requiredCount) {
    await db.expense.update({
      where: { id: expense.id },
      data: { status: "REJECTED" },
    });
    return {
      newStatus: "REJECTED",
      newStepOrder: null,
      message: `Cannot reach ${requiredPercent}% threshold. Expense rejected.`,
    };
  }

  return {
    newStatus: "UNDER_REVIEW",
    newStepOrder: null,
    message: `${approvedCount}/${requiredCount} required approvals. Waiting for more.`,
  };
}

async function evaluateSpecific(
  db: PrismaClient,
  expense: ExpenseWithRelations,
  rule: RuleWithSteps,
  approverId: string,
): Promise<ApprovalResult> {
  if (rule.specificApproverId && approverId === rule.specificApproverId) {
    const specificAction = expense.approvalActions.find(
      (a) => a.approverId === rule.specificApproverId,
    );
    if (specificAction?.action === "APPROVED") {
      await db.expense.update({
        where: { id: expense.id },
        data: { status: "APPROVED" },
      });
      return {
        newStatus: "APPROVED",
        newStepOrder: null,
        message: "Designated approver approved. Expense auto-approved.",
      };
    }
  }

  // Check if all approvers have acted and specific haven't approved
  const actedCount = expense.approvalActions.length;
  if (actedCount >= rule.steps.length) {
    await db.expense.update({
      where: { id: expense.id },
      data: { status: "REJECTED" },
    });
    return {
      newStatus: "REJECTED",
      newStepOrder: null,
      message: "Designated approver did not approve. Expense rejected.",
    };
  }

  return {
    newStatus: "UNDER_REVIEW",
    newStepOrder: null,
    message: "Waiting for designated approver's decision.",
  };
}

async function evaluateHybrid(
  db: PrismaClient,
  expense: ExpenseWithRelations,
  rule: RuleWithSteps,
  approverId: string,
): Promise<ApprovalResult> {
  // Check SPECIFIC condition first
  if (rule.specificApproverId && approverId === rule.specificApproverId) {
    const specificAction = expense.approvalActions.find(
      (a) => a.approverId === rule.specificApproverId,
    );
    if (specificAction?.action === "APPROVED") {
      await db.expense.update({
        where: { id: expense.id },
        data: { status: "APPROVED" },
      });
      return {
        newStatus: "APPROVED",
        newStepOrder: null,
        message: "Designated approver approved (hybrid). Expense auto-approved.",
      };
    }
  }

  // Check PERCENTAGE condition
  const percentResult = await evaluatePercentage(db, expense, rule);
  if (percentResult.newStatus !== "UNDER_REVIEW") {
    return percentResult;
  }

  return {
    newStatus: "UNDER_REVIEW",
    newStepOrder: null,
    message: "Neither hybrid condition met yet. Waiting.",
  };
}

// ─── Internal Types ───

type ExpenseWithRelations = NonNullable<
  Awaited<
    ReturnType<
      PrismaClient["expense"]["findUnique"]
    >
  >
> & {
  submitter: { managerId: string | null };
  approvalRule: RuleWithSteps | null;
  approvalActions: Array<{
    id: string;
    approverId: string;
    action: string;
    stepOrder: number;
  }>;
};

type RuleWithSteps = {
  id: string;
  ruleType: ApprovalRuleType;
  requiredPercent: number | null;
  specificApproverId: string | null;
  isManagerFirst: boolean;
  steps: Array<{
    id: string;
    approverId: string;
    stepOrder: number;
  }>;
};
