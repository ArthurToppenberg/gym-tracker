import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@gym/ui/components/dialog";
import { Button } from "@gym/ui/components/button";
import React, { useState } from "react";

interface CustomSetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  min: number;
  max: number;
  onConfirm: (value: number) => void;
  onCancel: () => void;
}

export const CustomSetsDialog: React.FC<CustomSetsDialogProps> = ({
  open,
  onOpenChange,
  min,
  max,
  onConfirm,
  onCancel,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  const isValid = selected !== null && selected >= min && selected <= max;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Sets</DialogTitle>
        </DialogHeader>
        <div className="my-4 flex flex-wrap justify-center gap-2">
          {numbers.map((num) => (
            <Button
              key={num}
              type="button"
              variant={selected === num ? "default" : "outline"}
              className={
                selected === num ? "border-primary border-2 font-bold" : ""
              }
              onClick={() => setSelected(num)}
              disabled={num < min || num > max}
            >
              {num}
            </Button>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => {
              if (isValid && selected !== null) {
                onConfirm(selected);
              }
            }}
            disabled={!isValid}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
