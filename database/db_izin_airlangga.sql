-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_izin_airlangga
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('4c08b08c-241f-4c55-98b4-0ab632ccf736','5f40e3e003d0346420f0eef365f3294ca73dfec3179f48949ca55a1503844561','2025-11-27 07:29:11.006','20251127072909',NULL,NULL,'2025-11-27 07:29:09.276',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atasan`
--

DROP TABLE IF EXISTS `atasan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atasan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atasan`
--

LOCK TABLES `atasan` WRITE;
/*!40000 ALTER TABLE `atasan` DISABLE KEYS */;
INSERT INTO `atasan` VALUES (3,'Muhammad Yani, S.Kom., M.T.I'),(4,'Dewi Septyani, S.Kom.'),(5,'Mira Irawati, S.Pd.'),(6,'Rosmawati, S.Kom.'),(7,'Diana Tri Maryani, S. AB.');
/*!40000 ALTER TABLE `atasan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `izin`
--

DROP TABLE IF EXISTS `izin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `izin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `jenis_izin_id` int(11) NOT NULL,
  `tanggal_pengajuan` datetime(3) DEFAULT current_timestamp(3),
  `tanggal_mulai` datetime(3) NOT NULL,
  `tanggal_selesai` datetime(3) NOT NULL,
  `tanggal_masuk_kembali` datetime(3) DEFAULT NULL,
  `jumlah_hari` int(11) DEFAULT NULL,
  `keperluan` varchar(191) DEFAULT NULL,
  `bukti` varchar(191) DEFAULT NULL,
  `status_izin` enum('diajukan','disetujui','ditolak') NOT NULL DEFAULT 'diajukan',
  PRIMARY KEY (`id`),
  KEY `izin_user_id_fkey` (`user_id`),
  KEY `izin_jenis_izin_id_fkey` (`jenis_izin_id`),
  CONSTRAINT `izin_jenis_izin_id_fkey` FOREIGN KEY (`jenis_izin_id`) REFERENCES `jenis_izin` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `izin_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `izin`
--

LOCK TABLES `izin` WRITE;
/*!40000 ALTER TABLE `izin` DISABLE KEYS */;
INSERT INTO `izin` VALUES (1,4,1,'2025-11-27 07:45:59.006','2025-11-27 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',3,'sakit','1764229558971-bukti.PNG','disetujui'),(2,4,1,'2025-11-27 07:46:06.225','2025-11-27 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',3,'sakit','1764229566184-bukti.PNG','disetujui'),(3,4,1,'2025-11-27 07:59:56.037','2025-11-27 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',3,'',NULL,'diajukan'),(4,4,1,'2025-11-27 08:07:37.464','2025-11-15 00:00:00.000','2025-11-18 00:00:00.000','2025-11-19 00:00:00.000',4,'',NULL,'ditolak'),(5,3,1,'2025-11-28 06:16:56.618','2025-11-28 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',2,'',NULL,'diajukan'),(6,3,1,'2025-11-28 06:17:12.758','2025-11-28 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',2,'',NULL,'diajukan'),(7,3,1,'2025-11-28 06:18:59.677','2025-11-26 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',4,'',NULL,'diajukan'),(8,3,1,'2025-11-28 06:35:42.248','2025-11-28 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',2,'',NULL,'diajukan'),(9,3,1,'2025-11-28 06:37:38.702','2025-11-28 00:00:00.000','2025-11-29 00:00:00.000','2025-11-30 00:00:00.000',2,'',NULL,'diajukan');
/*!40000 ALTER TABLE `izin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jabatan`
--

DROP TABLE IF EXISTS `jabatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jabatan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) NOT NULL,
  `atasan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jabatan_atasan_id_fkey` (`atasan_id`),
  CONSTRAINT `jabatan_atasan_id_fkey` FOREIGN KEY (`atasan_id`) REFERENCES `atasan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jabatan`
--

LOCK TABLES `jabatan` WRITE;
/*!40000 ALTER TABLE `jabatan` DISABLE KEYS */;
INSERT INTO `jabatan` VALUES (1,'Admin',NULL),(2,'Kepala Sekolah',NULL),(3,'PJ.PKL dan Kerjasama',3),(4,'WAKA KURIKULUM',3),(5,'WAKA KESISWAAN',3),(6,'BENDAHARA',3),(7,'KA. TENAGA ADMINISTRASI SEKOLAH',3),(9,'KA. PROGRAM KEAHLIAN PPLG',4),(10,'KA. PROGRAM KEAHLIAN TJKT',4),(11,'KA. PROGRAM KEAHLIAN DKV',4),(12,'KA. PROGRAM KEAHLIAN MPLB',4),(13,'SEKERTARIS',NULL);
/*!40000 ALTER TABLE `jabatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jenis_izin`
--

DROP TABLE IF EXISTS `jenis_izin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jenis_izin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_izin` varchar(191) NOT NULL,
  `keterangan` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jenis_izin`
--

LOCK TABLES `jenis_izin` WRITE;
/*!40000 ALTER TABLE `jenis_izin` DISABLE KEYS */;
INSERT INTO `jenis_izin` VALUES (1,'Sakit',NULL),(2,'Keperluan Pribadi',NULL),(3,'Melanjutkan Studi',NULL);
/*!40000 ALTER TABLE `jenis_izin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifikasi`
--

DROP TABLE IF EXISTS `notifikasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifikasi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` varchar(191) NOT NULL,
  `tipe` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'unread',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `Notifikasi_user_id_fkey` (`user_id`),
  CONSTRAINT `Notifikasi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifikasi`
--

LOCK TABLES `notifikasi` WRITE;
/*!40000 ALTER TABLE `notifikasi` DISABLE KEYS */;
INSERT INTO `notifikasi` VALUES (1,4,'Izin Anda telah disetujui','izin_status','read','2025-11-27 07:47:30.168'),(2,4,'Izin Anda telah disetujui','izin_status','read','2025-11-27 07:47:36.869'),(3,4,'Sena Nur Acksyavi mengajukan izin baru','izin_baru','read','2025-11-27 08:07:37.504'),(4,4,'Izin Anda telah disetujui','izin_status','read','2025-11-27 08:09:05.959'),(5,4,'Izin Anda telah ditolak','izin_status','read','2025-11-28 05:45:43.890'),(6,3,'Dewi Septyani mengajukan izin baru','izin_baru','read','2025-11-28 06:16:56.644'),(7,3,'Dewi Septyani mengajukan izin baru','izin_baru','read','2025-11-28 06:17:12.782'),(8,3,'Dewi Septyani mengajukan izin baru','izin_baru','read','2025-11-28 06:18:59.700'),(9,3,'Dewi Septyani mengajukan izin baru','izin_baru','read','2025-11-28 06:35:42.265'),(10,3,'Dewi Septyani mengajukan izin baru','izin_baru','read','2025-11-28 06:37:38.726');
/*!40000 ALTER TABLE `notifikasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nik` varchar(191) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `jabatan_id` int(11) DEFAULT NULL,
  `divisi` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `telp` varchar(191) DEFAULT NULL,
  `tmm_tmt` datetime(3) DEFAULT NULL,
  `role` enum('admin','karyawan','hrd','atasan') NOT NULL DEFAULT 'karyawan',
  `password` varchar(191) NOT NULL,
  `foto` varchar(191) DEFAULT NULL,
  `atasan_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_nik_key` (`nik`),
  KEY `users_atasan_id_fkey` (`atasan_id`),
  KEY `users_jabatan_id_fkey` (`jabatan_id`),
  CONSTRAINT `users_atasan_id_fkey` FOREIGN KEY (`atasan_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_jabatan_id_fkey` FOREIGN KEY (`jabatan_id`) REFERENCES `jabatan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'1234','Anto',1,NULL,NULL,NULL,NULL,'admin','1234',NULL,NULL),(3,'123','Dewi Septyani',4,'','','0988899','2025-11-27 00:00:00.000','atasan','123',NULL,3),(4,'12345','Sena Nur Acksyavi',9,'','','098877887788','2025-11-27 00:00:00.000','karyawan','12345',NULL,4),(5,'6789','Bayu',1,'','aktif','098889999','2025-12-01 00:00:00.000','admin','123456',NULL,4);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verifikasi_izin`
--

DROP TABLE IF EXISTS `verifikasi_izin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verifikasi_izin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `izin_id` int(11) NOT NULL,
  `verifikator_id` int(11) NOT NULL,
  `status_verifikasi` enum('menunggu','disetujui','ditolak') NOT NULL DEFAULT 'menunggu',
  `tanggal_verifikasi` datetime(3) DEFAULT current_timestamp(3),
  `catatan` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `verifikasi_izin_izin_id_fkey` (`izin_id`),
  KEY `verifikasi_izin_verifikator_id_fkey` (`verifikator_id`),
  CONSTRAINT `verifikasi_izin_izin_id_fkey` FOREIGN KEY (`izin_id`) REFERENCES `izin` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `verifikasi_izin_verifikator_id_fkey` FOREIGN KEY (`verifikator_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verifikasi_izin`
--

LOCK TABLES `verifikasi_izin` WRITE;
/*!40000 ALTER TABLE `verifikasi_izin` DISABLE KEYS */;
INSERT INTO `verifikasi_izin` VALUES (1,1,3,'menunggu','2025-11-27 07:45:59.028',NULL),(2,2,3,'menunggu','2025-11-27 07:46:06.265',NULL),(3,3,3,'menunggu','2025-11-27 07:59:56.061',NULL),(4,4,3,'menunggu','2025-11-27 08:07:37.484',NULL);
/*!40000 ALTER TABLE `verifikasi_izin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 13:18:16
