import dayjs from "dayjs";
import HorizontalGraphLables from "./components/charts/HorizontalGraphLables";
import OverviewGrid from "./components/OverviewGrid";
import Section from "./components/Section";

const OverviewPage = () => {
  return (
    <>
      <Section
        title="General"
        description="Information about your gym progress"
      />
      <OverviewGrid>
        <HorizontalGraphLables
          title="This Week"
          description="Your workouts this week"
          data={[
            {
              date: new Date(),
              name: "Legs",
              value: 10,
            },
            {
              date: dayjs().subtract(1, "day").toDate(),
              name: "Chest",
              value: 10,
            },
            {
              date: dayjs().subtract(2, "day").toDate(),
              name: "Back",
              value: 10,
            },
            {
              date: dayjs().subtract(3, "day").toDate(),
              name: "Shoulders",
              value: 10,
            },
            {
              date: dayjs().subtract(4, "day").toDate(),
              name: "Arms",
              value: 10,
            },
            {
              date: dayjs().subtract(5, "day").toDate(),
              name: "Core",
              value: 10,
            },
          ]}
        />
      </OverviewGrid>
    </>
  );
};

export default OverviewPage;
