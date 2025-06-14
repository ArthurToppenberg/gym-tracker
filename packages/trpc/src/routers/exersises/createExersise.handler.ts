import type { ProtectedProcedureInput } from "../../helpers";
import { ZCreateExersiseInput } from "./createExersise.schema";
import { getExerciseSimilarity } from "@gym/db/utils";

export const createExersiseHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZCreateExersiseInput>) => {
  if (!ctx.session.user.id) {
    throw new Error("User not found");
  }

  const similarExercises = await getExerciseSimilarity(input.name);

  const duplicateExercises = similarExercises.filter(
    (exercise) => exercise.similarity === 1
  );

  if (duplicateExercises.length > 0) {
    throw new Error(`Exercise with name ${input.name} already exists.`);
  }

  const response = await ctx.db.exercise.create({
    data: {
      name: input.name,
      machine: input.machine,
      createdBy: { connect: { id: ctx.session.user.id } },
    },
    select: {
      id: true,
    },
  });

  if (!response.id) {
    throw new Error("Failed to create exersise");
  }

  return {
    id: response.id,
  };
};

export default createExersiseHandler;
