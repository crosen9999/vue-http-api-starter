-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.23-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table dev.article
CREATE TABLE IF NOT EXISTS `article` (
  `ArticleID` int(11) NOT NULL AUTO_INCREMENT,
  `ArticleName` varchar(255) NOT NULL,
  `ArticleText` text NOT NULL,
  PRIMARY KEY (`ArticleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table dev.article: ~3 rows (approximately)
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`ArticleID`, `ArticleName`, `ArticleText`) VALUES
	(1, 'JavaScript Async Await', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
	(2, 'Vue Router Starter Guide', 'This is a short description'),
	(3, 'Deployment Automation', 'Automation is the key to reliable deployment.');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
