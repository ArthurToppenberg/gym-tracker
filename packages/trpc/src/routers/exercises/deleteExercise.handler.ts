import { TRPCError } from "@trpc/server";
import type { ProtectedProcedureInput } from "../../helpers";
import { ZDeleteExerciseInput } from "./deleteExercise.schema";

export const deleteExerciseHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZDeleteExerciseInput>) => {
  const { ids } = input;

  //if a exercise has any records related then i cant be deleted
  const relatedRecords = await ctx.db.record.findMany({
    where: {
      exerciseId: { in: ids },
    },
    select: {
      id: true,
    },
  });

  if (relatedRecords.length > 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Cannot delete exercise has ${relatedRecords.length} related records`,
    });
  }

  await ctx.db.exercise.deleteMany({
    where: {
      id: { in: ids },
    },
  });

  return { success: true };
};

export default deleteExerciseHandler;
