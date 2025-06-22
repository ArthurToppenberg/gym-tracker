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
import type { ExerciseVariation } from "../exerciseCreate/types";

export type ExerciseFormValues = z.infer<ReturnType<typeof getFormSchema>>;

const getFormSchema = (variations?: string[]) => {
  return z.object({
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
      variations && variations.length > 0
        ? z.enum(variations as [string, ...string[]])
        : z.string().min(1, { message: "Variation is required" }),
  });
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

  const variations = variationsQuery.data?.variations;

  const formSchema = React.useMemo(
    () => getFormSchema(variations),
    [variations],
  );

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? {
      name: "",
      variation: variations?.[0] ?? "CABLE",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    } else if (variations && variations.length > 0) {
      form.reset({
        name: form.getValues().name,
        variation: variations[0],
      });
    }
  }, [initialValues, form, variations]);

  function handleReset() {
    if (initialValues) {
      form.reset(initialValues);
    } else if (variations && variations.length > 0) {
      form.reset({
        name: "",
        variation: variations[0],
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                {variationsQuery.isLoading ? (
                  <div>Loading variations...</div>
                ) : variationsQuery.error ? (
                  <div className="text-red-500">Failed to load variations</div>
                ) : (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val as ExerciseVariation)
                    }
                    disabled={variationsQuery.isLoading || disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a variation" />
                    </SelectTrigger>
                    <SelectContent>
                      {variations?.map((variation: ExerciseVariation) => (
                        <SelectItem key={variation} value={variation}>
                          {variation.charAt(0) +
                            variation.slice(1).toLowerCase().replace("_", " ")}
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
