"use client";

import TodaysRecords from "./TodaysRecords/TodaysRecords";
import CreateRecord from "./CreateRecord/CreateRecord";
import Header from "./components/Header";
import dayjs from "dayjs";
import { api } from "@gym/trpc/react";

interface RecordPageProps {
  date: Date;
}

const RecordPage = ({ date }: RecordPageProps) => {
  const todaysRecordsQuery = api.record.getRecords.useQuery({
    startDate: dayjs(date).startOf("day").toISOString(),
    endDate: dayjs(date).endOf("day").toISOString(),
  });

  const todaysDay = dayjs(date).format("dddd");

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
