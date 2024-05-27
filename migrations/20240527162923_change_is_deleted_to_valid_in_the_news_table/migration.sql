/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "isDeleted",
ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT false;
