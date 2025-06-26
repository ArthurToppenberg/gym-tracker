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
 * Count muscle groups with custom weighting:
 * - First value in the muscle groups array in each exercise counts as 1
 * - All others count as 0.5
 * @param records - The records to count muscle groups from
 * @returns Record<string, number> where key is muscle group and value is weighted count
 */
const getWeightedMuscleGroupCounts = (
  records: Records,
): Record<string, number> => {
  const counts: Record<string, number> = {};
  records.forEach((record) => {
    const groups = record.exercise.muscleGroup;
    if (Array.isArray(groups) && groups.length > 0) {
      groups.forEach((group, idx) => {
        counts[group] ??= 0;
        counts[group] += idx === 0 ? 1 : 0.5;
      });
    }
  });
  return counts;
};

export { groupRecordsByDay, getDayCount, getWeightedMuscleGroupCounts };
