import z from "zod";
import { protectedProcedure } from "./trpc";

export interface ProtectedProcedureInput<
  I extends
    | z.AnyZodObject
    | z.ZodString
    | z.ZodEnum<[string, ...string[]]>
    | undefined = undefined,
> {
  ctx: Parameters<
    Parameters<(typeof protectedProcedure)["query"]>[0]
  >[0]["ctx"];
  input: I extends
    | z.AnyZodObject
    | z.ZodString
    | z.ZodEnum<[string, ...string[]]>
    ? z.infer<I>
    : I;
  signal: Parameters<
    Parameters<(typeof protectedProcedure)["query"]>[0]
  >[0]["signal"];
}
