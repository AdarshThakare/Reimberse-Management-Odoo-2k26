/**
 * User Router
 *
 * Admin-level user management: create employees/managers,
 * assign roles, set designations, define manager relationships.
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  employeeProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { sendWelcomeEmail } from "~/server/services/email.service";

export const userRouter = createTRPCRouter({
  /**
   * Get current user's profile.
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        company: { include: { baseCurrency: true } },
        manager: { select: { id: true, name: true, email: true, designation: true } },
      },
    });
  }),

  /**
   * List all users in the company.
   * Admin only. Includes their manager relationship.
   */
  list: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      where: { companyId: ctx.session.user.companyId! },
      include: {
        manager: {
          select: { id: true, name: true, email: true, designation: true },
        },
        _count: { select: { subordinates: true, expenses: true } },
      },
      orderBy: { name: "asc" },
    });
  }),

  /**
   * Create a new user (employee or manager) in the company.
   * Admin only. The user can later sign in with their email.
   */
  create: adminProcedure
    .input(
      z.object({
        email: z.string().email("Please enter a valid email address"),
        name: z.string().min(1, "Name is required").max(100),
        role: z.enum(["EMPLOYEE", "MANAGER"]),
        designation: z.string().max(100).optional(),
        managerId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if email already exists
      const existing = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existing) {
        if (existing.companyId === ctx.session.user.companyId) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `A user with email "${input.email}" already exists in your company.`,
          });
        } else if (existing.companyId !== null) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `A user with email "${input.email}" belongs to another company currently.`,
          });
        }
      }

      // Validate managerId belongs to same company
      if (input.managerId) {
        const manager = await ctx.db.user.findFirst({
          where: {
            id: input.managerId,
            companyId: ctx.session.user.companyId!,
            role: { in: ["MANAGER", "ADMIN"] },
          },
        });
        if (!manager) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Selected manager not found or does not have the required role.",
          });
        }
      }

      // 1. Create User
      const user = await ctx.db.user.upsert({
        where: { email: input.email },
        update: {
          name: input.name,
          role: input.role,
          designation: input.designation,
          companyId: ctx.session.user.companyId!,
          managerId: input.managerId,
        },
        create: {
          email: input.email,
          name: input.name,
          role: input.role,
          designation: input.designation,
          companyId: ctx.session.user.companyId!,
          managerId: input.managerId,
        },
      });

      // 2. Fetch company to get name
      const company = await ctx.db.company.findUnique({
        where: { id: ctx.session.user.companyId! },
        select: { name: true },
      });

      // 3. Dispatch Invitation Email
      if (company?.name) {
        void sendWelcomeEmail({
          to: user.email,
          name: user.name ?? "Colleague",
          role: user.role,
          companyName: company.name,
          adminName: ctx.session.user.name ?? ctx.session.user.email ?? "Your Administrator",
        });
      }

      return user;
    }),

  /**
   * Update a user's role.
   * Admin only. Cannot change own role.
   */
  updateRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(["EMPLOYEE", "MANAGER", "ADMIN"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot change your own role.",
        });
      }

      // Verify user belongs to same company
      const user = await ctx.db.user.findFirst({
        where: { id: input.userId, companyId: ctx.session.user.companyId! },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }

      return ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),

  /**
   * Assign or change a user's manager.
   */
  assignManager: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        managerId: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify both users belong to same company
      const user = await ctx.db.user.findFirst({
        where: { id: input.userId, companyId: ctx.session.user.companyId! },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }

      if (input.managerId) {
        const manager = await ctx.db.user.findFirst({
          where: {
            id: input.managerId,
            companyId: ctx.session.user.companyId!,
            role: { in: ["MANAGER", "ADMIN"] },
          },
        });
        if (!manager) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Selected manager not found or lacks the required role.",
          });
        }

        // Prevent circular management
        if (input.managerId === input.userId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "A user cannot be their own manager.",
          });
        }
      }

      return ctx.db.user.update({
        where: { id: input.userId },
        data: { managerId: input.managerId },
      });
    }),

  /**
   * Update a user's designation.
   */
  updateDesignation: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        designation: z.string().max(100).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { id: input.userId, companyId: ctx.session.user.companyId! },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }

      return ctx.db.user.update({
        where: { id: input.userId },
        data: { designation: input.designation },
      });
    }),

  /**
   * List managers in the company (for dropdown selections).
   */
  listManagers: employeeProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        companyId: ctx.session.user.companyId,
        role: { in: ["MANAGER", "ADMIN"] },
      },
      select: { id: true, name: true, email: true, designation: true, role: true },
      orderBy: { name: "asc" },
    });
  }),
});
