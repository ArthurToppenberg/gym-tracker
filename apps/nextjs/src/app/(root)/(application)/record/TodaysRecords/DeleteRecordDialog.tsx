"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@gym/ui/components/dialog";
import { Button } from "@gym/ui/components/button";

interface DeleteRecordDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (recordId: string) => void;
  recordId: string;
}

const DeleteRecordDialog: React.FC<DeleteRecordDialogProps> = ({
  open,
  onCancel,
  onConfirm,
  recordId,
}) => (
  <Dialog open={open}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Exercise</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this exercise? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button variant="destructive" onClick={() => onConfirm(recordId)}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteRecordDialog;
