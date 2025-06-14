import type { ProtectedProcedureInput } from "../../helpers";
import { ZCreateExerciseInput } from "./createExercise.schema";
import { getExerciseSimilarity } from "@gym/db/utils";

export const createExerciseHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZCreateExerciseInput>) => {
  if (!ctx.session.user.id) {
    throw new Error("User not found");
  }

  const similarExercises = await getExerciseSimilarity(input.name);

  const duplicateExercises = similarExercises.filter(
    (exercise) => exercise.similarity === 1
  );

  const filteredDuplicateExercises = duplicateExercises[0];

  if (!filteredDuplicateExercises) {
    throw new Error("Error when checking for duplicate exercises");
  }

  const exerciseVariation = await ctx.db.exercise.findFirst({
    where: {
      id: filteredDuplicateExercises.id.toString(),
    },
    select: {
      variation: true,
    },
  });

  if (
    duplicateExercises.length > 0 &&
    exerciseVariation?.variation === input.variation
  ) {
    throw new Error(`Exercise with name ${input.name} already exists.`);
  }

  const capitalizedVariation =
    input.variation.charAt(0).toUpperCase() + input.variation.slice(1);

  const response = await ctx.db.exercise.create({
    data: {
      name: input.name,
      variation: input.variation,
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

export default createExerciseHandler;
