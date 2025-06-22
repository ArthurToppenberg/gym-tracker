import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@gym/trpc/server";
import dayjs from "dayjs";

type Records = inferRouterOutputs<AppRouter>["record"]["getRecords"];

/**
 * Group records by day
 * @param records - The records to group
 * @returns An object with days which contain an array of records
 * @output ```{
 *  "2025-06-15": [
 *    {
 *     record 1,
 *     record 2,
 *     record 3,
 *    ]
 *  },
 *  "2025-06-16": [
 *    {
 *     record 1,
 *     record 2,
 *     record 3,
 *    ]
 *  },
 * ...
 * }```
 */
const groupRecordsByDay = (records: Records): Record<string, Records> => {
  return records.reduce(
    (acc, record) => {
      const date = dayjs(record.createdAt).format("YYYY-MM-DD");
      acc[date] ??= [];
      acc[date].push(record);
      return acc;
    },
    {} as Record<string, Records>,
  );
};

export { groupRecordsByDay };
