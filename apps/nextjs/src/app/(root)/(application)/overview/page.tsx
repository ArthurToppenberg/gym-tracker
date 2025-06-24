import { api, HydrateClient } from "@gym/trpc/server";
import OverviewPage from "./overviewPage";
import dayjs from "dayjs";
import { auth } from "@gym/trpc/auth";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { redirect } from "next/navigation";

dayjs.extend(timezone);
dayjs.extend(utc);

const Page = async () => {
  const session = await auth();
  if (!session?.user.timezone) {
    redirect("/auth/signin");
  }
  const startDate = dayjs()
    .tz(session.user.timezone)
    .subtract(6, "day")
    .startOf("day")
    .toDate();
  const endDate = dayjs().tz(session.user.timezone).endOf("day").toDate();

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
