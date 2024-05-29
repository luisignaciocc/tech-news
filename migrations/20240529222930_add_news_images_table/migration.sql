-- CreateTable
CREATE TABLE "NewsImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,

    CONSTRAINT "NewsImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsImage" ADD CONSTRAINT "NewsImage_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
