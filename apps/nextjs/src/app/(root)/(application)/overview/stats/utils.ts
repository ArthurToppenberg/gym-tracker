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

/**
 * Get the different muscle groups from the records
 * @param records - The records to get the muscle groups from
 * @returns record <muscleGroup, Array of records with that muscle group>
 */
const getDifferentMuscleGroups = (
  records: Records,
): Record<string, Records> => {
  return records.reduce(
    (acc, record) => {
      if (Array.isArray(record.exercise.muscleGroup)) {
        record.exercise.muscleGroup.forEach((group) => {
          acc[group] ??= [];
          acc[group].push(record);
        });
      }
      return acc;
    },
    {} as Record<string, Records>,
  );
};

const getDayCount = (startDate: Date, endDate: Date): number => {
  return dayjs(endDate).diff(dayjs(startDate), "day") + 1;
};

export { groupRecordsByDay, getDifferentMuscleGroups, getDayCount };
