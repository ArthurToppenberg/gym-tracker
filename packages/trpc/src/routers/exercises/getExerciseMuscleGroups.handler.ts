import { ExerciseMuscleGroup } from "@gym/db";
import type { ProtectedProcedureInput } from "../../helpers";
import { ZGetExerciseMuscleGroupsInput } from "./getExerciseMuscleGroups.schema";

export const getExerciseMuscleGroupsHandler = async ({
  ctx,
  input,
}: ProtectedProcedureInput<typeof ZGetExerciseMuscleGroupsInput>) => {
  const muscleGroup = Object.values(ExerciseMuscleGroup);

  return {
    muscleGroup,
  };
};

export default getExerciseMuscleGroupsHandler;
