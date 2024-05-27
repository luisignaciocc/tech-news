-- AlterTable
ALTER TABLE "News" ADD COLUMN     "body" TEXT,
ADD COLUMN     "byline" TEXT,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lang" TEXT,
ADD COLUMN     "length" INTEGER,
ADD COLUMN     "parsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "siteName" TEXT;
