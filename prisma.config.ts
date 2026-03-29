import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Prisma CLI (including postinstall) may not auto-load .env.local in all contexts.
// Load .env.local first, then .env as fallback.
config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
