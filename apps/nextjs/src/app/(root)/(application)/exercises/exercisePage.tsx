"use client";

import { api } from "@gym/trpc/react";
import { ExercisesCreate } from "./exerciseCreate/exersisesCreate";
import { ExerciseList } from "./exerciseList/exersiseList";
import { useSession } from "next-auth/react";

const ExercisePage = () => {
  const session = useSession();
  const getExercisesQuerry = api.exercises.getExercises.useQuery({});

  return (
    <>
      <ExerciseList
        exercises={getExercisesQuerry?.data?.items ?? []}
        onExerciseDeleted={() => {
          void getExercisesQuerry.refetch();
        }}
        onExerciseEdited={() => {
          void getExercisesQuerry.refetch();
        }}
      />
      {session?.data?.user?.role === "ADMIN" && (
        <ExercisesCreate
          onExerciseCreated={() => {
            void getExercisesQuerry.refetch();
          }}
        />
      )}
    </>
  );
};

export default ExercisePage;
