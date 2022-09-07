/*
  Warnings:

  - You are about to drop the column `isVisible` on the `LinkStyle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Link` ADD COLUMN `isVisible` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `LinkStyle` DROP COLUMN `isVisible`;
