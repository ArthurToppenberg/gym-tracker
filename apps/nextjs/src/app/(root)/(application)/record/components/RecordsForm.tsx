"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gym/ui/components/form";
import { ComboBox, type ComboboxOption } from "@gym/ui/components/combo-box";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@gym/ui/components/button";
import { CustomSetsDialog } from "../CreateRecord/CustomSetsDialog";
import { SliderWithCustom } from "../CreateRecord/SliderWithCustom";
import DeltaIndicator from "../CreateRecord/DeltaIndicator";

export const SET_OPTIONS = [2, 3, 4];
export const MIN_SETS = 1;
export const MAX_SETS = 10;

export const formSchema = z.object({
  id: z.string().cuid().optional(),
  exercise: z.string().cuid("Exercise must be a valid CUID"),
  sets: z.number().min(MIN_SETS).max(MAX_SETS, "Sets must be between 1 and 10"),
  startWeight: z.number().min(1).max(300, "Weight must be between 1 and 300"),
  endWeight: z.number().min(1).max(300, "Weight must be between 1 and 300"),
  startReps: z.number().min(1).max(100, "Reps must be between 1 and 100"),
  endReps: z.number().min(1).max(100, "Reps must be between 1 and 100"),
});

export type ExerciseOption = ComboboxOption & { variation?: string };

interface RecordsFormProps {
  data: ExerciseOption[];
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
  onSearchChange?: (value: string) => void;
  searchLoading?: boolean;
  renderOption?: (option: ExerciseOption, selected: boolean) => React.ReactNode;
  renderSelected?: (option: ExerciseOption | undefined) => React.ReactNode;
  emptyMessage?: string;
  submitLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
}

const RecordsForm = ({
  data,
  initialValues,
  onSubmit,
  onCancel,
  onSearchChange,
  searchLoading = false,
  renderOption,
  renderSelected,
  emptyMessage = "No options found.",
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  disabled = false,
}: RecordsFormProps) => {
  const [customSets, setCustomSets] = useState<number | null>(
    initialValues?.sets ?? null,
  );
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: initialValues?.exercise ?? "",
      sets: initialValues?.sets ?? 3,
      startWeight: initialValues?.startWeight ?? 30,
      endWeight: initialValues?.endWeight ?? 30,
      startReps: initialValues?.startReps ?? 8,
      endReps: initialValues?.endReps ?? 8,
      ...(initialValues?.id ? { id: initialValues.id } : {}),
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
    setCustomSets(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="exercise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <FormControl>
                <ComboBox
                  data={data}
                  onChange={field.onChange}
                  searchLoading={searchLoading}
                  value={field.value}
                  placeholder="Select exercise..."
                  renderOption={renderOption}
                  renderSelected={renderSelected}
                  onSearchChange={(value) => {
                    onSearchChange?.(value);
                  }}
                  initialValue={initialValues?.exercise}
                  emptyMessage={emptyMessage}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sets</FormLabel>
              <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                {SET_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    size="sm"
                    variant={field.value === option ? "default" : "outline"}
                    onClick={() => {
                      setShowCustomDialog(false);
                      setCustomSets(null);
                      field.onChange(option);
                    }}
                    className="h-8 w-8 p-0"
                    disabled={disabled}
                  >
                    {option}
                  </Button>
                ))}
                {customSets !== null &&
                  customSets !== undefined &&
                  !SET_OPTIONS.includes(customSets) && (
                    <Button
                      key={"custom-value"}
                      type="button"
                      size="sm"
                      variant={
                        field.value === customSets ? "default" : "outline"
                      }
                      onClick={() => {
                        setShowCustomDialog(false);
                        field.onChange(customSets);
                      }}
                      className="border-primary h-8 w-12 border-2 border-dashed p-0"
                      disabled={disabled}
                    >
                      {customSets}
                    </Button>
                  )}
                <Button
                  type="button"
                  size="sm"
                  variant={showCustomDialog ? "default" : "outline"}
                  onClick={() => {
                    setShowCustomDialog(true);
                  }}
                  className="h-8 w-16 p-0"
                  disabled={disabled}
                >
                  Custom
                </Button>
                <CustomSetsDialog
                  open={showCustomDialog}
                  onOpenChange={setShowCustomDialog}
                  min={MIN_SETS}
                  max={MAX_SETS}
                  onConfirm={(val: number) => {
                    setCustomSets(val);
                    form.setValue("sets", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setShowCustomDialog(false);
                  }}
                  onCancel={() => {
                    setShowCustomDialog(false);
                  }}
                />
              </div>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Weight</FormLabel>
              <FormControl>
                <SliderWithCustom
                  min={1}
                  max={100}
                  step={1}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    form.setValue("endWeight", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  units="kg"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startReps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Reps</FormLabel>
              <FormControl>
                <SliderWithCustom
                  min={4}
                  max={12}
                  step={1}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    form.setValue("endReps", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  units="reps"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endWeight"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>End Weight</FormLabel>
                {form.watch("startWeight") !== form.watch("endWeight") ? (
                  <DeltaIndicator
                    startValue={form.watch("startWeight")}
                    endValue={form.watch("endWeight")}
                  />
                ) : null}
              </div>
              <FormControl>
                <SliderWithCustom
                  min={1}
                  max={100}
                  step={1}
                  value={field.value}
                  onChange={field.onChange}
                  units="kg"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endReps"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>End Reps</FormLabel>
                {form.watch("startReps") !== form.watch("endReps") ? (
                  <DeltaIndicator
                    startValue={form.watch("startReps")}
                    endValue={form.watch("endReps")}
                  />
                ) : null}
              </div>
              <FormControl>
                <SliderWithCustom
                  min={4}
                  max={12}
                  step={1}
                  value={field.value}
                  onChange={field.onChange}
                  units="reps"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="mt-4 grid grid-cols-[auto_1fr] gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={disabled}
            >
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" disabled={disabled} className="col-start-2">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecordsForm;
