import { z } from "zod";

export const ZDeleteExerciseInput = z.object({
  ids: z.array(z.string()),
});
