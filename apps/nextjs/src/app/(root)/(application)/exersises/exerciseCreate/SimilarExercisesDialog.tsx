"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@gym/ui/components/dialog";
import { Button } from "@gym/ui/components/button";
import React from "react";
import type { ExerciseVariation } from "./types";

interface SimilarExercisesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mostSimilarExercises: {
    id: number;
    name: string;
    variation: ExerciseVariation;
    similarity: number;
  }[];
  onConfirm: () => void;
  onCancel: () => void;
  error?: string | null;
}

export const SimilarExercisesDialog: React.FC<SimilarExercisesDialogProps> = ({
  open,
  onOpenChange,
  mostSimilarExercises,
  onConfirm,
  onCancel,
  error,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent showCloseButton>
      <DialogHeader>
        <DialogTitle>Similar Exercise</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        We found similar exercises. Double check before creating a new one.
        {error && (
          <span className="mb-2 block text-center text-sm text-red-500">
            {error}
          </span>
        )}
      </DialogDescription>
      <div className="mt-2 space-y-3">
        <div className="bg-muted flex items-center justify-between rounded-lg border p-3">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm font-medium">
              Exercise Name
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground text-sm font-medium">
              Similarity Score
            </span>
          </div>
        </div>
        {mostSimilarExercises.map((exercise) => (
          <div
            key={exercise.id}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              exercise.similarity === 1 ? "border-red-500" : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">
                {exercise.name}{" "}
                <span className="text-muted-foreground text-xs">
                  (
                  {exercise.variation.charAt(0) +
                    exercise.variation
                      .slice(1)
                      .toLowerCase()
                      .replace(/_/g, " ")}
                  )
                </span>
                {exercise.similarity === 1 && " ⚠️"}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-muted-foreground text-sm">
                {Math.round(exercise.similarity * 100)}% similar
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Button className="w-1/2" variant="secondary" onClick={onConfirm}>
          Create New Exercise
        </Button>
        <Button className="w-1/2" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
