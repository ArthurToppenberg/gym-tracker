import type { ProtectedProcedureInput } from "../../helpers";
import { ZGetExercisesInput } from "./getExercises.schema";
import { ExerciseVariation, Prisma } from "@gym/db";

export const getExercisesHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZGetExercisesInput>) => {
  const { cursor, limit: inputLimit } = input;

  const MAX_LIMIT = 1000;
  const DEFAULT_LIMIT = 100;

  const limit = Math.min(inputLimit ?? DEFAULT_LIMIT, MAX_LIMIT);

  const where: Prisma.ExerciseWhereInput = {};

  const parsedQueryName = input.queryName?.trim();

  if (parsedQueryName && parsedQueryName !== "") {
    where.name = {
      contains: parsedQueryName,
      mode: "insensitive",
    };
  }

  if (
    input.queryVariation &&
    Object.values(ExerciseVariation).includes(
      input.queryVariation as unknown as ExerciseVariation
    )
  ) {
    where.variation = {
      equals: input.queryVariation as ExerciseVariation,
    };
  }

  const response = await ctx.db.exercise.findMany({
    select: {
      id: true,
      name: true,
      variation: true,
      muscleGroup: true,
      updatedAt: true,
    },
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      name: "asc", // a -> z
    },
    where,
  });

  if (!response.length) {
    return {
      items: [],
      cursor: undefined,
      hasMore: false,
    };
  }

  const lastItem = response[response.length - 1];

  return {
    items: response,
    cursor: lastItem?.id,
    hasMore: response.length === limit,
  };
};

export default getExercisesHandler;
