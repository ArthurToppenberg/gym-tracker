"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gym/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@gym/trpc/react";
import { Input } from "@gym/ui/components/input";
import { Button } from "@gym/ui/components/button";
import React from "react";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@gym/ui/components/select";
import type {
  ExerciseVariation,
  ExerciseMuscleGroup,
} from "../exerciseCreate/types";

export type ExerciseFormValues = z.infer<ReturnType<typeof getFormSchema>>;

const getFormSchema = (variations: string[], muscleGroups: string[]) => {
  return z
    .object({
      id: z.string().cuid().optional(),
      name: z
        .string()
        .min(1, { message: "Exercise name is required." })
        .max(100, {
          message: "Exercise name must be at most 100 characters.",
        })
        .regex(/^[\w\s\-]+$/, {
          message:
            "Name can only contain letters, numbers, spaces, dashes, and underscores.",
        }),
      variation:
        variations.length > 0
          ? z.enum(variations as [string, ...string[]])
          : z.string().min(1, { message: "Variation is required" }),
      primaryMuscleGroup:
        muscleGroups.length > 0
          ? z.enum(muscleGroups as [string, ...string[]])
          : z.string().min(1, { message: "Primary muscle group is required" }),
      secondaryMuscleGroup:
        muscleGroups.length > 0
          ? z.enum(muscleGroups as [string, ...string[]]).optional()
          : z.string().optional(),
    })
    .refine(
      (data) =>
        !data.secondaryMuscleGroup ||
        data.primaryMuscleGroup !== data.secondaryMuscleGroup,
      {
        message:
          "Secondary muscle group cannot be the same as primary muscle group.",
        path: ["secondaryMuscleGroup"],
      },
    );
};

interface ExerciseFormProps {
  onSubmit: (values: ExerciseFormValues) => void;
  initialValues?: Partial<ExerciseFormValues>;
  isPending?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  disabled?: boolean;
}

export const ExerciseForm = ({
  onSubmit,
  initialValues,
  isPending,
  submitLabel = "Submit",
  onCancel,
  cancelLabel = "Cancel",
  disabled,
}: ExerciseFormProps) => {
  const variationsQuery = api.exercises.getExerciseVariations.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    },
  );

  const muscleGroupsQuery = api.exercises.getExerciseMuscleGroups.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    },
  );

  const variations = React.useMemo(
    () => variationsQuery.data?.variations ?? [],
    [variationsQuery.data],
  );
  const muscleGroups = React.useMemo(
    () => muscleGroupsQuery.data?.muscleGroup ?? [],
    [muscleGroupsQuery.data],
  );

  const formSchema = React.useMemo(
    () => getFormSchema(variations, muscleGroups),
    [variations, muscleGroups],
  );

  const getDefaultValues = React.useCallback(() => {
    if (initialValues) {
      const { primaryMuscleGroup, secondaryMuscleGroup, ...rest } =
        initialValues;
      return {
        ...rest,
        primaryMuscleGroup: primaryMuscleGroup,
        secondaryMuscleGroup: secondaryMuscleGroup,
      };
    }

    return {
      name: "",
      variation: variations[0] ?? "CABLE",
      primaryMuscleGroup: muscleGroups[0] ?? "CHEST",
      secondaryMuscleGroup: undefined,
    };
  }, [initialValues, muscleGroups, variations]);

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  React.useEffect(() => {
    if (variations.length > 0 && muscleGroups.length > 0 && !initialValues) {
      form.reset(getDefaultValues());
    }
  }, [
    form,
    getDefaultValues,
    variations.length,
    muscleGroups.length,
    initialValues,
  ]);

  const handleReset = () => {
    if (initialValues) {
      const { primaryMuscleGroup, secondaryMuscleGroup, ...rest } =
        initialValues;

      console.log(primaryMuscleGroup, secondaryMuscleGroup, rest);
      form.reset({
        ...rest,
        primaryMuscleGroup: primaryMuscleGroup,
        secondaryMuscleGroup: secondaryMuscleGroup,
      });
    } else {
      form.reset({
        name: "",
        variation: variations[0],
        primaryMuscleGroup: muscleGroups[0],
        secondaryMuscleGroup: undefined,
      });
    }
  };

  const handleSubmit = (values: ExerciseFormValues) => {
    onSubmit(values);
  };

  const clearSecondaryMuscleGroup = () => {
    form.setValue("secondaryMuscleGroup", undefined, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const formatDisplayName = (value: string) => {
    return value.charAt(0) + value.slice(1).toLowerCase().replace("_", " ");
  };

  const isLoading = variationsQuery.isLoading ?? muscleGroupsQuery.isLoading;
  const hasError = variationsQuery.error ?? muscleGroupsQuery.error;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="variation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variation</FormLabel>
              <FormControl>
                {isLoading ? (
                  <div>Loading variations...</div>
                ) : hasError ? (
                  <div className="text-red-500">Failed to load variations</div>
                ) : (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val as ExerciseVariation)
                    }
                    disabled={disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a variation" />
                    </SelectTrigger>
                    <SelectContent>
                      {variations.map((variation: ExerciseVariation) => (
                        <SelectItem key={variation} value={variation}>
                          {formatDisplayName(variation)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryMuscleGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Muscle Group</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a primary muscle group" />
                  </SelectTrigger>
                  <SelectContent>
                    {muscleGroups.map((muscleGroup: ExerciseMuscleGroup) => (
                      <SelectItem key={muscleGroup} value={muscleGroup}>
                        {formatDisplayName(muscleGroup)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryMuscleGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Muscle Group</FormLabel>
              <div className="flex flex-row items-center gap-2">
                <FormControl>
                  <Select
                    value={form.watch("secondaryMuscleGroup") ?? "__none__"}
                    onValueChange={(val) => {
                      field.onChange(val === "__none__" ? undefined : val);
                      void form.trigger("secondaryMuscleGroup");
                    }}
                    disabled={disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a secondary muscle group (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">None</SelectItem>
                      {muscleGroups
                        .filter(
                          (group) => group !== form.watch("primaryMuscleGroup"),
                        )
                        .map((muscleGroup: ExerciseMuscleGroup) => (
                          <SelectItem key={muscleGroup} value={muscleGroup}>
                            {formatDisplayName(muscleGroup)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="ml-2 shrink-0"
                    data-testid="clear-secondary-muscle-group"
                    onClick={clearSecondaryMuscleGroup}
                    aria-label="Clear secondary muscle group"
                    disabled={disabled}
                  >
                    ×
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 grid grid-cols-[1fr_1fr_1fr] gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending ?? disabled}
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isPending ?? disabled}
            className={onCancel ? "" : "col-start-2"}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={
              isPending ??
              disabled ??
              !form.formState.isDirty ??
              !form.formState.isValid
            }
          >
            {isPending ? "Checking..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
