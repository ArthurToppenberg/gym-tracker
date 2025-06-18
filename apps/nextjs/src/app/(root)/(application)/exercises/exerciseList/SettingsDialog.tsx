import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@gym/ui/components/dialog";
import { Button } from "@gym/ui/components/button";
import { Cog, Pencil, Trash } from "lucide-react";
import { Badge } from "@gym/ui/components/badge";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  exercise: {
    id: string;
    name: string;
    variation: string;
  };
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  onEdit,
  onDelete,
  exercise,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Cog size={16} />
          {exercise.name}{" "}
          <Badge variant="outline">{exercise.variation} </Badge>{" "}
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-row justify-start gap-2">
        <Button variant="default" onClick={onEdit}>
          <Pencil size={16} />
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          <Trash size={16} />
        </Button>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SettingsDialog;
