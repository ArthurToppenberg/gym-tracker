/*
  Warnings:

  - You are about to drop the `exersise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."exersise" DROP CONSTRAINT "exersise_createdById_fkey";

-- DropTable
DROP TABLE "public"."exersise";

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "machine" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
