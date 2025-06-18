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
import { ComboBox, type ComboboxOption } from "@gym/ui/components/combo-box";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@gym/trpc/react";
import { useState } from "react";
import { Badge } from "@gym/ui/components/badge";
import { Button } from "@gym/ui/components/button";
import { CustomSetsDialog } from "./CustomSetsDialog";
import { SliderWithCustom } from "./SliderWithCustom";
import DeltaIndicator from "./DeltaIndicator";
import { useDebounce } from "@gym/ui/hooks/use-debounce";
import { toast } from "@gym/ui/components/sonner";

const SET_OPTIONS = [2, 3, 4];
const MIN_SETS = 1;
const MAX_SETS = 10;

const formSchema = z.object({
  exercise: z.string().cuid("Exercise must be a valid CUID"),
  sets: z.number().min(MIN_SETS).max(MAX_SETS, "Sets must be between 1 and 10"),
  startWeight: z.number().min(1).max(300, "Weight must be between 1 and 300"),
  endWeight: z.number().min(1).max(300, "Weight must be between 1 and 300"),
  startReps: z.number().min(1).max(100, "Reps must be between 1 and 100"),
  endReps: z.number().min(1).max(100, "Reps must be between 1 and 100"),
});

type ExerciseOption = ComboboxOption & { variation?: string };

interface CreateRecordProps {
  onSuccess?: () => void;
}

const CreateRecord = ({ onSuccess }: CreateRecordProps) => {
  const [exerciseNameQuery, setExerciseNameQuery] = useState<
    string | undefined
  >(undefined);
  const [customSets, setCustomSets] = useState<number | null>(null);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const createRecordMutation = api.record.createRecord.useMutation();

  const debouncedExerciseNameQuery = useDebounce(exerciseNameQuery, 300);

  const getExercisesQuery = api.exercises.getExercises.useQuery({
    queryName: debouncedExerciseNameQuery,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: "",
      sets: 3,
      startWeight: 30,
      endWeight: 30,
      startReps: 8,
      endReps: 8,
    },
    mode: "onChange",
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);

    createRecordMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Record created successfully");
        form.reset();
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(`Failed to create record: ${error.message}`);
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Record</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="exercise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise</FormLabel>
                  <FormControl>
                    <ComboBox
                      data={
                        (getExercisesQuery.data?.items.map((exercise) => ({
                          value: exercise.id,
                          label: exercise.name,
                          variation: exercise.variation,
                        })) ?? []) as ExerciseOption[]
                      }
                      onChange={field.onChange}
                      searchLoading={getExercisesQuery.isFetching}
                      value={field.value}
                      placeholder="Select exercise..."
                      renderOption={(option) => {
                        const exercise = option as ExerciseOption;
                        return (
                          <span className="flex items-center gap-2">
                            <span>{exercise.label}</span>
                            {exercise.variation && (
                              <Badge variant="secondary">
                                {exercise.variation}
                              </Badge>
                            )}
                          </span>
                        );
                      }}
                      renderSelected={(option) => {
                        const exercise = option as ExerciseOption | undefined;
                        return option ? (
                          <span className="flex items-center gap-2">
                            <span>{exercise?.label}</span>
                            {exercise?.variation && (
                              <Badge variant="secondary">
                                {exercise.variation}
                              </Badge>
                            )}
                          </span>
                        ) : (
                          "Select exercise..."
                        );
                      }}
                      onSearchChange={(value) => {
                        setExerciseNameQuery(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sets</FormLabel>
                  <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                    {SET_OPTIONS.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        size="sm"
                        variant={field.value === option ? "default" : "outline"}
                        onClick={() => {
                          setShowCustomDialog(false);
                          setCustomSets(null);
                          field.onChange(option);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        {option}
                      </Button>
                    ))}
                    {customSets !== null &&
                      customSets !== undefined &&
                      !SET_OPTIONS.includes(customSets) && (
                        <Button
                          key={"custom-value"}
                          type="button"
                          size="sm"
                          variant={
                            field.value === customSets ? "default" : "outline"
                          }
                          onClick={() => {
                            setShowCustomDialog(false);
                            field.onChange(customSets);
                          }}
                          className="border-primary h-8 w-12 border-2 border-dashed p-0"
                        >
                          {customSets}
                        </Button>
                      )}
                    <Button
                      type="button"
                      size="sm"
                      variant={showCustomDialog ? "default" : "outline"}
                      onClick={() => {
                        setShowCustomDialog(true);
                      }}
                      className="h-8 w-16 p-0"
                    >
                      Custom
                    </Button>
                    <CustomSetsDialog
                      open={showCustomDialog}
                      onOpenChange={setShowCustomDialog}
                      min={MIN_SETS}
                      max={MAX_SETS}
                      onConfirm={(val: number) => {
                        setCustomSets(val);
                        field.onChange(val);
                        setShowCustomDialog(false);
                      }}
                      onCancel={() => {
                        setShowCustomDialog(false);
                      }}
                    />
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Weight</FormLabel>
                  <FormControl>
                    <SliderWithCustom
                      min={1}
                      max={100}
                      step={1}
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        form.setValue("endWeight", val, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      units="kg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startReps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Reps</FormLabel>
                  <FormControl>
                    <SliderWithCustom
                      min={4}
                      max={12}
                      step={1}
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        form.setValue("endReps", val, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      units="reps"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endWeight"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>End Weight</FormLabel>
                    {form.watch("startWeight") !== form.watch("endWeight") ? (
                      <DeltaIndicator
                        startValue={form.watch("startWeight")}
                        endValue={form.watch("endWeight")}
                      />
                    ) : null}
                  </div>
                  <FormControl>
                    <SliderWithCustom
                      min={1}
                      max={100}
                      step={1}
                      value={field.value}
                      onChange={field.onChange}
                      units="kg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endReps"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>End Reps</FormLabel>
                    {form.watch("startReps") !== form.watch("endReps") ? (
                      <DeltaIndicator
                        startValue={form.watch("startReps")}
                        endValue={form.watch("endReps")}
                      />
                    ) : null}
                  </div>
                  <FormControl>
                    <SliderWithCustom
                      min={4}
                      max={12}
                      step={1}
                      value={field.value}
                      onChange={field.onChange}
                      units="reps"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-1/4"
                onClick={() => {
                  form.reset();
                  setCustomSets(null);
                  setShowCustomDialog(false);
                }}
              >
                Reset
              </Button>
              <Button type="submit" className="mt-4 w-3/4">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateRecord;
