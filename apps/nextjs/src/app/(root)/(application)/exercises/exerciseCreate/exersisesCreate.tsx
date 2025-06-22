"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import { api } from "@gym/trpc/react";
import React from "react";
import { ExerciseCreatedDialog } from "./ExerciseCreatedDialog";
import { SimilarExercisesDialog } from "./SimilarExercisesDialog";
import { Dialog } from "@gym/ui/components/dialog";
import type { ExerciseVariation } from "./types";
import {
  ExerciseForm,
  type ExerciseFormValues,
} from "../components/ExerciseForm";

interface ExercisesCreateProps {
  onExerciseCreated?: () => void;
}

export const ExercisesCreate = ({
  onExerciseCreated,
}: ExercisesCreateProps) => {
  const [createdName, setCreatedName] = React.useState("");
  const [showCreatedDialog, setShowCreatedDialog] = React.useState(false);
  const [showSimilarDialog, setShowSimilarDialog] = React.useState(false);
  const [pendingExercise, setPendingExercise] =
    React.useState<ExerciseFormValues | null>(null);
  const [similarExercises, setSimilarExercises] = React.useState<
    {
      id: number;
      name: string;
      variation: ExerciseVariation;
      similarity: number;
    }[]
  >([]);
  const [similarityInput, setSimilarityInput] = React.useState<{
    name: string;
  }>({ name: "" });
  const [localError, setLocalError] = React.useState<string | null>(null);

  const { mutate: createExercise, isPending: isCreating } =
    api.exercises.createExercise.useMutation({
      onSuccess: (data, variables) => {
        setCreatedName(variables.name);
        setShowCreatedDialog(true);
        setSimilarExercises([]);
        setPendingExercise(null);
        setLocalError(null);
        if (onExerciseCreated) {
          onExerciseCreated();
        }
      },
      onError: (error) => {
        setLocalError(error.message);
      },
    });

  const similarQuery = api.exercises.getSimilarExercises.useQuery(
    similarityInput,
    {
      enabled: !!similarityInput.name,
    },
  );

  React.useEffect(() => {
    if (!pendingExercise || !similarQuery.isSuccess) return;
    const similar = similarQuery.data?.similarExersises || [];
    if (similar.length === 0) {
      createExercise({
        ...pendingExercise,
        variation: pendingExercise.variation as ExerciseVariation,
      });
      setPendingExercise(null);
    } else if (similar.length > 0) {
      setSimilarExercises(similar);
      setShowSimilarDialog(true);
    }
  }, [
    similarQuery.isSuccess,
    similarQuery.data,
    pendingExercise,
    createExercise,
  ]);

  function handleFormSubmit(values: ExerciseFormValues) {
    setLocalError(null);
    setPendingExercise(values);
    setSimilarityInput({ name: values.name });
  }

  function handleConfirmCreate() {
    if (pendingExercise) {
      createExercise({
        ...pendingExercise,
        variation: pendingExercise.variation as ExerciseVariation,
      });
      setPendingExercise(null);
    }
    setShowSimilarDialog(false);
  }

  function handleCancelCreate() {
    setShowSimilarDialog(false);
    setPendingExercise(null);
  }

  return (
    <div className="w-full">
      <Dialog open={showCreatedDialog} onOpenChange={setShowCreatedDialog}>
        <Card>
          <CardHeader>
            <CardTitle>Create New Exercise</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ExerciseForm
              onSubmit={handleFormSubmit}
              isPending={isCreating || similarQuery.isFetching}
              submitLabel={
                isCreating || similarQuery.isFetching ? "Checking..." : "Create"
              }
            />
            {localError && (
              <div className="mt-2 mb-2 text-center text-sm text-red-500">
                {localError}
              </div>
            )}
          </CardContent>
        </Card>
      </Dialog>
      <ExerciseCreatedDialog
        open={showCreatedDialog}
        onOpenChange={setShowCreatedDialog}
        createdName={createdName}
      />
      <SimilarExercisesDialog
        open={showSimilarDialog}
        onOpenChange={setShowSimilarDialog}
        mostSimilarExercises={similarExercises}
        onConfirm={handleConfirmCreate}
        onCancel={handleCancelCreate}
      />
    </div>
  );
};
