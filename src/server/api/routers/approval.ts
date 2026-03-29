/**
 * Approval Router
 *
 * Admin: Create/manage approval rules and steps.
 * Manager: Approve/reject expenses.
 * Admin: Override any expense.
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  adminProcedure,
  managerProcedure,
} from "~/server/api/trpc";
import { processApprovalAction } from "~/server/services/approval.service";

export const approvalRouter = createTRPCRouter({
  // ═══════════════════════════════════════
  // APPROVAL RULES (Admin Only)
  // ═══════════════════════════════════════

  /**
   * Create an approval rule with ordered steps.
   */
  createRule: adminProcedure
    .input(
      z.object({
        name: z.string().min(1, "Rule name is required").max(100),
        ruleType: z.enum(["SEQUENTIAL", "PERCENTAGE", "SPECIFIC", "HYBRID"]),
        requiredPercent: z.number().min(1).max(100).optional(),
        specificApproverId: z.string().optional(),
        isManagerFirst: z.boolean().default(true),
        isDefault: z.boolean().default(false),
        steps: z
          .array(
            z.object({
              approverId: z.string(),
              stepOrder: z.number().int().min(1),
            }),
          )
          .min(1, "At least one approval step is required"),
        appliedUserIds: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Validate rule type requirements
      if (
        (input.ruleType === "PERCENTAGE" || input.ruleType === "HYBRID") &&
        !input.requiredPercent
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Percentage rules require a requiredPercent value.",
        });
      }
      if (
        (input.ruleType === "SPECIFIC" || input.ruleType === "HYBRID") &&
        !input.specificApproverId
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Specific/Hybrid rules require a specificApproverId.",
        });
      }

      // Validate all approvers belong to the same company
      const approverIds = input.steps.map((s) => s.approverId);
      if (input.specificApproverId) approverIds.push(input.specificApproverId);

      const approvers = await ctx.db.user.findMany({
        where: {
          id: { in: approverIds },
          companyId: ctx.session.user.companyId!,
          role: { in: ["MANAGER", "ADMIN"] },
        },
      });

      const foundIds = new Set(approvers.map((a) => a.id));
      const missingIds = approverIds.filter((id) => !foundIds.has(id));
      if (missingIds.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Some approvers are invalid or not managers: ${missingIds.join(", ")}`,
        });
      }

      // If setting as default, unset existing default
      if (input.isDefault) {
        await ctx.db.approvalRule.updateMany({
          where: { companyId: ctx.session.user.companyId!, isDefault: true },
          data: { isDefault: false },
        });
      }

      return ctx.db.approvalRule.create({
        data: {
          name: input.name,
          companyId: ctx.session.user.companyId!,
          ruleType: input.ruleType,
          requiredPercent: input.requiredPercent,
          specificApproverId: input.specificApproverId,
          isManagerFirst: input.isManagerFirst,
          isDefault: input.isDefault,
          steps: {
            create: input.steps.map((step) => ({
              approverId: step.approverId,
              stepOrder: step.stepOrder,
            })),
          },
          appliedUsers: input.appliedUserIds ? {
            connect: input.appliedUserIds.map(id => ({ id })),
          } : undefined,
        },
        include: {
          steps: {
            include: {
              approver: {
                select: { id: true, name: true, designation: true },
              },
            },
            orderBy: { stepOrder: "asc" },
          },
          specificApprover: {
            select: { id: true, name: true, designation: true },
          },
          appliedUsers: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    }),

  /**
   * Get a specific rule by ID (for editing)
   */
  getRuleById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const rule = await ctx.db.approvalRule.findFirst({
        where: { id: input.id, companyId: ctx.session.user.companyId! },
        include: {
          steps: {
            include: {
              approver: { select: { id: true, name: true, designation: true } },
            },
            orderBy: { stepOrder: "asc" },
          },
          specificApprover: {
            select: { id: true, name: true, designation: true },
          },
          appliedUsers: {
            select: { id: true, name: true, email: true, designation: true },
          },
        },
      });

      if (!rule) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Rule not found." });
      }
      return rule;
    }),

  /**
   * Update an approval rule (name, type, conditions).
   */
  updateRule: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100).optional(),
        ruleType: z.enum(["SEQUENTIAL", "PERCENTAGE", "SPECIFIC", "HYBRID"]).optional(),
        requiredPercent: z.number().min(1).max(100).nullable().optional(),
        specificApproverId: z.string().nullable().optional(),
        isManagerFirst: z.boolean().optional(),
        isDefault: z.boolean().optional(),
        isActive: z.boolean().optional(),
        steps: z
          .array(
            z.object({
              approverId: z.string(),
              stepOrder: z.number().int().min(1),
            }),
          )
          .optional(),
        appliedUserIds: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const rule = await ctx.db.approvalRule.findFirst({
        where: { id: input.id, companyId: ctx.session.user.companyId! },
      });
      if (!rule) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Rule not found." });
      }

      // Validate approvers
      if (input.steps && input.steps.length > 0) {
        const approverIds = input.steps.map((s) => s.approverId);
        if (input.specificApproverId) approverIds.push(input.specificApproverId);
        
        const approvers = await ctx.db.user.findMany({
          where: {
            id: { in: approverIds },
            companyId: ctx.session.user.companyId!,
            role: { in: ["MANAGER", "ADMIN"] },
          },
        });
        
        const foundIds = new Set(approvers.map((a) => a.id));
        const missingIds = approverIds.filter((id) => !foundIds.has(id));
        if (missingIds.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Some approvers are invalid or not managers: ${missingIds.join(", ")}`,
          });
        }
      }

      if (input.isDefault) {
        await ctx.db.approvalRule.updateMany({
          where: { companyId: ctx.session.user.companyId!, isDefault: true },
          data: { isDefault: false },
        });
      }

      const { id, steps, ...data } = input;
      // Build dynamic update payload
      const updatePayload: Parameters<typeof ctx.db.approvalRule.update>[0]["data"] = { ...data };
      if (steps) {
        updatePayload.steps = {
          deleteMany: {}, // Clear out the old exact steps for this rule
          create: steps.map((step) => ({
            approverId: step.approverId,
            stepOrder: step.stepOrder,
          })),
        };
      }

      if (input.appliedUserIds) {
        // Disconnect all current users before connecting new ones
        // This ensures "one rule per user"
        await ctx.db.user.updateMany({
          where: { approvalRuleId: id },
          data: { approvalRuleId: null },
        });

        updatePayload.appliedUsers = {
          connect: input.appliedUserIds.map((userId) => ({ id: userId })),
        };
      }

      return ctx.db.approvalRule.update({
        where: { id },
        data: updatePayload,
        include: {
          steps: {
            include: {
              approver: {
                select: { id: true, name: true, designation: true },
              },
            },
            orderBy: { stepOrder: "asc" },
          },
        },
      });
    }),

  /**
   * List all approval rules for the company.
   */
  listRules: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.approvalRule.findMany({
      where: { companyId: ctx.session.user.companyId! },
      include: {
        steps: {
          include: {
            approver: {
              select: { id: true, name: true, designation: true },
            },
          },
          orderBy: { stepOrder: "asc" },
        },
        specificApprover: {
          select: { id: true, name: true, designation: true },
        },
        appliedUsers: {
          select: { id: true, name: true },
        },
        _count: { select: { expenses: true, appliedUsers: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // ═══════════════════════════════════════
  // APPROVAL ACTIONS (Manager / Admin)
  // ═══════════════════════════════════════

  /**
   * Approve an expense.
   * Validates that the current user is the expected approver.
   */
  approve: managerProcedure
    .input(
      z.object({
        expenseId: z.string(),
        comment: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.findFirst({
        where: {
          id: input.expenseId,
          status: "UNDER_REVIEW",
          submitter: { companyId: ctx.session.user.companyId! },
        },
        include: {
          submitter: true,
          approvalRule: {
            include: { steps: { orderBy: { stepOrder: "asc" } } },
          },
        },
      });

      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Expense not found or not under review.",
        });
      }

      // Validate this user is the expected approver
      const userId = ctx.session.user.id;
      const stepOrder = determineStepOrder(expense, userId);

      if (stepOrder === null) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the current approver for this expense.",
        });
      }

      const result = await processApprovalAction(
        ctx.db,
        input.expenseId,
        userId,
        "APPROVED",
        input.comment ?? null,
        stepOrder,
      );

      return result;
    }),

  /**
   * Reject an expense.
   */
  reject: managerProcedure
    .input(
      z.object({
        expenseId: z.string(),
        comment: z.string().min(1, "Please provide a reason for rejection.").max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.findFirst({
        where: {
          id: input.expenseId,
          status: "UNDER_REVIEW",
          submitter: { companyId: ctx.session.user.companyId! },
        },
        include: {
          submitter: true,
          approvalRule: {
            include: { steps: { orderBy: { stepOrder: "asc" } } },
          },
        },
      });

      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Expense not found or not under review.",
        });
      }

      const userId = ctx.session.user.id;
      const stepOrder = determineStepOrder(expense, userId);

      if (stepOrder === null) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the current approver for this expense.",
        });
      }

      const result = await processApprovalAction(
        ctx.db,
        input.expenseId,
        userId,
        "REJECTED",
        input.comment,
        stepOrder,
      );

      return result;
    }),

  /**
   * Admin override — force approve or reject any expense.
   */
  override: adminProcedure
    .input(
      z.object({
        expenseId: z.string(),
        action: z.enum(["APPROVED", "REJECTED"]),
        comment: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.findFirst({
        where: {
          id: input.expenseId,
          submitter: { companyId: ctx.session.user.companyId! },
          status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
        },
      });

      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Expense not found or in a final state.",
        });
      }

      // Record override action
      await ctx.db.approvalAction.create({
        data: {
          expenseId: input.expenseId,
          approverId: ctx.session.user.id,
          action: input.action,
          comment: input.comment
            ? `[ADMIN OVERRIDE] ${input.comment}`
            : "[ADMIN OVERRIDE]",
          stepOrder: -1, // Sentinel for override
        },
      });

      await ctx.db.expense.update({
        where: { id: input.expenseId },
        data: { status: input.action },
      });

      return {
        newStatus: input.action,
        message: `Admin override: Expense ${input.action.toLowerCase()}.`,
      };
    }),
});

// ─── Helper ───

function determineStepOrder(
  expense: {
    currentStepOrder: number | null;
    submitter: { managerId: string | null };
    approvalRule: {
      ruleType: string;
      steps: Array<{ approverId: string; stepOrder: number }>;
    } | null;
  },
  userId: string,
): number | null {
  // Manager gate (step 0)
  if (expense.currentStepOrder === 0) {
    if (expense.submitter.managerId === userId) return 0;
    return null;
  }

  const rule = expense.approvalRule;
  if (!rule) return null;

  if (rule.ruleType === "SEQUENTIAL") {
    const currentStep = rule.steps.find(
      (s) => s.stepOrder === expense.currentStepOrder,
    );
    if (currentStep?.approverId === userId) return currentStep.stepOrder;
    return null;
  }

  // PERCENTAGE, SPECIFIC, HYBRID — any step approver can act
  const step = rule.steps.find((s) => s.approverId === userId);
  return step ? step.stepOrder : null;
}
