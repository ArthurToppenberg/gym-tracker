import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Exercise name must be at least 4 characters." })
    .max(20, { message: "Exercise name must be at most 20 characters." }),
  machine: z
    .string()
    .min(1, { message: "Machine name is required." })
    .max(50, { message: "Machine name must be at most 50 characters." }),
});

export type ExerciseFormValues = z.infer<typeof formSchema>;
