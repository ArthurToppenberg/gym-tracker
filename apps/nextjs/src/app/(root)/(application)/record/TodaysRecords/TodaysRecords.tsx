"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gym/ui/components/accordion";
import { Badge } from "@gym/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import { Button } from "@gym/ui/components/button";
import { Trash2, Pencil } from "lucide-react";
import { api } from "@gym/trpc/react";
import { toast } from "@gym/ui/components/sonner";
import DeleteRecordDialog from "./DeleteRecordDialog";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@gym/trpc/server";
import type { formSchema, ExerciseOption } from "../components/RecordsForm";
import { useDebounce } from "@gym/ui/hooks/use-debounce";
import type { z } from "zod";
import RecordsItem from "./RecordsItem";
import EditRecord from "./EditRecordDialog";

type Record = inferRouterOutputs<AppRouter>["record"]["getRecords"][number] & {
  exerciseId: string;
};

interface TodaysRecordsProps {
  onDelete?: (id: string) => void;
  todaysRecords: Record[];
}

const TodaysRecords = ({ onDelete, todaysRecords }: TodaysRecordsProps) => {
  const deleteRecordMutation = api.record.deleteRecord.useMutation();
  const createRecordMutation = api.record.createRecord.useMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState<Record | null>(
    null,
  );
  const [exerciseNameQuery, setExerciseNameQuery] = useState<
    string | undefined
  >(undefined);
  const debouncedExerciseNameQuery = useDebounce(exerciseNameQuery, 300);
  const getExercisesQuery = api.exercises.getExercises.useQuery({
    queryName: debouncedExerciseNameQuery,
  });

  const handleDelete = (id: string) => {
    setSelectedRecordId(id);
    setDeleteDialogOpen(true);
    onDelete?.(id);
  };

  const handleEdit = (record: Record) => {
    setSelectedEditRecord(record);
    setEditDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    deleteRecordMutation.mutate(
      {
        ids: [id],
      },
      {
        onSuccess: () => {
          onDelete?.(id);
          toast.success(
            `${deleteRecordMutation.data?.deletedRecords} records deleted`,
          );
          setDeleteDialogOpen(false);
          setSelectedRecordId(null);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const handleEditSubmit = (values: z.infer<typeof formSchema>) => {
    createRecordMutation.mutate(
      { ...values, id: selectedEditRecord?.id },
      {
        onSuccess: () => {
          toast.success("Record updated successfully");
          setEditDialogOpen(false);
          setSelectedEditRecord(null);
          onDelete?.(values.id!); // triggers refetch
        },
        onError: (error) => {
          toast.error(`Failed to update record: ${error.message}`);
        },
      },
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Todays Exercises</CardTitle>
        <CardContent>
          <Accordion type="single" collapsible>
            {todaysRecords.map((exercise, index) => (
              <AccordionItem key={exercise.id} value={exercise.id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <Badge variant="secondary">{index + 1}</Badge>{" "}
                      {exercise.exercise.name}{" "}
                      <Badge
                        variant="secondary"
                        className="px-1 py-0.5 text-[10px]"
                      >
                        {exercise.exercise.variation}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="px-1 py-0.5 text-[10px]"
                      >
                        {exercise.exercise.muscleGroup[0]}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-3">
                      <RecordsItem
                        label="Reps"
                        startValue={exercise.startReps ?? 0}
                        endValue={exercise.endReps ?? 0}
                      />
                      <RecordsItem
                        label="Weight (kg)"
                        startValue={exercise.startWeight ?? 0}
                        endValue={exercise.endWeight ?? 0}
                      />
                      <div className="flex justify-start gap-2 md:justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Edit"
                          onClick={() => handleEdit(exercise)}
                        >
                          <Pencil className="size-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Delete"
                          onClick={() => handleDelete(exercise.id)}
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {todaysRecords.length === 0 && (
              <p className="text-muted-foreground py-4 text-sm">
                You haven&apos;t done any exercises today
              </p>
            )}
          </Accordion>
        </CardContent>
      </CardHeader>
      <DeleteRecordDialog
        open={deleteDialogOpen}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setSelectedRecordId(null);
        }}
        onConfirm={confirmDelete}
        recordId={selectedRecordId ?? ""}
      />
      <EditRecord
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        record={selectedEditRecord}
        exerciseOptions={
          (getExercisesQuery.data?.items.map((exercise) => ({
            value: exercise.id,
            label: exercise.name,
            variation: exercise.variation,
          })) ?? []) as ExerciseOption[]
        }
        loading={getExercisesQuery.isFetching}
        onSubmit={handleEditSubmit}
        onCancel={() => setEditDialogOpen(false)}
        onSearchChange={setExerciseNameQuery}
      />
    </Card>
  );
};

export default TodaysRecords;
