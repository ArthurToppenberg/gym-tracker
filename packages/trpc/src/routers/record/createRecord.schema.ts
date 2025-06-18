import { z } from "zod";

export const ZCreateRecordInput = z.object({
  exercise: z.string().cuid("Exercise must be a valid CUID"),
  sets: z.number().min(1).max(10),
  startReps: z.number().min(1).max(12),
  endReps: z.number().min(1).max(12),
  startWeight: z.number().min(1).max(100),
  endWeight: z.number().min(1).max(100),
});
