-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2025 at 05:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_perizinan_airlangga`
--

-- --------------------------------------------------------

--
-- Table structure for table `izin`
--

CREATE TABLE `izin` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `jenis_izin_id` int(11) NOT NULL,
  `tanggal_pengajuan` date DEFAULT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `tanggal_masuk_kembali` date DEFAULT NULL,
  `jumlah_hari` int(11) DEFAULT NULL,
  `keperluan` text DEFAULT NULL,
  `bukti` varchar(255) DEFAULT NULL,
  `status_izin` enum('diajukan','disetujui','ditolak') DEFAULT 'diajukan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenis_izin`
--

CREATE TABLE `jenis_izin` (
  `id` int(11) NOT NULL,
  `nama_izin` varchar(100) NOT NULL,
  `keterangan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nik` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `divisi` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `telp` varchar(20) DEFAULT NULL,
  `tmm_tmt` date DEFAULT NULL,
  `atasan_id` int(11) DEFAULT NULL,
  `role` enum('karyawan','hrd','kepala_sekolah') DEFAULT 'karyawan',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verifikasi_izin`
--

CREATE TABLE `verifikasi_izin` (
  `id` int(11) NOT NULL,
  `izin_id` int(11) NOT NULL,
  `verifikator_id` int(11) NOT NULL,
  `jabatan_verifikator` varchar(100) DEFAULT NULL,
  `status_verifikasi` enum('menunggu','disetujui','ditolak') DEFAULT 'menunggu',
  `tanggal_verifikasi` date DEFAULT NULL,
  `catatan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `izin`
--
ALTER TABLE `izin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `jenis_izin_id` (`jenis_izin_id`);

--
-- Indexes for table `jenis_izin`
--
ALTER TABLE `jenis_izin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nik` (`nik`),
  ADD KEY `atasan_id` (`atasan_id`);

--
-- Indexes for table `verifikasi_izin`
--
ALTER TABLE `verifikasi_izin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `izin_id` (`izin_id`),
  ADD KEY `verifikator_id` (`verifikator_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `izin`
--
ALTER TABLE `izin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_izin`
--
ALTER TABLE `jenis_izin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `verifikasi_izin`
--
ALTER TABLE `verifikasi_izin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `izin`
--
ALTER TABLE `izin`
  ADD CONSTRAINT `izin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `izin_ibfk_2` FOREIGN KEY (`jenis_izin_id`) REFERENCES `jenis_izin` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`atasan_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `verifikasi_izin`
--
ALTER TABLE `verifikasi_izin`
  ADD CONSTRAINT `verifikasi_izin_ibfk_1` FOREIGN KEY (`izin_id`) REFERENCES `izin` (`id`),
  ADD CONSTRAINT `verifikasi_izin_ibfk_2` FOREIGN KEY (`verifikator_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
