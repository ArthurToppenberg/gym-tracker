import { z } from "zod";

export const ZCreateExersiseInput = z.object({
  name: z.string(),
  machine: z.string(),
});
