-- DropForeignKey
ALTER TABLE `jabatan` DROP FOREIGN KEY `jabatan_atasan_id_fkey`;

-- DropIndex
DROP INDEX `jabatan_atasan_id_fkey` ON `jabatan`;

-- CreateTable
CREATE TABLE `atasan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jabatan` ADD CONSTRAINT `jabatan_atasan_id_fkey` FOREIGN KEY (`atasan_id`) REFERENCES `atasan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
