-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: DA
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `Area`
--

DROP TABLE IF EXISTS `Area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Area` (
  `AreaId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Codigo` varchar(50) NOT NULL,
  `SedeId` int DEFAULT NULL,
  PRIMARY KEY (`AreaId`),
  UNIQUE KEY `Codigo` (`Codigo`),
  KEY `SedeId` (`SedeId`),
  CONSTRAINT `Area_ibfk_1` FOREIGN KEY (`SedeId`) REFERENCES `Sede` (`SedeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Area`
--

LOCK TABLES `Area` WRITE;
/*!40000 ALTER TABLE `Area` DISABLE KEYS */;
INSERT INTO `Area` VALUES (1,'Administrativo','0BYFIV',3),(2,'TI','D3Y9NM',2),(3,'Contabilidad','8GJFC8',1),(4,'Logistica','0UL0E3',2);
/*!40000 ALTER TABLE `Area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Documento`
--

DROP TABLE IF EXISTS `Documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documento` (
  `DocumentoId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Tipo` varchar(100) DEFAULT NULL,
  `FechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsuarioId` int DEFAULT NULL,
  `EstadoActualId` int DEFAULT NULL,
  `AreaActualId` int DEFAULT NULL,
  `TiempoRespuestaDias` int DEFAULT NULL,
  `FechaAceptado` datetime DEFAULT NULL,
  `Src` mediumtext NOT NULL,
  PRIMARY KEY (`DocumentoId`),
  KEY `UsuarioId` (`UsuarioId`),
  KEY `EstadoActualId` (`EstadoActualId`),
  KEY `AreaActualId` (`AreaActualId`),
  CONSTRAINT `Documento_ibfk_1` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`),
  CONSTRAINT `Documento_ibfk_2` FOREIGN KEY (`EstadoActualId`) REFERENCES `EstadoDocumento` (`EstadoId`),
  CONSTRAINT `Documento_ibfk_3` FOREIGN KEY (`AreaActualId`) REFERENCES `Area` (`AreaId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EstadoDocumento`
--

DROP TABLE IF EXISTS `EstadoDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EstadoDocumento` (
  `EstadoId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`EstadoId`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EstadoDocumento`
--

LOCK TABLES `EstadoDocumento` WRITE;
/*!40000 ALTER TABLE `EstadoDocumento` DISABLE KEYS */;
INSERT INTO `EstadoDocumento` VALUES (3,'Aceptado'),(4,'Finalizado'),(1,'Radicado'),(2,'Trasladado');
/*!40000 ALTER TABLE `EstadoDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HistorialDocumento`
--

DROP TABLE IF EXISTS `HistorialDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HistorialDocumento` (
  `HistorialId` int NOT NULL AUTO_INCREMENT,
  `DocumentoId` int DEFAULT NULL,
  `EstadoId` int DEFAULT NULL,
  `FechaCambio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsuarioId` int DEFAULT NULL,
  PRIMARY KEY (`HistorialId`),
  KEY `DocumentoId` (`DocumentoId`),
  KEY `EstadoId` (`EstadoId`),
  KEY `UsuarioId` (`UsuarioId`),
  CONSTRAINT `HistorialDocumento_ibfk_1` FOREIGN KEY (`DocumentoId`) REFERENCES `Documento` (`DocumentoId`),
  CONSTRAINT `HistorialDocumento_ibfk_2` FOREIGN KEY (`EstadoId`) REFERENCES `EstadoDocumento` (`EstadoId`),
  CONSTRAINT `HistorialDocumento_ibfk_3` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HistorialDocumento`
--

LOCK TABLES `HistorialDocumento` WRITE;
/*!40000 ALTER TABLE `HistorialDocumento` DISABLE KEYS */;
/*!40000 ALTER TABLE `HistorialDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rol`
--

DROP TABLE IF EXISTS `Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol` (
  `RolId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`RolId`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol`
--

LOCK TABLES `Rol` WRITE;
/*!40000 ALTER TABLE `Rol` DISABLE KEYS */;
INSERT INTO `Rol` VALUES (1,'Admin'),(2,'Gestionador'),(3,'Radicador');
/*!40000 ALTER TABLE `Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sede`
--

DROP TABLE IF EXISTS `Sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sede` (
  `SedeId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Ciudad` varchar(100) NOT NULL,
  PRIMARY KEY (`SedeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sede`
--

LOCK TABLES `Sede` WRITE;
/*!40000 ALTER TABLE `Sede` DISABLE KEYS */;
INSERT INTO `Sede` VALUES (1,'Bogota','Bogota D.C'),(2,'Medellin','Medellin'),(3,'Cali','Cali');
/*!40000 ALTER TABLE `Sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `UsuarioId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `RolId` int DEFAULT NULL,
  `AreaId` int DEFAULT NULL,
  PRIMARY KEY (`UsuarioId`),
  UNIQUE KEY `Usuario` (`Usuario`),
  KEY `RolId` (`RolId`),
  KEY `AreaId` (`AreaId`),
  CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`RolId`) REFERENCES `Rol` (`RolId`),
  CONSTRAINT `Usuario_ibfk_2` FOREIGN KEY (`AreaId`) REFERENCES `Area` (`AreaId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'Jhonatan Peinado','jonathan@gmail.com','4a3f06ab818f057c3588be31d7216c773282fe809851a9493cbe5a072d4e169c',1,3);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-17 10:18:35
