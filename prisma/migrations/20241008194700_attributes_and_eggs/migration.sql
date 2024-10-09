-- CreateEnum
CREATE TYPE "Attributes" AS ENUM ('AQUATIC', 'MISCHIEVOUS', 'SPEEDY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "cats" (
    "id" TEXT NOT NULL,
    "species" VARCHAR(255) NOT NULL,
    "attributes" "Attributes"[],
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magicDefense" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCat" (
    "userId" TEXT NOT NULL,
    "catId" TEXT NOT NULL,
    "name" TEXT,
    "nestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCat_pkey" PRIMARY KEY ("userId","catId")
);

-- CreateTable
CREATE TABLE "Egg" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Egg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hatchery" (
    "id" TEXT NOT NULL,
    "treeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hatchery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nest" (
    "id" TEXT NOT NULL,
    "hatcheryId" TEXT NOT NULL,
    "eggId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trees" (
    "id" TEXT NOT NULL,
    "hasgarden" BOOLEAN DEFAULT false,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "treeId" TEXT,
    "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItems" (
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserItems_pkey" PRIMARY KEY ("userId","itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cats_species_key" ON "cats"("species");

-- CreateIndex
CREATE UNIQUE INDEX "Hatchery_treeId_key" ON "Hatchery"("treeId");

-- CreateIndex
CREATE UNIQUE INDEX "Nest_eggId_key" ON "Nest"("eggId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "UserCat" ADD CONSTRAINT "UserCat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCat" ADD CONSTRAINT "UserCat_catId_fkey" FOREIGN KEY ("catId") REFERENCES "cats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCat" ADD CONSTRAINT "UserCat_nestId_fkey" FOREIGN KEY ("nestId") REFERENCES "Nest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hatchery" ADD CONSTRAINT "Hatchery_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "trees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nest" ADD CONSTRAINT "Nest_hatcheryId_fkey" FOREIGN KEY ("hatcheryId") REFERENCES "Hatchery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nest" ADD CONSTRAINT "Nest_eggId_fkey" FOREIGN KEY ("eggId") REFERENCES "Egg"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "trees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItems" ADD CONSTRAINT "UserItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItems" ADD CONSTRAINT "UserItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
