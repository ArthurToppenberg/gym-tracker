import { api, HydrateClient } from "@gym/trpc/server";
import OverviewPage from "./overviewPage";
import dayjs from "dayjs";

const Page = async () => {
  const startDate = dayjs().subtract(7, "day").startOf("day").toDate();
  const endDate = dayjs().endOf("day").toDate();

  await api.record.getRecords.prefetch({
    startDate: dayjs(startDate).toISOString(),
    endDate: dayjs(endDate).toISOString(),
  });

  return (
    <HydrateClient>
      <OverviewPage startDate={startDate} endDate={endDate} />
    </HydrateClient>
  );
};

export default Page;
