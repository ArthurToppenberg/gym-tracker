import { z } from "zod";
import { ExerciseVariation } from "@gym/db";

export const ZCreateExerciseInput = z.object({
  name: z.string(),
  variation: z.nativeEnum(ExerciseVariation),
});
