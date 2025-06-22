"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@gym/ui/components/dialog";
import { Button } from "@gym/ui/components/button";
import React from "react";

interface ExerciseCreatedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  createdName: string;
}

export const ExerciseCreatedDialog: React.FC<ExerciseCreatedDialogProps> = ({
  open,
  onOpenChange,
  createdName,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent showCloseButton>
      <DialogHeader>
        <DialogTitle>Exercise Created</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        The exercise <span className="font-semibold">{createdName}</span> was
        created. You can now see it in the list view.
      </DialogDescription>
      <DialogClose asChild>
        <Button className="mt-4 w-full" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  </Dialog>
);
