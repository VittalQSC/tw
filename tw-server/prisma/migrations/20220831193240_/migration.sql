/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
