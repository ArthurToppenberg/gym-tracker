import type { ProtectedProcedureInput } from "../../helpers";
import { ZGetRecordsInput } from "./getRecords.schema";

export const getRecordsHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZGetRecordsInput>) => {
  const { startDate, endDate } = input;

  const records = await ctx.db.record.findMany({
    where: {
      userId: ctx.session.user.id,
      createdAt: { gte: startDate, lte: endDate },
    },
    select: {
      id: true,
      exercise: {
        select: {
          name: true,
          variation: true,
        },
      },
      sets: true,
      startReps: true,
      endReps: true,
      startWeight: true,
      endWeight: true,
    },
  });

  return records;
};

export default getRecordsHandler;
