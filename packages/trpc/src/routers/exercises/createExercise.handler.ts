import { TRPCError } from "@trpc/server";
import type { ProtectedProcedureInput } from "../../helpers";
import { ZCreateExerciseInput } from "./createExercise.schema";
import { getExerciseSimilarity } from "@gym/db/utils";

export const createExerciseHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZCreateExerciseInput>) => {
  if (ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to create exercises",
    });
  }

  if (input.id) {
    const exercise = await ctx.db.exercise.update({
      where: {
        id: input.id,
      },
      data: {
        ...input,
      },
      select: {
        id: true,
      },
    });

    if (!exercise.id) {
      throw new Error("Failed to update exercise");
    }

    return {
      id: exercise.id,
    };
  }

  const similarExercises = await getExerciseSimilarity(input.name);

  const duplicateExercises = similarExercises.filter(
    (exercise) => exercise.similarity === 1
  );

  const filteredDuplicateExercises = duplicateExercises[0];

  if (filteredDuplicateExercises) {
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
  }

  const capitalizedName =
    input.name.charAt(0).toUpperCase() + input.name.slice(1);

  const response = await ctx.db.exercise.create({
    data: {
      name: capitalizedName,
      variation: input.variation,
      createdBy: { connect: { id: ctx.session.user.id } },
      muscleGroup: input.muscleGroup,
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
