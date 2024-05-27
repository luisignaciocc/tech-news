-- AlterTable
ALTER TABLE "News" ADD COLUMN     "searchQuery" TEXT,
ADD COLUMN     "sourceId" INTEGER;

-- CreateTable
CREATE TABLE "NewsSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "lastUpdateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "NewsSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsSource_name_key" ON "NewsSource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NewsSource_url_key" ON "NewsSource"("url");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "NewsSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
