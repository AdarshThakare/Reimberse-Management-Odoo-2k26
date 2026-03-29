/**
 * Expense Router
 *
 * Employee-facing CRUD operations for expenses.
 * Handles creation, editing, submission, and status tracking.
 * Currency conversion happens automatically on submit.
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  employeeProcedure,
  managerProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { convertAmount, ensureCurrencyExists } from "~/server/services/currency.service";
import { initializeApproval } from "~/server/services/approval.service";

export const expenseRouter = createTRPCRouter({
  /**
   * Create a new expense in DRAFT status.
   */
  create: employeeProcedure
    .input(
      z.object({
        subject: z.string().min(1, "Subject is required").max(200),
        description: z.string().max(1000).optional(),
        expenseDate: z.string().datetime(),
        totalAmount: z.number().positive("Amount must be positive"),
        currencyCode: z.string().length(3),
        currencyName: z.string().optional(),
        currencySymbol: z.string().optional(),
        categoryId: z.string(),
        remarks: z.string().max(500).optional(),
        receiptUrl: z.string().optional(),
        approvalRuleId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify category belongs to user's company
      const category = await ctx.db.expenseCategory.findFirst({
        where: { id: input.categoryId, companyId: ctx.session.user.companyId },
      });
      if (!category) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid category." });
      }

      // Ensure the expense currency exists in our Currency table
      if (input.currencyName && input.currencySymbol) {
        await ensureCurrencyExists(
          ctx.db,
          input.currencyCode,
          input.currencyName,
          input.currencySymbol,
        );
      }

      // If no approval rule specified, use company default
      let approvalRuleId = input.approvalRuleId;
      if (!approvalRuleId) {
        const defaultRule = await ctx.db.approvalRule.findFirst({
          where: {
            companyId: ctx.session.user.companyId,
            isDefault: true,
            isActive: true,
          },
        });
        approvalRuleId = defaultRule?.id;
      }

      return ctx.db.expense.create({
        data: {
          subject: input.subject,
          description: input.description,
          expenseDate: new Date(input.expenseDate),
          totalAmount: input.totalAmount,
          currencyId: input.currencyCode,
          categoryId: input.categoryId,
          submitterId: ctx.session.user.id,
          approvalRuleId: approvalRuleId ?? undefined,
          remarks: input.remarks,
          receiptUrl: input.receiptUrl,
          status: "DRAFT",
        },
        include: { category: true, currency: true },
      });
    }),

  /**
   * Update a draft expense.
   */
  update: employeeProcedure
    .input(
      z.object({
        id: z.string(),
        subject: z.string().min(1).max(200).optional(),
        description: z.string().max(1000).nullable().optional(),
        expenseDate: z.string().datetime().optional(),
        totalAmount: z.number().positive().optional(),
        currencyCode: z.string().length(3).optional(),
        categoryId: z.string().optional(),
        remarks: z.string().max(500).nullable().optional(),
        receiptUrl: z.string().nullable().optional(),
        approvalRuleId: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.findFirst({
        where: {
          id: input.id,
          submitterId: ctx.session.user.id,
          status: "DRAFT",
        },
      });
      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Expense not found or cannot be edited (not in DRAFT status).",
        });
      }

      const { id, currencyCode, ...updateData } = input;
      return ctx.db.expense.update({
        where: { id },
        data: {
          ...updateData,
          expenseDate: updateData.expenseDate
            ? new Date(updateData.expenseDate)
            : undefined,
          currencyId: currencyCode,
        },
        include: { category: true, currency: true },
      });
    }),

  /**
   * Submit a draft expense for approval.
   * This triggers currency conversion and initializes the approval workflow.
   */
  submit: employeeProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.findFirst({
        where: {
          id: input.id,
          submitterId: ctx.session.user.id,
          status: "DRAFT",
        },
        include: { submitter: { include: { company: true } } },
      });
      if (!expense) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Expense not found or already submitted.",
        });
      }

      const companyCurrency = expense.submitter.company?.baseCurrencyId;
      if (!companyCurrency) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Company base currency not configured.",
        });
      }

      // Convert to company base currency
      const { convertedAmount, exchangeRate } = await convertAmount(
        ctx.db,
        Number(expense.totalAmount),
        expense.currencyId,
        companyCurrency,
      );

      // Update expense status and conversion data
      await ctx.db.expense.update({
        where: { id: input.id },
        data: {
          status: "SUBMITTED",
          convertedAmount,
          exchangeRate,
          submittedAt: new Date(),
        },
      });

      // Initialize approval workflow
      await initializeApproval(ctx.db, input.id);

      return ctx.db.expense.findUnique({
        where: { id: input.id },
        include: {
          category: true,
          currency: true,
          approvalActions: {
            include: { approver: { select: { id: true, name: true, designation: true } } },
            orderBy: { createdAt: "asc" },
          },
        },
      });
    }),

  /**
   * List expenses for the current user.
   */
  list: employeeProcedure
    .input(
      z
        .object({
          status: z.enum(["DRAFT", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.expense.findMany({
        where: {
          submitterId: ctx.session.user.id,
          ...(input?.status ? { status: input.status } : {}),
        },
        include: {
          category: true,
          currency: true,
          approvalRule: { select: { name: true, ruleType: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  /**
   * Get a single expense by ID with full details.
   */
  getById: employeeProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.findFirst({
        where: {
          id: input.id,
          // Employees see only own expenses
          // Managers/Admins see team/company expenses
          ...(ctx.session.user.role === "EMPLOYEE"
            ? { submitterId: ctx.session.user.id }
            : {
                submitter: {
                  companyId: ctx.session.user.companyId,
                },
              }),
        },
        include: {
          category: true,
          currency: true,
          submitter: {
            select: { id: true, name: true, email: true, designation: true },
          },
          approvalRule: {
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
          },
          approvalActions: {
            include: {
              approver: {
                select: { id: true, name: true, designation: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (!expense) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Expense not found." });
      }

      return expense;
    }),

  /**
   * List expenses pending the current user's approval.
   * Manager/Admin only.
   */
  listPending: managerProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Find expenses where this user is the current approver
    const expenses = await ctx.db.expense.findMany({
      where: {
        status: "UNDER_REVIEW",
        submitter: { companyId: ctx.session.user.companyId! },
        OR: [
          // Manager gate: user is the submitter's manager and step is 0
          {
            currentStepOrder: 0,
            submitter: { managerId: userId },
          },
          // Sequential: user is assigned to the current step
          {
            approvalRule: {
              ruleType: "SEQUENTIAL",
              steps: {
                some: {
                  approverId: userId,
                },
              },
            },
            currentStepOrder: {
              not: null,
            },
          },
          // Non-sequential: user is in the rule steps and hasn't acted
          {
            approvalRule: {
              ruleType: { in: ["PERCENTAGE", "SPECIFIC", "HYBRID"] },
              steps: {
                some: { approverId: userId },
              },
            },
            approvalActions: {
              none: { approverId: userId },
            },
          },
        ],
      },
      include: {
        category: true,
        currency: true,
        submitter: {
          select: { id: true, name: true, email: true, designation: true },
        },
        approvalRule: {
          select: {
            name: true,
            ruleType: true,
            steps: { select: { stepOrder: true, approverId: true } },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    // For sequential rules, filter to only show if user matches current step
    return expenses.filter((expense) => {
      if (expense.currentStepOrder === 0) return true; // Manager gate
      if (!expense.approvalRule) return true;
      if (expense.approvalRule.ruleType !== "SEQUENTIAL") return true;

      // For sequential, we need to verify the current step matches
      // This is a post-filter since Prisma can't do this in one query
      return expense.approvalRule.steps.some(
        (step) => step.stepOrder === expense.currentStepOrder && step.approverId === userId
      );
    });
  }),

  /**
   * List ALL expenses in the company. Admin only.
   */
  listAll: adminProcedure
    .input(
      z
        .object({
          status: z.enum(["DRAFT", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.expense.findMany({
        where: {
          submitter: { companyId: ctx.session.user.companyId! },
          ...(input?.status ? { status: input.status } : {}),
        },
        include: {
          category: true,
          currency: true,
          submitter: {
            select: { id: true, name: true, email: true, designation: true },
          },
          approvalRule: {
            select: { name: true, ruleType: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  /**
   * Get complete expense history for admin dashboard.
   * Shows all expenses in the company with full approval chain.
   * Admin only.
   */
  getCompanyExpenseHistory: adminProcedure
    .input(
      z
        .object({
          status: z
            .enum(["DRAFT", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"])
            .optional(),
          submitterId: z.string().optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
          skip: z.number().int().min(0).default(0),
          take: z.number().int().min(1).max(100).default(50),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where = {
        submitter: { companyId: ctx.session.user.companyId! },
        ...(input?.status ? { status: input.status } : {}),
        ...(input?.submitterId ? { submitterId: input.submitterId } : {}),
        ...(input?.startDate || input?.endDate
          ? {
              createdAt: {
                ...(input?.startDate ? { gte: new Date(input.startDate) } : {}),
                ...(input?.endDate ? { lte: new Date(input.endDate) } : {}),
              },
            }
          : {}),
      };

      const [expenses, total] = await Promise.all([
        ctx.db.expense.findMany({
          where,
          include: {
            category: true,
            currency: true,
            submitter: {
              select: { id: true, name: true, email: true, designation: true },
            },
            approvalRule: {
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
            },
            approvalActions: {
              include: {
                approver: {
                  select: { id: true, name: true, designation: true, email: true },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "desc" },
          skip: input?.skip,
          take: input?.take,
        }),
        ctx.db.expense.count({ where }),
      ]);

      return {
        expenses,
        total,
        hasMore: (input?.skip ?? 0) + expenses.length < total,
      };
    }),

  /**
   * Get approval history for a manager.
   * Shows all expenses that this manager has approved or rejected.
   * Manager or Admin only.
   */
  getManagerApprovalHistory: managerProcedure
    .input(
      z
        .object({
          action: z.enum(["APPROVED", "REJECTED"]).optional(),
          status: z
            .enum(["DRAFT", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"])
            .optional(),
          submitterId: z.string().optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
          skip: z.number().int().min(0).default(0),
          take: z.number().int().min(1).max(100).default(50),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      // Get all expenses where this user has taken an action
      const where = {
        approvalActions: {
          some: {
            approverId: ctx.session.user.id,
            ...(input?.action ? { action: input.action } : {}),
          },
        },
        submitter: { companyId: ctx.session.user.companyId! },
        ...(input?.status ? { status: input.status } : {}),
        ...(input?.submitterId ? { submitterId: input.submitterId } : {}),
        ...(input?.startDate || input?.endDate
          ? {
              createdAt: {
                ...(input?.startDate ? { gte: new Date(input.startDate) } : {}),
                ...(input?.endDate ? { lte: new Date(input.endDate) } : {}),
              },
            }
          : {}),
      };

      const [expenses, total] = await Promise.all([
        ctx.db.expense.findMany({
          where,
          include: {
            category: true,
            currency: true,
            submitter: {
              select: { id: true, name: true, email: true, designation: true },
            },
            approvalRule: {
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
            },
            approvalActions: {
              include: {
                approver: {
                  select: { id: true, name: true, designation: true, email: true },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "desc" },
          skip: input?.skip,
          take: input?.take,
        }),
        ctx.db.expense.count({ where }),
      ]);

      return {
        expenses,
        total,
        hasMore: (input?.skip ?? 0) + expenses.length < total,
      };
    }),
});
