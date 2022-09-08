/*
  Warnings:

  - You are about to drop the column `content` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `replyId` on the `Reply` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[replyId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_replyId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "replyId" INTEGER;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "content",
DROP COLUMN "replyId";

-- CreateIndex
CREATE UNIQUE INDEX "Post_replyId_key" ON "Post"("replyId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
