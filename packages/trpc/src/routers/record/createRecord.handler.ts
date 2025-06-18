import type { ProtectedProcedureInput } from "../../helpers";
import { ZCreateRecordInput } from "./createRecord.schema";

export const createRecordHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZCreateRecordInput>) => {
  const { exercise, sets, startReps, endReps, startWeight, endWeight } = input;

  const record = await ctx.db.record.create({
    data: {
      exerciseId: exercise,
      sets,
      startReps,
      endReps,
      startWeight,
      endWeight,
      userId: ctx.session.user.id,
    },
  });

  if (record.id) {
    return {
      success: true,
      recordId: record.id,
    };
  }

  return record;
};

export default createRecordHandler;
