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
import RecordsForm, { formSchema } from "../components/RecordsForm";
import type { ExerciseOption } from "../components/RecordsForm";

const SET_OPTIONS = [2, 3, 4];
const MIN_SETS = 1;
const MAX_SETS = 10;

interface CreateRecordProps {
  onSuccess?: () => void;
}

const CreateRecord = ({ onSuccess }: CreateRecordProps) => {
  const [exerciseNameQuery, setExerciseNameQuery] = useState<
    string | undefined
  >(undefined);
  const createRecordMutation = api.record.createRecord.useMutation();
  const debouncedExerciseNameQuery = useDebounce(exerciseNameQuery, 300);
  const getExercisesQuery = api.exercises.getExercises.useQuery({
    queryName: debouncedExerciseNameQuery,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    createRecordMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Record created successfully");
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
        <RecordsForm
          data={
            (getExercisesQuery.data?.items.map((exercise) => ({
              value: exercise.id,
              label: exercise.name,
              variation: exercise.variation,
            })) ?? []) as ExerciseOption[]
          }
          onSubmit={handleSubmit}
          onSearchChange={setExerciseNameQuery}
          searchLoading={getExercisesQuery.isFetching}
          renderOption={(option) => {
            const exercise = option as ExerciseOption;
            return (
              <span className="flex items-center gap-2">
                <span>{exercise.label}</span>
                {exercise.variation && (
                  <Badge variant="secondary">{exercise.variation}</Badge>
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
                  <Badge variant="secondary">{exercise.variation}</Badge>
                )}
              </span>
            ) : (
              "Select exercise..."
            );
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CreateRecord;
