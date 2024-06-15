/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_user_id_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_user_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_user_id_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "invites";

-- DropTable
DROP TABLE "members";

-- DropTable
DROP TABLE "organizations";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "tokens";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "AccountProvider";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "TokenType";

-- CreateTable
CREATE TABLE "Survivor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "infectionReports" INTEGER NOT NULL DEFAULT 0,
    "infected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Survivor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "survivorId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_survivorId_fkey" FOREIGN KEY ("survivorId") REFERENCES "Survivor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
