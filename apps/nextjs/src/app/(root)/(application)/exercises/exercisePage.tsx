"use client";

import { api } from "@gym/trpc/react";
import { ExercisesCreate } from "./exerciseCreate/exersisesCreate";
import { ExerciseList } from "./exerciseList/exersiseList";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const ExercisePage = () => {
  const session = useSession();
  const [queryName, setQueryName] = useState("");
  const getExercisesQuerry = api.exercises.getExercises.useQuery({ queryName });
  const [displayedExercises, setDisplayedExercises] = useState(
    getExercisesQuerry.data?.items ?? [],
  );

  useEffect(() => {
    if (getExercisesQuerry.data?.items) {
      setDisplayedExercises(getExercisesQuerry.data.items);
    }
    // Only update when new data arrives
  }, [getExercisesQuerry.data?.items]);

  return (
    <>
      <ExerciseList
        exercises={displayedExercises}
        onExerciseDeleted={() => {
          void getExercisesQuerry.refetch();
        }}
        onExerciseEdited={() => {
          void getExercisesQuerry.refetch();
        }}
        onExerciseQueryChange={(value) => {
          setQueryName(value);
        }}
        loading={getExercisesQuerry.isLoading}
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
