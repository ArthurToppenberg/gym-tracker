import { api, HydrateClient } from "@gym/trpc/server";
import OverviewPage from "./overviewPage";
import dayjs from "dayjs";
import { auth } from "@gym/trpc/auth";
import { db } from "@gym/db";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

const Page = async () => {
  const session = await auth();
  if (!session?.user.id) {
    return <div>No user found</div>;
  }
  const userTimezone = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      timezone: true,
    },
  });
  if (!userTimezone) {
    return <div>No timezone found</div>;
  }
  const startDate = dayjs()
    .tz(userTimezone.timezone)
    .subtract(7, "day")
    .startOf("day")
    .toDate();
  const endDate = dayjs().tz(userTimezone.timezone).endOf("day").toDate();

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
