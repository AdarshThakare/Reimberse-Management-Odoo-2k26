/**
 * tRPC Server Configuration
 *
 * This file defines:
 *   1. CONTEXT — request context with db, session
 *   2. INITIALIZATION — tRPC instance with superjson + Zod error formatting
 *   3. MIDDLEWARE — role-based access control
 *   4. PROCEDURES — public, protected, employee, manager, admin
 */

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "~/server/auth";
import { db } from "~/server/db";

// ═══════════════════════════════════════
// 1. CONTEXT
// ═══════════════════════════════════════

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db,
    session,
    ...opts,
  };
};

// ═══════════════════════════════════════
// 2. INITIALIZATION
// ═══════════════════════════════════════

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

// ═══════════════════════════════════════
// 3. MIDDLEWARE
// ═══════════════════════════════════════

/**
 * Timing middleware — logs execution time.
 * Adds artificial delay in dev to surface waterfalls.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();
  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Auth middleware — enforces that a user is logged in.
 * Guarantees `ctx.session.user` is non-null.
 */
const enforceAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Company middleware — enforces that the user belongs to a company.
 * Runs after auth. Guarantees `ctx.session.user.companyId` is non-null.
 */
const enforceCompany = t.middleware(({ ctx, next }) => {
  const companyId = ctx.session?.user?.companyId;
  if (!companyId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must set up a company first.",
    });
  }
  return next({
    ctx: {
      session: {
        ...ctx.session!,
        user: {
          ...ctx.session!.user,
          companyId: companyId as string, // Narrowed: guaranteed non-null by guard above
        },
      },
    },
  });
});

/**
 * Role middleware factory — creates middleware that enforces a minimum role.
 * Role hierarchy: ADMIN > MANAGER > EMPLOYEE
 */
const enforceRole = (allowedRoles: string[]) =>
  t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const userRole = ctx.session.user.role;
    if (!allowedRoles.includes(userRole)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `This action requires one of: ${allowedRoles.join(", ")}. Your role: ${userRole}`,
      });
    }

    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });

// ═══════════════════════════════════════
// 4. PROCEDURES
// ═══════════════════════════════════════

/**
 * Public procedure — no authentication required.
 * Use for: country list, health checks.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Protected procedure — user must be logged in.
 * Use for: initial company setup (user may not have a company yet).
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(enforceAuth);

/**
 * Employee procedure — user must be logged in AND belong to a company.
 * Any role (EMPLOYEE, MANAGER, ADMIN) can use this.
 * Use for: expense submission, viewing own expenses.
 */
export const employeeProcedure = t.procedure
  .use(timingMiddleware)
  .use(enforceAuth)
  .use(enforceCompany);

/**
 * Manager procedure — user must be MANAGER or ADMIN.
 * Use for: approval queue, approve/reject actions, team expenses.
 */
export const managerProcedure = t.procedure
  .use(timingMiddleware)
  .use(enforceAuth)
  .use(enforceCompany)
  .use(enforceRole(["MANAGER", "ADMIN"]));

/**
 * Admin procedure — user must be ADMIN.
 * Use for: user management, approval rule configuration, overrides.
 */
export const adminProcedure = t.procedure
  .use(timingMiddleware)
  .use(enforceAuth)
  .use(enforceCompany)
  .use(enforceRole(["ADMIN"]));
