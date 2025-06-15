import Header from "./components/Header";
import CreateRecord from "./CreateRecord/CreateRecord";
import TodaysExercises from "./TodaysExercises";
import RelevantExercises from "./relevantExercises";
import dayjs from "dayjs";
import { api, HydrateClient } from "@gym/trpc/server";

const RecordPage = async () => {
  void (await api.exercises.getExercises.prefetch({}));

  const todaysDay = dayjs().format("dddd");

  return (
    <HydrateClient>
      <Header title={`${todaysDay} - Pull Day`} />
      <TodaysExercises />
      <RelevantExercises />
      <CreateRecord />
    </HydrateClient>
  );
};

export default RecordPage;
