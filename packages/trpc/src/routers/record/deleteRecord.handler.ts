import type { ProtectedProcedureInput } from "../../helpers";
import { ZDeleteRecordInput } from "./deleteRecord.schema";

export const deleteRecordHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZDeleteRecordInput>) => {
  const { ids } = input;

  const record = await ctx.db.record.deleteMany({
    where: { id: { in: ids }, userId: ctx.session.user.id },
  });

  const deletedRecords = record.count;

  if (deletedRecords === 0) {
    return {
      success: false,
      message: "No records deleted",
    };
  }

  return {
    success: true,
    deletedRecords,
  };
};

export default deleteRecordHandler;
