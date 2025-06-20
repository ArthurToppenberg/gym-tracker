"use client";

import TodaysRecords from "./TodaysRecords/TodaysRecords";
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
          void todaysRecordsQuery.refetch();
        }}
      />
      <CreateRecord
        onSuccess={() => {
          void todaysRecordsQuery.refetch();
        }}
      />
    </>
  );
};

export default RecordPage;
