/*
  Warnings:

  - You are about to drop the column `body` on the `Page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Page` DROP COLUMN `body`,
    ADD COLUMN `content` JSON NULL;
