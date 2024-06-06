/*
  Warnings:

  - You are about to drop the `NewsImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NewsImage" DROP CONSTRAINT "NewsImage_newsId_fkey";

-- DropTable
DROP TABLE "NewsImage";
