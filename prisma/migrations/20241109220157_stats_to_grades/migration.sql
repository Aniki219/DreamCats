/*
  Warnings:

  - You are about to drop the column `mana` on the `cats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cats" DROP COLUMN "mana",
ALTER COLUMN "strength" SET DATA TYPE TEXT,
ALTER COLUMN "defense" SET DATA TYPE TEXT,
ALTER COLUMN "magicDefense" SET DATA TYPE TEXT,
ALTER COLUMN "intelligence" SET DATA TYPE TEXT,
ALTER COLUMN "speed" SET DATA TYPE TEXT,
ALTER COLUMN "health" SET DATA TYPE TEXT;
