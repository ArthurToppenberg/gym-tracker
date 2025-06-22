"use client";

import { api } from "@gym/trpc/react";
import { redirect } from "next/navigation";

const Page = () => {
  const test = api.exercises.getExercises.useQuery({});
  return <p>test: {JSON.stringify(test.data)}</p>;
};

export default Page;
