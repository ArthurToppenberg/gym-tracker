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
import DeltaIndicator from "../CreateRecord/DeltaIndicator";
import { api } from "@gym/trpc/react";
import { toast } from "@gym/ui/components/sonner";
import DeleteRecordDialog from "./DeleteRecordDialog";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@gym/trpc/server";

type Record = inferRouterOutputs<AppRouter>["record"]["getRecords"][number];

interface TodaysRecordsProps {
  onDelete?: (id: string) => void;
  todaysRecords: Record[];
}

const TodaysRecords = ({ onDelete, todaysRecords }: TodaysRecordsProps) => {
  const deleteRecordMutation = api.record.deleteRecord.useMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState<Record | null>(
    null,
  );

  const handleDelete = (id: string) => {
    setSelectedRecordId(id);
    setDeleteDialogOpen(true);
    onDelete?.(id);
  };

  const handleEdit = (record: Record) => {
    setSelectedEditRecord(record);
    setEditDialogOpen(true);
    // Placeholder: open edit dialog
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
                      <Badge variant="outline">
                        {exercise.exercise.variation}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4 p-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-start gap-2">
                          <p className="text-muted-foreground text-sm">Reps</p>
                          <DeltaIndicator
                            startValue={exercise.startReps ?? 0}
                            endValue={exercise.endReps ?? 0}
                          />
                        </div>
                        <p className="font-medium">
                          {exercise.startReps ?? 0} - {exercise.endReps ?? 0}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-start gap-2">
                          <p className="text-muted-foreground text-sm">
                            Weight (kg)
                          </p>
                          <DeltaIndicator
                            startValue={exercise.startWeight ?? 0}
                            endValue={exercise.endWeight ?? 0}
                          />
                        </div>
                        <p className="font-medium">
                          {exercise.startWeight ?? 0} -{" "}
                          {exercise.endWeight ?? 0}
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
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
                You haven't done any exercises today
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
    </Card>
  );
};

export default TodaysRecords;
