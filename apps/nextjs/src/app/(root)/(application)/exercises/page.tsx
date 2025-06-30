import { api, HydrateClient } from "@gym/trpc/server";
import ExercisePage from "./exercisePage";

const ExercisesPage = async () => {
  void (await api.exercises.getExercises.prefetch({ queryName: "" }));
  void (await api.exercises.getExerciseVariations.prefetch({}));
  void (await api.exercises.getExerciseMuscleGroups.prefetch({}));

  return (
    <HydrateClient>
      <ExercisePage />
    </HydrateClient>
  );
};

export default ExercisesPage;
