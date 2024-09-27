/*
  Warnings:

  - You are about to drop the column `name` on the `Tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameEs]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameEn]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameEn` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEs` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tag_name_key";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "name",
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameEs" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nameEs_key" ON "Tag"("nameEs");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nameEn_key" ON "Tag"("nameEn");
