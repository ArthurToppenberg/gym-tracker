import type { AppRouter } from "@gym/trpc/server";
import type { inferRouterOutputs } from "@trpc/server";

export type Records = inferRouterOutputs<AppRouter>["record"]["getRecords"];
