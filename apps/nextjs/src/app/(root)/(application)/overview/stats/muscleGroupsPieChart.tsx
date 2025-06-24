import dayjs from "dayjs";
import PieChartLable from "../components/charts/PieChartLable";
import { api } from "@gym/trpc/react";
import { getDayCount, getDifferentMuscleGroups } from "./utils";
import type { Records } from "./types";

interface MuscleGroupsPieChartProps {
  startDate: Date;
  endDate: Date;
}

const MuscleGroupsPieChart = ({
  startDate,
  endDate,
}: MuscleGroupsPieChartProps) => {
  const records = api.record.getRecords.useQuery({
    startDate: dayjs(startDate).toISOString(),
    endDate: dayjs(endDate).toISOString(),
  });
  const muscleGroups = getDifferentMuscleGroups(records.data ?? []);
  const muscleGroupValues = Object.values(muscleGroups);
  const dayCount = getDayCount(startDate, endDate);
  return (
    <PieChartLable
      title={"Muscle Groups"}
      description={`${muscleGroupValues.reduce((acc: number, value: Records) => acc + value.length, 0)} different muscle groups in the past ${dayCount} days`}
      data={Object.entries(muscleGroups).map(([name, value]) => ({
        name,
        value: value.length,
      }))}
      startDate={startDate}
      endDate={endDate}
      isLoading={records.isLoading}
    />
  );
};

export default MuscleGroupsPieChart;
