-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` tinytext,
  `photo` varchar(255) DEFAULT NULL,
  `regdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Dias','Dussayev','z8bulon@gmail.com','$2a$10$WYpdn3/x3pdWYn7Gw59p8epEZ00rvQ6touX4j0HfWH5Sq1HIOtYt2','Мужчина','1717620066025_pfptest.jpg','2024-06-05 20:38:41'),(2,'test',NULL,'test2@gmail.com','$2a$10$vk9OnexaDcHc3cEW6ihJluv3xzjypIDGv2a6EsE5agkVTRQ1tarYC',NULL,NULL,'2024-06-05 20:38:44'),(3,'test',NULL,'test3@gmail.com','$2a$10$3cS7ljekIgYzUAo3YMFMH.GtfyH812ZQQKxjPMsaUKWTxVDBOBexu',NULL,NULL,'2024-06-05 20:38:47'),(4,'test',NULL,'test4@gmail.com','$2a$10$ZCZ9n4Nk2FhpBB0cqbcH5Om9F1J33.MoAGf86wTsaDSOxEC0E0c.e',NULL,NULL,'2024-06-05 20:38:49'),(5,'test',NULL,'test5@gmail.com','$2a$10$Rw/DgF8O43GfhERLfXdns.13byVBKDkxB/i9vmfVzGoGqz9cV2zDG',NULL,NULL,'2024-06-05 20:38:52'),(6,'test',NULL,'test6@gmail.com','$2a$10$YJTD3hEcGLX3k.TXbpHdFO0mNudQgGCvRivjVT5WS/ZdE8rdatvIa',NULL,NULL,'2024-06-05 20:38:54'),(7,'test',NULL,'test7@gmail.com','$2a$10$YUTQ2dLsjnBpqoIB8TzNG.023.2JLRNrRGV1X7Z4JlnVgF9xoCRz2',NULL,NULL,'2024-06-05 20:38:57'),(8,'test',NULL,'test8@gmail.com','$2a$10$NxBCKfk2NhYZLrlLJ6DbFukWi1o5IGXwAUa6HS8h8igkDbgRdd5FK',NULL,NULL,'2024-06-05 20:39:00'),(9,'test',NULL,'test9@gmail.com','$2a$10$3wmR2pkMs5eDqPmyZX5ujeO5b/MljZaTKL5aWcihQk7syJU/7xagK',NULL,NULL,'2024-06-05 20:39:03'),(10,'test',NULL,'test10@gmail.com','$2a$10$D5MoLBGQywFali9TjM169Oxkx679bEcsXlpvhv6Wbmv1pcOEKQZpa',NULL,NULL,'2024-06-05 20:39:06'),(11,'test',NULL,'test11@gmail.com','$2a$10$qZj2uDkBiwaXpv0wFhVk7O7Nw3hUylYc5MSfcllNaTcUb91385H0K',NULL,NULL,'2024-06-05 20:39:09'),(12,'test',NULL,'test12@gmail.com','$2a$10$87dbLIebN80FbJAsIIRwl./Tf3DjZfWf4EiZsmcNFVlXhko./abM2',NULL,NULL,'2024-06-05 20:39:12'),(13,'test',NULL,'test13@gmail.com','$2a$10$am3luLJc1Pm4V49c3mp.vekAD4F2BkDLf3.e.sITNu9Pzio6xmqo.',NULL,NULL,'2024-06-05 20:39:16'),(14,'test',NULL,'test14@gmail.com','$2a$10$DEhnbv5XpXhRPR260FBkU.Fb.2irnh3cGOPRhiVhUGep7DoOfj.iu',NULL,NULL,'2024-06-05 20:39:19'),(15,'test',NULL,'test15@gmail.com','$2a$10$FtqTx9qyhP/vGZIV8shkOucz6gDC6sbaP.socBJ/wbLUlFilwSrkC',NULL,NULL,'2024-06-05 20:39:21'),(16,'test',NULL,'test16@gmail.com','$2a$10$mfngK1UNSUNRE9l0kHi0i.s2N5isf5x4apHSKM2850z/jHLrSSOgS',NULL,NULL,'2024-06-05 20:39:23'),(17,'test',NULL,'test17@gmail.com','$2a$10$GafaeNCQghm1Lxz3NGzLnO88hM9SOPngcCMHkoCoLmY/SWL92Z1MG',NULL,NULL,'2024-06-05 20:39:25'),(18,'test',NULL,'test18@gmail.com','$2a$10$LDVBVPoV38H4YfKsgSakaufx9dLQzKpqNm3IR2EwgOLnrINCaMzg2',NULL,NULL,'2024-06-05 20:39:27'),(19,'test',NULL,'test19@gmail.com','$2a$10$eSWKAL7h4tVCsitOUkdpzu6CWsbs1WIyzK7Ox2s86kfKJ6VTru3i6',NULL,NULL,'2024-06-05 20:39:29'),(20,'test',NULL,'test20@gmail.com','$2a$10$wa6om2N3kIl8ZFyxFDPTneHMVFn66kunnhuexoOBISJ8w9iU2C9sG',NULL,NULL,'2024-06-05 20:39:36'),(21,'test',NULL,'test21@gmail.com','$2a$10$4.UpocMjfzjSFhUwAB4Jt.bkle1OD3N762VoyA2OB8VLmLZEiqRAu',NULL,NULL,'2024-06-05 20:39:38');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-06  2:14:37
