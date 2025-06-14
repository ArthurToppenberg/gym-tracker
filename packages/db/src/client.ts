import { PrismaClient } from "@prisma/client";
import { env } from "@gym/env";

const createPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export { ExerciseVariation } from "@prisma/client";
export type { User, Exercise } from "@prisma/client";
