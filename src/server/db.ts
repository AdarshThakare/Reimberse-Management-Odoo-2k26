import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma";

const createPrismaClient = () => {
  const pool = new Pool({ connectionString: env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const shouldLogQueries =
    env.NODE_ENV === "development" && process.env.PRISMA_LOG_QUERIES === "true";

  return new PrismaClient({
    adapter,
    log: shouldLogQueries ? ["query", "error", "warn"] : ["error", "warn"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
