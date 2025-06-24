"use client";

import TodaysRecords from "./TodaysRecords/TodaysRecords";
import CreateRecord from "./CreateRecord/CreateRecord";
import Header from "./components/Header";
import dayjs from "dayjs";
import { api } from "@gym/trpc/react";

interface RecordPageProps {
  startDate: Date;
  endDate: Date;
}

const RecordPage = ({ startDate, endDate }: RecordPageProps) => {
  const todaysRecordsQuery = api.record.getRecords.useQuery({
    startDate: dayjs(startDate).toISOString(),
    endDate: dayjs(endDate).toISOString(),
  });

  const todaysDay = dayjs(startDate).format("dddd");

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
