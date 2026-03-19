-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 19, 2026 at 04:35 PM
-- Server version: 8.0.45
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_System`
--

-- --------------------------------------------------------

--
-- Table structure for table `booked_system`
--

CREATE TABLE `booked_system` (
  `id` int NOT NULL COMMENT 'id การจอง',
  `user_id` int NOT NULL COMMENT 'id ของ user จาก table users',
  `book_id` int NOT NULL COMMENT 'id ของ book จาก table books',
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `days` int NOT NULL,
  `status` enum('กำลังยืม','คืนแล้ว','borrowed','returned','cancelled') NOT NULL,
  `reminded` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booked_system`
--

INSERT INTO `booked_system` (`id`, `user_id`, `book_id`, `start_date`, `end_date`, `days`, `status`, `reminded`) VALUES
(13, 14, 15, '2026-03-15 23:48:10', '2026-04-09 23:48:10', 25, 'returned', 0),
(15, 15, 14, '2026-03-16 01:09:20', '2026-03-23 01:09:20', 7, 'returned', 0),
(19, 14, 18, '2026-03-16 04:23:56', '2026-03-23 04:23:56', 7, 'returned', 0),
(20, 14, 27, '2026-03-16 06:23:12', '2026-03-29 06:23:12', 13, 'returned', 0),
(21, 14, 18, '2026-03-16 06:46:02', '2026-03-21 06:46:02', 5, 'returned', 0),
(23, 14, 28, '2026-03-16 14:32:42', '2026-03-21 14:32:42', 5, 'returned', 0),
(24, 13, 18, '2026-03-16 14:34:43', '2026-03-21 14:34:43', 5, 'returned', 0),
(25, 14, 30, '2026-03-16 14:36:37', '2026-03-21 14:36:37', 5, 'returned', 0),
(26, 17, 14, '2026-03-16 14:44:44', '2026-03-30 14:44:44', 14, 'returned', 0),
(27, 17, 27, '2026-03-16 15:49:04', '2026-03-29 15:49:04', 13, 'returned', 0),
(28, 17, 28, '2026-03-16 15:49:29', '2026-03-29 15:49:29', 13, 'returned', 0),
(29, 17, 30, '2026-03-16 15:51:30', '2026-03-18 15:51:30', 2, 'returned', 0),
(30, 17, 23, '2026-03-16 15:51:43', '2026-03-18 15:51:43', 2, 'returned', 0),
(31, 17, 27, '2026-03-16 15:52:56', '2026-03-28 15:52:56', 12, 'returned', 0),
(32, 17, 28, '2026-03-16 15:54:04', '2026-04-08 15:54:04', 23, 'returned', 0),
(33, 17, 30, '2026-03-16 15:55:14', '2026-03-21 15:55:14', 5, 'returned', 0),
(34, 17, 14, '2026-03-16 15:57:31', '2026-03-18 15:57:31', 2, 'returned', 0),
(35, 17, 15, '2026-03-16 15:59:11', '2026-03-21 15:59:11', 5, 'returned', 0),
(36, 17, 23, '2026-03-16 16:08:25', '2026-04-08 16:08:25', 23, 'returned', 0),
(38, 17, 16, '2026-03-16 16:10:58', '2026-04-08 16:10:58', 23, 'returned', 0),
(39, 17, 24, '2026-03-16 16:11:07', '2026-04-08 16:11:07', 23, 'returned', 0),
(41, 17, 15, '2026-03-16 16:12:25', '2026-03-28 16:12:25', 12, 'returned', 0),
(45, 21, 14, '2026-03-16 19:35:20', '2026-03-23 19:35:20', 7, 'returned', 0),
(48, 24, 32, '2026-03-16 22:10:02', '2026-03-17 22:10:02', 1, 'returned', 1),
(49, 20, 33, '2026-03-16 22:15:53', '2026-03-17 22:15:53', 1, 'returned', 1),
(50, 24, 32, '2026-03-16 22:53:10', '2026-03-17 22:53:10', 1, 'returned', 0),
(51, 25, 33, '2026-03-17 01:03:40', '2026-03-18 01:03:40', 1, 'returned', 1),
(52, 13, 32, '2026-03-17 19:32:49', '2026-04-16 19:32:49', 30, 'returned', 0),
(53, 19, 27, '2026-03-17 20:02:05', '2026-03-18 20:02:05', 1, 'returned', 0),
(54, 26, 18, '2026-03-18 13:02:58', '2026-03-19 13:02:58', 1, 'returned', 1),
(55, 27, 18, '2026-03-19 21:17:47', '2026-03-24 21:17:47', 5, 'borrowed', 0),
(56, 28, 27, '2026-03-19 22:18:38', '2026-03-24 22:18:38', 5, 'returned', 0),
(57, 28, 37, '2026-03-19 22:18:43', '2026-03-25 22:18:43', 6, 'returned', 0),
(58, 28, 28, '2026-03-19 22:20:55', '2026-03-24 22:20:55', 5, 'returned', 0),
(59, 28, 34, '2026-03-19 22:22:01', '2026-03-20 22:22:01', 1, 'returned', 1),
(60, 28, 36, '2026-03-19 22:23:55', '2026-03-24 22:23:55', 5, 'returned', 0),
(61, 28, 23, '2026-03-19 22:45:52', '2026-04-11 22:45:52', 23, 'returned', 0),
(62, 28, 15, '2026-03-19 22:46:18', '2026-04-01 22:46:18', 13, 'returned', 0),
(63, 28, 36, '2026-03-19 22:48:44', '2026-04-11 22:48:44', 23, 'returned', 0),
(64, 28, 34, '2026-03-19 22:48:50', '2026-03-24 22:48:50', 5, 'returned', 0),
(65, 28, 30, '2026-03-19 22:57:34', '2026-03-24 22:57:34', 5, 'returned', 0),
(66, 28, 14, '2026-03-19 22:57:47', '2026-03-24 22:57:47', 5, 'returned', 0),
(67, 28, 16, '2026-03-19 22:57:53', '2026-03-24 22:57:53', 5, 'returned', 0),
(68, 28, 24, '2026-03-19 22:57:58', '2026-03-24 22:57:58', 5, 'returned', 0),
(69, 28, 33, '2026-03-19 22:58:20', '2026-03-24 22:58:20', 5, 'returned', 0),
(70, 24, 37, '2026-03-19 23:13:09', '2026-03-20 23:13:09', 1, 'returned', 1);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `status` enum('available','borrowed') NOT NULL DEFAULT 'available',
  `book_images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` text NOT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book_name`, `author`, `status`, `book_images`, `description`, `category_id`) VALUES
(14, 'Dirty mind', 'H.Real Martin', 'available', '1773591326309-otgp87u67plU1cI0dFL-o.jpg', 'วิธีทำตัวเป็นคนเลว', 2),
(15, 'Dirty mindV2.0', 'H.Real MartinV2.0', 'available', '1773591339156-otgp87u67plU1cI0dFL-o.jpg', 'วิธีทำตัวเป็นคนเลวV2.0', 2),
(16, 'Clear mind', 'JK.pot Martin', 'available', '1773591378338-otgp87u67plU1cI0dFL-o.jpg', 'เดินถอยหลังแบบเบียวๆ', 3),
(18, 'Bayesian Methods for Hackers: Probabilistic Programming and Bayesian Inference', ' คาเมรอน เดวิดสัน-ไพลอน', 'borrowed', '1773609723697-à¸«à¸à¸±à¸à¸ªà¸·à¸­à¹à¸¥à¹à¸¡à¸à¸µà¹ 1.jpg', 'หนังสือที่เปลี่ยนการเรียนรู้สถิติจากทฤษฎีจ๋ามาเป็นการใช้ Code Python เป็นหลัก เน้นการใช้ไลบรารี PyMC เพื่อแก้ปัญหาด้านความน่าจะเป็นผ่านมุมมองแบบ Bayesian สำหรับโปรแกรมเมอร์และนักวิเคราะห์ข้อมูล โดยเน้นการลงมือปฏิบัติจริงมากกว่าการแก้สมการคณิตศาสตร์ที่ซับซ้อน', 1),
(23, 'wassdassd', 'assdsasd', 'available', '1773615346806-otgp87u67plU1cI0dFL-o.jpg', 'assdassd', 2),
(24, 'assdsasdsa', 'assdsasd', 'available', '1773615384557-otgp87u67plU1cI0dFL-o.jpg', 'assdsasd', 2),
(27, 'ฟหหกฟหหก', 'ฟหหก', 'available', '1773616161798-otgp87u67plU1cI0dFL-o.jpg', 'ฟหหกหฟหก', 1),
(28, 'assdassd', '2assdd', 'available', '1773616761090-otgp87u67plU1cI0dFL-o.jpg', 'azssasd', 1),
(30, 'วิธีเขียน code', 'อาจารย์สุริยะ', 'available', '1773646569658-à¸«à¸à¸±à¸à¸ªà¸·à¸­à¹à¸¥à¹à¸¡à¸à¸µà¹ 1.jpg', 'coding', 1),
(32, '10 วิธีบอกเลิกที่เนียนที่สุดV2', 'H.real', 'available', '1773673779312-image.png', 'สุดยอดความเลวในกำแพงแสน', 3),
(33, 'สอนชายให้เป็นชาย', 'Real.H', 'available', '1773674127811-image.png', 'เย็ดหีทะลวงตูด', 4),
(34, 'assdcassd', 'aassd', 'available', '1773752072842-image.png', 'assdsasd', 1),
(35, 'assdassd', '213assd', 'available', '1773921205683-à¸«à¸à¸±à¸à¸ªà¸·à¸­à¹à¸¥à¹à¸¡à¸à¸µà¹ 1.jpg', 'assdsasd', 3),
(36, 'assdsad', 'zxc', 'available', '1773921503511-otgp87u67plU1cI0dFL-o.jpg', 'asdsad', 1),
(37, 'assdasd', '2213', 'available', '1773921511147-peach.PNG', 'zxcxzc', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `optional` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `optional`) VALUES
(1, 'Programming', '2026-03-15 15:44:00'),
(2, 'Comic', '2026-03-15 15:44:00'),
(3, 'Novel', '2026-03-15 15:44:00'),
(4, 'Science', '2026-03-15 15:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `email`) VALUES
(13, 'q@gmail.com', '$2b$10$eYlw5CzJNshd4olfpAa62.1nDktzBYKWDV8JWmnJRupsZk2RlZyPG', 'user', NULL),
(14, 'jack12@gmail.com', '$2b$10$Qe7bN.a4roUZ3qvfX9K5A.EJvEuhdPsv.yZBcqPvDVWlbU1wly3YK', 'user', NULL),
(15, 'tan@gmail.com', '1234', 'user', NULL),
(16, 'admin@gmail.com', '$2b$10$rPsHvJtXk5UUrsdCyLLvDO40C2UTSymbaiucUADTjy5GCokfRslIu', 'admin', NULL),
(17, 'peach@gmail.com', '$2b$10$AUDtfsnCrSvOFdDHfjLzD.2YUOjugtedQBO7OsaCfMcKDuPy5hql2', 'user', NULL),
(19, 'fromginkhowtv@gmail.com', '$2b$10$LyhvUOkQ1hND64AgxgRMsud45mOLH7NfERRjKnBNN.T3v9Lh/QyOe', 'user', NULL),
(20, 'jackpod1520@gmail.com', 'jackpod1520', 'user', NULL),
(21, 'whoishelove@gmail.com', '4321', 'user', NULL),
(22, 'whoisheluv@gmail.com', '54321', 'user', NULL),
(23, 'dekyourmom@gmail.com', 'dekyourmom@gmail.com', 'user', NULL),
(24, 'pooza1665@gmail.com', '$2b$10$kt6Tx87miBynu4oOVcNb7OIJMXPo8ZUq9p8FrBpujhiAliL.foa36', 'user', NULL),
(25, 'phattaravit.p@ku.th', 'phattaravit.p@ku.th', 'user', NULL),
(26, 'ninatcha.h@ku.th', '$2b$10$sLecfQc58Pph5gEtICh8v.vzwr7T.QECO9ygwfip.gHgSKx/ZP3V.', 'user', NULL),
(27, 'testq@gmail.com', '$2b$10$SU3cVnzxZxjpqvtjauAPrOO3vVIDLiKqrLYDoJQ3dRJDR.qcy5jHK', 'user', NULL),
(28, 'kao@gmail.com', '$2b$10$lNA6zlIHB4hQfsMbxe/wWeKpVNkzOub7uHukYxABIdlzfw6yJznY2', 'user', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booked_system`
--
ALTER TABLE `booked_system`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booked_system`
--
ALTER TABLE `booked_system`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'id การจอง', AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booked_system`
--
ALTER TABLE `booked_system`
  ADD CONSTRAINT `booked_system_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `booked_system_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
