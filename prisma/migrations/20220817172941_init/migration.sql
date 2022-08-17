/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User_Content` DROP FOREIGN KEY `User_Content_userId_fkey`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `User_Content`;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `refresh_token` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `Account_id_key`(`id`),
    UNIQUE INDEX `Account_profileId_key`(`profileId`),
    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `user_title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `profile_content` JSON NULL,
    `role` ENUM('Free', 'Premium') NOT NULL DEFAULT 'Free',

    UNIQUE INDEX `Profile_id_key`(`id`),
    UNIQUE INDEX `Profile_user_title_key`(`user_title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
