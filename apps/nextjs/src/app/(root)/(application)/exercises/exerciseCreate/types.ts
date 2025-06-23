import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@gym/trpc/server";

export type ExerciseVariation =
  inferRouterOutputs<AppRouter>["exercises"]["getExerciseVariations"]["variations"][number];

export type ExerciseMuscleGroup =
  inferRouterOutputs<AppRouter>["exercises"]["getExerciseMuscleGroups"]["muscleGroup"][number];
