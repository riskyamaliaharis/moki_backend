-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2021 at 02:56 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moki_food_beverage`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'coffee'),
(2, 'noncoffee'),
(3, 'food'),
(4, 'addon'),
(5, 'fav');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_method`
--

CREATE TABLE `delivery_method` (
  `delivery_method_id` int(11) NOT NULL,
  `delivery_method_name` varchar(200) NOT NULL,
  `dine_in` tinyint(1) NOT NULL,
  `door_delivery` tinyint(1) NOT NULL,
  `pick_up` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery_method`
--

INSERT INTO `delivery_method` (`delivery_method_id`, `delivery_method_name`, `dine_in`, `door_delivery`, `pick_up`) VALUES
(1, 'Dine In', 1, 0, 0),
(2, 'Door Delivery', 0, 1, 0),
(3, 'Pick Up', 0, 0, 1),
(4, 'Dine In & Door Delivery', 1, 1, 0),
(5, 'Dine In & Pick Up', 1, 0, 1),
(6, 'Pick Up & Door Delivery', 0, 1, 1),
(7, 'All Delivery Method', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `discount_id` int(11) NOT NULL,
  `discount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`discount_id`, `discount`) VALUES
(1, 0),
(2, 0.05),
(3, 0.1),
(4, 0.15),
(5, 0.2),
(6, 0.25),
(7, 0.3),
(8, 0.35),
(9, 0.4),
(10, 0.45),
(11, 0.5),
(12, 0.55),
(13, 0.6),
(14, 0.65);

-- --------------------------------------------------------

--
-- Table structure for table `order_cart`
--

CREATE TABLE `order_cart` (
  `order_id` int(11) NOT NULL,
  `order_invoice` varchar(12) NOT NULL,
  `subtotal` int(50) NOT NULL,
  `status` int(2) NOT NULL,
  `order_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `order_updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `hide_status` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_cart`
--

INSERT INTO `order_cart` (`order_id`, `order_invoice`, `subtotal`, `status`, `order_created_at`, `order_updated_at`, `user_id`, `hide_status`) VALUES
(1, 'MOKI-0001', 30000, 1, '2019-12-26 19:13:14', '0000-00-00 00:00:00', 1, 0),
(2, 'MOKI-0002', 45200, 1, '2020-01-26 19:13:14', '0000-00-00 00:00:00', 1, 0),
(4, 'MOKI-0003', 25000, 1, '2020-02-27 19:13:14', '0000-00-00 00:00:00', 1, 0),
(8, 'MOKI-0009', 69750, 1, '2020-03-27 19:13:14', '0000-00-00 00:00:00', 1, 0),
(27, 'MOKI-0090', 122000, 1, '2020-08-28 19:13:14', '0000-00-00 00:00:00', 2, 0),
(28, 'MOKI-0010', 38000, 1, '2020-11-28 19:13:14', '0000-00-00 00:00:00', 2, 0),
(29, 'MOKI-0120', 43100, 1, '2020-12-29 08:20:00', '0000-00-00 00:00:00', 2, 0),
(30, 'MOKI-0125', 167200, 1, '2020-12-29 01:23:22', '0000-00-00 00:00:00', 2, 0),
(31, 'MOKI-0121', 167200, 1, '2020-12-29 21:53:31', '0000-00-00 00:00:00', 2, 0),
(79, 'MOKI-3155', 131312, 1, '2021-02-16 16:14:10', '0000-00-00 00:00:00', 18, 0),
(85, 'MOKI-7379', 78000, 1, '2021-02-19 13:36:30', '0000-00-00 00:00:00', 18, 1),
(86, 'MOKI-4224', 116560, 1, '2021-02-20 08:43:13', '0000-00-00 00:00:00', 20, 0),
(87, 'MOKI-7244', 90000, 1, '2021-02-20 08:49:21', '0000-00-00 00:00:00', 20, 1),
(88, 'MOKI-489', 14000, 1, '2021-02-20 16:37:35', '0000-00-00 00:00:00', 20, 0),
(89, 'MOKI-3652', 86000, 0, '2021-02-22 10:22:40', '0000-00-00 00:00:00', 20, 0),
(90, 'MOKI-9093', 59120, 1, '2021-02-24 10:41:02', '0000-00-00 00:00:00', 20, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `order_history_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(20) NOT NULL,
  `total` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_history`
--

INSERT INTO `order_history` (`order_history_id`, `product_id`, `qty`, `total`, `order_id`) VALUES
(9, 6, 3, 90000, 25),
(10, 6, 3, 90000, 26),
(11, 3, 3, 4000, 26),
(20, 3, 3, 90000, 27),
(21, 4, 2, 4000, 27),
(28, 2, 3, 75000, 30),
(29, 1, 14, 378000, 30),
(31, 1, 14, 378000, 30),
(32, 2, 3, 75000, 30),
(33, 1, 14, 284200, 30),
(44, 53, 3, 57120, 78),
(45, 53, 4, 53312, 79),
(46, 48, 3, 60000, 79),
(47, 53, 3, 57120, 80),
(48, 48, 3, 60000, 80),
(49, 49, 4, 25600, 81),
(50, 45, 3, 30000, 81),
(51, 44, 3, 39270, 82),
(52, 44, 1, 13090, 83),
(53, 54, 3, 66000, 84),
(54, 44, 4, 44000, 85),
(55, 49, 5, 32000, 85),
(56, 49, 6, 38400, 86),
(57, 53, 4, 76160, 86),
(58, 54, 4, 88000, 87),
(59, 41, 6, 12000, 88),
(60, 54, 3, 66000, 89),
(61, 41, 5, 10000, 89),
(62, 49, 1, 8000, 89),
(63, 53, 3, 57120, 90);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `product_price` int(20) NOT NULL,
  `image_src` varchar(200) NOT NULL,
  `product_description` varchar(300) NOT NULL,
  `delivery_method_id` int(2) NOT NULL,
  `size_id` int(2) NOT NULL,
  `discount_id` int(11) NOT NULL,
  `product_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `product_updated_at` datetime NOT NULL,
  `delivery_start_hour` time NOT NULL,
  `delivery_end_hour` time NOT NULL,
  `product_stock` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_price`, `image_src`, `product_description`, `delivery_method_id`, `size_id`, `discount_id`, `product_created_at`, `product_updated_at`, `delivery_start_hour`, `delivery_end_hour`, `product_stock`) VALUES
(41, 1, 'Coffee Latte Premium', 2000, '2021-01-06T16-00-07.203Zimage 25.png', 'Coffee', 2, 1, 1, '2021-01-06 16:00:07', '2021-01-11 20:26:58', '00:00:00', '20:59:00', 12),
(49, 4, 'Doughnut', 8000, '2021-01-09T13-41-09.535Zdoughnut.jpeg', 'Sweet', 2, 7, 1, '2021-01-09 13:41:10', '2021-01-10 03:40:22', '00:00:00', '20:50:00', 3),
(53, 2, 'Choco Milo', 16000, '2021-01-09T19-03-11.808Zimage 36.png', 'Delicious', 1, 2, 1, '2021-01-09 19:03:11', '2021-01-10 08:33:01', '00:00:00', '00:00:00', 20),
(54, 4, 'Rice', 20000, '2021-01-10T07-54-34.275ZHow-to-boil-rice-square-FS-6126-500x500.jpg', 'For 4 people', 7, 8, 1, '2021-01-10 07:54:34', '0000-00-00 00:00:00', '00:00:00', '00:30:00', 30);

-- --------------------------------------------------------

--
-- Table structure for table `promo`
--

CREATE TABLE `promo` (
  `promo_id` int(11) NOT NULL,
  `coupon_code` varchar(12) NOT NULL,
  `start_coupon` datetime NOT NULL,
  `end_coupon` datetime NOT NULL,
  `coupon_discount` float NOT NULL,
  `product_id` int(11) NOT NULL,
  `promo_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `promo_updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `promo_size` float NOT NULL,
  `promo_description` varchar(200) NOT NULL,
  `promo_deliv_method` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promo`
--

INSERT INTO `promo` (`promo_id`, `coupon_code`, `start_coupon`, `end_coupon`, `coupon_discount`, `product_id`, `promo_created_at`, `promo_updated_at`, `promo_size`, `promo_description`, `promo_deliv_method`) VALUES
(12, 'MOKI-0005', '2021-01-18 00:00:00', '2021-01-23 00:00:00', 0.3, 54, '2021-01-11 04:57:05', '2021-01-11 11:57:05', 1.72, 'Buy 2 bowl Rice for your big family', 2),
(16, 'MOKI-0005', '2021-02-16 00:00:00', '2021-02-22 03:00:00', 0.2, 49, '2021-02-16 23:33:18', '2021-02-19 02:25:44', 0, 'Delicious', 0);

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `size_name` varchar(20) NOT NULL,
  `R` tinyint(1) NOT NULL,
  `L` tinyint(1) NOT NULL,
  `XL` tinyint(1) NOT NULL,
  `gram250` tinyint(1) NOT NULL,
  `gram300` tinyint(1) NOT NULL,
  `gram500` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `size_name`, `R`, `L`, `XL`, `gram250`, `gram300`, `gram500`) VALUES
(1, 'R', 1, 0, 0, 0, 0, 0),
(2, 'L', 0, 1, 0, 0, 0, 0),
(3, 'XL', 0, 0, 1, 0, 0, 0),
(4, 'R-L', 1, 1, 0, 0, 0, 0),
(5, 'R-XL', 1, 0, 1, 0, 0, 0),
(6, 'L-XL', 0, 1, 1, 0, 0, 0),
(7, '250', 0, 0, 0, 1, 0, 0),
(8, '300', 0, 0, 0, 0, 1, 0),
(9, '500', 0, 0, 0, 0, 0, 1),
(10, '250-300', 0, 0, 0, 1, 1, 0),
(11, '250-500', 0, 0, 0, 1, 0, 1),
(12, '300-500', 0, 0, 0, 0, 1, 1),
(13, 'all_size_drink', 1, 1, 1, 0, 0, 0),
(14, 'all_size_food', 0, 0, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `user_photo` varchar(200) NOT NULL,
  `user_role` tinyint(1) NOT NULL,
  `email` varchar(40) NOT NULL,
  `mobile` varchar(40) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` varchar(225) NOT NULL,
  `member_card_status` int(4) NOT NULL,
  `date_account` datetime NOT NULL DEFAULT current_timestamp(),
  `password` varchar(150) NOT NULL,
  `date_updated_account` datetime NOT NULL,
  `user_key` int(11) NOT NULL,
  `user_status` int(2) NOT NULL,
  `user_birthdate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `first_name`, `last_name`, `user_photo`, `user_role`, `email`, `mobile`, `gender`, `address`, `member_card_status`, `date_account`, `password`, `date_updated_account`, `user_key`, `user_status`, `user_birthdate`) VALUES
(9, 'riskyamaliaharis', 'Risky Amalia ', 'Haris', '', 1, 'admin-moki@gmail.com', '2147483647', 'female', 'Sepakat Street', 1, '2020-12-22 00:00:00', '$2b$07$rGn2SZG.QzBPDcQUteVJtuoGPpuhQLx9IOgPK6zey443.e2cW0DM2', '2021-02-13 23:35:19', 0, 1, '2021-02-17 22:20:45'),
(10, 'Huwaida Azzahra', 'Huwaida', 'Azzahra', '2020-12-27T21-59-16.920Zimage 39.png', 0, 'iloverohis159@gmail.com', '2147483647', 'female', 'Cendrawasih Street ', 1, '2020-12-27 00:00:00', '$2b$10$Jw65lLC7wwWoVbZdT4EcdeobJJvkEIClzPLOQa5ega2eXCQDZya4a', '0000-00-00 00:00:00', 0, 0, '2021-02-17 22:20:45'),
(11, 'Nose', 'Huwaida', 'Azzahra', '2021-02-17T15-44-55.235ZChat App.JPG', 0, 'akumaudaftar@gmail.com', '2147483647', 'female', 'Cendrawasih Street ', 1, '2020-12-30 07:00:15', '$2b$10$B3GbdoxGr/xsVGduIupYfOj0V0/ycLfy5UtxLAwxHMkmM/g7CFlzy', '2021-02-17 22:44:56', 0, 0, '2021-02-17 22:20:45'),
(12, 'Huwaida Azzahra', '', '', '', 0, 'akumaudaftar2@gmail.com', '0', '', '', 0, '2021-01-11 14:40:47', '$2b$07$5YsRJIAMj7KVCRxW5D/8FOfidX95pltP5mLnn4zB3Qs/4Vl4tBm36', '2021-02-13 22:20:40', 0, 0, '2021-02-17 22:20:45'),
(13, 'Huwaida Azzahra', '', '', '', 0, 'akumaudaftar3@gmail.com', '0', '', '', 0, '2021-01-11 15:46:10', '$2b$10$GJTIDtfCv9LZyfUI0dy0yeAwIsY5mNRZlgyRV3O/fBTAux.iOMaVy', '0000-00-00 00:00:00', 0, 0, '2021-02-17 22:20:45'),
(14, 'Huwaida Azzahra', '', '', '', 0, 'akumaudaftar1@gmail.com', '0', '', '', 0, '2021-02-12 11:01:02', '$2b$10$LC27f92.WAFKLGP1khtf6eVnr6CoD8v/AgRXdyHdvp9HrhesoZYi2', '0000-00-00 00:00:00', 0, 0, '2021-02-17 22:20:45'),
(15, 'Aku', '', '', '', 0, 'akumaudaftar20@gmail.com', '0', '', '', 0, '2021-02-12 11:07:18', '$2b$10$3WjYL7RcH4ZlDQhfyYpvhe2PwhWkeFFX3PZKomdVwyz.ohd3tZDMu', '0000-00-00 00:00:00', 0, 0, '2021-02-17 22:20:45'),
(16, 'Aku', '', '', '', 0, 'aku@gmail.com', '0', '', '', 0, '2021-02-12 11:22:42', '$2b$10$44oqR4KXWUYeydKI5Un1/erj1lXZ5WZSkC2/1bwB9Y2.kQEAVH62W', '0000-00-00 00:00:00', 0, 0, '2021-02-17 22:20:45'),
(17, 'Aku', '', '', '', 0, 'aku1@gmail.com', '0', '', '', 0, '2021-02-12 11:41:42', '$2b$10$mGivqzmG4fc79LpiZzGDWeqFouZW7RFklPhrex/phhoheT2NvczL.', '0000-00-00 00:00:00', 0, 0, '2021-02-17 22:20:45'),
(18, 'Risky Amalia Haris', 'Risky Amalia', 'Haris', '2021-02-23T21-43-49.715ZSyifa.png', 1, 'amaliaharisr@gmail.com', '081354988039', 'Female', 'Jalan Sepakat Mawar No. 24', 1, '2021-02-13 01:37:23', '$2b$07$41gZkaRuwISs2CYAoBCrMuThndeP3rvRdHSRTSOMsbDFbUBrSSV4C', '2021-02-24 04:43:49', 326989, 1, '2021-02-06 20:00:00'),
(19, 'Huwaida', '', '', '', 0, 'dinaaqilahharis@gmail.com', '0', '', '', 0, '2021-02-13 13:19:15', '$2b$10$sbymNz6F0wVE73SxlzjYX.VJk/ejD0m6WdpweIoktrAC2MDrQFjeO', '2021-02-13 13:54:41', 0, 1, '2021-02-17 22:20:45'),
(20, 'Windira Nurinsani', 'Windira', 'Nurinsani', '2021-02-20T01-39-46.051Zgigi.jpg', 0, 'windiranurinsani@gmail.com', '081354988036', 'Female', 'Iskandar Street Km 5  South Panggentungan', 0, '2021-02-19 13:46:13', '$2b$10$BFcgLr1NHGX1KUuWq8TEnO.DS1w2mYTqo3JKgD8SWlgzVLa8xNnom', '2021-02-20 09:20:15', 0, 1, '2021-01-04 17:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `delivery_method`
--
ALTER TABLE `delivery_method`
  ADD PRIMARY KEY (`delivery_method_id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`discount_id`);

--
-- Indexes for table `order_cart`
--
ALTER TABLE `order_cart`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`order_history_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promo_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `delivery_method`
--
ALTER TABLE `delivery_method`
  MODIFY `delivery_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `order_cart`
--
ALTER TABLE `order_cart`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `order_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
