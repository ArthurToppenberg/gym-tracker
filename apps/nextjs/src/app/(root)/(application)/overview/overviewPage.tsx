"use client";

import OverviewGrid from "./components/OverviewGrid";
import Section from "./components/Section";
import ExersisesPerWeek from "./stats/exersisesPerWeek";
import MuscleGroupsPerWeek from "./stats/muscleGroupsPerWeek";

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
        <MuscleGroupsPerWeek date={date} />
      </OverviewGrid>
    </>
  );
};

export default OverviewPage;
