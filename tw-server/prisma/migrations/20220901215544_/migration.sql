/*
  Warnings:

  - The primary key for the `FollowerOnFollowed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FollowerOnFollowed` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followedId,followerId]` on the table `FollowerOnFollowed` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FollowerOnFollowed" DROP CONSTRAINT "FollowerOnFollowed_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "FollowerOnFollowed_followedId_followerId_key" ON "FollowerOnFollowed"("followedId", "followerId");
