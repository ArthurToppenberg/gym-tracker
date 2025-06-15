import { z } from "zod";

export const ZGetExercisesInput = z.object({
  queryName: z.string().optional(),
  queryVariation: z.string().optional(),
  cursor: z.string().optional(),
  limit: z.number().optional(),
});
