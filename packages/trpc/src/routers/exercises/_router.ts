import {
  createTRPCRouter,
  importHandler,
  protectedProcedure,
} from "../../trpc";
import { ZCreateExerciseInput } from "./createExercise.schema";
import { ZDeleteExerciseInput } from "./deleteExercise.schema";
import { ZGetExerciseMuscleGroupsInput } from "./getExerciseMuscleGroups.schema";
import { ZGetExercisesInput } from "./getExercises.schema";
import { ZGetExerciseVariationsInput } from "./getExerciseVariations.schema";
import { ZGetSimilarExercisesInput } from "./getSimilarExercises.schema";

const NAMESPACE = "exercises";
const namespaced = (s: string) => `${NAMESPACE}.${s}`;

export const exercisesRouter = createTRPCRouter({
  getExercises: protectedProcedure
    .input(ZGetExercisesInput)
    .query(async (opts) => {
      const handler = await importHandler(
        namespaced("getExercises"),
        () => import("./getExercises.handler")
      );

      return handler(opts);
    }),
  createExercise: protectedProcedure
    .input(ZCreateExerciseInput)
    .mutation(async (opts) => {
      const handler = await importHandler(
        namespaced("createExercise"),
        () => import("./createExercise.handler")
      );

      return handler(opts);
    }),
  getSimilarExercises: protectedProcedure
    .input(ZGetSimilarExercisesInput)
    .query(async (opts) => {
      const handler = await importHandler(
        namespaced("getSimilarExercises"),
        () => import("./getSimilarExercises.handler")
      );

      return handler(opts);
    }),
  getExerciseVariations: protectedProcedure
    .input(ZGetExerciseVariationsInput)
    .query(async (opts) => {
      const handler = await importHandler(
        namespaced("getExerciseVariations"),
        () => import("./getExerciseVariations.handler")
      );

      return handler(opts);
    }),
  deleteExercise: protectedProcedure
    .input(ZDeleteExerciseInput)
    .mutation(async (opts) => {
      const handler = await importHandler(
        namespaced("deleteExercise"),
        () => import("./deleteExercise.handler")
      );

      return handler(opts);
    }),
  getExerciseMuscleGroups: protectedProcedure
    .input(ZGetExerciseMuscleGroupsInput)
    .query(async (opts) => {
      const handler = await importHandler(
        namespaced("getExerciseMuscleGroups"),
        () => import("./getExerciseMuscleGroups.handler")
      );

      return handler(opts);
    }),
});
