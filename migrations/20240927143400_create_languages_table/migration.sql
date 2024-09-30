-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "locale" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
