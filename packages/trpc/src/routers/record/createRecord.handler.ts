import { Prisma } from "@prisma/client";
import type { ProtectedProcedureInput } from "../../helpers";
import { ZCreateRecordInput } from "./createRecord.schema";

export const createRecordHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZCreateRecordInput>) => {
  const { exercise, sets, startReps, endReps, startWeight, endWeight, id } =
    input;

  const data = {
    exerciseId: exercise,
    sets,
    startReps,
    endReps,
    startWeight,
    endWeight,
    userId: ctx.session.user.id,
  };

  let record;
  if (id) {
    try {
      record = await ctx.db.record.update({
        where: { id },
        data,
      });
    } catch (error) {
      record = await ctx.db.record.create({
        data,
      });
    }
  } else {
    record = await ctx.db.record.create({
      data,
    });
  }

  if (record.id) {
    return {
      success: true,
      recordId: record.id,
    };
  }

  return record;
};

export default createRecordHandler;
