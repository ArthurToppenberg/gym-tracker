import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@gym/ui/components/dialog";
import { Badge } from "@gym/ui/components/badge";
import RecordsForm from "../components/RecordsForm";
import type { z } from "zod";
import type { formSchema, ExerciseOption } from "../components/RecordsForm";

interface EditRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: {
    id: string;
    exerciseId: string;
    sets: number;
    startWeight: number;
    endWeight: number;
    startReps: number;
    endReps: number;
    exercise: { name: string; variation?: string };
  } | null;
  exerciseOptions: ExerciseOption[];
  loading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
  onSearchChange: (query: string) => void;
}

const EditRecordDialog: React.FC<EditRecordDialogProps> = ({
  open,
  onOpenChange,
  record,
  exerciseOptions,
  loading,
  onSubmit,
  onCancel,
  onSearchChange,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-h-none sm:overflow-y-visible">
      <DialogHeader>
        <DialogTitle>Edit Record</DialogTitle>
      </DialogHeader>
      {record && (
        <RecordsForm
          data={exerciseOptions}
          initialValues={{
            id: record.id,
            exercise: record.exerciseId ?? "",
            sets: record.sets,
            startWeight: record.startWeight,
            endWeight: record.endWeight,
            startReps: record.startReps,
            endReps: record.endReps,
          }}
          onSubmit={onSubmit}
          onCancel={onCancel}
          onSearchChange={onSearchChange}
          searchLoading={loading}
          renderOption={(exercise) => (
            <span className="flex items-center gap-2">
              <span>{exercise.label}</span>
              {exercise.variation && (
                <Badge variant="secondary">{exercise.variation}</Badge>
              )}
            </span>
          )}
          renderSelected={(exercise) =>
            exercise ? (
              <span className="flex items-center gap-2">
                <span>{exercise.label}</span>
                {exercise.variation && (
                  <Badge variant="secondary">{exercise.variation}</Badge>
                )}
              </span>
            ) : (
              "Select exercise..."
            )
          }
          submitLabel="Save"
          cancelLabel="Cancel"
        />
      )}
    </DialogContent>
  </Dialog>
);

export default EditRecordDialog;
