import dayjs from "dayjs";
import { api, HydrateClient } from "@gym/trpc/server";
import RecordPage from "./recordPage";

const Page = async () => {
  const date = dayjs().toDate();

  await api.exercises.getExercises.prefetch({
    queryName: undefined, // undefined to match query from client
  });

  await api.record.getRecords.prefetch({
    startDate: dayjs(date).startOf("day").toISOString(),
    endDate: dayjs(date).endOf("day").toISOString(),
  });

  return (
    <HydrateClient>
      <RecordPage date={date} />
    </HydrateClient>
  );
};

export default Page;
