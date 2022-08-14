/*
  Warnings:

  - You are about to drop the column `premium` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `premium`,
    ADD COLUMN `role` ENUM('Free', 'Premium') NOT NULL DEFAULT 'Free';

-- CreateTable
CREATE TABLE `User_Content` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Content_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Content` ADD CONSTRAINT `User_Content_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
