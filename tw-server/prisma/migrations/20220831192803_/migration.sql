/*
  Warnings:

  - You are about to drop the column `subscriberId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_subscriberId_fkey";

-- DropIndex
DROP INDEX "User_subscriberId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriberId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "FollowerOnFollowed" (
    "id" SERIAL NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followedId" INTEGER NOT NULL,

    CONSTRAINT "FollowerOnFollowed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowerOnFollowed" ADD CONSTRAINT "FollowerOnFollowed_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowerOnFollowed" ADD CONSTRAINT "FollowerOnFollowed_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
