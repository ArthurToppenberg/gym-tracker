import dayjs from "dayjs";
import { api, HydrateClient } from "@gym/trpc/server";
import RecordPage from "./recordPage";

const Page = async () => {
  void (await api.exercises.getExercises.prefetch({
    queryName: undefined,
  }));

  void api.record.getRecords.prefetch({
    startDate: dayjs().startOf("day").toISOString(),
    endDate: dayjs().endOf("day").toISOString(),
  });

  const todaysDay = dayjs().format("dddd");

  return (
    <HydrateClient>
      <RecordPage todaysDay={todaysDay} />
    </HydrateClient>
  );
};

export default Page;
