import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

import { db } from "~/server/db";
import { env } from "~/env";
import type { Role } from "../../../generated/prisma";

/**
 * Module augmentation for `next-auth` types.
 * Extends the session to include user ID, role, and companyId
 * so we can use them in tRPC middleware for access control.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      companyId: string | null;
      designation: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    companyId: string | null;
    designation: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role;
    companyId: string | null;
    designation: string | null;
  }
}

/**
 * NextAuth configuration.
 * Auth provider: Resend (email magic links only).
 * OAuth providers removed per hackathon requirements.
 */
export const authConfig = {
  providers: [
    Resend({
      apiKey: env.AUTH_RESEND_KEY,
      from: env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(db) as NextAuthConfig["adapter"],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: (user as unknown as { role: Role }).role,
        companyId: (user as unknown as { companyId: string | null }).companyId,
        designation: (user as unknown as { designation: string | null }).designation,
      },
    }),
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
} satisfies NextAuthConfig;
