import { z } from "zod";

export const ZGetExercisesInput = z.object({
  cursor: z.string().optional(),
  limit: z.number().optional(),
});
