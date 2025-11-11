/*
  Warnings:

  - You are about to drop the column `atasan_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `jabatan` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `jabatan_verifikator` on the `verifikasi_izin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_atasan_id_fkey`;

-- DropIndex
DROP INDEX `users_atasan_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `izin` MODIFY `tanggal_pengajuan` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `atasan_id`,
    DROP COLUMN `jabatan`,
    ADD COLUMN `jabatan_id` INTEGER NULL,
    MODIFY `role` ENUM('admin', 'karyawan', 'hrd', 'kepala_sekolah') NOT NULL DEFAULT 'karyawan';

-- AlterTable
ALTER TABLE `verifikasi_izin` DROP COLUMN `jabatan_verifikator`,
    MODIFY `tanggal_verifikasi` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `jabatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `atasan_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jabatan` ADD CONSTRAINT `jabatan_atasan_id_fkey` FOREIGN KEY (`atasan_id`) REFERENCES `jabatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_jabatan_id_fkey` FOREIGN KEY (`jabatan_id`) REFERENCES `jabatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
