import { z } from "zod";

export const ZGetSimilarExercisesInput = z.object({
  name: z.string(),
});
