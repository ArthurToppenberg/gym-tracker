import { db } from "../client";

/**
 * Finds the most similar exercise by name using Postgres trigram similarity.
 * @param name The name to compare
 * @param threshold Minimum similarity score (0.0–1.0)
 */
export async function getExerciseSimilarity(name: string, threshold = 0.4) {
  const result = await db.$queryRaw<
    { id: number; name: string; similarity: number }[]
  >`
    SELECT id, name, similarity(name::text, ${name}) AS similarity
    FROM "Exercise"
    WHERE similarity(name::text, ${name}) > ${threshold}
    ORDER BY similarity DESC
    LIMIT 5;
  `;

  if (result.length === 0) {
    return [];
  }

  //filter out exersise which have a similarty below 0.8
  const filteredResult = result.filter((exercise) => exercise.similarity > 0.8);

  return filteredResult;
}
