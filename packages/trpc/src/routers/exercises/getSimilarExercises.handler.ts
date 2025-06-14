import { getExerciseSimilarity } from "@gym/db/utils";
import type { ProtectedProcedureInput } from "../../helpers";
import { ZGetSimilarExercisesInput } from "./getSimilarExercises.schema";

export const getSimilarExercisesHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZGetSimilarExercisesInput>) => {
  const mostSimilarExercises = await getExerciseSimilarity(input.name);

  console.log(
    `checking similarity for ${input.name}, mostSimilarExercises: ${mostSimilarExercises}`
  );

  if (mostSimilarExercises.length === 0) {
    return {
      similarExersises: [],
    };
  }

  //get extra data
  const mostSimilarExercisesWithExtraData = await ctx.db.exercise.findMany({
    where: {
      id: {
        in: mostSimilarExercises.map((exercise) => exercise.id.toString()),
      },
    },
    select: {
      id: true,
      variation: true,
    },
  });

  //merge
  const mergedExercises = mostSimilarExercises
    .map((exercise) => {
      const exerciseWithExtraData = mostSimilarExercisesWithExtraData.find(
        (e) => e.id === exercise.id.toString()
      );
      if (!exerciseWithExtraData) {
        //skip this one
        return null;
      }
      return { ...exercise, variation: exerciseWithExtraData.variation };
    })
    .filter((exercise) => exercise !== null);

  return {
    similarExersises: mergedExercises ?? [],
  };
};

export default getSimilarExercisesHandler;
