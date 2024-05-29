-- DropForeignKey
ALTER TABLE "NewsImage" DROP CONSTRAINT "NewsImage_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_newId_fkey";

-- AddForeignKey
ALTER TABLE "NewsImage" ADD CONSTRAINT "NewsImage_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_newId_fkey" FOREIGN KEY ("newId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
