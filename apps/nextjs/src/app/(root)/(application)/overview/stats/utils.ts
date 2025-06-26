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

const getDayCount = (startDate: Date, endDate: Date): number => {
  return dayjs(endDate).diff(dayjs(startDate), "day") + 1;
};

/**
 * Group records by muscle group:
 * - Each muscle group key contains an array of records where that muscle group was trained
 * @param records - The records to group by muscle group
 * @returns Record<string, Records> where key is muscle group and value is array of records
 */
const getWeightedMuscleGroupCounts = (
  records: Records,
): Record<string, Records> => {
  const grouped: Record<string, Records> = {};
  records.forEach((record) => {
    const groups = record.exercise.muscleGroup;
    if (Array.isArray(groups) && groups.length > 0) {
      groups.forEach((group) => {
        grouped[group] ??= [];
        grouped[group].push(record);
      });
    }
  });
  return grouped;
};

export { groupRecordsByDay, getDayCount, getWeightedMuscleGroupCounts };
