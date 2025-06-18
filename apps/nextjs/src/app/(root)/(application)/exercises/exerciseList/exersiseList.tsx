"use client";

import type { AppRouter } from "@gym/trpc/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@gym/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gym/ui/components/table";
import type { inferRouterOutputs } from "@trpc/server";
import { ScrollArea } from "@gym/ui/components/scroll-area";

interface ExerciseListProps {
  exercises: inferRouterOutputs<AppRouter>["exercises"]["getExercises"]["items"];
}

export const ExerciseList = ({ exercises }: ExerciseListProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Exercises</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96 overflow-x-auto overflow-y-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Variation</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises?.length ? (
                exercises.map((exercise) => (
                  <TableRow key={exercise.id}>
                    <TableCell className="font-medium">
                      {exercise.name}
                    </TableCell>
                    <TableCell>{exercise.variation || "-"}</TableCell>
                    <TableCell>
                      {exercise.updatedAt
                        ? new Date(exercise.updatedAt).toLocaleDateString()
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No exercises found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
