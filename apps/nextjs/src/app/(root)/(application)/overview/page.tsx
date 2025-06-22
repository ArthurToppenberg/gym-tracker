import { api, HydrateClient } from "@gym/trpc/server";
import OverviewPage from "./overviewPage";
import dayjs from "dayjs";

const Page = async () => {
  const date = dayjs().endOf("day").toDate();

  await api.record.getRecords.prefetch({
    startDate: dayjs(date).subtract(7, "day").toISOString(),
    endDate: dayjs(date).toISOString(),
  });

  return (
    <HydrateClient>
      <OverviewPage date={date} />
    </HydrateClient>
  );
};

export default Page;
