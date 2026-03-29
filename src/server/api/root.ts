/**
 * Root tRPC Router
 *
 * Merges all domain routers into a single appRouter.
 * Each router is prefixed by its namespace.
 */

import { companyRouter } from "~/server/api/routers/company";
import { userRouter } from "~/server/api/routers/user";
import { expenseRouter } from "~/server/api/routers/expense";
import { approvalRouter } from "~/server/api/routers/approval";
import { currencyRouter } from "~/server/api/routers/currency";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  company: companyRouter,
  user: userRouter,
  expense: expenseRouter,
  approval: approvalRouter,
  currency: currencyRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
