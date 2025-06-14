import { z } from "zod";

export const ZGetExersisesInput = z.object({
  cursor: z.string().optional(),
  limit: z.number().optional(),
});
