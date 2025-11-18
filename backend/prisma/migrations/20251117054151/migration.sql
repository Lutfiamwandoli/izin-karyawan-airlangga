-- AlterTable
ALTER TABLE `users` ADD COLUMN `atasan_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_atasan_id_fkey` FOREIGN KEY (`atasan_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
