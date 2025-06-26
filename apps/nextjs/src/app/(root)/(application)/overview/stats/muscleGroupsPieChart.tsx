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
      data={Object.entries(weightedMuscleGroups).map(([name, value]) => ({
        name,
        value,
      }))}
      startDate={startDate}
      endDate={endDate}
      isLoading={records.isLoading}
    />
  );
};

export default MuscleGroupsPieChart;
