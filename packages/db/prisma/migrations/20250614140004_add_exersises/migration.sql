/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropTable
DROP TABLE "public"."Post";

-- CreateTable
CREATE TABLE "public"."exersise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "machine" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exersise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."exersise" ADD CONSTRAINT "exersise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
