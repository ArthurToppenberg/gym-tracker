import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@gym/trpc/server";

export type Exercise =
  inferRouterOutputs<AppRouter>["exercises"]["getExercises"]["items"][number];
