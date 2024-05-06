-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: dokyshop
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `zipCode` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,NULL,NULL,NULL,NULL,'2024-05-05 20:41:10','2024-05-05 20:41:10'),(2,'Calle Falsa 123','Quilmes Oeste','Buenos Aires',1881,'2024-05-05 20:41:10','2024-05-05 20:41:10'),(3,NULL,NULL,NULL,NULL,'2024-05-05 20:41:10','2024-05-05 20:41:10'),(4,'Calle Falsa 123','Temperley  ','Buenos Aires',1834,'2024-05-05 20:41:10','2024-05-05 20:41:10'),(5,NULL,NULL,NULL,NULL,'2024-05-05 20:41:10','2024-05-05 20:41:10'),(6,NULL,NULL,NULL,NULL,'2024-05-05 20:41:10','2024-05-05 20:41:10');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `viewId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:11',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:11',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `viewId` (`viewId`),
  CONSTRAINT `banners_ibfk_1` FOREIGN KEY (`viewId`) REFERENCES `views` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'banner-1.png',NULL,NULL,1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(2,'banner-2.png',NULL,NULL,1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(3,'banner-3.png',NULL,NULL,1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'General'),(2,'Perros'),(3,'Gatos');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `paragraph` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'One','¿Cómo puedo contactar al servicio de atención al cliente?','Si tenes alguna consulta, podes escribirnos al whatsapp (011) 9 4493-2370, o a nuestro gmail dokyshop@gmail.com, de Lunes a Viernes de 9 a 18hs.'),(2,'Two','¿Cuáles son los métodos de pago aceptados?','Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal y transferencias bancarias.'),(3,'Three','¿Cuáles son las políticas de devolución y reembolso?','Si no está satisfecho con su compra, aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto.'),(4,'Four','¿Cuánto tiempo tarda en llegar mi pedido?','El tiempo de entrega depende de su ubicación y del método de envío seleccionado. Por lo general, los pedidos dentro del país se entregan en 7 días.'),(5,'Five','¿Ofrecen envío internacional?','Sí, ofrecemos envíos internacionales a la mayoría de los países. Los tiempos de entrega y costos pueden variar según el destino.'),(6,'Six','¿Qué debo hacer si mi producto llega dañado?','Lamentamos cualquier inconveniente. Por favor, póngase en contacto con nuestro equipo de atención al cliente dentro de los 3 días posteriores a la recepción del producto para que podamos resolver el problema lo antes posible.'),(7,'Seven','¿Puedo cancelar mi pedido después de realizarlo?','Si su pedido aún no ha sido enviado, puede cancelarlo contactando a nuestro servicio al cliente. Una vez que el pedido haya sido enviado, ya no se puede cancelar.'),(8,'Eight','¿Qué productos ofrecen?','En nuestra tienda, ofrecemos una amplia variedad de productos para perros y gatos, incluyendo juguetes, accesorios e indumentaria. En la sección de juguetes, encontrarás desde pelotas y mordedores hasta juguetes interactivos diseñados para mantener entretenidas a tus mascotas. Nuestros accesorios incluyen una variedad de correas, collares, comederos, bebederos y otros artículos esenciales para tu mascota. Además, también contamos con una selección de indumentaria que incluye abrigos, suéteres y accesorios para que tu mascota luzca con estilo en cualquier ocasión.'),(9,'Nine','¿Tienen productos para mascotas de todas las edades?','Sí, ofrecemos una amplia gama de productos adecuados para mascotas de todas las edades, desde cachorros y gatitos hasta perros y gatos mayores.'),(10,'Ten','¿Qué debo hacer si no encuentro un producto específico en su tienda?','Si no encuentras un producto específico en nuestra tienda, por favor, ponte en contacto con nuestro equipo de atención al cliente y estaremos encantados de ayudarte a encontrarlo o de considerar la posibilidad de añadirlo a nuestro inventario.');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagesecondaries`
--

DROP TABLE IF EXISTS `imagesecondaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagesecondaries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(45) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `imagesecondaries_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagesecondaries`
--

LOCK TABLES `imagesecondaries` WRITE;
/*!40000 ALTER TABLE `imagesecondaries` DISABLE KEYS */;
INSERT INTO `imagesecondaries` VALUES (1,'Gigwi2.webp',1,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(2,'pelotaChuckit2.webp',2,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(3,'didactico2.webp',3,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(4,'tunel2.webp',4,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(5,'chapita2.webp',5,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(6,'pechera2.webp',6,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(7,'rascador2.webp',7,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(8,'pelota2.webp',8,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(9,'tabla.webp',9,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(10,'tabla.webp',10,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(11,'tabla.webp',11,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(12,'tabla.webp',12,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(13,'goma.webp',13,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(14,'imagesSecondary-1710302039306.jpg',14,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(15,'imagesSecondary-1710302039308.jpg',14,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(16,'imagesSecondary-1710302235110.jpeg',15,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(17,'imagesSecondary-1710449092093.webp',16,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(18,'imagesSecondary-1710302993110.webp',17,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(19,'imagesSecondary-1710303214274.webp',18,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(20,'imagesSecondary-1710303693543.webp',19,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(21,'imagesSecondary-171382177879745.jpg',20,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL);
/*!40000 ALTER TABLE `imagesecondaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderproducts`
--

DROP TABLE IF EXISTS `orderproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderproducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderproducts`
--

LOCK TABLES `orderproducts` WRITE;
/*!40000 ALTER TABLE `orderproducts` DISABLE KEYS */;
INSERT INTO `orderproducts` VALUES (1,1,16,2,'2024-05-05 20:41:10','2024-05-05 20:41:10'),(2,1,13,1,'2024-05-05 20:41:10','2024-05-05 20:41:10'),(3,2,20,1,'2024-05-05 20:41:10','2024-05-05 20:41:10');
/*!40000 ALTER TABLE `orderproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` decimal(10,0) DEFAULT NULL,
  `userId` int NOT NULL,
  `state` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,21400,4,'pending','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(2,75000,2,'completed','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otherimages`
--

DROP TABLE IF EXISTS `otherimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otherimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `viewId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:11',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:11',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `viewId` (`viewId`),
  CONSTRAINT `otherimages_ibfk_1` FOREIGN KEY (`viewId`) REFERENCES `views` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otherimages`
--

LOCK TABLES `otherimages` WRITE;
/*!40000 ALTER TABLE `otherimages` DISABLE KEYS */;
INSERT INTO `otherimages` VALUES (1,'FAQ.jpg','petsection',1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(2,'vet-gato.jpg','petsection',1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(3,'accesorios.png','category',1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(4,'indumentaria.png','category',1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(5,'juguetes.png','category',1,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(6,'fondoSearchNotFound.jpg','background',2,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(7,'fondo-login.jpeg','background',4,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL),(8,'fondo-login.jpeg','background',5,'2024-05-05 20:41:11','2024-05-05 20:41:11',NULL);
/*!40000 ALTER TABLE `otherimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `subcategoryId` int DEFAULT NULL,
  `description` text,
  `price` decimal(7,2) DEFAULT NULL,
  `sale` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `available` tinyint(1) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `imagePrincipal` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `subcategoryId` (`subcategoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Juguete Para Perro Gigwi Duraspikes Conejo Celeste Extra Durable',2,3,'La serie de juguetes Gigwi Duraspikes se caracteriza por su resistencia, lo que la hace ideal para perros de mordida fuerte. Se presentan en diferentes modelos y colores, y permitirán que tu mascota limpie sus dientes al mismo tiempo que se divierte gracias a sus \'espinas\' de caucho de alta dureza.',25534.00,7,23,1,'LightBlue','Gigwi.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(2,'Pelota Chuckit Kick Fetch',2,3,'Esta pelota tiene una forma especial que facilita a tu perro la tarea de agarrarla y alcanzártela para una diversión sin límites. Está fabricado con espuma súper resistente y sus costuras se encuentran reforzadas para garantizar su durabilidad. Medidas de diámetro: 14 cm.',35903.00,5,25,1,'Coral','pelotaChuckit.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(3,'Juguetes Didacticos Para Gatos',3,3,'Explorer es un juguete de habilidad para gatos, que estimula el instinto depredador del animal, favorece el ejercicio físico y mental y lo obliga a comer más despacio',44234.00,5,22,1,'White','didactico1.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(4,'Tunel Gato Combinable',3,3,'Este túnel para gatos permitirá que tu mascota juegue, se divierta durante horas, tenga su espacio y pueda descansar. Este accesorio es totalmente seguro y se pliega para poder almacenarlo y transportarlo.',6098.00,20,10,1,'Multicolor','tunel1.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(5,'Chapita Identificatoria Glam Small Bone',2,2,'Chapitas identificatorias esmaltadas en bronce y embellecidas con brillantes resplandecientes. Cada medalla es una pequeña joya realizada con materiales hipoalergénicos. Este producto se puede personalizar hasta con 4 líneas de 15 caracteres cada una en su parte posterior.',35093.00,10,19,1,'Multicolor','chapita.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(6,'Pechera Arnes Tela Talle 5',2,2,'Esta pechera es ideal para perros que disfruten de correr durante sus paseos o de acompañar a sus dueños en sus aventuras al aire libre. Tanto la parte superior como la inferior brindan un ajuste seguro alrededor del pecho y el cuello de su mascota.',30924.00,15,17,1,'Multicolor','pechera.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(7,'Rascador Para Gatos Fat Cat Carton Infinit',3,2,'Este rascador de Fat Cat le encantará a tu gato ya que contiene hierba gatera para atraerlo, que se divierta y así fortalecer sus uñas y cuidar tus muebles. Son adecuados para gatos de cualquier edad. Además, viene con un juguete para gatos gratis como valor agregado.',22517.00,20,8,1,'DarkGoldenrod','rascador.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(8,'Pack 6 Pelotas 3,5 Cm',2,2,'Surtido de pelotas en tela con un cascabel interior',3210.00,5,22,1,'Multicolor','pelota.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(9,'SWEATER LANA BEWARE',2,1,'Tejidos Veganos, Sweaters calidad Premium para los de cuatro patas.',20998.00,10,25,1,'OliveDrab','sweater.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(10,'SWEATER LANA BEWARE ROJO',2,1,'Tejidos Veganos, Sweaters calidad Premium para los de cuatro patas.',20998.00,10,23,1,'Red','sweater2.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(11,'SWEATER LANA GUARDAS ASPEN VERDE MILITAR',2,1,'Tejidos Veganos, Sweaters calidad Premium para los de cuatro patas.',20998.00,5,17,1,'OliveDrab','sweater3.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(12,'SWEATER LANA GUARDAS ASPEN BEIGE',2,1,'Tejidos Veganos, Sweaters calidad Premium para los de cuatro patas.',20998.00,5,19,1,'RosyBrown','sweater4.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(13,'Juguete Para Perro Kong Squeezz Hueso Medium C/Sonajero',2,3,'Kong Squeezz Hueso Medium C/Sonajero es un juguete dentalque que le ayudará a mantener limpios los dientes, sino que también aliviará el dolor de la dentición, medida Medium con Sonajero.',5400.00,5,15,1,'Blue','hueso.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(14,'Ratitas x 3',2,3,'Ratitas de goma para el entretenimiento de nuestra mascota, en variaos colores a elección.-',5000.00,5,20,1,'Multicolor','imagePrimary-1710302039305.jpg','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(15,'Rascadores',3,2,'Practico accesorio para nuestra mascota.  Se trata de un instinto que no pueden evitar porque además de afilarse las uñas, rascar es parte del proceso para marcar el territorio. Esto contribuye a la salud mental y emocional de tu gato.-',15000.00,10,30,1,'Black','imagePrimary-1710302235102.png','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(16,'Correa Star Wars Darth Vader Perro Peq',2,2,'Correa de paseo de Star Wars Darth Vader de la línea Disney con simpáticos estampados de la serie animada. Posee una hebilla resistente a los tirones, posee una arándela útil para colgar los accesorios para las bolsas de residuos. Medida aproximada: 100 cm.',8000.00,5,30,1,'Black','imagePrimary-1710449097063.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(17,'Indumentaria canina',2,1,'Indumentaria de calidad para nuestro perrudos de todo terreno, de raza pequeña a grande, varios modelos y colores, dependiendo también las estaciones del año.',12000.00,10,30,1,'Red','imagePrimary-1710302993109.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(18,'camas',1,2,'Casa de tela Nº 3 de máxima calidad y algodón. Estructura en placa poliéster de 20 mm, es un lugar ideal para tu mascota para descansar y jugar. Está revestida por una funda de peluche extra suave. El relleno es de goma espuma y base de nylon antideslizante. Medidas: 45 cm frente X 45 cm altura x 55 cm profundidad.\r\nRECOMENDADOS',35000.00,15,15,1,'Multicolor','imagePrimary-1710303214272.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(19,'Transportador',3,2,'Transportadores de alta calidad y resistentes.  Los transportadores son recomendado en particular para viajes largos. También para las visitas al vet. En esta última es necesario que tu gato se sienta resguardado ante la vulnerabilidad que ellos saben que presentan.',40000.00,10,15,1,'Multicolor','imagePrimary-1710303693542.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(20,'Rascador Para Gatos 2 Pisos 80 Cm',3,2,'Este rascador CanCat de dos niveles brindará diversión a tu gato, permitirá que pueda limar sus uñas, arañar y que tenga un lugar para jugar y descansar. Altura: 80 cm.',75000.00,20,15,1,'Black','imagePrimary-1711424077491.webp','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'REGULAR'),(2,'ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240421043117-create-role.js'),('20240421043804-create-address.js'),('20240421043805-create-user.js'),('20240423041916-create-category.js'),('20240423041952-create-subcategory.js'),('20240423042522-create-product.js'),('20240423042616-create-imagesecundary.js'),('20240423043146-create-order.js'),('20240423043243-create-orderproduct.js'),('20240423050053-create-view.js'),('20240423055840-create-other-image.js'),('20240423060027-create-banner.js'),('20240504220617-create-faq.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Indumentaria'),(2,'Accesorios'),(3,'Juguetes');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `roleId` int DEFAULT '1',
  `avatar` varchar(30) DEFAULT 'perfilUser.png',
  `phone` int DEFAULT NULL,
  `addressId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `addressId` (`addressId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nadia Perez','nadia@gmail.com','$2a$12$O2CKzd.IBo2TChZ7qwTOteRXqyLuiXGy8gEpln9sMG.yT/oN.AmCW',1,'perfilUser.png',0,1,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(2,'Gaston Ayala','gastonayala@gmail.com','$2a$12$XacbRN5iTgZzl8drF3RdOOfvGmnslAjjERiGZUDJL.iCS3ProRbNW',2,'avatar-1711948831309.jpg',0,2,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(3,'ADRIANA ESCUBILLA','escubilla@gmail.com','$2a$12$deNCD8sRPI2MFcPdceryZOLBeXRLNC8zXhIRnIt0r/Nvl3GqQZQnu',2,'avatar-1712043239095.jpg',0,3,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(4,'Omar Piñeiro','omarp@gmail.com','$2a$12$TfjaFgZTWjS32pZZkNYjsenaQYwS.iK3QZ/aEWoMg2LaNMzIy9.B6',1,'avatar-1712083308612.jpg',1125658045,4,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(5,'Ricardina Zabala','rica@gmail.com','$2a$12$JaSitbcjJ8MEgvoHIx2VmOWOMWC4M4VyHVG4vMYV.Y3Hm8ErZ0AtG',2,'avatar-1714199937620.gif',0,5,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(6,'Marcos Borquez','marcos@gmail.com','$2a$12$APovxajp4ES5jC6Cw/4okO.FJDFklLEDJNGkYcWoxCKh8AVXQ29Gm',2,'avatar-1713924989846.png',0,6,'2024-05-05 20:41:10','2024-05-05 20:41:10',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entity` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `updatedAt` datetime NOT NULL DEFAULT '2024-05-05 20:41:10',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (1,'other','home','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(2,'other','results','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(3,'other','faq','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(4,'authentication','login','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(5,'authentication','register','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(6,'users','profile','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(7,'products','listProduct','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL),(8,'products','productDetail','2024-05-05 20:41:10','2024-05-05 20:41:10',NULL);
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-05 17:44:51
