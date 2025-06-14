/*
  Warnings:

  - You are about to drop the column `machine` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `variation` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ExerciseVariation" AS ENUM ('CABLE', 'BARBELL', 'DUMBBELL', 'MACHINE', 'BODYWEIGHT', 'ELASTIC_BAND');

-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "machine",
ADD COLUMN     "variation" "public"."ExerciseVariation" NOT NULL;
