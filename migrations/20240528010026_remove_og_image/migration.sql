/*
  Warnings:

  - You are about to drop the column `date` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `ogImage` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "date",
DROP COLUMN "ogImage",
DROP COLUMN "preview",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ALTER COLUMN "excerpt" DROP NOT NULL,
ALTER COLUMN "coverImage" DROP NOT NULL;
