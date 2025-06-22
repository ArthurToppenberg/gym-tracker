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
import { z } from "zod";
import { ExerciseCreatedDialog } from "./ExerciseCreatedDialog";
import { SimilarExercisesDialog } from "./SimilarExercisesDialog";
import { Dialog } from "@gym/ui/components/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@gym/ui/components/select";
import type { ExerciseVariation } from "./types";

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

  const variationsQuery = api.exercises.getExerciseVariations.useQuery({});

  const formSchema = React.useMemo(() => {
    const variations = variationsQuery.data?.variations;
    if (variations && variations.length > 0) {
      return z.object({
        name: z
          .string()
          .min(1, { message: "Exercise name is required." })
          .max(100, {
            message: "Exercise name must be at most 100 characters.",
          })
          .regex(/^[\w\s\-]+$/, {
            message:
              "Name can only contain letters, numbers, spaces, dashes, and underscores.",
          }),
        variation: z.enum(variations as [string, ...string[]]),
      });
    }
    return z.object({
      name: z.string(),
      variation: z.string(),
    });
  }, [variationsQuery.data]);

  type ExerciseFormValues = z.infer<typeof formSchema>;

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      variation: variationsQuery.data?.variations[0],
    },
  });

  const { mutate: createExercise, isPending: isCreating } =
    api.exercises.createExercise.useMutation({
      onSuccess: (data, variables) => {
        setCreatedName(variables.name);
        setShowCreatedDialog(true);
        setSimilarExercises([]);
        setPendingExercise(null);
        form.reset();
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
    if (
      variationsQuery.data?.variations?.length &&
      !form.getValues("variation")
    ) {
      const firstVariation = variationsQuery.data.variations[0] as
        | ExerciseVariation
        | undefined;
      if (firstVariation) {
        form.setValue("variation", firstVariation);
      }
    }
  }, [variationsQuery.data, form]);

  React.useEffect(() => {
    if (!pendingExercise || !similarQuery.isSuccess) return;
    const similar = similarQuery.data?.similarExersises || [];
    if (similar.length === 0 && variationsQuery.data?.variations) {
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
    variationsQuery.data,
  ]);

  function handleFormSubmit(values: ExerciseFormValues) {
    if (!variationsQuery.data?.variations) return;
    setLocalError(null);
    setPendingExercise({
      ...values,
      variation: values.variation as ExerciseVariation,
    });
    setSimilarityInput({ name: values.name });
  }

  function handleConfirmCreate() {
    if (pendingExercise && variationsQuery.data?.variations) {
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
    form.reset();
  }

  function handleReset() {
    form.reset();
    setLocalError(null);
  }

  return (
    <div className="w-full">
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
                  name="variation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Variation</FormLabel>
                      <FormControl>
                        {variationsQuery.isLoading ? (
                          <div>Loading variations...</div>
                        ) : variationsQuery.error ? (
                          <div className="text-red-500">
                            Failed to load variations
                          </div>
                        ) : (
                          <Select
                            value={field.value ?? ""}
                            onValueChange={(val) =>
                              field.onChange(val as ExerciseVariation)
                            }
                            disabled={variationsQuery.isLoading}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a variation" />
                            </SelectTrigger>
                            <SelectContent>
                              {variationsQuery.data?.variations.map(
                                (variation: ExerciseVariation) => (
                                  <SelectItem key={variation} value={variation}>
                                    {variation.charAt(0) +
                                      variation
                                        .slice(1)
                                        .toLowerCase()
                                        .replace("_", " ")}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {localError && (
                  <div className="mb-2 text-center text-sm text-red-500">
                    {localError}
                  </div>
                )}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    disabled={isCreating || similarQuery.isFetching}
                  >
                    Reset
                  </Button>
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
