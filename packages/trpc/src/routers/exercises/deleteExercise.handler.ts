import { TRPCError } from "@trpc/server";
import type { ProtectedProcedureInput } from "../../helpers";
import { ZDeleteExerciseInput } from "./deleteExercise.schema";

export const deleteExerciseHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZDeleteExerciseInput>) => {
  if (ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to delete exercises",
    });
  }

  const { ids } = input;

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
