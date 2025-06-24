"use client";

import dayjs from "dayjs";
import HorizontalGraphLables, {
  type HorizontalGraphLablesProps,
} from "../components/charts/HorizontalGraphLables";
import { api } from "@gym/trpc/react";
import { groupRecordsByDay } from "./utils";
import { useMemo } from "react";

interface ExersisesHorizontalBarChartProps {
  startDate: Date;
  endDate: Date;
}

const ExersisesHorizontalBarChart = ({
  startDate,
  endDate,
}: ExersisesHorizontalBarChartProps) => {
  const weekRecords = api.record.getRecords.useQuery({
    startDate: dayjs(startDate).toISOString(),
    endDate: dayjs(endDate).toISOString(),
  });

  console.log("weekRecords", JSON.stringify(weekRecords.data, null, 2));

  const exercisesByDay: HorizontalGraphLablesProps["data"] = useMemo(() => {
    if (!weekRecords.data) return [];

    // Ensure both startDate and endDate are at start of day for consistency
    const start = dayjs(startDate).startOf("day");
    const end = dayjs(endDate).startOf("day");
    const dayCount = Math.abs(end.diff(start, "day")) + 1;
    const isAscending = end.isAfter(start);

    // Build days array from start to end (inclusive)
    const days = Array.from({ length: dayCount }, (_, i) =>
      (isAscending ? start.add(i, "day") : start.subtract(i, "day")).toDate(),
    );

    const grouped = groupRecordsByDay(weekRecords.data);

    return days.map((day) => {
      const dateKey = dayjs(day).format("YYYY-MM-DD");
      const records = grouped[dateKey] ?? [];
      return {
        date: day,
        name: "", // TODO: integrate the schedule into this to show the type of day
        value: records.length,
      };
    });
  }, [startDate, endDate, weekRecords.data]);

  return (
    <HorizontalGraphLables
      title="Exercises"
      description={`${exercisesByDay.reduce((acc, item) => acc + item.value, 0)} exercises in the past 7 days`}
      valueLabel="Exercises"
      data={exercisesByDay}
      isLoading={weekRecords.isLoading}
    />
  );
};

export default ExersisesHorizontalBarChart;
