import { api, HydrateClient } from "@gym/trpc/server";
import ExercisePage from "./exercisePage";

const ExercisesPage = async () => {
  // void (await api.exercises.getExercises.prefetch({}));
  // void (await api.exercises.getExerciseVariations.prefetch({}));

  return (
    // <HydrateClient>
    //   <ExercisePage />
    // </HydrateClient>
    <p>Hello</p>
  );
};

export default ExercisesPage;
