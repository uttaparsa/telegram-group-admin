-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: group_manager
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `GroupRule`
--

DROP TABLE IF EXISTS `GroupRule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GroupRule` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ruleId` int NOT NULL,
  `telegramGroupId` int NOT NULL,
  PRIMARY KEY (`ruleId`,`telegramGroupId`),
  KEY `telegramGroupId` (`telegramGroupId`),
  CONSTRAINT `GroupRule_ibfk_1` FOREIGN KEY (`ruleId`) REFERENCES `rules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `GroupRule_ibfk_2` FOREIGN KEY (`telegramGroupId`) REFERENCES `telegram_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GroupRule`
--

LOCK TABLES `GroupRule` WRITE;
/*!40000 ALTER TABLE `GroupRule` DISABLE KEYS */;
/*!40000 ALTER TABLE `GroupRule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MessageGroup`
--

DROP TABLE IF EXISTS `MessageGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MessageGroup` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `messageId` int NOT NULL,
  `telegramGroupId` int NOT NULL,
  PRIMARY KEY (`messageId`,`telegramGroupId`),
  KEY `telegramGroupId` (`telegramGroupId`),
  CONSTRAINT `MessageGroup_ibfk_1` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `MessageGroup_ibfk_2` FOREIGN KEY (`telegramGroupId`) REFERENCES `telegram_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MessageGroup`
--

LOCK TABLES `MessageGroup` WRITE;
/*!40000 ALTER TABLE `MessageGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `MessageGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ParentChildInGroups`
--

DROP TABLE IF EXISTS `ParentChildInGroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ParentChildInGroups` (
  `parentTgId` varchar(255) NOT NULL,
  `childTgId` varchar(255) NOT NULL,
  `groupTgId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`parentTgId`,`childTgId`,`groupTgId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ParentChildInGroups`
--

LOCK TABLES `ParentChildInGroups` WRITE;
/*!40000 ALTER TABLE `ParentChildInGroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `ParentChildInGroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SpamGroup`
--

DROP TABLE IF EXISTS `SpamGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SpamGroup` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `spamId` int NOT NULL,
  `telegramGroupId` int NOT NULL,
  PRIMARY KEY (`spamId`,`telegramGroupId`),
  KEY `telegramGroupId` (`telegramGroupId`),
  CONSTRAINT `SpamGroup_ibfk_1` FOREIGN KEY (`spamId`) REFERENCES `spams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `SpamGroup_ibfk_2` FOREIGN KEY (`telegramGroupId`) REFERENCES `telegram_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SpamGroup`
--

LOCK TABLES `SpamGroup` WRITE;
/*!40000 ALTER TABLE `SpamGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `SpamGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserGroups`
--

DROP TABLE IF EXISTS `UserGroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserGroups` (
  `warnsNumber` int unsigned DEFAULT '0',
  `scoreNumber` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `telegramGroupId` int NOT NULL,
  PRIMARY KEY (`userId`,`telegramGroupId`),
  KEY `telegramGroupId` (`telegramGroupId`),
  CONSTRAINT `UserGroups_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserGroups_ibfk_2` FOREIGN KEY (`telegramGroupId`) REFERENCES `telegram_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserGroups`
--

LOCK TABLES `UserGroups` WRITE;
/*!40000 ALTER TABLE `UserGroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserGroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tgId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `is_boss` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tgId` (`tgId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'143058007',NULL,NULL,1,'2021-02-08 11:38:37','2021-02-08 11:38:37');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clearPeriods`
--

DROP TABLE IF EXISTS `clearPeriods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clearPeriods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from` int unsigned DEFAULT NULL,
  `to` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `telegramGroupId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `telegramGroupId` (`telegramGroupId`),
  CONSTRAINT `clearPeriods_ibfk_1` FOREIGN KEY (`telegramGroupId`) REFERENCES `telegram_groups` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clearPeriods`
--

LOCK TABLES `clearPeriods` WRITE;
/*!40000 ALTER TABLE `clearPeriods` DISABLE KEYS */;
/*!40000 ALTER TABLE `clearPeriods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `sender_id` varchar(255) DEFAULT NULL,
  `message_id` varchar(255) DEFAULT NULL,
  `date_send` int unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rules`
--

DROP TABLE IF EXISTS `rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(100) NOT NULL,
  `session` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spams`
--

DROP TABLE IF EXISTS `spams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `isGlobal` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `text` (`text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spams`
--

LOCK TABLES `spams` WRITE;
/*!40000 ALTER TABLE `spams` DISABLE KEYS */;
/*!40000 ALTER TABLE `spams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telegram_groups`
--

DROP TABLE IF EXISTS `telegram_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telegram_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tgId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tgId` (`tgId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telegram_groups`
--

LOCK TABLES `telegram_groups` WRITE;
/*!40000 ALTER TABLE `telegram_groups` DISABLE KEYS */;
INSERT INTO `telegram_groups` VALUES (1,'testgroup','-523811115','2021-02-08 11:38:52','2021-02-08 11:38:52');
/*!40000 ALTER TABLE `telegram_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tgId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tgId` (`tgId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2021-02-08 15:11:53
