import {
  createTRPCRouter,
  importHandler,
  protectedProcedure,
} from "../../trpc";
import { ZCreateRecordInput } from "./createRecord.schema";
import { ZDeleteRecordInput } from "./deleteRecord.schema";
import { ZGetRecordsInput } from "./getRecords.schema";

const NAMESPACE = "record";
const namespaced = (s: string) => `${NAMESPACE}.${s}`;

export const recordRouter = createTRPCRouter({
  createRecord: protectedProcedure
    .input(ZCreateRecordInput)
    .mutation(async (opts) => {
      const handler = await importHandler(
        namespaced("createRecord"),
        () => import("./createRecord.handler")
      );

      return handler(opts);
    }),

  deleteRecord: protectedProcedure
    .input(ZDeleteRecordInput)
    .mutation(async (opts) => {
      const handler = await importHandler(
        namespaced("deleteRecord"),
        () => import("./deleteRecord.handler")
      );

      return handler(opts);
    }),

  getRecords: protectedProcedure.input(ZGetRecordsInput).query(async (opts) => {
    const handler = await importHandler(
      namespaced("getRecords"),
      () => import("./getRecords.handler")
    );

    return handler(opts);
  }),
});
