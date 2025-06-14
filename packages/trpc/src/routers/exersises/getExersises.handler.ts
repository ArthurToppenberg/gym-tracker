import { ProtectedProcedureInput } from "../../helpers";
import type { ZGetExersisesInput } from "./getExersises.schema";

export const getExersisesHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZGetExersisesInput>) => {
  const { cursor, limit: inputLimit } = input;

  const MAX_LIMIT = 1000;
  const DEFAULT_LIMIT = 100;

  const limit = Math.min(inputLimit ?? DEFAULT_LIMIT, MAX_LIMIT);

  const response = await ctx.db.exercise.findMany({
    select: {
      id: true,
      name: true,
      machine: true,
      updatedAt: true,
    },
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      name: "asc", // a -> z
    },
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

export default getExersisesHandler;
