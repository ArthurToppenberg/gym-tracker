import { ExercisesCreate } from "./exerciseCreate/exersisesCreate";
import { ExercisesList } from "./exersisesList";

const ExercisesPage = () => {
  return (
    <div className="flex flex-row">
      <ExercisesList />
      <ExercisesCreate />
    </div>
  );
};

export default ExercisesPage;
