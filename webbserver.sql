/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `birds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `species_id` bigint unsigned DEFAULT NULL,
  `wingspan` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `favourites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `tweet_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `species` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `latin` varchar(255) DEFAULT NULL,
  `wingspan_min` int DEFAULT NULL,
  `wingspan_max` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tweet` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `author_id` bigint unsigned DEFAULT NULL,
  `message` varchar(130) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `birds` (`id`, `species_id`, `wingspan`, `name`) VALUES
(1, 5, 235, 'Krister');
INSERT INTO `birds` (`id`, `species_id`, `wingspan`, `name`) VALUES
(2, 1, 850, 'Tom');
INSERT INTO `birds` (`id`, `species_id`, `wingspan`, `name`) VALUES
(3, 4, 250, 'Elsa');
INSERT INTO `birds` (`id`, `species_id`, `wingspan`, `name`) VALUES
(4, 6, 1250, 'Nathan'),
(5, 3, 1200, 'Todd'),
(6, 2, 900, 'Stefan'),
(45, 4, 250, 'Klegg'),
(46, 7, 900, 'Olle'),
(47, 7, 910, 'Hönrik'),
(48, 7, 915, 'Hönman'),
(58, 12, 910, 'Hönscar'),
(62, 7, 810, 'Hasse'),
(63, 13, 2000, 'Herman');

INSERT INTO `favourites` (`id`, `user_id`, `tweet_id`) VALUES
(3, 1, 16);
INSERT INTO `favourites` (`id`, `user_id`, `tweet_id`) VALUES
(4, 1, 9);
INSERT INTO `favourites` (`id`, `user_id`, `tweet_id`) VALUES
(5, 1, 5);

INSERT INTO `species` (`id`, `name`, `latin`, `wingspan_min`, `wingspan_max`) VALUES
(1, 'Kejsarpingvin', 'Aptenodytes forsteri', 760, 890);
INSERT INTO `species` (`id`, `name`, `latin`, `wingspan_min`, `wingspan_max`) VALUES
(2, 'Tornuggla', 'Tyto alba', 800, 950);
INSERT INTO `species` (`id`, `name`, `latin`, `wingspan_min`, `wingspan_max`) VALUES
(3, 'Pilgrimsfalk', 'Falco peregrinus', 740, 1200);
INSERT INTO `species` (`id`, `name`, `latin`, `wingspan_min`, `wingspan_max`) VALUES
(4, 'Bofink', 'Fringilla coelebs', 240, 280),
(5, 'Talgoxe', 'Parus Major', 220, 250),
(6, 'Korp', 'Corvus Corax', 1000, 1500),
(7, 'Anka', 'Anas platyrhynchos domesticus', 810, 980),
(12, 'Tamhöna', 'Gallus gallus domesticus', 600, 900),
(13, 'Falafel', 'Falafel', 40, 100),
(14, 'Oscar', 'Oscar Oscar', 1, 2),
(15, 'en grabb', 'grabbicus', 33, 44),
(16, 'en grabb', 'grabbicus', 33, 44);

INSERT INTO `tweet` (`id`, `author_id`, `message`, `created_at`, `updated_at`) VALUES
(1, 1, 'Hello.', '2025-01-14 08:55:20', '2025-01-14 08:55:20');
INSERT INTO `tweet` (`id`, `author_id`, `message`, `created_at`, `updated_at`) VALUES
(2, 2, 'KILL YOURSELF!!!', '2025-01-14 10:38:59', '2025-01-14 10:38:59');
INSERT INTO `tweet` (`id`, `author_id`, `message`, `created_at`, `updated_at`) VALUES
(3, 1, ':(', '2025-01-14 10:40:10', '2025-01-14 10:40:10');
INSERT INTO `tweet` (`id`, `author_id`, `message`, `created_at`, `updated_at`) VALUES
(4, 3, 'KYS borski', '2025-01-14 10:41:20', '2025-01-14 10:41:20'),
(5, 4, 'Jag är gud.', '2025-01-14 10:42:26', '2025-01-14 10:42:26'),
(7, 3, 'Gengick', '2025-02-04 09:35:07', '2025-02-04 09:35:07'),
(8, 1, 'Hej grabbar', '2025-02-04 09:36:21', '2025-02-04 09:36:21'),
(9, 4, 'Hallå', '2025-02-04 09:39:58', '2025-02-04 09:39:58'),
(11, 3, 'mmmm Gengrico', '2025-02-04 10:15:27', '2025-02-04 10:15:27'),
(16, 2, 'jag är boll', '2025-02-04 10:29:07', '2025-02-04 10:29:07'),
(22, 3, 'Orskar är pucko', '2025-02-25 09:01:22', '2025-02-25 09:01:22');

INSERT INTO `user` (`id`, `name`) VALUES
(1, 'OrskiTorski');
INSERT INTO `user` (`id`, `name`) VALUES
(2, 'OlleBolleBingBong');
INSERT INTO `user` (`id`, `name`) VALUES
(3, 'Its_Henrico');
INSERT INTO `user` (`id`, `name`) VALUES
(4, 'Hermandez');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;