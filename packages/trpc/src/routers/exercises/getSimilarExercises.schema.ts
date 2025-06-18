import { z } from "zod";

export const ZGetSimilarExercisesInput = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[\w\s\-]+$/, {
      message:
        "Name can only contain letters, numbers, spaces, dashes, and underscores.",
    }),
});
