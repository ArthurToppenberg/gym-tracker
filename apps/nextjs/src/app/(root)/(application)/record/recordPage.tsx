"use client";

import TodaysRecords from "./TodaysRecords/TodaysExercises";
import RelevantExercises from "./RelevantExercises";
import CreateRecord from "./CreateRecord/CreateRecord";
import Header from "./components/Header";
import dayjs from "dayjs";
import { api } from "@gym/trpc/react";

interface RecordPageProps {
  todaysDay: string;
}

const RecordPage = ({ todaysDay }: RecordPageProps) => {
  const todaysRecordsQuery = api.record.getRecords.useQuery({
    startDate: dayjs().startOf("day").toISOString(),
    endDate: dayjs().endOf("day").toISOString(),
  });

  return (
    <>
      <Header title={`${todaysDay} - Pull Day`} />
      <TodaysRecords
        todaysRecords={todaysRecordsQuery.data ?? []}
        onDelete={() => {
          todaysRecordsQuery.refetch();
        }}
      />
      <RelevantExercises />
      <CreateRecord
        onSuccess={() => {
          todaysRecordsQuery.refetch();
        }}
      />
    </>
  );
};

export default RecordPage;
