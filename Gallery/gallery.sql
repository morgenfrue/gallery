-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2016 at 01:19 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gallery`
--

-- --------------------------------------------------------

--
-- Table structure for table `gallery_categories`
--

CREATE TABLE IF NOT EXISTS `gallery_categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CATEGORY` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `SERIE` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `gallery_categories`
--

INSERT INTO `gallery_categories` (`ID`, `CATEGORY`, `SERIE`) VALUES
(1, 'Copenhagen', 'Christiania'),
(2, 'Copenhagen', 'Nørrebro'),
(3, 'Copenhagen', 'Vesterbro'),
(4, 'Copenhagen', 'Indre By'),
(5, 'Copenhagen', 'Østerbro'),
(6, 'Prague', 'Staré mĕsto'),
(7, 'Prague', 'Florenc'),
(8, 'Prague', 'Žižkov'),
(9, 'Prague', 'Vinohrady'),
(10, 'Prague', 'Hradčany'),
(11, 'Prague', 'Malá Strana'),
(12, 'Prague', 'Smíchov'),
(13, 'Prague', 'Nusle'),
(14, 'Prague', 'Letná'),
(15, 'Prague', 'Nové Město'),
(16, 'Prague', 'Vyšehrad'),
(17, 'Prague', 'Holešovice'),
(18, 'Germany', 'Berlin'),
(19, 'Germany', 'Potsdam'),
(20, 'Czech Republic', 'Karlštejn'),
(21, 'Czech Republic', 'Terezín'),
(22, 'Denmark', 'Copenhagen'),
(23, 'Denmark', 'Farum'),
(24, 'Denmark', 'Bornholm'),
(25, 'Czech Republic', 'Prague');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_gear`
--

CREATE TABLE IF NOT EXISTS `gallery_gear` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CAMERA` varchar(128) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `gallery_gear`
--

INSERT INTO `gallery_gear` (`ID`, `CAMERA`) VALUES
(1, 'Nikon D100'),
(2, 'Nikon D70'),
(3, 'Pentax MZ-5'),
(4, 'Pentax K-3'),
(5, 'Canon G-12'),
(6, 'Sony RX-100');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_photos`
--

CREATE TABLE IF NOT EXISTS `gallery_photos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DATE` year(4) NOT NULL,
  `CATEGORY` int(32) NOT NULL,
  `DESCRIPTION` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `GEAR` int(11) NOT NULL,
  `FILEPATH` varchar(128) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `gallery_photos`
--

INSERT INTO `gallery_photos` (`ID`, `TITLE`, `DATE`, `CATEGORY`, `DESCRIPTION`, `GEAR`, `FILEPATH`) VALUES
(1, 'Vlatava, castle and bridge', 2014, 10, 'View from Staré mĕsto', 2, 'F:\\PHOTOS\\Prag\\JULY-2014\\DONE\\DSC_0004.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
