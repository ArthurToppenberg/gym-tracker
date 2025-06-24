import dayjs from "dayjs";
import { api, HydrateClient } from "@gym/trpc/server";
import RecordPage from "./recordPage";
import { auth } from "@gym/trpc/auth";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);

const Page = async () => {
  const session = await auth();
  if (!session?.user.timezone) {
    return <div>No timezone found</div>;
  }
  const startDate = dayjs().tz(session.user.timezone).startOf("day").toDate();
  const endDate = dayjs().tz(session.user.timezone).endOf("day").toDate();

  await api.exercises.getExercises.prefetch({
    queryName: undefined, // undefined to match query from client
  });

  await api.record.getRecords.prefetch({
    startDate: dayjs(startDate).toISOString(),
    endDate: dayjs(endDate).toISOString(),
  });

  return (
    <HydrateClient>
      <RecordPage startDate={startDate} endDate={endDate} />
    </HydrateClient>
  );
};

export default Page;
