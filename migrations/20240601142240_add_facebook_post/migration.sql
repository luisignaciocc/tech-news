-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "facebookPostId" TEXT,
ADD COLUMN     "postedToFacebook" BOOLEAN NOT NULL DEFAULT false;
