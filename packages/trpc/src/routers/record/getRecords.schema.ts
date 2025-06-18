import { z } from "zod";

export const ZGetRecordsInput = z.object({
  startDate: z.string().datetime("Date must be a valid date"),
  endDate: z.string().datetime("Date must be a valid date"),
});
