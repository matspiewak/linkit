/*
  Warnings:

  - You are about to drop the column `profileId` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[account_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_profileId_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `profileId`;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `account_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_account_id_key` ON `Profile`(`account_id`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
