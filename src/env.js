import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables.
   * OAuth variables removed — only email auth (Resend) is used.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    EMAIL_FROM: z.string(),
    AUTH_RESEND_KEY: z.string(),
    VERCEL_URL: z.string(),
  },

  /**
   * Client-side environment variables (prefixed with NEXT_PUBLIC_).
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * Manual destructuring of process.env for Edge runtime compatibility.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL_FROM: process.env.EMAIL_FROM,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    VERCEL_URL: process.env.VERCEL_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
