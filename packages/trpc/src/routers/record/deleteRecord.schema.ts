import { z } from "zod";

export const ZDeleteRecordInput = z.object({
  ids: z.array(z.string().cuid("Record must be a valid CUID")),
});
