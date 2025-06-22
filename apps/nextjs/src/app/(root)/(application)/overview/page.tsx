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
        <HorizontalGraphLables />
      </OverviewGrid>
    </>
  );
};

export default OverviewPage;
