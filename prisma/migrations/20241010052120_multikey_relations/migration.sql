/*
  Warnings:

  - A unique constraint covering the columns `[hatcherUserId,hatcherCatId]` on the table `Nest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentCatId` to the `Egg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentUserId` to the `Egg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCatCatId` to the `Nest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCatUserId` to the `Nest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserCat" DROP CONSTRAINT "UserCat_nestId_fkey";

-- AlterTable
ALTER TABLE "Egg" ADD COLUMN     "parentCatId" TEXT NOT NULL,
ADD COLUMN     "parentUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Nest" ADD COLUMN     "hatcherCatId" TEXT,
ADD COLUMN     "hatcherUserId" TEXT,
ADD COLUMN     "userCatCatId" TEXT NOT NULL,
ADD COLUMN     "userCatUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Nest_hatcherUserId_hatcherCatId_key" ON "Nest"("hatcherUserId", "hatcherCatId");

-- AddForeignKey
ALTER TABLE "Egg" ADD CONSTRAINT "Egg_parentUserId_parentCatId_fkey" FOREIGN KEY ("parentUserId", "parentCatId") REFERENCES "UserCat"("userId", "catId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nest" ADD CONSTRAINT "Nest_hatcherUserId_hatcherCatId_fkey" FOREIGN KEY ("hatcherUserId", "hatcherCatId") REFERENCES "UserCat"("userId", "catId") ON DELETE SET NULL ON UPDATE CASCADE;
