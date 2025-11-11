-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nik` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NULL,
    `divisi` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `telp` VARCHAR(191) NULL,
    `tmm_tmt` DATETIME(3) NULL,
    `atasan_id` INTEGER NULL,
    `role` ENUM('karyawan', 'hrd', 'kepala_sekolah') NOT NULL DEFAULT 'karyawan',
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_nik_key`(`nik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_izin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_izin` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `izin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `jenis_izin_id` INTEGER NOT NULL,
    `tanggal_pengajuan` DATETIME(3) NULL,
    `tanggal_mulai` DATETIME(3) NOT NULL,
    `tanggal_selesai` DATETIME(3) NOT NULL,
    `tanggal_masuk_kembali` DATETIME(3) NULL,
    `jumlah_hari` INTEGER NULL,
    `keperluan` VARCHAR(191) NULL,
    `bukti` VARCHAR(191) NULL,
    `status_izin` ENUM('diajukan', 'disetujui', 'ditolak') NOT NULL DEFAULT 'diajukan',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verifikasi_izin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `izin_id` INTEGER NOT NULL,
    `verifikator_id` INTEGER NOT NULL,
    `jabatan_verifikator` VARCHAR(191) NULL,
    `status_verifikasi` ENUM('menunggu', 'disetujui', 'ditolak') NOT NULL DEFAULT 'menunggu',
    `tanggal_verifikasi` DATETIME(3) NULL,
    `catatan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_atasan_id_fkey` FOREIGN KEY (`atasan_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `izin` ADD CONSTRAINT `izin_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `izin` ADD CONSTRAINT `izin_jenis_izin_id_fkey` FOREIGN KEY (`jenis_izin_id`) REFERENCES `jenis_izin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verifikasi_izin` ADD CONSTRAINT `verifikasi_izin_izin_id_fkey` FOREIGN KEY (`izin_id`) REFERENCES `izin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verifikasi_izin` ADD CONSTRAINT `verifikasi_izin_verifikator_id_fkey` FOREIGN KEY (`verifikator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
