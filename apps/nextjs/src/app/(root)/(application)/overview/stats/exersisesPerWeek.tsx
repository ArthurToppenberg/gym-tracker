"use client";

import dayjs from "dayjs";
import HorizontalGraphLables, {
  type HorizontalGraphLablesProps,
} from "../components/charts/HorizontalGraphLables";
import { api } from "@gym/trpc/react";
import { groupRecordsByDay } from "./utils";
import { useMemo } from "react";

interface ExercisePerWeek {
  date: Date;
}

const ExersisesPerWeek = ({ date }: ExercisePerWeek) => {
  const weekRecords = api.record.getRecords.useQuery({
    startDate: dayjs(date).subtract(7, "day").toISOString(),
    endDate: dayjs(date).toISOString(),
  });

  const exercisesByDay: HorizontalGraphLablesProps["data"] = useMemo(() => {
    const grouped = groupRecordsByDay(weekRecords.data ?? []);

    const days = Array.from({ length: 7 }, (_, i) =>
      dayjs(date).subtract(i, "day"),
    );

    return days
      .map((day) => {
        const dateKey = day.format("YYYY-MM-DD");
        const records = grouped[dateKey] ?? [];

        return {
          date: day.toDate(),
          name: "", //TODO: intergrate the schedule into this to show the type of day
          value: records.length,
        };
      })
      .reverse();
  }, [date, weekRecords.data]);

  return (
    <HorizontalGraphLables
      title="Exercises per Week"
      description={`${exercisesByDay.reduce((acc, item) => acc + item.value, 0)} exercises in the past 7 days`}
      valueLabel="Exercises"
      data={exercisesByDay}
      isLoading={weekRecords.isLoading}
    />
  );
};

export default ExersisesPerWeek;
