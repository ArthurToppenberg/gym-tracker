-- DropForeignKey
ALTER TABLE "public"."exersise" DROP CONSTRAINT "exersise_createdById_fkey";

-- AddForeignKey
ALTER TABLE "public"."exersise" ADD CONSTRAINT "exersise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
