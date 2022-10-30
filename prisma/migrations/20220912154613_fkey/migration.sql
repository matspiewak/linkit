-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_pageId_fkey`;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
