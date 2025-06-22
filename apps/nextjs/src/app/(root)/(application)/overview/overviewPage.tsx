"use client";

import OverviewGrid from "./components/OverviewGrid";
import Section from "./components/Section";
import ExersisesPerWeek from "./stats/exersisesPerWeek";
import dayjs from "dayjs";
import PieChartLable from "./components/charts/PieChartLable";

interface OverviewPageProps {
  date: Date;
}

const OverviewPage = ({ date }: OverviewPageProps) => {
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
