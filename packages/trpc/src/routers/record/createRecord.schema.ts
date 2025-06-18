import { z } from "zod";

export const ZCreateRecordInput = z.object({
  // With an id we upsert the record
  id: z.string().cuid("Record must be a valid CUID").optional(),
  exercise: z.string().cuid("Exercise must be a valid CUID"),
  sets: z.number().min(1).max(10),
  startReps: z.number().min(1).max(50),
  endReps: z.number().min(1).max(50),
  startWeight: z.number().min(1).max(100),
  endWeight: z.number().min(1).max(100),
});
