-- AlterTable
ALTER TABLE "News" ADD COLUMN     "embedding" vector(1536),
ADD COLUMN     "similarity" DOUBLE PRECISION,
ADD COLUMN     "vectorized" BOOLEAN NOT NULL DEFAULT false;
