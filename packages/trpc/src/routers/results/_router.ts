import {
  createTRPCRouter,
  importHandler,
  protectedProcedure,
} from "../../trpc";

const NAMESPACE = "results";
const namespaced = (s: string) => `${NAMESPACE}.${s}`;

export const resultsRouter = createTRPCRouter({});
