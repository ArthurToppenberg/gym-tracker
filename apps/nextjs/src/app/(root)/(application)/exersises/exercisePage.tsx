"use client";

import { api } from "@gym/trpc/react";
import { ExercisesCreate } from "./exerciseCreate/exersisesCreate";
import { ExerciseList } from "./exerciseList/exersiseList";

const ExercisePage = () => {
  const getExercisesQuerry = api.exercises.getExercises.useQuery({});

  return (
    <div className="flex flex-col items-center gap-4 px-[25%] pt-6">
      <ExerciseList exercises={getExercisesQuerry?.data?.items ?? []} />
      <ExercisesCreate
        onExerciseCreated={() => {
          void getExercisesQuerry.refetch();
        }}
      />
    </div>
  );
};

export default ExercisePage;
