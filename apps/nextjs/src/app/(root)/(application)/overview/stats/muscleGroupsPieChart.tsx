import dayjs from "dayjs";
import PieChartLable from "../components/charts/PieChartLable";
import { api } from "@gym/trpc/react";
import { getDayCount, getWeightedMuscleGroupCounts } from "./utils";

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
  const weightedMuscleGroups = getWeightedMuscleGroupCounts(records.data ?? []);
  const dayCount = getDayCount(startDate, endDate);
  return (
    <PieChartLable
      title={"Muscle Groups"}
      description={`${Object.keys(weightedMuscleGroups).length} muscle groups in the past ${dayCount} days`}
      data={Object.entries(weightedMuscleGroups).map(([name, recs]) => ({
        name,
        value: recs.length,
        metadata: recs.map((record) => {
          const recordDate = dayjs(record.createdAt);
          const today = dayjs().format("YYYY-MM-DD");
          const dayLable =
            recordDate.format("YYYY-MM-DD") === today
              ? "Today"
              : recordDate.format("dddd");
          return `${dayLable} (${recordDate.format("MMM D")}) - ${record.exercise.name}`;
        }),
      }))}
      startDate={startDate}
      endDate={endDate}
      isLoading={records.isLoading}
    />
  );
};

export default MuscleGroupsPieChart;
