/*
  Warnings:

  - You are about to drop the column `replyId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[replyPostId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Reply` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_replyId_fkey";

-- DropIndex
DROP INDEX "Post_replyId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "replyId",
ADD COLUMN     "replyPostId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_replyPostId_key" ON "Post"("replyPostId");

-- CreateIndex
CREATE UNIQUE INDEX "Reply_postId_key" ON "Reply"("postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_replyPostId_fkey" FOREIGN KEY ("replyPostId") REFERENCES "Reply"("postId") ON DELETE SET NULL ON UPDATE CASCADE;
