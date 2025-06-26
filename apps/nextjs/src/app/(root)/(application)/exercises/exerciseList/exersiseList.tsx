"use client";

import type { AppRouter } from "@gym/trpc/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gym/ui/components/table";
import type { inferRouterOutputs } from "@trpc/server";
import { ScrollArea } from "@gym/ui/components/scroll-area";
import { Cog, EllipsisVertical } from "lucide-react";
import { Button } from "@gym/ui/components/button";
import SettingsDialog from "./SettingsDialog";
import { useState } from "react";
import { api } from "@gym/trpc/react";
import { toast } from "@gym/ui/components/sonner";
import EditExerciseDialog from "./EditExerciseDialog";
import type { ExerciseFormValues } from "../components/ExerciseForm";
import type {
  ExerciseMuscleGroup,
  ExerciseVariation,
} from "../exerciseCreate/types";
import { Badge } from "@gym/ui/components/badge";

interface ExerciseListProps {
  exercises: inferRouterOutputs<AppRouter>["exercises"]["getExercises"]["items"];
  onExerciseDeleted?: () => void;
  onExerciseEdited?: () => void;
}

export const ExerciseList = ({
  exercises,
  onExerciseDeleted,
  onExerciseEdited,
}: ExerciseListProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseListProps["exercises"][number] | null
  >(null);

  const deleteExerciseMutation = api.exercises.deleteExercise.useMutation();
  const updateExerciseMutation = api.exercises.createExercise.useMutation();

  const handleSettingsClick = (
    exercise: ExerciseListProps["exercises"][number],
  ) => {
    setSelectedExercise(exercise);
    setSettingsOpen(true);
  };

  const handleEdit = () => {
    if (selectedExercise) {
      setSettingsOpen(false);
      setEditOpen(true);
    }
  };

  const handleDelete = async () => {
    if (selectedExercise) {
      setSettingsOpen(false);
      deleteExerciseMutation.mutate(
        {
          ids: [selectedExercise.id],
        },
        {
          onSuccess: () => {
            toast.success(`Deleted ${selectedExercise.name}`);
            onExerciseDeleted?.();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  const handleUpdate = (values: ExerciseFormValues) => {
    updateExerciseMutation.mutate(
      {
        ...values,
        id: selectedExercise?.id,
        variation: values.variation as ExerciseVariation,
        muscleGroup: [
          values.primaryMuscleGroup as ExerciseMuscleGroup,
          ...(values.secondaryMuscleGroup
            ? [values.secondaryMuscleGroup as ExerciseMuscleGroup]
            : []),
        ],
      },
      {
        onSuccess: () => {
          toast.success(`Updated ${values.name}`);
          onExerciseEdited?.();
          setEditOpen(false);
          setSelectedExercise(null);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Exercises</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96 overflow-x-auto overflow-y-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="flex items-center justify-center">
                  <Cog size={16} />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises?.length ? (
                exercises.map((exercise) => (
                  <TableRow key={exercise.id}>
                    <TableCell>
                      {exercise.name}
                      <Badge
                        variant="secondary"
                        className="ml-2 px-1 py-0.5 text-[10px]"
                      >
                        {exercise.variation}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="ml-2 px-1 py-0.5 text-[10px]"
                      >
                        {exercise.muscleGroup[0]}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSettingsClick(exercise)}
                      >
                        <EllipsisVertical size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No exercises found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        {selectedExercise && (
          <SettingsDialog
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
            onEdit={handleEdit}
            onDelete={handleDelete}
            exercise={selectedExercise}
          />
        )}
        {selectedExercise && (
          <EditExerciseDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            exercise={selectedExercise}
            onSubmit={handleUpdate}
            onCancel={() => {
              setEditOpen(false);
              setSelectedExercise(null);
            }}
            isPending={updateExerciseMutation.isPending}
          />
        )}
      </CardContent>
    </Card>
  );
};
