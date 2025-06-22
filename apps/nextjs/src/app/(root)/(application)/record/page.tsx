import dayjs from "dayjs";
import { api } from "@gym/trpc/server";
import RecordPage from "./recordPage";

const Page = async () => {
  await api.exercises.getExercises.prefetch({
    queryName: undefined, // undefined to match query from client
  });

  await api.record.getRecords.prefetch({
    startDate: dayjs().startOf("day").toISOString(),
    endDate: dayjs().endOf("day").toISOString(),
  });

  const todaysDay = dayjs().format("dddd");

  return <RecordPage todaysDay={todaysDay} />;
};

export default Page;
