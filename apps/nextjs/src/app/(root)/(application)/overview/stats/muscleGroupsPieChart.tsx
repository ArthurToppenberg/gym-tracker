import dayjs from "dayjs";
import PieChartLable from "../components/charts/PieChartLable";

interface MuscleGroupsPieChartProps {
  startDate: Date;
  endDate: Date;
}

const MuscleGroupsPieChart = ({
  startDate,
  endDate,
}: MuscleGroupsPieChartProps) => {
  return (
    <PieChartLable
      title={"Muscle Groups this week"}
      description={""}
      data={[
        {
          name: "Chest",
          value: 15,
          date: dayjs(endDate).subtract(6, "day").toDate(),
        },
        {
          name: "Back",
          value: 8,
          date: dayjs(endDate).subtract(5, "day").toDate(),
        },
        {
          name: "Legs",
          value: 19,
          date: dayjs(endDate).subtract(4, "day").toDate(),
        },
        {
          name: "Shoulders",
          value: 12,
          date: dayjs(endDate).subtract(3, "day").toDate(),
        },
        {
          name: "Biceps",
          value: 6,
          date: dayjs(endDate).subtract(2, "day").toDate(),
        },
        {
          name: "Triceps",
          value: 14,
          date: dayjs(endDate).subtract(1, "day").toDate(),
        },
        {
          name: "Forearms",
          value: 3,
          date: dayjs(endDate).toDate(),
        },
      ]}
    />
  );
};

export default MuscleGroupsPieChart;
