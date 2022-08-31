/*
  Warnings:

  - You are about to drop the column `profileId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_profileId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profileId`,
    ADD COLUMN `pageId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_pageId_key` ON `User`(`pageId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
