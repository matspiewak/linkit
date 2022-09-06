/*
  Warnings:

  - You are about to drop the column `content` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `user_title` on the `Page` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link_style_id]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[style_id]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Page_user_title_key` ON `Page`;

-- AlterTable
ALTER TABLE `Page` DROP COLUMN `content`,
    DROP COLUMN `user_title`,
    ADD COLUMN `link_style_id` VARCHAR(191) NULL,
    ADD COLUMN `profile_id` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `style_id` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Style` (
    `id` VARCHAR(191) NOT NULL,
    `page_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `background_color` VARCHAR(191) NOT NULL DEFAULT '#ffffff',
    `effect` VARCHAR(191) NOT NULL DEFAULT 'coming soon',

    UNIQUE INDEX `Style_page_id_key`(`page_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinkStyle` (
    `id` VARCHAR(191) NOT NULL,
    `page_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `border` VARCHAR(191) NOT NULL DEFAULT '4px black solid',
    `radius` VARCHAR(191) NOT NULL DEFAULT '0px',
    `shadow` VARCHAR(191) NOT NULL DEFAULT '0px 0px 0px black',
    `background_color` VARCHAR(191) NOT NULL DEFAULT '#ffffff',
    `font_color` VARCHAR(191) NOT NULL DEFAULT '#000000',
    `font_size` VARCHAR(191) NOT NULL DEFAULT '16px',
    `font_family` VARCHAR(191) NOT NULL DEFAULT 'sans-serif',
    `font_weight` VARCHAR(191) NOT NULL DEFAULT 'normal',
    `font_style` VARCHAR(191) NOT NULL DEFAULT 'normal',

    UNIQUE INDEX `LinkStyle_page_id_key`(`page_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Link` (
    `id` VARCHAR(191) NOT NULL,
    `page_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `text` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `pageId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_id_key`(`id`),
    UNIQUE INDEX `Profile_title_key`(`title`),
    UNIQUE INDEX `Profile_pageId_key`(`pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Page_link_style_id_key` ON `Page`(`link_style_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Page_style_id_key` ON `Page`(`style_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Page_profile_id_key` ON `Page`(`profile_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Page_slug_key` ON `Page`(`slug`);

-- AddForeignKey
ALTER TABLE `Style` ADD CONSTRAINT `Style_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LinkStyle` ADD CONSTRAINT `LinkStyle_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
