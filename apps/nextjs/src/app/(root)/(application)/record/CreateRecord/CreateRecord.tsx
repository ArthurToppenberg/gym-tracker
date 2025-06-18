"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import { z } from "zod";
import { api } from "@gym/trpc/react";
import { useState } from "react";
import { Badge } from "@gym/ui/components/badge";
import { useDebounce } from "@gym/ui/hooks/use-debounce";
import { toast } from "@gym/ui/components/sonner";
import RecordsForm, { formSchema } from "../components/RecordsForm";
import type { ExerciseOption } from "../components/RecordsForm";

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
            getExercisesQuery.data?.items.map((exercise) => ({
              value: exercise.id,
              label: exercise.name,
              variation: exercise.variation,
            })) ?? []
          }
          onSubmit={handleSubmit}
          onSearchChange={setExerciseNameQuery}
          searchLoading={getExercisesQuery.isFetching}
          renderOption={(option) => {
            const exercise = option;
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
            const exercise = option;
            return exercise ? (
              <span className="flex items-center gap-2">
                <span>{exercise.label}</span>
                {exercise.variation && (
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
