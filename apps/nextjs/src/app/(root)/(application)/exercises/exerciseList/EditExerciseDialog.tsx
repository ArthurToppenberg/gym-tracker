import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@gym/ui/components/dialog";
import {
  ExerciseForm,
  type ExerciseFormValues,
} from "../components/ExerciseForm";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@gym/trpc/server";

type Exercise =
  inferRouterOutputs<AppRouter>["exercises"]["getExercises"]["items"][number];

interface EditExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercise: Exercise | null;
  onSubmit: (values: ExerciseFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
}

const EditExerciseDialog: React.FC<EditExerciseDialogProps> = ({
  open,
  onOpenChange,
  exercise,
  onSubmit,
  onCancel,
  isPending,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-h-none sm:overflow-y-visible">
      <DialogHeader>
        <DialogTitle>Edit Exercise</DialogTitle>
      </DialogHeader>
      {exercise && (
        <ExerciseForm
          initialValues={{
            id: exercise.id,
            name: exercise.name,
            variation: exercise.variation,
            primaryMuscleGroup: exercise.muscleGroup[0],
            secondaryMuscleGroup: exercise.muscleGroup[1],
          }}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isPending={isPending}
          submitLabel="Save"
          cancelLabel="Cancel"
        />
      )}
    </DialogContent>
  </Dialog>
);

export default EditExerciseDialog;
