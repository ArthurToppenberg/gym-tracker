"use client";

import { api } from "@gym/trpc/react";
import { ExercisesCreate } from "./exerciseCreate/exersisesCreate";
import { ExerciseList } from "./exerciseList/exersiseList";

const ExercisePage = () => {
  const getExercisesQuerry = api.exercises.getExercises.useQuery({});

  return (
    <div className="flex h-full flex-col items-center gap-4 px-2 pt-2 pb-20 lg:px-[25%] lg:pt-6 lg:pb-0">
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
