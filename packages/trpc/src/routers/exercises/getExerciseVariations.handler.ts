import { ExerciseVariation } from "@gym/db";
import type { ProtectedProcedureInput } from "../../helpers";
import { ZGetExerciseVariationsInput } from "./getExerciseVariations.schema";

export const getExerciseVariationsHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZGetExerciseVariationsInput>) => {
  const variations = Object.values(ExerciseVariation);

  return {
    variations,
  };
};

export default getExerciseVariationsHandler;
