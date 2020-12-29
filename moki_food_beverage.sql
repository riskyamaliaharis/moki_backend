-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2020 at 10:06 AM
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
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_cart`
--

INSERT INTO `order_cart` (`order_id`, `order_invoice`, `subtotal`, `status`, `order_created_at`, `order_updated_at`, `user_id`) VALUES
(1, 'MOKI-0001', 30000, 1, '2019-12-26 19:13:14', '0000-00-00 00:00:00', 1),
(2, 'MOKI-0002', 45200, 1, '2020-12-26 19:13:14', '0000-00-00 00:00:00', 1),
(4, 'MOKI-0003', 25000, 1, '2020-12-27 19:13:14', '0000-00-00 00:00:00', 1),
(8, 'MOKI-0009', 69750, 1, '2020-12-27 19:13:14', '0000-00-00 00:00:00', 1),
(26, 'MOKI-0009', 182000, 1, '2020-12-28 19:13:14', '0000-00-00 00:00:00', 2),
(27, 'MOKI-0090', 122000, 1, '2020-12-28 19:13:14', '0000-00-00 00:00:00', 2),
(28, 'MOKI-0010', 38000, 1, '2020-12-28 19:13:14', '0000-00-00 00:00:00', 2),
(29, 'MOKI-0120', 43100, 1, '2020-12-29 08:20:00', '0000-00-00 00:00:00', 2),
(30, 'MOKI-0125', 167200, 1, '2020-12-29 01:23:22', '0000-00-00 00:00:00', 2);

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
(33, 1, 14, 284200, 30);

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
  `payment_method_id` int(2) NOT NULL,
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

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_price`, `image_src`, `product_description`, `payment_method_id`, `delivery_method_id`, `size_id`, `discount_id`, `product_created_at`, `product_updated_at`, `delivery_start_hour`, `delivery_end_hour`, `product_stock`) VALUES
(1, 3, 'Salty Rice Premium', 20300, '2020-12-26T12-35-17.523Zchat_icon.png', 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.', 0, 0, 0, 0, '2020-12-12 06:54:53', '2020-12-26 23:18:27', '00:00:00', '00:00:00', 0),
(2, 1, 'Hazelnut Latte', 25000, 'https://moki-food-and-beverage.netlify.app/customer/product.html', 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.', 0, 0, 0, 0, '2020-12-11 03:13:54', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 0),
(3, 3, 'Salty Rice', 20000, 'https://moki-food-and-beverage.netlify.app/customer/product.html', 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.', 0, 0, 0, 0, '2020-12-10 23:12:22', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 1),
(4, 3, 'Summer Fried Rice', 32000, 'https://moki-food-and-beverage.netlify.app/customer/product.html', 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.', 0, 0, 0, 0, '2020-12-10 23:15:09', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 1),
(7, 3, 'Beef Spaghetti', 35000, 'https://moki-food-and-beverage.netlify.app/customer/product.html', 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.', 0, 0, 0, 0, '2020-12-10 23:18:12', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 1),
(9, 2, 'Cold Brew', 30000, 'https://moki-food-and-beverage.netlify.app/customer/product.html\r\n', 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.', 0, 0, 0, 0, '2020-12-12 06:52:44', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 1),
(11, 2, 'Thai Tea', 10000, 'abcd', 'sakdsl', 1, 2, 1, 1, '2020-12-14 03:17:29', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 1),
(14, 1, 'Mini Pizza', 24000, 'img', 'bla bla', 1, 2, 3, 4, '2020-12-16 06:34:50', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 3),
(15, 1, 'Luwak Coffee', 50000, 'wwwwwwwwwwwwwwwwe', 'ab', 1, 2, 1, 2, '2020-12-20 02:09:26', '0000-00-00 00:00:00', '00:00:00', '00:00:00', 23),
(16, 2, 'Apple Juice', 30000, 'abcd', 'sakdsl', 1, 1, 1, 5, '2020-12-19 23:24:17', '0000-00-00 00:00:00', '00:08:20', '12:12:12', 1),
(17, 4, 'Moki Ice Cream', 8000, 'abc', 'Moki Ice cream is the best', 1, 3, 3, 1, '2020-12-20 12:17:41', '0000-00-00 00:00:00', '09:00:00', '20:00:00', 0),
(18, 3, 'Noodle Oh Noodle', 15000, 'image 2.png', 'Noodle is unhealthy but so delicious', 1, 6, 10, 1, '2020-12-20 14:25:27', '0000-00-00 00:00:00', '09:10:00', '21:30:00', 0),
(19, 2, 'Orange Juice', 30000, 'abcd', 'sakdsl', 1, 1, 1, 5, '2020-12-20 15:25:08', '0000-00-00 00:00:00', '00:08:20', '12:12:12', 1),
(22, 3, 'Milo Ice Cream Latte', 12000, 'chat_icon.png', 'Milo with Ice cream Latte which will make you melt', 1, 1, 7, 1, '2020-12-21 23:31:56', '0000-00-00 00:00:00', '09:30:00', '14:30:00', 30),
(23, 2, 'Zuppa Zuppa', 18500, 'chat_icon.png', 'Zuppa is product with adorable name', 1, 1, 10, 1, '2020-12-21 23:42:58', '0000-00-00 00:00:00', '11:42:00', '23:42:00', 12),
(25, 4, 'Chicken Burger', 17000, 'abcd', 'Burger with original chcken taste', 1, 1, 1, 5, '2020-12-22 22:39:32', '0000-00-00 00:00:00', '08:08:08', '12:12:12', 16),
(28, 3, 'Moki Mie', 8000, '2020-12-26T23-13-55.741Zimage 22.png', 'Don\'t judge food by the name', 1, 3, 3, 5, '2020-12-24 07:48:07', '2020-12-26 23:13:56', '00:12:13', '13:12:00', 4),
(30, 4, 'Corn Cheese', 8000, '2020-12-26T23-33-43.331Zimage 37.png', 'Don\'t judge food by the name', 1, 2, 3, 5, '2020-12-24 08:26:30', '2020-12-26 23:33:43', '00:12:13', '13:12:00', 4),
(32, 0, '', 0, '', '', 0, 0, 0, 0, '2020-12-24 17:16:24', '2020-12-26 02:25:11', '00:00:00', '00:00:00', 0),
(34, 1, 'Vanilla Latte', 20300, '', 'Healthy food', 1, 2, 3, 5, '2020-12-26 02:36:26', '2020-12-26 12:29:45', '00:12:13', '13:12:00', 4),
(35, 3, 'Apem', 20300, '2020-12-26T13-12-47.256Zimage 22.png', 'Delicious Food from Surabaya', 1, 2, 3, 5, '2020-12-26 12:38:38', '2020-12-26 13:13:53', '00:12:13', '13:12:00', 4),
(36, 1, 'Milk Coffee', 5000, '2020-12-26T19-38-11.389Zimage 29.png', 'Healthy drink', 2, 3, 3, 5, '2020-12-26 19:38:15', '2020-12-26 19:39:49', '00:12:00', '17:12:00', 4),
(37, 2, 'Ice Tea', 6000, '2020-12-27T00-03-19.604Zcoffee 3.png', 'Healthy drink', 3, 1, 3, 1, '2020-12-27 00:03:19', '2020-12-27 00:07:52', '08:00:00', '17:30:00', 200);

-- --------------------------------------------------------

--
-- Table structure for table `promo`
--

CREATE TABLE `promo` (
  `promo_id` int(11) NOT NULL,
  `coupon_code` varchar(12) NOT NULL,
  `start_coupon` date NOT NULL,
  `end_coupon` date NOT NULL,
  `coupon_discount` float NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promo`
--

INSERT INTO `promo` (`promo_id`, `coupon_code`, `start_coupon`, `end_coupon`, `coupon_discount`, `product_id`) VALUES
(5, 'FNPR15RG', '2020-12-12', '2020-12-31', 0.3, 3),
(8, 'ARKADEMY-COU', '2021-01-01', '2021-02-02', 0.2, 7),
(9, 'ARKADEMY-COU', '2021-01-01', '2021-02-02', 0.2, 7),
(10, 'ARKA-0101', '2021-01-01', '2021-02-02', 0.2, 7);

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
  `250gr` tinyint(1) NOT NULL,
  `300gr` tinyint(1) NOT NULL,
  `500gr` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `size_name`, `R`, `L`, `XL`, `250gr`, `300gr`, `500gr`) VALUES
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
  `display_name` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `user_photo` varchar(200) NOT NULL,
  `user_role` tinyint(1) NOT NULL,
  `email` varchar(40) NOT NULL,
  `mobile` int(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `address` varchar(40) NOT NULL,
  `member_card_status` int(4) NOT NULL,
  `date_account` date NOT NULL DEFAULT current_timestamp(),
  `password` varchar(150) NOT NULL,
  `date_updated_account` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `display_name`, `first_name`, `last_name`, `user_photo`, `user_role`, `email`, `mobile`, `gender`, `address`, `member_card_status`, `date_account`, `password`, `date_updated_account`) VALUES
(1, 'Zulaikha Amalia', 'Zula', 'Zulaikha', 'Amalia', '', 0, 'zulaikha17@gmail.com', 891456772, 'female', 'St. 12', 1, '2020-12-13', '0', '0000-00-00'),
(8, 'risky', 'askj', 'hdschj', 'jdsji', '', 0, 'riskyyyyy', 38, '1', 'nfki', 1, '2020-12-22', '$2b$10$7BRCal09Xea8JO/d6ZlukurJ/AdtZJ0XBtxqBdmeFF7hjeH9RWcsa', '0000-00-00'),
(9, 'riskyamaliaharis', 'Risky', 'Risky Amalia ', 'Haris', '', 1, 'admin-moki@gmail.com', 2147483647, 'female', 'Sepakat Street', 1, '2020-12-22', '$2b$10$3uUDUp9sStCMBGSS3JQX2Oksa.vH6GuNOQBrt4i4OsO.Gic8XXlC.', '0000-00-00'),
(10, 'Huwaida Azzahra', 'Aida', 'Huwaida', 'Azzahra', '2020-12-27T21-59-16.920Zimage 39.png', 0, 'iloverohis159@gmail.com', 2147483647, 'female', 'Cendrawasih Street ', 1, '2020-12-27', '$2b$10$Jw65lLC7wwWoVbZdT4EcdeobJJvkEIClzPLOQa5ega2eXCQDZya4a', '0000-00-00');

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
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `order_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
