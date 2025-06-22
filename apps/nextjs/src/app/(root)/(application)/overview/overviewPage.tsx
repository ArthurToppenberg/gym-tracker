"use client";

import OverviewGrid from "./components/OverviewGrid";
import Section from "./components/Section";
import ExersisesPerWeek from "./stats/exersisesPerWeek";
import dayjs from "dayjs";
import PieChartLable from "./components/charts/PieChartLable";

const OverviewPage = () => {
  const date = dayjs().endOf("day").toDate();

  return (
    <>
      <Section
        title="General"
        description="Information about your gym progress"
      />
      <OverviewGrid>
        <ExersisesPerWeek date={date} />
        <PieChartLable />
      </OverviewGrid>
    </>
  );
};

export default OverviewPage;
