/**
 * Company Router
 *
 * Handles company creation (auto on first signup),
 * company profile retrieval, and settings update.
 */

import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  employeeProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import {
  fetchCountriesWithCurrencies,
  ensureCurrencyExists,
} from "~/server/services/currency.service";

export const companyRouter = createTRPCRouter({
  /**
   * Setup a new company.
   * Called once on first login. Creates the company, sets
   * the user as ADMIN, and seeds the base currency.
   */
  setup: protectedProcedure
    .input(
      z.object({
        companyName: z
          .string()
          .min(2, "Company name must be at least 2 characters")
          .max(100),
        adminName: z.string().min(2, "Your name is required"),
        country: z.string().min(1, "Country is required"),
        currencyCode: z.string().length(3, "Currency code must be 3 characters"),
        currencyName: z.string().min(1),
        currencySymbol: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Guard: user should not already have a company
      const existingUser = await ctx.db.user.findUnique({
        where: { id: userId },
        select: { companyId: true },
      });
      if (existingUser?.companyId) {
        throw new Error("You already belong to a company.");
      }

      // Ensure currency exists in our Currency table
      await ensureCurrencyExists(
        ctx.db,
        input.currencyCode,
        input.currencyName,
        input.currencySymbol,
      );

      // Create company
      const company = await ctx.db.company.create({
        data: {
          name: input.companyName,
          country: input.country,
          baseCurrencyId: input.currencyCode,
        },
      });

      // Assign user as ADMIN of this company
      await ctx.db.user.update({
        where: { id: userId },
        data: {
          name: input.adminName,
          companyId: company.id,
          role: "ADMIN",
          designation: "Administrator",
        },
      });

      // Seed default expense categories
      const defaultCategories = [
        { name: "Travel", description: "Travel and transportation expenses" },
        { name: "Food", description: "Meals and refreshments" },
        { name: "Accommodation", description: "Hotel and lodging" },
        { name: "Office Supplies", description: "Stationery and office items" },
        { name: "Software", description: "Software subscriptions and licenses" },
        { name: "Miscellaneous", description: "Other expenses" },
      ];

      await ctx.db.expenseCategory.createMany({
        data: defaultCategories.map((cat) => ({
          ...cat,
          companyId: company.id,
        })),
      });

      return company;
    }),

  /**
   * Get the current user's company details.
   */
  get: employeeProcedure.query(async ({ ctx }) => {
    const companyId = ctx.session.user.companyId!;
    return ctx.db.company.findUnique({
      where: { id: companyId },
      include: {
        baseCurrency: true,
        _count: {
          select: { users: true, categories: true, approvalRules: true },
        },
      },
    });
  }),

  /**
   * Update company settings.
   */
  update: adminProcedure
    .input(
      z.object({
        name: z.string().min(2).max(100).optional(),
        country: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.company.update({
        where: { id: ctx.session.user.companyId! },
        data: input,
      });
    }),

  /**
   * List categories for the company.
   */
  listCategories: employeeProcedure.query(async ({ ctx }) => {
    return ctx.db.expenseCategory.findMany({
      where: { companyId: ctx.session.user.companyId!, isActive: true },
      orderBy: { name: "asc" },
    });
  }),

  /**
   * Create a new expense category.
   */
  createCategory: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().max(200).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.expenseCategory.create({
        data: {
          ...input,
          companyId: ctx.session.user.companyId!,
        },
      });
    }),
});
