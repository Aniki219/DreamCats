/*
  Warnings:

  - You are about to drop the column `userCatCatId` on the `Nest` table. All the data in the column will be lost.
  - You are about to drop the column `userCatUserId` on the `Nest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nest" DROP COLUMN "userCatCatId",
DROP COLUMN "userCatUserId";
