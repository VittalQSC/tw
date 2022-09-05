-- CreateTable
CREATE TABLE "Retwii" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "postId" INTEGER NOT NULL,
    "replacedPostId" INTEGER NOT NULL,

    CONSTRAINT "Retwii_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "postId" INTEGER,
    "replyId" INTEGER,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Retwii_replacedPostId_key" ON "Retwii"("replacedPostId");

-- AddForeignKey
ALTER TABLE "Retwii" ADD CONSTRAINT "Retwii_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retwii" ADD CONSTRAINT "Retwii_replacedPostId_fkey" FOREIGN KEY ("replacedPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
