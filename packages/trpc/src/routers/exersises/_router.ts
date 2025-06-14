import {
  createTRPCRouter,
  importHandler,
  protectedProcedure,
} from "../../trpc";
import { ZCreateExersiseInput } from "./createExersise.schema";
import { ZGetExersisesInput } from "./getExersises.schema";
import { ZGetSimilarExercisesInput } from "./getSimilarExercises.schema";

const NAMESPACE = "exersises";
const namespaced = (s: string) => `${NAMESPACE}.${s}`;

export const exersisesRouter = createTRPCRouter({
  getExersises: protectedProcedure
    .input(ZGetExersisesInput)
    .query(async (opts) => {
      const handler = await importHandler(
        namespaced("getExersises"),
        () => import("./getExersises.handler")
      );

      return handler(opts);
    }),
  createExersise: protectedProcedure
    .input(ZCreateExersiseInput)
    .mutation(async (opts) => {
      const handler = await importHandler(
        namespaced("createExersise"),
        () => import("./createExersise.handler")
      );

      return handler(opts);
    }),
  getSimilarExercises: protectedProcedure
    .input(ZGetSimilarExercisesInput)
    .query(async (opts) => {
      const handler = await importHandler(
        namespaced("getSimilarExersises"),
        () => import("./getSimilarExercises.handler")
      );

      return handler(opts);
    }),
});
