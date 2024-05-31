-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postedToTwitter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tweetId" TEXT;
