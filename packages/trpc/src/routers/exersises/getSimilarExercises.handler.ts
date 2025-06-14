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

  return {
    similarExersises: mostSimilarExercises ?? [],
  };
};

export default getSimilarExercisesHandler;
