"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gym/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@gym/trpc/react";
import { Input } from "@gym/ui/components/input";
import { Button } from "@gym/ui/components/button";
import React from "react";
import { formSchema } from "./exerciseCreate/exersisesFormSchema";
import type { ExerciseFormValues } from "./exerciseCreate/exersisesFormSchema";
import { ExerciseCreatedDialog } from "./exerciseCreate/ExerciseCreatedDialog";
import { SimilarExercisesDialog } from "./exerciseCreate/SimilarExercisesDialog";
import { Dialog } from "@gym/ui/components/dialog";

export const ExercisesCreate = () => {
  const [createdName, setCreatedName] = React.useState("");
  const [showCreatedDialog, setShowCreatedDialog] = React.useState(false);
  const [showSimilarDialog, setShowSimilarDialog] = React.useState(false);
  const [pendingExercise, setPendingExercise] =
    React.useState<ExerciseFormValues | null>(null);
  const [similarExercises, setSimilarExercises] = React.useState<
    { id: number; name: string; similarity: number }[]
  >([]);
  const [similarityInput, setSimilarityInput] = React.useState<{
    name: string;
  }>({ name: "" });

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      machine: "",
    },
  });

  const {
    mutate: createExercise,
    isPending: isCreating,
    error: createError,
  } = api.exersises.createExersise.useMutation({
    onSuccess: (data, variables) => {
      setCreatedName(variables.name);
      setShowCreatedDialog(true);
      setSimilarExercises([]);
      setPendingExercise(null);
      form.reset();
    },
  });

  const similarQuery = api.exersises.getSimilarExercises.useQuery(
    similarityInput,
    {
      enabled: !!similarityInput.name,
    },
  );

  React.useEffect(() => {
    if (!pendingExercise || !similarQuery.isSuccess) return;
    const similar = similarQuery.data?.similarExersises || [];
    if (similar.length === 0) {
      createExercise(pendingExercise);
      setPendingExercise(null);
    } else {
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
    setPendingExercise(values);
    setSimilarityInput({ name: values.name });
  }

  function handleConfirmCreate() {
    if (pendingExercise) {
      createExercise(pendingExercise);
      setPendingExercise(null);
    }
    setShowSimilarDialog(false);
  }

  function handleCancelCreate() {
    setShowSimilarDialog(false);
    setPendingExercise(null);
    form.reset();
  }

  return (
    <div className="h-full w-1/2 p-4">
      <Dialog open={showCreatedDialog} onOpenChange={setShowCreatedDialog}>
        <Card>
          <CardHeader>
            <CardTitle>Create New Exercise</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="machine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {createError && (
                  <div className="mb-2 text-center text-sm text-red-500">
                    {createError.message}
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isCreating || similarQuery.isFetching}
                  >
                    {isCreating || similarQuery.isFetching
                      ? "Checking..."
                      : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
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
