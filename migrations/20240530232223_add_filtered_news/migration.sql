/*
  Warnings:

  - You are about to drop the column `filtered` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "filtered" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "filtered";
