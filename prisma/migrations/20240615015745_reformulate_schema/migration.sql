/*
  Warnings:

  - You are about to drop the `InventoryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_survivorId_fkey";

-- AlterTable
ALTER TABLE "Survivor" ADD COLUMN     "ammunition" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "food" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "medication" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "water" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "InventoryItem";

-- DropTable
DROP TABLE "Resource";
