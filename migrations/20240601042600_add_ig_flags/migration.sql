-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "instagramMediaId" TEXT,
ADD COLUMN     "postedToInstagram" BOOLEAN NOT NULL DEFAULT false;
