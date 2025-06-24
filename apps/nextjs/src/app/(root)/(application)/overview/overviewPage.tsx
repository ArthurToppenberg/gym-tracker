"use client";

import OverviewGrid from "./components/OverviewGrid";
import Section from "./components/Section";
import ExersisesHorizontalBarChart from "./stats/exersisesHorizontalBarChart";
import MuscleGroupsPieChart from "./stats/muscleGroupsPieChart";

interface OverviewPageProps {
  startDate: Date;
  endDate: Date;
}

const OverviewPage = ({ startDate, endDate }: OverviewPageProps) => {
  return (
    <>
      <Section
        title="General"
        description="Information about your gym progress"
      />
      <OverviewGrid>
        <p>startDate: {startDate.toISOString()} </p>
        <p>endDate: {endDate.toISOString()} </p>
        <ExersisesHorizontalBarChart startDate={startDate} endDate={endDate} />
        <MuscleGroupsPieChart startDate={startDate} endDate={endDate} />
      </OverviewGrid>
    </>
  );
};

export default OverviewPage;
