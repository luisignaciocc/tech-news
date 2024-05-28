-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "newId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_newId_fkey" FOREIGN KEY ("newId") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;
