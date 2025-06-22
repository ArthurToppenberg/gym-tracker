import { z } from "zod";
import { ExerciseVariation } from "@gym/db";

export const ZCreateExerciseInput = z.object({
  id: z.string().cuid("Record must be a valid CUID").optional(),
  name: z.string(),
  variation: z.nativeEnum(ExerciseVariation),
});
