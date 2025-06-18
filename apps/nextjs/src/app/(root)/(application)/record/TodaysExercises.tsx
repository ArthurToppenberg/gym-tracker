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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@gym/ui/components/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@gym/ui/components/dialog";
import { MoreVertical } from "lucide-react";
import DeltaIndicator from "./CreateRecord/DeltaIndicator";
import { api } from "@gym/trpc/react";
import dayjs from "dayjs";
import { toast } from "@gym/ui/components/sonner";
import DeleteRecordDialog from "./TodaysRecords/DeleteRecordDialog";

const TodaysExercises = () => {
  const todaysRecordsQuery = api.record.getRecords.useQuery({
    startDate: dayjs().startOf("day").toISOString(),
    endDate: dayjs().endOf("day").toISOString(),
  });

  const deleteRecordMutation = api.record.deleteRecord.useMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedRecordId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    deleteRecordMutation.mutate(
      {
        ids: [id],
      },
      {
        onSuccess: () => {
          todaysRecordsQuery.refetch();
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
            {todaysRecordsQuery.data?.map((exercise, index) => (
              <AccordionItem key={exercise.id} value={exercise.id}>
                <AccordionTrigger className="[&>svg]:hidden">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <Badge variant="secondary">{index + 1}</Badge>{" "}
                      {exercise.exercise.name}{" "}
                      <Badge variant="outline">
                        {exercise.exercise.variation}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Options"
                        >
                          <MoreVertical className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(exercise.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 p-2">
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
                        {exercise.startWeight ?? 0} - {exercise.endWeight ?? 0}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
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
        recordId={selectedRecordId || ""}
      />
    </Card>
  );
};

export default TodaysExercises;
