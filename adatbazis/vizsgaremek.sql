-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Máj 17. 23:22
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `vizsgaremek`
--
CREATE DATABASE IF NOT EXISTS `vizsgaremek` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `vizsgaremek`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bevasarlolista`
--

CREATE TABLE `bevasarlolista` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `hozzavalok_id` int(11) DEFAULT NULL,
  `adag` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Eseményindítók `bevasarlolista`
--
DELIMITER $$
CREATE TRIGGER `bevasarloLista_Delete` AFTER DELETE ON `bevasarlolista` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'bevasarlolista', OLD.id, NOW(), 'DELETE', OLD.felhasznalo_id, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `bevasarloLista_Insert` AFTER INSERT ON `bevasarlolista` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'bevasarlolista', NEW.id, NOW(), 'INSERT', NULL, NEW.felhasznalo_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `bevasarloLista_Update` AFTER UPDATE ON `bevasarlolista` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'bevasarlolista', NEW.id, NOW(), 'UPDATE', OLD.hozzavalok_id, NEW.hozzavalok_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertekeles`
--

CREATE TABLE `ertekeles` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `recept_id` int(11) DEFAULT NULL,
  `ertek` double DEFAULT NULL,
  `mikor` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ertekeles`
--

INSERT INTO `ertekeles` (`id`, `felhasznalo_id`, `recept_id`, `ertek`, `mikor`) VALUES
(34, 16, 12, 5, '2025-03-28 21:52:21'),
(35, 5, 16, 5, '2025-04-08 07:54:33'),
(36, 5, 14, 3, '2025-04-11 07:39:35');

--
-- Eseményindítók `ertekeles`
--
DELIMITER $$
CREATE TRIGGER `ertekeles_Delete` AFTER DELETE ON `ertekeles` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'ertekeles', OLD.id, NOW(), 'DELETE', OLD.ertek, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ertekeles_Insert` AFTER INSERT ON `ertekeles` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'ertekeles', NEW.id, NOW(), 'INSERT', NULL, NEW.ertek)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ertekeles_Update` AFTER UPDATE ON `ertekeles` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'ertekeles', NEW.id, NOW(), 'UPDATE', OLD.ertek, NEW.ertek)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etelfajta`
--

CREATE TABLE `etelfajta` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) DEFAULT NULL COMMENT 'Desszert, elöétel'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `etelfajta`
--

INSERT INTO `etelfajta` (`id`, `neve`) VALUES
(1, 'desszert'),
(2, 'előétel'),
(3, 'főétel'),
(4, 'fűszer'),
(5, 'gasztro-ajándék'),
(6, 'gyümölcs'),
(7, 'reggeli'),
(8, 'tengeri herkentyű'),
(9, 'vacsora'),
(10, 'vegetáriánus'),
(11, 'zöldség'),
(12, 'aprósütemény'),
(13, 'befőttek'),
(14, 'bonbonok'),
(15, 'édes keksz'),
(16, 'édes krém'),
(17, 'édes süti'),
(18, 'torta'),
(19, 'kelt tészta'),
(20, 'kenyerek'),
(21, 'töltött zöldség'),
(22, 'tészta'),
(23, 'egytálételek '),
(24, 'köretek '),
(25, 'kuglóf '),
(26, 'tapas '),
(27, 'lángos'),
(28, 'lekvárok-dzsemek'),
(29, 'levesek '),
(30, 'fagyi'),
(31, 'fánk '),
(32, 'szósz '),
(33, 'felfújtak '),
(34, 'főzelékek '),
(35, 'szendvics '),
(36, 'sós süti '),
(37, 'halételek '),
(38, 'húsételek '),
(39, 'italok'),
(40, 'alkoholos italok '),
(41, 'muffin '),
(42, 'palacsinta '),
(43, 'péksütemény'),
(44, 'pite '),
(45, 'pizza'),
(46, 'pogácsa'),
(47, 'pörkölt'),
(48, 'rétes'),
(49, 'saláta'),
(50, 'savanyúság'),
(51, 'sós krémek'),
(52, 'karácsony'),
(53, 'szilveszter'),
(54, 'húsvét'),
(55, 'mentes receptek');

--
-- Eseményindítók `etelfajta`
--
DELIMITER $$
CREATE TRIGGER `etelfajta_Delete` AFTER DELETE ON `etelfajta` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'etelfajta', OLD.id, NOW(), 'DELETE', OLD.neve, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `etelfajta_Insert` AFTER INSERT ON `etelfajta` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'etelefajta', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `etelfajta_Update` AFTER UPDATE ON `etelfajta` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'etelfajta', NEW.id, NOW(), 'UPDATE', OLD.neve, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ujadat_etelfajta` BEFORE INSERT ON `etelfajta` FOR EACH ROW set NEW.neve = lower(NEW.neve)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etrend`
--

CREATE TABLE `etrend` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `etrend`
--

INSERT INTO `etrend` (`id`, `neve`) VALUES
(1, 'energiaszegény étrend'),
(2, 'energiában gazdag étrend'),
(3, 'fehérjeszegény étrend'),
(4, 'fehérjegazdag étrend'),
(5, 'szénhidrátgazdag étrend'),
(6, 'szénhidrát szegény étrend'),
(7, 'zsírszegény étrend'),
(8, 'nátriumszegény (sószegény) étrend'),
(9, 'folyékony változat'),
(10, 'pépes'),
(11, 'rostszegény'),
(12, 'könnyű-vegyes'),
(13, 'normál'),
(14, 'rostokban gazdag'),
(15, 'szondán keresztül'),
(16, 'intravénásan'),
(17, 'savanyító'),
(18, 'lúgosító'),
(19, 'tejmentes'),
(20, 'laktózmentes'),
(21, 'gluténmentes'),
(22, 'purinszegény'),
(23, 'koleszterinszegény'),
(24, 'fenilketonuria (pku) étrendje'),
(25, 'reformétrendek '),
(26, 'inflációs diéta '),
(27, 'paleolit diéta '),
(28, 'dukan-diéta  '),
(29, 'lúgosító diéta '),
(30, 'ketogén diéta '),
(31, 'szakaszos böjtdiéta '),
(32, '5:2 diéta '),
(33, 'almaecet-diéta '),
(34, 'epediéta  '),
(35, 'stockholm diéta '),
(36, 'koleszterindiéta '),
(37, 'tojásdiéta'),
(38, 'fehérjediéta '),
(39, 'turbó diéta® fehérje alapú diéta '),
(40, 'reg-enor® diéta'),
(41, 'űrhajósdiéta'),
(42, 'paleolit fogyókúra '),
(43, 'atkins dieta'),
(44, 'vércsoport diéta - 0 vércsoport'),
(45, 'vércsoport diéta - a vércsoport'),
(46, 'vércsoport diéta - b vércsoport'),
(47, 'vércsoport diéta - ab vércsoport'),
(48, 'dukan megszilárdító'),
(49, 'dukan fenntartó'),
(50, 'dukan lépegető'),
(51, 'dukan nyitó'),
(52, 'cukormentes'),
(53, 'tojásmentes'),
(54, 'vegán'),
(55, 'ovo vegetáriánus'),
(56, 'lakto vegetáriánus'),
(57, 'vegetáriánus'),
(58, 'kos'),
(59, 'bika'),
(60, 'ikrek'),
(61, 'rák'),
(62, 'oroszlán'),
(63, 'szűz'),
(64, 'mérleg'),
(65, 'skorpió'),
(66, 'nyilas'),
(67, 'bak'),
(68, 'vízöntő'),
(69, 'halak'),
(122, 'finso');

--
-- Eseményindítók `etrend`
--
DELIMITER $$
CREATE TRIGGER `etrend_Delete` AFTER DELETE ON `etrend` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'etrend', OLD.id, NOW(), 'DELETE', OLD.neve, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `etrend_Insert` AFTER INSERT ON `etrend` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'etrend', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `etrend_Update` AFTER UPDATE ON `etrend` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'etrend', NEW.id, NOW(), 'UPDATE', OLD.neve, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ujadat_etrend` BEFORE INSERT ON `etrend` FOR EACH ROW set NEW.neve = lower(NEW.neve)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalojog`
--

CREATE TABLE `felhasznalojog` (
  `id` int(11) NOT NULL,
  `jognev` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalojog`
--

INSERT INTO `felhasznalojog` (`id`, `jognev`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'igen');

--
-- Eseményindítók `felhasznalojog`
--
DELIMITER $$
CREATE TRIGGER `felhasznalojog_Delete` AFTER DELETE ON `felhasznalojog` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'felhasznalojog', OLD.id, NOW(), 'DELETE', OLD.jognev, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `felhasznalojog_Insert` AFTER INSERT ON `felhasznalojog` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'felhasznalojog', NEW.id, NOW(), 'INSERT', NULL, NEW.jognev)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `felhasznalojog_Update` AFTER UPDATE ON `felhasznalojog` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'felhasznalojog', NEW.id, NOW(), 'UPDATE', OLD.jognev, NEW.jognev)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `felhnev` varchar(255) DEFAULT NULL,
  `jelszo` text DEFAULT NULL,
  `joga_id` int(11) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `profilkep` text DEFAULT NULL,
  `letrehozas` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `feltoltot_receptek_szama` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `felhnev`, `jelszo`, `joga_id`, `email`, `profilkep`, `letrehozas`, `feltoltot_receptek_szama`) VALUES
(5, 'admin', '$2y$10$ZJb/iRnFrzUGOeYjX12IV.Hut6wYiVh4c2Q/Zv9Fd8E4GmncYHfx.', 1, 'teszt@teszt.co', './feltoltotKepek/profilKepek/admin/admin_profilkep.jpg', '2025-05-12 10:59:06', NULL),
(6, 'alma', '$2y$10$mbd.cLq9dRTJd/51lHCEF.fs3uh.UBfi6SHfe7KKoXeSMQmQe2DBK', 2, 'alma', NULL, '2024-11-25 11:54:58', NULL),
(14, 'Pistabéá', '123', 3, '1', NULL, '2025-03-08 17:31:20', 100),
(16, '111', '$2y$10$QZ1XJxmiUr7BJMsmjswemeCS/Hbs3hYZufEkBGNThwolyOoE.cnfy', 2, '111', NULL, '2025-03-28 21:49:13', NULL);

--
-- Eseményindítók `felhasznalok`
--
DELIMITER $$
CREATE TRIGGER `felhasznalok_Delete` AFTER DELETE ON `felhasznalok` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'felhasznalok', OLD.id, NOW(), 'DELETE', OLD.felhnev, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `felhasznalok_Insert` AFTER INSERT ON `felhasznalok` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'felhasznalok', NEW.id, NOW(), 'INSERT', NULL, NEW.felhnev)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `felhasznalok_Update` AFTER UPDATE ON `felhasznalok` FOR EACH ROW BEGIN
    -- Log changes to email
    IF OLD.email <> NEW.email THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'felhasznalok', NEW.id, NOW(), 'UPDATE_EMAIL', OLD.email, NEW.email);
    END IF;
     IF OLD.felhnev <> NEW.felhnev THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'felhasznalok', NEW.id, NOW(), 'UPDATE_USERNAME', OLD.felhnev, NEW.felhnev);
    END IF;

    -- Log changes to password
    IF OLD.jelszo <> NEW.jelszo THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'felhasznalok', NEW.id, NOW(), 'UPDATE_PASSWORD', '*****', '*****'); -- You can store a placeholder for passwords
    END IF;

    -- Log changes to user role
    IF OLD.joga_id <> NEW.joga_id THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'felhasznalok', NEW.id, NOW(), 'UPDATE_AUTH', OLD.joga_id, NEW.joga_id);
    END IF;

    -- Log changes to profile picture
    IF OLD.profilkep <> NEW.profilkep THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'felhasznalok', NEW.id, NOW(), 'UPDATE_PROFILEPIC', OLD.profilkep, NEW.profilkep);
    END IF;

    -- Log changes to number of uploaded recipes
    IF OLD.feltoltot_receptek_szama <> NEW.feltoltot_receptek_szama THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'felhasznalok', NEW.id, NOW(), 'UPDATE_RECIPESNUMBER', OLD.feltoltot_receptek_szama, NEW.feltoltot_receptek_szama);
    END IF;
    
   
    
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gyerekmenu`
--

CREATE TABLE `gyerekmenu` (
  `id` int(11) NOT NULL,
  `recept_id` int(20) NOT NULL,
  `recept_neve` varchar(20) NOT NULL,
  `napszak` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `gyerekmenu`
--

INSERT INTO `gyerekmenu` (`id`, `recept_id`, `recept_neve`, `napszak`) VALUES
(152, 39, 'Reszelt almás cinnam', 'REGGELI'),
(153, 30, 'Vidám reggeli gyerek', 'REGGELI'),
(154, 36, 'Gofri', 'REGGELI'),
(155, 40, 'Ropogós kiflik', 'REGGELI'),
(156, 16, 'Csirke szárny', 'REGGELI'),
(157, 14, 'Amerikai Palacsinta', 'REGGELI'),
(158, 37, 'Sonkakrém', 'REGGELI'),
(159, 43, 'Céklakrémes dán nyit', 'TÍZÓRAI'),
(160, 42, 'Minibarhesz', 'TÍZÓRAI'),
(161, 44, 'Húsvéti sonkás burge', 'TÍZÓRAI'),
(162, 47, 'Deluxe epres muffin', 'TÍZÓRAI'),
(163, 46, 'Virslis sültkrumpli-', 'TÍZÓRAI'),
(164, 31, 'Csirkemellsonkás szí', 'TÍZÓRAI'),
(165, 45, 'Ropogós bagett', 'TÍZÓRAI'),
(166, 13, 'Poutine', 'EBÉD'),
(167, 32, 'Baconös csirkesaslik', 'EBÉD'),
(168, 29, 'Vegán pizza', 'EBÉD'),
(169, 24, 'Currys csirkemell', 'EBÉD'),
(170, 15, 'Burrito', 'EBÉD'),
(171, 23, 'Corn dog', 'EBÉD'),
(172, 35, 'Sonka Wellington', 'EBÉD'),
(173, 48, 'Vegán melegszendvics', 'UZSONNA'),
(174, 33, 'Mókás szendvics gyer', 'UZSONNA'),
(175, 27, 'Macaron', 'UZSONNA'),
(176, 28, 'Banános zabsüti', 'UZSONNA'),
(177, 50, 'Retró sajtos tallér', 'UZSONNA'),
(178, 49, 'Parmezános ropogós k', 'UZSONNA'),
(179, 17, 'chocolate chip cooki', 'UZSONNA'),
(180, 55, 'Sonkás rántott palac', 'VACSORA'),
(181, 51, 'Borsos tokány', 'VACSORA'),
(182, 56, 'Zsidótojás', 'VACSORA'),
(183, 34, 'Spenótos frittata', 'VACSORA'),
(184, 54, 'Sonkaléleves medveha', 'VACSORA'),
(185, 53, 'Paprikás újburgonya', 'VACSORA'),
(186, 52, 'Egyszerű tojásfasírt', 'VACSORA');

--
-- Eseményindítók `gyerekmenu`
--
DELIMITER $$
CREATE TRIGGER `gyerekmenu_Delete` AFTER DELETE ON `gyerekmenu` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'gyerekmenu', OLD.id, NOW(), 'DELETE', OLD.recept_id, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `gyerekmenu_Insert` AFTER INSERT ON `gyerekmenu` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'gyerekmenu', NEW.id, NOW(), 'INSERT', NULL, NEW.recept_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hetimenu`
--

CREATE TABLE `hetimenu` (
  `id` int(11) NOT NULL,
  `recept_id` int(20) NOT NULL,
  `recept_neve` varchar(20) NOT NULL,
  `napszak` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `hetimenu`
--

INSERT INTO `hetimenu` (`id`, `recept_id`, `recept_neve`, `napszak`) VALUES
(108, 36, 'Gofri', 'REGGELI'),
(109, 39, 'Reszelt almás cinnam', 'REGGELI'),
(110, 40, 'Ropogós kiflik', 'REGGELI'),
(111, 37, 'Sonkakrém', 'REGGELI'),
(112, 14, 'Amerikai Palacsinta', 'REGGELI'),
(113, 38, 'Mennyei tojáskrém', 'REGGELI'),
(114, 16, 'Csirke szárny', 'REGGELI'),
(115, 45, 'Ropogós bagett', 'TÍZÓRAI'),
(116, 31, 'Csirkemellsonkás szí', 'TÍZÓRAI'),
(117, 44, 'Húsvéti sonkás burge', 'TÍZÓRAI'),
(118, 43, 'Céklakrémes dán nyit', 'TÍZÓRAI'),
(119, 42, 'Minibarhesz', 'TÍZÓRAI'),
(120, 46, 'Virslis sültkrumpli-', 'TÍZÓRAI'),
(121, 41, 'Dubai csokis babka', 'TÍZÓRAI'),
(122, 15, 'Burrito', 'EBÉD'),
(123, 24, 'Currys csirkemell', 'EBÉD'),
(124, 23, 'Corn dog', 'EBÉD'),
(125, 32, 'Baconös csirkesaslik', 'EBÉD'),
(126, 35, 'Sonka Wellington', 'EBÉD'),
(127, 13, 'Poutine', 'EBÉD'),
(128, 29, 'Vegán pizza', 'EBÉD'),
(129, 33, 'Mókás szendvics gyer', 'UZSONNA'),
(130, 27, 'Macaron', 'UZSONNA'),
(131, 49, 'Parmezános ropogós k', 'UZSONNA'),
(132, 17, 'chocolate chip cooki', 'UZSONNA'),
(133, 48, 'Vegán melegszendvics', 'UZSONNA'),
(134, 28, 'Banános zabsüti', 'UZSONNA'),
(135, 50, 'Retró sajtos tallér', 'UZSONNA'),
(136, 51, 'Borsos tokány', 'VACSORA'),
(137, 54, 'Sonkaléleves medveha', 'VACSORA'),
(138, 53, 'Paprikás újburgonya', 'VACSORA'),
(139, 52, 'Egyszerű tojásfasírt', 'VACSORA'),
(140, 25, 'Hamburger', 'VACSORA'),
(141, 55, 'Sonkás rántott palac', 'VACSORA'),
(142, 56, 'Zsidótojás', 'VACSORA');

--
-- Eseményindítók `hetimenu`
--
DELIMITER $$
CREATE TRIGGER `hetimenu_Delete` AFTER DELETE ON `hetimenu` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'hetimenu', OLD.id, NOW(), 'DELETE', OLD.recept_id, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hetimenu_Insert` AFTER INSERT ON `hetimenu` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'hetimenu', NEW.id, NOW(), 'INSERT', NULL, NEW.recept_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hozzaszolasok`
--

CREATE TABLE `hozzaszolasok` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `hozzaszolas` text DEFAULT NULL,
  `receptek_id` int(11) DEFAULT NULL,
  `feltoltes_ideje` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `hozzaszolasok`
--

INSERT INTO `hozzaszolasok` (`id`, `felhasznalo_id`, `hozzaszolas`, `receptek_id`, `feltoltes_ideje`) VALUES
(12, 5, 'Szuper étel', 16, '2025-04-08 09:54:46'),
(13, 5, 'Ez egy hozzászólás', 15, '2025-04-15 07:57:18'),
(14, 5, 'Ez egy hozzászólás', 15, '2025-04-15 08:00:28');

--
-- Eseményindítók `hozzaszolasok`
--
DELIMITER $$
CREATE TRIGGER `hozzaszolasok_Delete` AFTER DELETE ON `hozzaszolasok` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'hozzaszolasok', OLD.id, NOW(), 'DELETE', OLD.hozzaszolas, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hozzaszolasok_Insert` AFTER INSERT ON `hozzaszolasok` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'hozzaszolasok', NEW.id, NOW(), 'INSERT', NULL, NEW.hozzaszolas)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hozzaszolasok_Update` AFTER UPDATE ON `hozzaszolasok` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'hozzaszolasok', NEW.id, NOW(), 'UPDATE', OLD.hozzaszolas, NEW.hozzaszolas)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hozzavalok`
--

CREATE TABLE `hozzavalok` (
  `id` int(11) NOT NULL,
  `recept_id` int(11) DEFAULT NULL,
  `hozzavalo` varchar(255) DEFAULT NULL,
  `mennyiseg` double DEFAULT NULL,
  `mertek_egyseg` varchar(255) DEFAULT NULL,
  `kategoria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `hozzavalok`
--

INSERT INTO `hozzavalok` (`id`, `recept_id`, `hozzavalo`, `mennyiseg`, `mertek_egyseg`, `kategoria`) VALUES
(6, 13, 'sült krumpli', 1, 'kg', 'Hozzávalók'),
(7, 13, 'sajtos túró', 0.5, 'kg', 'Hozzávalók'),
(8, 13, 'szaft', 0.5, 'l', 'Hozzávalók'),
(9, 14, 'finomliszt', 225, 'g', 'Tészta'),
(10, 14, 'tojás', 1, 'db', 'Tészta'),
(11, 14, 'tej', 3, 'dl', 'Tészta'),
(12, 14, 'sütőpor', 1, 'csomag', 'Tészta'),
(13, 14, 'cukor', 3, 'ek', 'Tészta'),
(14, 14, 'vaniliás cukor', 1, 'csomag', 'Tészta'),
(15, 14, 'fahéj', 1, 'késhegynyi', 'Tészta'),
(16, 14, 'napraforgó olaj', 1, 'ek', 'Tészta'),
(17, 15, 'darált marhahús', 500, 'g', 'Tölteték'),
(18, 15, 'csemegekukorica', 200, 'g', 'Tölteték'),
(19, 15, 'rizs', 150, 'g', 'Tölteték'),
(20, 15, 'fűszersó', 1, 'ízlés szerint', 'Tölteték'),
(21, 15, 'olívaolaj', 1, 'ek', 'Tölteték'),
(22, 15, 'tejfől', 200, 'g', 'Tölteték'),
(23, 15, 'jalapeño', 1, 'db (karikázott)', 'Tölteték'),
(24, 15, 'lilahagyma', 1, 'kis fej', 'Tölteték'),
(25, 15, 'paradicsom', 150, 'g', 'Tölteték'),
(26, 15, 'koriander', 1, 'ízlés szerint', 'Tölteték'),
(27, 15, 'lime', 0.5, 'db', 'Tölteték'),
(28, 15, 'só', 1, 'ízlés szerint', 'Tölteték'),
(29, 15, 'bors', 1, 'ízlés szerint', 'Tölteték'),
(30, 15, 'paradicsomos bab', 250, 'g', 'Tölteték'),
(31, 15, 'sűrített paradicsom', 2, 'ek', 'Tölteték'),
(32, 15, 'fokhagyma', 3, 'gerezd', 'Tölteték'),
(33, 15, 'olívaolaj', 1, 'ek', 'Tölteték'),
(34, 15, 'tortilla lap', 1, 'db', 'alap'),
(35, 16, 'csirkeszárny', 8, 'db', 'Hozzávalók'),
(36, 16, 'só', 1, 'ízlés szerint', 'Hozzávalók'),
(37, 16, 'szegfűbors', 1, 'ízlés szerint', 'Hozzávalók'),
(38, 16, 'szegfűszeg', 1, 'ízlés szerint', 'Hozzávalók'),
(39, 16, 'fahéj', 1, 'ízlés szerint', 'Hozzávalók'),
(40, 16, 'fekete bors', 1, 'ízlés szerint', 'Hozzávalók'),
(41, 16, 'római kömény', 1, 'ízlés szerint', 'Hozzávalók'),
(42, 16, 'édesköménymag', 1, 'ízlés szerint', 'Hozzávalók'),
(43, 16, 'zöld kardamom', 4, 'db', 'Hozzávalók'),
(44, 16, 'chilipehely', 1, 'ízlés szerint', 'Hozzávalók'),
(45, 16, 'fokhagyma', 2, 'gerezd', 'Hozzávalók'),
(46, 16, 'gyömbér', 2, 'cm', 'Hozzávalók'),
(47, 16, 'olívaolaj', 4, 'ek', 'Hozzávalók'),
(48, 16, 'méz', 1, 'ek', 'Hozzávalók'),
(49, 16, 'szójaszósz', 1, 'el', 'Hozzávalók'),
(50, 17, 'kukoricakeményítő', 3, 'ek', 'tészta'),
(51, 17, 'víz', 2, 'ek', 'tészta'),
(52, 17, 'vaj (sótlan)', 6, 'ek', 'tészta'),
(53, 17, 'liszt', 1.4, 'csésze', 'tészta'),
(54, 17, 'barnacukor', 0.5, 'csésze', 'tészta'),
(55, 17, 'kristálycukor', 0.25, 'csésze', 'tészta'),
(56, 17, 'tojás', 1, 'db', 'tészta'),
(57, 17, 'vanília kivonat', 1, 'tk', 'tészta'),
(58, 17, 'sütőpor', 0.5, 'tk', 'tészta'),
(59, 17, 'szódabikarbóna', 0.25, 'tk', 'tészta'),
(60, 17, 'só', 0.25, 'tk', 'tészta'),
(61, 17, 'csokoládé', 1, 'csésze', 'tészta'),
(65, 21, 'asdf', 23, 'df', 'a'),
(67, 23, 'ketchup', 3, 'evőkanál', 'Tálaláshoz'),
(68, 23, 'mustár', 3, 'evőkanál', 'Tálaláshoz'),
(69, 23, 'finom liszt', 7, 'dkg', 'Corn dog'),
(70, 23, 'kukorica liszt', 7, 'dkg', 'Corn dog'),
(71, 23, 'instant élesztő', 4, 'g', 'Corn dog'),
(72, 23, 'tojás', 1, 'db', 'Corn dog'),
(73, 23, 'tej', 1, 'dl', 'Corn dog'),
(74, 23, 'só', 1, 'csipet', 'Corn dog'),
(75, 23, 'cukor', 1, 'csipet', 'Corn dog'),
(76, 23, 'virsli', 140, 'g', 'Corn dog'),
(77, 23, 'finomliszt virslihez', 1, 'evőkanál', 'Corn dog'),
(78, 23, 'napraforgó olaj (a sütéshez)', 2, 'dl', 'Corn dog'),
(79, 24, 'csirkemellfilé', 500, 'g', 'Currys csirkemell'),
(80, 24, 'fokhagyma', 3, 'gerezd', 'Currys csirkemell'),
(81, 24, 'vöröshagyma', 1, 'nagy fej', 'Currys csirkemell'),
(82, 24, 'reszelt gyömbér', 1, 'hüvelykujjnyi', 'Currys csirkemell'),
(83, 24, 'curry por', 5, 'teáskanál', 'Currys csirkemell'),
(84, 24, 'kókuszkrém', 2, 'dl', 'Currys csirkemell'),
(85, 24, 'paradicsom ivólé', 200, 'ml', 'Currys csirkemell'),
(86, 24, 'bébispenót', 250, 'g', 'Currys csirkemell'),
(87, 24, 'limelé', 1, 'limeból nyert', 'Currys csirkemell'),
(88, 24, 'olívaolaj', 1, 'dl', 'Currys csirkemell'),
(89, 24, 'bors', 1, 'ízlés szerint', 'Currys csirkemell'),
(90, 25, 'darált marhahhús', 500, 'g', 'hamburger'),
(91, 25, 'fűszerkeverék', 1, 'tasak', 'hamburger'),
(92, 25, 'víz', 175, 'ml', 'hamburger'),
(93, 25, 'hamburger zsemle', 4, 'db', 'hamburger'),
(94, 25, 'cheddar sajt', 50, 'g', 'hamburger'),
(95, 25, 'nagy paradicsom', 1, 'db', 'hamburger'),
(96, 25, 'közepes fejessaláta', 1, 'fejessaláta', 'hamburger'),
(97, 25, 'vaj', 25, 'g', 'hamburger'),
(98, 25, 'olívaolaj', 2, 'ek', 'hamburger'),
(99, 25, 'burgerszósz', 2, 'evőkanál', 'hamburger'),
(100, 25, 'majonéz', 2, 'evőkanál', 'hamburger'),
(101, 25, 'kis lilahagyma', 1, 'db', 'hamburger'),
(102, 25, 'csemegeuborka', 2, 'db', 'hamburger'),
(103, 25, 'fűszerpaprika', 1, 'kk', 'hamburger'),
(104, 25, 'csemegeuborka (lé)', 20, 'g', 'hamburger'),
(107, 27, 'habtejszín', 200, 'ml', 'Töltelék'),
(108, 27, 'étcsokoládé', 200, 'g', 'Töltelék'),
(109, 27, 'mandula', 140, 'g', 'Macaron'),
(110, 27, 'porcukor', 280, 'g', 'Macaron'),
(111, 27, 'ételfesték (pink és sárga)', 2, 'csepp', 'Macaron'),
(112, 27, 'tojásfehérje', 4, 'db', 'Macaron'),
(113, 27, 'só', 1, 'csipet', 'Macaron'),
(114, 27, 'vaníliaaroma', 1, 'kávéskanál', 'Macaron'),
(115, 27, 'citromlé', 1, 'ek', 'Macaron'),
(116, 28, 'zabpehely', 60, 'g', 'Banános zabsüti'),
(117, 28, 'búzakorpa', 70, 'g', 'Banános zabsüti'),
(118, 28, 'méz', 3, 'ek', 'Banános zabsüti'),
(119, 28, 'banán', 1.5, 'db', 'Banános zabsüti'),
(120, 28, 'nagy alma', 1, 'db', 'Banános zabsüti'),
(121, 28, 'vaníliaaroma', 5, 'ml', 'Banános zabsüti'),
(122, 29, 'dió', 100, 'g', 'Diósajt'),
(123, 29, 'fokhagymapor', 2, 'tk', 'Diósajt'),
(124, 29, 'só', 1, 'tk', 'Diósajt'),
(125, 29, 'passzírozott paradicsom', 20, 'dkg', 'Feltét'),
(126, 29, 'piros kaliforniai paprika', 0.5, 'db', 'Feltét'),
(127, 29, 'sárga kaliforniai paprika', 0.5, 'db', 'Feltét'),
(128, 29, 'zöld kaliforniai paprika', 0.5, 'db', 'Feltét'),
(129, 29, 'csiperkegomba', 100, 'g', 'Feltét'),
(130, 29, 'lilahagyma', 1, 'db', 'Feltét'),
(131, 29, 'csemegekukorica', 150, 'g', 'Feltét'),
(132, 29, 'só', 1, 'csipet', 'Feltét'),
(133, 29, 'fűszerkömény', 1, 'tk', 'Feltét'),
(134, 29, 'rukkola', 200, 'g', 'Feltét'),
(135, 29, 'olívaolaj', 2, 'ek', 'Feltét'),
(136, 29, 'víz', 220, 'g', 'Tészta'),
(137, 29, 'finomliszt', 380, 'g', 'Tészta'),
(138, 29, 'friss élesztő', 20, 'g', 'Tészta'),
(139, 29, 'cukor', 1, 'ek', 'Tészta'),
(140, 29, 'cukor', 2, 'ek', 'Tészta'),
(141, 30, 'szeletelt kenyér', 1, 'szelet', 'Hozzávalók'),
(142, 30, 'nutella', 1, 'kanál', 'Hozzávalók'),
(143, 30, 'banán', 4, 'karika', 'Hozzávalók'),
(144, 30, 'áfonya', 2, 'karika', 'Hozzávalók'),
(145, 31, 'teljes kiőrlésű kenyér', 2, 'szelet', 'Hozzávalók'),
(146, 31, 'csirkemell sonka', 2, 'szelet', 'Hozzávalók'),
(147, 31, 'krémsajt', 1, 'kenőkésnyi', 'Hozzávalók'),
(148, 31, 'kígyóuborka', 1, 'db', 'Hozzávalók'),
(149, 31, 'paradicsom', 1, 'db', 'Hozzávalók'),
(150, 31, 'reszelt répa', 1, 'nagy db', 'Hozzávalók'),
(151, 31, 'jégsaláta', 1, 'zacskó', 'Hozzávalók'),
(152, 32, 'csirkemell', 1, 'kg', 'Hozzávalók'),
(153, 32, 'bacon', 1, 'zacskó', 'Hozzávalók'),
(154, 32, 'burgonya', 4, 'db', 'Hozzávalók'),
(155, 32, 'fokhagyma', 1, 'gerezd', 'Hozzávalók'),
(156, 32, 'tej', 0.5, 'l', 'Hozzávalók'),
(157, 32, 'vaj', 50, 'g', 'Hozzávalók'),
(158, 33, 'kenyér', 1, 'szelet', 'Hozzávalók'),
(159, 33, 'sonka', 2, 'szelet', 'Hozzávalók'),
(160, 33, 'sajt', 1, 'szelet', 'Hozzávalók'),
(161, 33, 'zöldségek', 1, 'zacskó', 'Hozzávalók'),
(162, 34, 'spenót', 1, 'zacskó', 'Hozzávalók'),
(163, 34, 'tojás', 3, 'db', 'Hozzávalók'),
(164, 34, 'paradicsom', 2, 'db', 'Hozzávalók'),
(165, 34, 'fokhagyma', 2, 'gerezd', 'Hozzávalók'),
(166, 34, 'bazsalikom', 1, 'csipetnyi', 'Hozzávalók'),
(167, 34, 'parmezán sajt', 0.3, 'dkg', 'Hozzávalók'),
(168, 35, 'mustár', 2, 'ek', 'Hozzávalók'),
(169, 35, 'méz', 3, 'ek', 'Hozzávalók'),
(170, 35, 'bors', 1, 'ízlés szerint', 'Hozzávalók'),
(171, 35, 'mézeskalács fűszerkeverék', 1, 'tk', 'Hozzávalók'),
(172, 35, 'főtt sonka', 1.5, 'g', 'Hozzávalók'),
(173, 35, 'leveles tészta', 1, 'csomag', 'Hozzávalók'),
(174, 35, 'tojás', 1, 'db', 'Hozzávalók'),
(175, 36, 'finomliszt', 280, 'g', 'Tészta'),
(176, 36, 'cukor', 3, 'ek', 'Tészta'),
(177, 36, 'szódabikarbóna', 1, 'tk', 'Tészta'),
(178, 36, 'sütőpor', 2, 'tk', 'Tészta'),
(179, 36, 'só', 1, 'ízlés szerint', 'Tészta'),
(180, 36, 'író', 450, 'ml', 'Tészta'),
(181, 36, 'vaj(olvasztott)', 80, 'g', 'Tészta'),
(182, 36, 'tojás', 2, 'db', 'Tészta'),
(183, 36, 'fahéj', 1, 'tk', 'Tészta'),
(184, 36, 'vaníliás cukor', 1, 'csomag', 'Tészta'),
(185, 36, 'vaníliaaroma', 1, 'tk', 'Tészta'),
(186, 37, 'főtt sonka', 350, 'g', 'Hozzávalók'),
(187, 37, 'mustár', 1, 'ek', 'Hozzávalók'),
(188, 37, 'vaj', 30, 'g', 'Hozzávalók'),
(189, 37, 'tejföl', 150, 'g', 'Hozzávalók'),
(190, 37, 'snidling', 1, 'ízlés szerint', 'Hozzávalók'),
(191, 37, 'bors', 1, 'ízlés szerint', 'Hozzávalók'),
(192, 37, 'sajt', 100, 'g', 'Hozzávalók'),
(193, 37, 'méz', 1, 'teáskanál', 'Hozzávalók'),
(194, 38, 'tojás', 10, 'db', 'Hozzávalók'),
(195, 38, 'vaj', 75, 'g', 'Hozzávalók'),
(196, 38, 'tejföl', 4, 'ek', 'Hozzávalók'),
(197, 38, 'sült hagyma', 20, 'g', 'Hozzávalók'),
(198, 38, 'majonézes torma', 60, 'g', 'Hozzávalók'),
(199, 38, 'só', 1, 'ízlés szerint', 'Hozzávalók'),
(200, 38, 'bors', 1, 'ízlés szerint', 'Hozzávalók'),
(201, 38, 'snidling', 1, 'ek', 'Hozzávalók'),
(202, 38, 'mustár', 1, 'teásknalá', 'Hozzávalók'),
(203, 38, 'citromlé', 1, 'ek', 'Hozzávalók'),
(204, 39, 'leveles tészta', 1, 'csomag', 'Hozzávalók'),
(205, 39, 'vaj', 80, 'g', 'Hozzávalók'),
(206, 39, 'fahéj', 2, 'ek', 'Hozzávalók'),
(207, 39, 'barna cukor', 80, 'g', 'Hozzávalók'),
(208, 39, 'só', 1, 'csipet', 'Hozzávalók'),
(209, 39, 'alma', 2, 'db', 'Hozzávalók'),
(210, 39, 'pekándió (pirított)', 50, 'g', 'Hozzávalók'),
(211, 40, 'finomliszt', 50, 'dkg', 'Hozzávalók'),
(212, 40, 'víz', 1.5, 'dl', 'Hozzávalók'),
(213, 40, 'tej', 1.5, 'dl', 'Hozzávalók'),
(214, 40, 'olívaolaj', 0.5, 'dl', 'Hozzávalók'),
(215, 40, 'só', 1, 'teáskanál', 'Hozzávalók'),
(216, 40, 'friss élesztő', 3, 'dkg', 'Hozzávalók'),
(217, 41, 'tej (langyos)', 250, 'ml', 'Hozzávalók'),
(218, 41, 'instant élesztő (dr. oetker instant élesztő)', 1, 'tasak', 'Hozzávalók'),
(219, 41, 'porcukor', 50, 'g', 'Hozzávalók'),
(220, 41, 'só', 1, 'csipet', 'Hozzávalók'),
(221, 41, 'finomliszt', 500, 'g', 'Hozzávalók'),
(222, 41, 'tojás', 2, 'db', 'Hozzávalók'),
(223, 41, 'vaj', 100, 'g', 'Hozzávalók'),
(224, 41, 'pisztáciakrém', 100, 'g', 'Hozzávalók'),
(225, 41, 'cérnametélt', 100, 'g', 'Hozzávalók'),
(226, 41, 'tahini', 4, 'ek', 'Hozzávalók'),
(227, 41, 'vaj', 50, 'g', 'Hozzávalók'),
(228, 41, 'étcsokoládé', 200, 'g', 'Hozzávalók'),
(229, 41, 'habtejszín', 50, 'g', 'Hozzávalók'),
(230, 41, 'pisztácia', 100, 'g', 'Hozzávalók'),
(231, 41, 'vanillincukor', 1, 'csomag', 'Hozzávalók'),
(232, 42, 'finomliszt', 500, 'g', 'Hozzávalók'),
(233, 42, 'tej', 200, 'ml', 'Hozzávalók'),
(234, 42, 'porcukor', 80, 'g', 'Hozzávalók'),
(235, 42, 'vaj', 120, 'g', 'Hozzávalók'),
(236, 42, 'tojás', 2, 'db', 'Hozzávalók'),
(237, 42, 'instant élesztő', 1, 'tasak', 'Hozzávalók'),
(238, 42, 'só', 1, 'csipet', 'Hozzávalók'),
(239, 42, 'tojás(nagy)', 1, 'db', 'Hozzávalók'),
(240, 42, 'szezámmag', 3, 'ek', 'Hozzávalók'),
(241, 43, 'rozskenyér', 400, 'g', 'összeállítás'),
(242, 43, 'margarin', 2, 'ek', 'összeállítás'),
(243, 43, 'tojás', 2, 'db', 'összeállítás'),
(244, 43, 'ecetes cékla', 40, 'g', 'összeállítás'),
(245, 43, 'kecskesajt', 40, 'g', 'összeállítás'),
(246, 43, 'csírák', 10, 'g', 'összeállítás'),
(247, 43, 'cékla', 350, 'g', 'céklakrém'),
(248, 43, 'kecskesajt', 200, 'g', 'céklakrém'),
(249, 43, 'kapor', 0.5, 'csokor', 'céklakrém'),
(250, 43, 'római kömény', 1, 'tk', 'céklakrém'),
(251, 43, 'korieandermag', 1, 'tk', 'céklakrém'),
(252, 43, 'fokhagyma', 2, 'gerezd', 'céklakrém'),
(253, 43, 'só', 1, 'ízlés szerint', 'céklakrém'),
(254, 43, 'bors', 1, 'ízlés szerint', 'céklakrém'),
(255, 43, 'tejmentes margarin', 3, 'ek', 'céklakrém'),
(256, 43, 'víz', 50, 'g', 'céklakrém'),
(257, 44, 'kalács', 300, 'dkg', 'Hozzávalók'),
(258, 44, 'főtt sonka', 200, 'g', 'Hozzávalók'),
(259, 44, 'tojás', 4, 'db', 'Hozzávalók'),
(260, 44, 'majonéz', 100, 'g', 'Hozzávalók'),
(261, 44, 'ecetes torma', 1, 'ek', 'Hozzávalók'),
(262, 44, 'újhagyma', 2, 'db', 'Hozzávalók'),
(263, 44, 'csemegeuborka', 4, 'db', 'Hozzávalók'),
(264, 44, 'só', 1, 'ízlés szerint', 'Hozzávalók'),
(265, 44, 'bors', 1, 'ízlés szerint', 'Hozzávalók'),
(266, 44, 'cheddar sajt', 100, 'g', 'Hozzávalók'),
(267, 44, 'salátalevél', 4, 'db', 'Hozzávalók'),
(268, 44, 'paradicsom', 1, 'g', 'Hozzávalók'),
(269, 44, 'retek', 200, 'g', 'Hozzávalók'),
(270, 44, 'almaecet', 100, 'ml', 'Hozzávalók'),
(271, 44, 'cukor', 50, 'g', 'Hozzávalók'),
(272, 44, 'víz', 200, 'ml', 'Hozzávalók'),
(273, 44, 'lestyán', 1, 'ízlés szerint', 'Hozzávalók'),
(274, 45, 'kenyérliszt bl80', 501, 'g', 'Ropogós bagett'),
(275, 45, 'víz', 350, 'g', 'Ropogós bagett'),
(276, 45, 'só', 14, 'g', 'Ropogós bagett'),
(277, 45, 'friss élesztő', 10, 'g', 'Ropogós bagett'),
(278, 46, 'virsli', 280, 'g', 'Hozzávalók'),
(279, 46, 'újkrumpli', 500, 'g', 'Hozzávalók'),
(280, 46, 'lilahagyma', 1, 'fej', 'Hozzávalók'),
(281, 46, 'majonéz', 100, 'g', 'Hozzávalók'),
(282, 46, 'kapribogyó', 2, 'ek', 'Hozzávalók'),
(283, 46, 'mustár', 1, 'ek', 'Hozzávalók'),
(284, 46, 'só', 1, 'ízlés szerint', 'Hozzávalók'),
(285, 46, 'bors', 1, 'ízlés szerint', 'Hozzávalók'),
(286, 46, 'snidling', 1, 'csokor', 'Hozzávalók'),
(287, 46, 'petrezselyem', 1, 'csokor', 'Hozzávalók'),
(288, 46, 'kapor', 1, 'csokor', 'Hozzávalók'),
(289, 46, 'cimtromhéj', 1, 'db', 'Hozzávalók'),
(290, 46, 'tojás', 4, 'db', 'Hozzávalók'),
(291, 47, 'alma (savanykás)', 5.8, 'db', 'A kompóthoz'),
(292, 47, 'citrom', 1.7, 'db', 'A kompóthoz'),
(293, 47, 'víz', 1250, 'ml', 'A kompóthoz'),
(294, 47, 'rum', 33.3, 'ml', 'A kompóthoz'),
(295, 47, 'cukor', 166.7, 'g', 'A kompóthoz'),
(296, 47, 'fahéjrúd', 0.8, 'db', 'A kompóthoz'),
(297, 47, 'szegfűszeg', 0.8, 'teáskanál', 'A kompóthoz'),
(298, 47, 'szegfűbors (egész)', 0.8, 'teáskanál', 'A kompóthoz'),
(299, 47, 'vanília', 0.4, 'db', 'A kompóthoz'),
(300, 48, 'kenyér', 6, 'szelet', 'Az összeállításhoz'),
(301, 48, 'burgonya', 100, 'g', 'A sajtszószhoz'),
(302, 48, 'édesburgonya', 100, 'g', 'A sajtszószhoz'),
(303, 48, 'kesudió', 40, 'g', 'A sajtszószhoz'),
(304, 48, 'fokhagyma', 2, 'gerezd', 'A sajtszószhoz'),
(305, 48, 'olívaolaj', 60, 'ml', 'A sajtszószhoz'),
(306, 48, 'víz (főzővíz)', 60, 'ml', 'A sajtszószhoz'),
(307, 48, 'élesztőpehely', 2, 'g', 'A sajtszószhoz'),
(308, 48, 'só', 1, 'teáskanál', 'A sajtszószhoz'),
(309, 48, 'füstölt pirospaprika', 1, 'késhegynyi', 'A sajtszószhoz'),
(310, 48, 'csiperkegomba (200 g fehér, 200 g barna)', 400, 'g', 'A szendvicskrémhez'),
(311, 48, 'fokhagyma', 2, 'gerezd', 'A szendvicskrémhez'),
(312, 48, 'citrom', 1, 'db', 'A szendvicskrémhez'),
(313, 48, 'olívaolaj', 7, 'ek', 'A szendvicskrémhez'),
(314, 48, 'só', 1, 'ízlés szerint', 'A szendvicskrémhez'),
(315, 48, 'bors', 1, 'ízlés szerint', 'A szendvicskrémhez'),
(316, 48, 'fehérbab (konzerv)', 240, 'g', 'A szendvicskrémhez'),
(317, 48, 'sűrített paradicsom', 100, 'g', 'A szendvicskrémhez'),
(318, 49, 'zabpehely', 90, 'g', 'Hozzávalók'),
(319, 49, 'finomliszt', 40, 'g', 'Hozzávalók'),
(320, 49, 'vaj', 100, 'g', 'Hozzávalók'),
(321, 49, 'tojás', 1, 'db', 'Hozzávalók'),
(322, 49, 'napraforgómag', 50, 'g', 'Hozzávalók'),
(323, 49, 'parmezán sajt', 50, 'g', 'Hozzávalók'),
(324, 49, 'szezámmag', 70, 'g', 'Hozzávalók'),
(325, 50, 'finomliszt', 250, 'g', 'A tallérokhoz'),
(326, 50, 'szódabikarbóna', 1, 'csipet', 'A tallérokhoz'),
(327, 50, 'sajt', 100, 'g', 'A tallérokhoz'),
(328, 50, 'vaj', 100, 'g', 'A tallérokhoz'),
(329, 50, 'tojás', 1, 'db', 'A tallérokhoz'),
(330, 50, 'tejföl', 3, 'ek', 'A tallérokhoz'),
(331, 50, 'napraforgó olaj', 2, 'ek', 'A tallérokhoz'),
(332, 50, 'só', 1, 'ízlés szerint', 'A tallérokhoz'),
(333, 50, 'bors', 1, 'ízlés szerint', 'A tallérokhoz'),
(334, 50, 'őrölt fűszerkömény', 1, 'ízlés szerint', 'A tallérokhoz'),
(335, 50, 'füstölt pirospaprika', 1, 'ízlés szerint', 'A tallérokhoz'),
(336, 51, 'sertéscomb', 80, 'dkg', 'Hozzávalók'),
(337, 51, 'kolozsvári szalonna', 25, 'dkg', 'Hozzávalók'),
(338, 51, 'libazsír', 2, 'ek', 'Hozzávalók'),
(339, 51, 'vöröshagyma', 1, 'nagy fej', 'Hozzávalók'),
(340, 51, 'fokhagyma', 3, 'gerezd', 'Hozzávalók'),
(341, 51, 'paradicsom', 1, 'db', 'Hozzávalók'),
(342, 51, 'tv-paprika', 1, 'db', 'Hozzávalók'),
(343, 51, 'só', 1, 'ízlés szerint', 'Hozzávalók'),
(344, 51, 'bors', 1, 'ízlés szerint', 'Hozzávalók'),
(345, 51, 'alaplé', 400, 'ml', 'Hozzávalók'),
(346, 52, 'tojás', 10, 'db', 'fasírthoz'),
(347, 52, 'zsemle', 2, 'db', 'fasírthoz'),
(348, 52, 'tej', 200, 'ml', 'fasírthoz'),
(349, 52, 'vöröshagyma', 1, 'db', 'fasírthoz'),
(350, 52, 'fokhagyma', 3, 'gerezd', 'fasírthoz'),
(351, 52, 'napraforgó olaj', 3, 'ek', 'fasírthoz'),
(352, 52, 'petrezselyem', 1, 'csokor', 'fasírthoz'),
(353, 52, 'kapor', 1, 'csokor', 'fasírthoz'),
(354, 52, 'metélőhagyma', 1, 'csokor', 'fasírthoz'),
(355, 52, 'zsemlemorzsa', 100, 'g', 'fasírthoz'),
(356, 52, 'só', 1, 'ízlés szerint', 'fasírthoz'),
(357, 52, 'bors', 0, 'ízlés szerint', 'fasírthoz'),
(358, 52, 'napraforgó olaj', 200, 'ml', 'fasírthoz'),
(359, 53, 'napraforgó olaj', 3, 'ek', 'paprikáshoz'),
(360, 53, 'vöröshagyma', 1, 'db', 'paprikáshoz'),
(361, 53, 'fokhagyma', 4, 'gerezd', 'paprikáshoz'),
(362, 53, 'kápia paprika', 3, 'db', 'paprikáshoz'),
(363, 53, 'paradicsom', 3, 'db', 'paprikáshoz'),
(364, 53, 'sűrített paradicsom', 3, 'ek', 'paprikáshoz'),
(365, 53, 'őrölt fűszerkömény', 1, 'tk', 'paprikáshoz'),
(366, 53, 'füstölt pirospaprika', 1, 'tk', 'paprikáshoz'),
(367, 53, 'fűszerpaprika', 1, 'tk', 'paprikáshoz'),
(368, 53, 'só', 1, 'ízlés szerint', 'paprikáshoz'),
(369, 53, 'bors', 1, 'ízlés szerint', 'paprikáshoz'),
(370, 53, 'víz', 100, 'ml', 'paprikáshoz'),
(371, 53, 'újkrumpli', 500, 'g', 'paprikáshoz'),
(372, 54, 'macesz', 300, 'g', 'A maceszgombóchoz'),
(373, 54, 'tojás', 4, 'db', 'A maceszgombóchoz'),
(374, 54, 'olívaolaj', 5, 'ek', 'A maceszgombóchoz'),
(375, 54, 'szódavíz', 200, 'ml', 'A maceszgombóchoz'),
(376, 54, 'medvehagyma', 1, 'csokor', 'A maceszgombóchoz'),
(377, 54, 'só', 1, 'tk', 'A maceszgombóchoz'),
(378, 54, 'bors', 1, 'tk', 'A maceszgombóchoz'),
(379, 54, 'sonkalé', 1.5, 'l', 'A leveshez'),
(380, 54, 'sárgarépa', 2, 'db', 'A leveshez'),
(381, 54, 'fehérrépa', 1, 'db', 'A leveshez'),
(382, 54, 'karalábé', 1, 'db', 'A leveshez'),
(383, 54, 'vöröshagyma', 1, 'db', 'A leveshez'),
(384, 54, 'bors (egész)', 1, 'tk', 'A leveshez'),
(385, 54, 'só', 1, 'ízlés szerint', 'A leveshez'),
(386, 55, 'finomliszt', 150, 'g', 'Az összeállításhoz'),
(387, 55, 'tojás', 2, 'db', 'Az összeállításhoz'),
(388, 55, 'zsemlemorzsa', 150, 'g', 'Az összeállításhoz'),
(389, 55, 'napraforgó olaj', 1000, 'ml', 'Az összeállításhoz'),
(390, 55, 'főtt sonka', 380, 'g', 'A sonkakrémhez'),
(391, 55, 'tejföl', 4, 'ek', 'A sonkakrémhez'),
(392, 55, 'só', 1, 'tk', 'A sonkakrémhez'),
(393, 55, 'bors', 1, 'tk', 'A sonkakrémhez'),
(394, 55, 'finomliszt', 200, 'g', 'A palacsintához'),
(395, 55, 'tojás', 2, 'db', 'A palacsintához'),
(396, 55, 'tej', 350, 'ml', 'A palacsintához'),
(397, 55, 'szódavíz', 150, 'ml', 'A palacsintához'),
(398, 55, 'só', 1, 'csipet', 'A palacsintához'),
(399, 55, 'napraforgó olaj', 70, 'ml', 'A palacsintához'),
(400, 56, 'libazsír', 80, 'g', 'Hozzávalók'),
(401, 56, 'fehér hagyma', 1, 'fej', 'Hozzávalók'),
(402, 56, 'csirkemáj (vagy libamáj, ha megengedhetjük)', 300, 'g', 'Hozzávalók'),
(403, 56, 'só', 1, 'ízlés szerint', 'Hozzávalók'),
(404, 56, 'bors', 1, 'ízlés szerint', 'Hozzávalók'),
(405, 56, 'tojás', 10, 'db', 'Hozzávalók'),
(406, 56, 'mustár', 1, 'ek', 'Hozzávalók'),
(407, 56, 'füstölt pirospaprika', 1, 'tk', 'Hozzávalók');

--
-- Eseményindítók `hozzavalok`
--
DELIMITER $$
CREATE TRIGGER `hozzavalok_Delete` AFTER DELETE ON `hozzavalok` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'hozzavalok', OLD.id, NOW(), 'DELETE', OLD.hozzavalo, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hozzavalok_Insert` AFTER INSERT ON `hozzavalok` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'hozzavalok', NEW.id, NOW(), 'INSERT', NULL, NEW.hozzavalo)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hozzavalok_Update` AFTER UPDATE ON `hozzavalok` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'hozzavalok', NEW.id, NOW(), 'UPDATE', OLD.hozzavalo, NEW.hozzavalo)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ujadat_hozzavalo` BEFORE INSERT ON `hozzavalok` FOR EACH ROW set NEW.hozzavalo = lower(NEW.hozzavalo)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvenceklista`
--

CREATE TABLE `kedvenceklista` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `recept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Eseményindítók `kedvenceklista`
--
DELIMITER $$
CREATE TRIGGER `kedvenceklista_Delete` AFTER DELETE ON `kedvenceklista` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'kedvenceklista', OLD.id, NOW(), 'DELETE', OLD.id, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `kedvenceklista_Insert` AFTER INSERT ON `kedvenceklista` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'kedvenceklista', NEW.id, NOW(), 'INSERT', NULL, NEW.felhasznalo_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `kedvenceklista_Update` AFTER UPDATE ON `kedvenceklista` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'kedvenceklista', NEW.id, NOW(), 'UPDATE', OLD.recept_id, NEW.recept_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyha`
--

CREATE TABLE `konyha` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `konyha`
--

INSERT INTO `konyha` (`id`, `neve`) VALUES
(29, 'afgán'),
(15, 'afrikai'),
(23, 'albán'),
(26, 'amerikai'),
(4, 'angol'),
(8, 'arab'),
(31, 'argentin'),
(46, 'ausztráliai'),
(37, 'azerbajdzsáni'),
(21, 'bolgár'),
(33, 'brazil'),
(45, 'britt'),
(35, 'cigány'),
(42, 'filippínó'),
(2, 'francia'),
(22, 'görög'),
(28, 'grúz'),
(20, 'holland'),
(14, 'indiai'),
(16, 'izlandi'),
(17, 'izraeli'),
(10, 'japán'),
(36, 'kanadai'),
(9, 'kínai'),
(38, 'kirgizisztán'),
(32, 'koreai'),
(34, 'kubai'),
(27, 'lengyel'),
(5, 'magyar'),
(43, 'malajziai'),
(13, 'mexikói'),
(30, 'mongol'),
(1, 'német'),
(3, 'olasz'),
(7, 'orosz'),
(18, 'osztrák'),
(44, 'örmény'),
(41, 'pakisztáni'),
(25, 'román'),
(12, 'skandináv'),
(6, 'spanyol'),
(19, 'svájci'),
(39, 'tatár'),
(11, 'thai'),
(24, 'török'),
(40, 'vietnami');

--
-- Eseményindítók `konyha`
--
DELIMITER $$
CREATE TRIGGER `konyha_Delete` AFTER DELETE ON `konyha` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'konyha', OLD.id, NOW(), 'DELETE', OLD.neve, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `konyha_Insert` AFTER INSERT ON `konyha` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'konyha', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `konyha_Update	` AFTER UPDATE ON `konyha` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'konyha', NEW.id, NOW(), 'UPDATE', OLD.neve, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ujadat_konyha` BEFORE INSERT ON `konyha` FOR EACH ROW set NEW.neve = lower(NEW.neve)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `tablazat_nev` varchar(30) NOT NULL,
  `valtozott_id` int(11) NOT NULL,
  `datum` datetime NOT NULL,
  `log_tipus` varchar(50) NOT NULL,
  `elozo_ertek` text DEFAULT NULL,
  `uj_ertek` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `log`
--

INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`) VALUES
(0, 'bevasarlolista', 3, '2025-01-25 17:49:37', 'INSERT', NULL, '6'),
(1, 'etelefajta', 56, '2025-01-13 11:46:04', '', NULL, NULL),
(2, 'etelefajta', 59, '2025-01-13 12:01:43', 'INSERT', '', 'asd'),
(3, 'hozzavalok', 1, '2025-01-13 12:10:33', 'INSERT', NULL, 'teszt'),
(4, 'bevasarlolista', 2, '2025-01-13 12:11:17', 'INSERT', NULL, '5'),
(5, 'ertekeles', 1, '2025-01-13 12:12:36', 'INSERT', NULL, '5'),
(6, 'etrend', 122, '2025-01-13 12:13:48', 'INSERT', NULL, 'teszte'),
(7, 'bevasarlolista', 2, '2025-01-13 12:45:29', 'UPDATE', '5', '6'),
(8, 'ertekeles', 1, '2025-01-13 12:47:50', 'UPDATE', '5', '2'),
(9, 'bevasarlolista', 59, '2025-01-13 12:49:12', 'UPDATE', 'asd', 'igeen'),
(10, 'etrend', 122, '2025-01-13 12:51:11', 'UPDATE', 'teszte', 'finso'),
(11, 'felhasznalojog', 3, '2025-01-13 12:52:46', 'INSERT', NULL, 'teszt'),
(12, 'felhasznalojog', 3, '2025-01-13 12:53:01', 'UPDATE', 'teszt', 'igen'),
(13, 'bevasarlolista', 3, '2025-01-25 17:49:43', 'DELETE', '6', NULL),
(14, 'felhasznalok', 7, '2025-01-25 18:01:56', 'UPDATE', 'tes', 'tesaa'),
(27, 'felhasznalok', 7, '2025-01-25 18:23:07', 'UPDATE_EMAIL', 'tesaa', 'tesaaaaa'),
(28, 'felhasznalok', 7, '2025-01-25 18:23:07', 'UPDATE_USERNAME', 'teso', 'tesoaa'),
(29, 'felhasznalok', 7, '2025-01-25 18:23:07', 'UPDATE_PASSWORD', '*****', '*****'),
(30, 'felhasznalok', 7, '2025-01-25 18:23:44', 'UPDATE_AUTH', '2', '1'),
(31, 'felhasznalok', 7, '2025-01-25 18:24:40', 'UPDATE_PROFILEPIC', 'as', 'asdasdsadsadsadsadas'),
(32, 'felhasznalok', 4, '2025-01-25 18:32:20', 'DELETE', 'asds', NULL),
(33, 'bevasarlolista', 2, '2025-03-08 18:11:12', 'DELETE', '6', NULL),
(34, 'ertekeles', 4, '2025-03-08 18:16:26', 'INSERT', NULL, '6'),
(35, 'ertekeles', 5, '2025-03-08 18:16:26', 'INSERT', NULL, '5'),
(36, 'ertekeles', 5, '2025-03-08 18:17:29', 'UPDATE', '5', '5'),
(37, 'ertekeles', 5, '2025-03-08 18:17:36', 'UPDATE', '5', '5'),
(38, 'ertekeles', 5, '2025-03-08 18:17:39', 'DELETE', '5', NULL),
(39, 'bevasarlolista', 10, '2025-03-08 18:22:58', 'INSERT', NULL, '5'),
(40, 'bevasarlolista', 11, '2025-03-08 18:22:58', 'INSERT', NULL, '6'),
(41, 'bevasarlolista', 11, '2025-03-08 18:23:18', 'UPDATE', '1', '1'),
(42, 'bevasarlolista', 10, '2025-03-08 18:23:21', 'DELETE', '5', NULL),
(43, 'bevasarlolista', 9, '2025-03-08 18:23:22', 'DELETE', '5', NULL),
(44, 'etelefajta', 60, '2025-03-08 18:25:10', 'INSERT', NULL, 'teszt1'),
(45, 'etelefajta', 61, '2025-03-08 18:25:10', 'INSERT', NULL, 'teszt2'),
(46, 'etelfajta', 60, '2025-03-08 18:25:25', 'UPDATE', 'teszt1', 'igen'),
(47, 'etelfajta', 60, '2025-03-08 18:25:29', 'DELETE', 'igen', NULL),
(48, 'etelfajta', 61, '2025-03-08 18:25:30', 'DELETE', 'teszt2', NULL),
(49, 'etrend', 123, '2025-03-08 18:27:06', 'INSERT', NULL, 'haaaa'),
(50, 'etrend', 124, '2025-03-08 18:27:06', 'INSERT', NULL, 'ahhhh'),
(51, 'etrend', 124, '2025-03-08 18:27:24', 'UPDATE', 'ahhhh', 'ahhhhaaa'),
(52, 'etrend', 124, '2025-03-08 18:27:28', 'DELETE', 'ahhhhaaa', NULL),
(53, 'etrend', 123, '2025-03-08 18:27:29', 'DELETE', 'haaaa', NULL),
(54, 'felhasznalojog', 4, '2025-03-08 18:28:58', 'INSERT', NULL, 'Pisttaaaa'),
(55, 'felhasznalojog', 5, '2025-03-08 18:28:58', 'INSERT', NULL, 'SIten'),
(56, 'felhasznalojog', 4, '2025-03-08 18:29:09', 'UPDATE', 'Pisttaaaa', 'Isten'),
(57, 'bevasarlolista', 4, '2025-03-08 18:29:13', 'DELETE', 'Isten', NULL),
(58, 'bevasarlolista', 5, '2025-03-08 18:29:14', 'DELETE', 'SIten', NULL),
(59, 'felhasznalok', 14, '2025-03-08 18:31:20', 'INSERT', NULL, 'Pistabéá'),
(60, 'felhasznalok', 15, '2025-03-08 18:31:20', 'INSERT', NULL, 'asdfsadfsaddfg'),
(61, 'felhasznalok', 15, '2025-03-08 18:31:33', 'UPDATE_EMAIL', 'adfgdafg', 'adfgdabfg'),
(62, 'felhasznalok', 15, '2025-03-08 18:31:33', 'UPDATE_PASSWORD', '*****', '*****'),
(63, 'felhasznalok', 15, '2025-03-08 18:31:45', 'UPDATE_USERNAME', 'asdfsadfsaddfg', '001ugynpokm'),
(64, 'felhasznalok', 15, '2025-03-08 18:31:49', 'DELETE', '001ugynpokm', NULL),
(65, 'hozzaszolasok', 3, '2025-03-08 18:34:01', 'INSERT', NULL, 'asd'),
(66, 'hozzaszolasok', 4, '2025-03-08 18:34:01', 'INSERT', NULL, 'asddd'),
(67, 'hozzaszolasok', 3, '2025-03-08 18:34:13', 'UPDATE', 'asd', 'dddddddddddddd'),
(68, 'hozzaszolasok', 3, '2025-03-08 18:34:16', 'DELETE', 'dddddddddddddd', NULL),
(69, 'hozzaszolasok', 4, '2025-03-08 18:34:17', 'DELETE', 'asddd', NULL),
(70, 'hozzavalok', 2, '2025-03-08 18:37:05', 'INSERT', NULL, 'aaaaaa'),
(71, 'hozzavalok', 3, '2025-03-08 18:37:05', 'INSERT', NULL, 'dfgh'),
(72, 'hozzavalok', 3, '2025-03-08 18:37:17', 'UPDATE', 'dfgh', 'Pistike'),
(73, 'hozzavalok', 2, '2025-03-08 18:37:25', 'DELETE', 'aaaaaa', NULL),
(74, 'hozzavalok', 3, '2025-03-08 18:37:28', 'DELETE', 'Pistike', NULL),
(75, 'kedvenceklista', 1, '2025-03-08 18:42:50', 'INSERT', NULL, '5'),
(76, 'kedvenceklista', 2, '2025-03-08 18:42:50', 'INSERT', NULL, '14'),
(77, 'kedvenceklista', 2, '2025-03-08 18:43:47', 'DELETE', '2', NULL),
(78, 'konyha', 48, '2025-03-08 18:46:25', 'INSERT', NULL, 'zzz'),
(79, 'konyha', 49, '2025-03-08 18:46:25', 'INSERT', NULL, 'zuzutz'),
(80, 'konyha', 48, '2025-03-08 18:46:35', 'UPDATE', 'zzz', 'naymi'),
(81, 'konyha', 48, '2025-03-08 18:46:38', 'DELETE', 'naymi', NULL),
(82, 'konyha', 49, '2025-03-08 18:46:40', 'DELETE', 'zuzutz', NULL),
(83, 'receptek', 3, '2025-03-08 19:04:09', 'INSERT', NULL, 'iSTEN'),
(84, 'receptek', 4, '2025-03-08 19:04:09', 'INSERT', NULL, 'asdf'),
(85, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_NEVE', 'asdf', 'igen'),
(86, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_ETREND', '33', '16'),
(87, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_NAPSZAK', 'asdfsad', 'reg'),
(88, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_ETELFAJTA', '56', '12'),
(89, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_KALORIA', '1', '10'),
(90, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_KEPEK', '1', '10'),
(91, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_NEHEZSEG', '1', '10'),
(92, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_IDO', '1', '10'),
(93, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_ADAG', '1', '10'),
(94, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_AR', '1', '10'),
(95, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_KONYHAID', '4', '30'),
(96, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_ELKESZITES', '1', '10'),
(97, 'receptek', 4, '2025-03-08 19:04:56', 'UPDATE_ELFOGADOT', '1', '0'),
(98, 'receptek', 4, '2025-03-08 19:05:22', 'DELETE', 'igen', NULL),
(99, 'receptek', 3, '2025-03-08 19:43:07', 'UPDATE_NAPSZAK', 'REGGELI', 'REGGELIaaaaa'),
(100, 'receptetrend', 2, '2025-03-08 19:47:13', 'INSERT', NULL, '2'),
(101, 'receptetrend', 3, '2025-03-08 19:47:13', 'INSERT', NULL, '3'),
(102, 'receptetrend', 3, '2025-03-08 19:47:21', 'UPDATE_ETREND', '33', '15'),
(103, 'receptetrend', 3, '2025-03-08 19:47:26', 'DELETE', '3', NULL),
(104, 'receptetrend', 2, '2025-03-08 19:47:27', 'DELETE', '2', NULL),
(105, 'receptek', 3, '2025-03-08 19:50:31', 'UPDATE_GYEREKMENU', '0', '1'),
(106, 'konyha', 1, '2025-03-10 12:13:07', 'UPDATE', ' német', 'német'),
(107, 'konyha', 2, '2025-03-10 12:13:07', 'UPDATE', ' francia', 'francia'),
(108, 'konyha', 3, '2025-03-10 12:13:07', 'UPDATE', ' olasz', 'olasz'),
(109, 'konyha', 4, '2025-03-10 12:13:07', 'UPDATE', ' angol', 'angol'),
(110, 'konyha', 5, '2025-03-10 12:13:07', 'UPDATE', ' magyar', 'magyar'),
(111, 'konyha', 6, '2025-03-10 12:13:07', 'UPDATE', ' spanyol', 'spanyol'),
(112, 'konyha', 7, '2025-03-10 12:13:07', 'UPDATE', ' orosz', 'orosz'),
(113, 'konyha', 8, '2025-03-10 12:13:07', 'UPDATE', ' arab', 'arab'),
(114, 'konyha', 9, '2025-03-10 12:13:07', 'UPDATE', ' kínai', 'kínai'),
(115, 'konyha', 10, '2025-03-10 12:13:07', 'UPDATE', ' japán', 'japán'),
(116, 'konyha', 11, '2025-03-10 12:13:07', 'UPDATE', ' thai', 'thai'),
(117, 'konyha', 12, '2025-03-10 12:13:07', 'UPDATE', ' skandináv', 'skandináv'),
(118, 'konyha', 13, '2025-03-10 12:13:07', 'UPDATE', ' mexikói', 'mexikói'),
(119, 'konyha', 14, '2025-03-10 12:13:07', 'UPDATE', ' indiai', 'indiai'),
(120, 'konyha', 15, '2025-03-10 12:13:07', 'UPDATE', ' afrikai', 'afrikai'),
(121, 'konyha', 16, '2025-03-10 12:13:07', 'UPDATE', ' izlandi', 'izlandi'),
(122, 'konyha', 17, '2025-03-10 12:13:07', 'UPDATE', ' izraeli', 'izraeli'),
(123, 'konyha', 18, '2025-03-10 12:13:07', 'UPDATE', ' osztrák', 'osztrák'),
(124, 'konyha', 19, '2025-03-10 12:13:07', 'UPDATE', ' svájci', 'svájci'),
(125, 'konyha', 20, '2025-03-10 12:13:07', 'UPDATE', ' holland', 'holland'),
(126, 'konyha', 21, '2025-03-10 12:13:07', 'UPDATE', ' bolgár', 'bolgár'),
(127, 'konyha', 22, '2025-03-10 12:13:07', 'UPDATE', ' görög', 'görög'),
(128, 'konyha', 23, '2025-03-10 12:13:07', 'UPDATE', ' albán', 'albán'),
(129, 'konyha', 24, '2025-03-10 12:13:07', 'UPDATE', ' török', 'török'),
(130, 'konyha', 25, '2025-03-10 12:13:07', 'UPDATE', ' román', 'román'),
(131, 'konyha', 26, '2025-03-10 12:13:07', 'UPDATE', ' amerikai', 'amerikai'),
(132, 'konyha', 27, '2025-03-10 12:13:07', 'UPDATE', ' lengyel', 'lengyel'),
(133, 'konyha', 28, '2025-03-10 12:13:07', 'UPDATE', ' grúz', 'grúz'),
(134, 'konyha', 29, '2025-03-10 12:13:07', 'UPDATE', ' afgán', 'afgán'),
(135, 'konyha', 30, '2025-03-10 12:13:07', 'UPDATE', ' mongol', 'mongol'),
(136, 'konyha', 31, '2025-03-10 12:13:07', 'UPDATE', ' argentin', 'argentin'),
(137, 'konyha', 32, '2025-03-10 12:13:07', 'UPDATE', ' koreai', 'koreai'),
(138, 'konyha', 33, '2025-03-10 12:13:07', 'UPDATE', ' brazil', 'brazil'),
(139, 'konyha', 34, '2025-03-10 12:13:07', 'UPDATE', ' kubai', 'kubai'),
(140, 'konyha', 35, '2025-03-10 12:13:07', 'UPDATE', ' cigány', 'cigány'),
(141, 'konyha', 36, '2025-03-10 12:13:07', 'UPDATE', ' kanadai', 'kanadai'),
(142, 'konyha', 37, '2025-03-10 12:13:07', 'UPDATE', ' azerbajdzsáni', 'azerbajdzsáni'),
(143, 'konyha', 38, '2025-03-10 12:13:07', 'UPDATE', ' kirgizisztán', 'kirgizisztán'),
(144, 'konyha', 39, '2025-03-10 12:13:07', 'UPDATE', ' tatár', 'tatár'),
(145, 'konyha', 40, '2025-03-10 12:13:07', 'UPDATE', ' vietnami', 'vietnami'),
(146, 'konyha', 41, '2025-03-10 12:13:07', 'UPDATE', ' pakisztáni', 'pakisztáni'),
(147, 'konyha', 42, '2025-03-10 12:13:07', 'UPDATE', ' filippínó', 'filippínó'),
(148, 'konyha', 43, '2025-03-10 12:13:07', 'UPDATE', ' malajziai', 'malajziai'),
(149, 'konyha', 44, '2025-03-10 12:13:07', 'UPDATE', ' örmény', 'örmény'),
(150, 'konyha', 45, '2025-03-10 12:13:07', 'UPDATE', ' britt', 'britt'),
(151, 'konyha', 46, '2025-03-10 12:13:07', 'UPDATE', ' ausztráliai', 'ausztráliai'),
(152, 'hozzaszolasok', 5, '2025-03-16 22:43:32', 'INSERT', NULL, 'asd'),
(153, 'hozzaszolasok', 6, '2025-03-17 18:23:33', 'INSERT', NULL, 'asdd'),
(154, 'hozzaszolasok', 7, '2025-03-17 18:25:58', 'INSERT', NULL, 'asdd'),
(155, 'hozzaszolasok', 8, '2025-03-17 18:26:00', 'INSERT', NULL, 'asdd'),
(156, 'ertekeles', 6, '2025-03-17 18:34:13', 'INSERT', NULL, '3'),
(157, 'ertekeles', 7, '2025-03-17 18:36:37', 'INSERT', NULL, '4'),
(158, 'ertekeles', 8, '2025-03-17 18:38:57', 'INSERT', NULL, '3'),
(159, 'ertekeles', 9, '2025-03-17 18:43:23', 'INSERT', NULL, '4'),
(160, 'ertekeles', 10, '2025-03-17 18:44:57', 'INSERT', NULL, '1'),
(161, 'ertekeles', 11, '2025-03-17 18:46:01', 'INSERT', NULL, '2'),
(162, 'ertekeles', 12, '2025-03-17 18:46:29', 'INSERT', NULL, '2'),
(163, 'ertekeles', 13, '2025-03-17 18:51:29', 'INSERT', NULL, '5'),
(164, 'ertekeles', 14, '2025-03-17 19:05:46', 'INSERT', NULL, '4'),
(165, 'ertekeles', 15, '2025-03-17 19:05:48', 'INSERT', NULL, '4'),
(166, 'ertekeles', 16, '2025-03-17 19:05:49', 'INSERT', NULL, '4'),
(167, 'ertekeles', 8, '2025-03-17 19:10:04', 'DELETE', '3', NULL),
(168, 'ertekeles', 9, '2025-03-17 19:10:08', 'DELETE', '4', NULL),
(169, 'ertekeles', 7, '2025-03-17 19:10:10', 'DELETE', '4', NULL),
(170, 'ertekeles', 1, '2025-03-17 19:11:50', 'DELETE', '2', NULL),
(171, 'ertekeles', 10, '2025-03-17 19:23:24', 'DELETE', '1', NULL),
(172, 'ertekeles', 11, '2025-03-17 19:23:26', 'DELETE', '2', NULL),
(173, 'ertekeles', 13, '2025-03-17 19:23:27', 'DELETE', '5', NULL),
(174, 'ertekeles', 14, '2025-03-17 19:23:29', 'DELETE', '4', NULL),
(175, 'ertekeles', 15, '2025-03-17 19:23:30', 'DELETE', '4', NULL),
(176, 'ertekeles', 16, '2025-03-17 19:23:32', 'DELETE', '4', NULL),
(177, 'ertekeles', 12, '2025-03-17 19:23:34', 'DELETE', '2', NULL),
(178, 'ertekeles', 17, '2025-03-17 19:23:42', 'INSERT', NULL, '3'),
(179, 'ertekeles', 17, '2025-03-17 19:25:01', 'DELETE', '3', NULL),
(180, 'ertekeles', 18, '2025-03-17 19:26:13', 'INSERT', NULL, '3'),
(181, 'hozzavalok', 1, '2025-03-17 19:52:18', 'UPDATE', 'teszt', 'teszt'),
(182, 'hozzavalok', 1, '2025-03-17 20:12:40', 'UPDATE', 'teszt', 'teszt'),
(183, 'hozzavalok', 5, '2025-03-17 20:16:27', 'INSERT', NULL, '[value-3]'),
(184, 'ertekeles', 18, '2025-03-19 20:06:31', 'DELETE', '3', NULL),
(185, 'ertekeles', 19, '2025-03-19 20:06:57', 'INSERT', NULL, '1'),
(186, 'ertekeles', 19, '2025-03-19 20:09:57', 'DELETE', '1', NULL),
(187, 'ertekeles', 20, '2025-03-19 20:10:07', 'INSERT', NULL, '1'),
(188, 'ertekeles', 20, '2025-03-19 20:11:43', 'DELETE', '1', NULL),
(189, 'ertekeles', 21, '2025-03-19 20:11:47', 'INSERT', NULL, '1'),
(190, 'ertekeles', 21, '2025-03-19 20:15:06', 'DELETE', '1', NULL),
(191, 'ertekeles', 22, '2025-03-19 20:15:12', 'INSERT', NULL, '1'),
(192, 'ertekeles', 22, '2025-03-19 20:21:22', 'DELETE', '1', NULL),
(193, 'ertekeles', 23, '2025-03-19 20:21:26', 'INSERT', NULL, '1'),
(194, 'ertekeles', 23, '2025-03-19 20:22:41', 'DELETE', '1', NULL),
(195, 'ertekeles', 24, '2025-03-19 20:22:44', 'INSERT', NULL, '1'),
(196, 'ertekeles', 24, '2025-03-19 20:25:58', 'DELETE', '1', NULL),
(197, 'ertekeles', 25, '2025-03-19 20:26:04', 'INSERT', NULL, '1'),
(198, 'ertekeles', 25, '2025-03-19 20:27:42', 'DELETE', '1', NULL),
(199, 'ertekeles', 26, '2025-03-19 20:27:46', 'INSERT', NULL, '1'),
(200, 'ertekeles', 26, '2025-03-19 20:28:35', 'DELETE', '1', NULL),
(201, 'ertekeles', 27, '2025-03-19 20:28:41', 'INSERT', NULL, '1'),
(202, 'ertekeles', 27, '2025-03-19 20:30:47', 'DELETE', '1', NULL),
(203, 'ertekeles', 28, '2025-03-19 20:30:50', 'INSERT', NULL, '1'),
(204, 'bevasarlolista', 12, '2025-03-19 21:48:44', 'INSERT', NULL, '5'),
(205, 'bevasarlolista', 13, '2025-03-19 22:12:52', 'INSERT', NULL, '5'),
(206, 'bevasarlolista', 14, '2025-03-19 22:13:11', 'INSERT', NULL, '5'),
(207, 'bevasarlolista', 15, '2025-03-19 22:16:13', 'INSERT', NULL, '5'),
(208, 'bevasarlolista', 16, '2025-03-19 22:17:14', 'INSERT', NULL, '5'),
(209, 'bevasarlolista', 17, '2025-03-19 22:18:31', 'INSERT', NULL, '5'),
(210, 'bevasarlolista', 18, '2025-03-19 22:18:39', 'INSERT', NULL, '5'),
(211, 'bevasarlolista', 19, '2025-03-19 22:18:41', 'INSERT', NULL, '5'),
(212, 'bevasarlolista', 20, '2025-03-19 22:19:17', 'INSERT', NULL, '5'),
(213, 'bevasarlolista', 21, '2025-03-19 22:19:22', 'INSERT', NULL, '5'),
(214, 'bevasarlolista', 22, '2025-03-19 22:20:01', 'INSERT', NULL, '5'),
(215, 'hozzaszolasok', 9, '2025-03-19 22:20:35', 'INSERT', NULL, 'asd\nasdasd\nasd'),
(216, 'hozzaszolasok', 10, '2025-03-19 23:13:31', 'INSERT', NULL, 'a\na\naaa'),
(217, 'bevasarlolista', 23, '2025-03-19 23:13:44', 'INSERT', NULL, '5'),
(218, 'bevasarlolista', 24, '2025-03-20 17:25:09', 'INSERT', NULL, '5'),
(219, 'bevasarlolista', 25, '2025-03-20 17:25:23', 'INSERT', NULL, '5'),
(220, 'bevasarlolista', 25, '2025-03-20 17:25:52', 'DELETE', '5', NULL),
(221, 'ertekeles', 28, '2025-03-20 17:40:29', 'DELETE', '1', NULL),
(222, 'bevasarlolista', 6, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(223, 'bevasarlolista', 7, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(224, 'bevasarlolista', 8, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(225, 'bevasarlolista', 11, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(226, 'bevasarlolista', 12, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(227, 'bevasarlolista', 13, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(228, 'bevasarlolista', 15, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(229, 'bevasarlolista', 16, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(230, 'bevasarlolista', 17, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(231, 'bevasarlolista', 18, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(232, 'bevasarlolista', 20, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(233, 'bevasarlolista', 22, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(234, 'bevasarlolista', 23, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(235, 'bevasarlolista', 24, '2025-03-20 17:41:05', 'DELETE', '5', NULL),
(236, 'bevasarlolista', 26, '2025-03-20 17:44:03', 'INSERT', NULL, '5'),
(237, 'ertekeles', 29, '2025-03-20 17:44:14', 'INSERT', NULL, '1'),
(238, 'hozzaszolasok', 11, '2025-03-20 18:00:21', 'INSERT', NULL, 'asda\naa'),
(239, 'bevasarlolista', 27, '2025-03-20 18:19:10', 'INSERT', NULL, '6'),
(240, 'bevasarlolista', 27, '2025-03-20 18:20:04', 'DELETE', '6', NULL),
(241, 'bevasarlolista', 28, '2025-03-20 18:20:08', 'INSERT', NULL, '6'),
(242, 'bevasarlolista', 29, '2025-03-20 18:21:29', 'INSERT', NULL, '6'),
(243, 'bevasarlolista', 29, '2025-03-20 18:21:41', 'DELETE', '6', NULL),
(244, 'bevasarlolista', 28, '2025-03-20 18:21:42', 'DELETE', '6', NULL),
(245, 'bevasarlolista', 30, '2025-03-20 18:21:46', 'INSERT', NULL, '6'),
(246, 'bevasarlolista', 31, '2025-03-20 18:21:55', 'INSERT', NULL, '6'),
(247, 'bevasarlolista', 31, '2025-03-20 18:22:58', 'DELETE', '6', NULL),
(248, 'bevasarlolista', 30, '2025-03-20 18:23:02', 'DELETE', '6', NULL),
(249, 'bevasarlolista', 32, '2025-03-20 18:23:05', 'INSERT', NULL, '6'),
(250, 'bevasarlolista', 33, '2025-03-20 18:23:12', 'INSERT', NULL, '6'),
(251, 'kedvenceklista', 3, '2025-03-20 18:52:32', 'INSERT', NULL, '5'),
(252, 'kedvenceklista', 4, '2025-03-20 18:53:16', 'INSERT', NULL, '6'),
(253, 'kedvenceklista', 1, '2025-03-20 18:59:33', 'DELETE', '1', NULL),
(254, 'kedvenceklista', 3, '2025-03-20 18:59:33', 'DELETE', '3', NULL),
(255, 'kedvenceklista', 5, '2025-03-20 19:12:01', 'INSERT', NULL, '6'),
(256, 'kedvenceklista', 4, '2025-03-20 19:12:07', 'DELETE', '4', NULL),
(257, 'kedvenceklista', 5, '2025-03-20 19:12:07', 'DELETE', '5', NULL),
(258, 'kedvenceklista', 6, '2025-03-20 19:13:34', 'INSERT', NULL, '5'),
(259, 'kedvenceklista', 7, '2025-03-20 19:13:50', 'INSERT', NULL, '6'),
(260, 'kedvenceklista', 8, '2025-03-20 19:14:05', 'INSERT', NULL, '6'),
(261, 'kedvenceklista', 7, '2025-03-20 19:14:06', 'DELETE', '7', NULL),
(262, 'kedvenceklista', 8, '2025-03-20 19:14:06', 'DELETE', '8', NULL),
(263, 'kedvenceklista', 6, '2025-03-20 19:42:37', 'DELETE', '6', NULL),
(264, 'kedvenceklista', 9, '2025-03-20 19:42:41', 'INSERT', NULL, '5'),
(265, 'kedvenceklista', 9, '2025-03-20 19:42:55', 'DELETE', '9', NULL),
(266, 'bevasarlolista', 14, '2025-03-20 21:01:20', 'UPDATE', '5', '5'),
(267, 'bevasarlolista', 19, '2025-03-20 21:01:20', 'UPDATE', '5', '5'),
(268, 'bevasarlolista', 21, '2025-03-20 21:01:20', 'UPDATE', '5', '5'),
(269, 'bevasarlolista', 26, '2025-03-20 21:01:20', 'UPDATE', '1', '1'),
(270, 'bevasarlolista', 32, '2025-03-20 21:01:20', 'UPDATE', '1', '1'),
(271, 'bevasarlolista', 33, '2025-03-20 21:01:20', 'UPDATE', '5', '5'),
(272, 'receptek', 5, '2025-03-28 20:57:17', 'INSERT', NULL, 'Tükör tojás'),
(273, 'receptek', 6, '2025-03-28 20:58:23', 'INSERT', NULL, 'Hagymás tojássaláta'),
(274, 'receptek', 7, '2025-03-28 20:59:40', 'INSERT', NULL, 'Virslis-lencsés tész'),
(275, 'receptek', 8, '2025-03-28 21:00:26', 'INSERT', NULL, 'Rántott karfiol'),
(276, 'receptek', 9, '2025-03-28 21:01:28', 'INSERT', NULL, 'Sonkás-tormás babka'),
(277, 'receptek', 10, '2025-03-28 21:02:35', 'INSERT', NULL, 'Avokádókrém'),
(278, 'receptek', 11, '2025-03-28 21:03:29', 'INSERT', NULL, 'Tojásfasírt'),
(279, 'receptek', 12, '2025-03-28 21:04:04', 'INSERT', NULL, 'Rösztipizza'),
(280, 'receptetrend', 4, '2025-03-28 21:09:46', 'INSERT', NULL, '4'),
(281, 'receptetrend', 5, '2025-03-28 21:09:59', 'INSERT', NULL, '5'),
(282, 'receptetrend', 6, '2025-03-28 21:10:06', 'INSERT', NULL, '6'),
(283, 'receptetrend', 7, '2025-03-28 21:10:14', 'INSERT', NULL, '7'),
(284, 'receptetrend', 8, '2025-03-28 21:10:24', 'INSERT', NULL, '8'),
(285, 'receptetrend', 9, '2025-03-28 21:10:31', 'INSERT', NULL, '9'),
(286, 'receptetrend', 10, '2025-03-28 21:10:38', 'INSERT', NULL, '10'),
(287, 'receptetrend', 11, '2025-03-28 21:10:47', 'INSERT', NULL, '11'),
(288, 'receptetrend', 12, '2025-03-28 21:10:54', 'INSERT', NULL, '12'),
(289, 'ertekeles', 32, '2025-03-28 22:46:24', 'INSERT', NULL, '4'),
(290, 'ertekeles', 32, '2025-03-28 22:46:37', 'DELETE', '4', NULL),
(291, 'felhasznalok', 16, '2025-03-28 22:49:13', 'INSERT', NULL, '111'),
(292, 'ertekeles', 33, '2025-03-28 22:49:42', 'INSERT', NULL, '4'),
(293, 'ertekeles', 34, '2025-03-28 22:52:21', 'INSERT', NULL, '5'),
(294, 'kedvenceklista', 10, '2025-03-28 22:56:03', 'INSERT', NULL, '16'),
(295, 'kedvenceklista', 11, '2025-03-28 23:03:31', 'INSERT', NULL, '16'),
(296, 'kedvenceklista', 12, '2025-03-28 23:03:52', 'INSERT', NULL, '16'),
(297, 'kedvenceklista', 10, '2025-03-28 23:04:00', 'DELETE', '10', NULL),
(298, 'kedvenceklista', 12, '2025-03-28 23:04:03', 'DELETE', '12', NULL),
(299, 'kedvenceklista', 11, '2025-03-28 23:04:05', 'DELETE', '11', NULL),
(300, 'receptek', 3, '2025-03-29 10:08:16', 'UPDATE_NAPSZAK', 'REGGELIaaaaa', 'REGGELI'),
(301, 'etelfajta', 56, '2025-04-07 11:42:14', 'DELETE', 'as', NULL),
(302, 'etelfajta', 59, '2025-04-07 11:42:14', 'DELETE', 'igeen', NULL),
(303, 'receptek', 13, '2025-04-07 11:46:37', 'INSERT', NULL, 'Poutine'),
(304, 'hozzavalok', 6, '2025-04-07 11:46:37', 'INSERT', NULL, 'sült krumpli'),
(305, 'hozzavalok', 7, '2025-04-07 11:46:37', 'INSERT', NULL, 'sajtos túró'),
(306, 'hozzavalok', 8, '2025-04-07 11:46:37', 'INSERT', NULL, 'szaft'),
(307, 'receptetrend', 13, '2025-04-07 11:46:37', 'INSERT', NULL, '13'),
(308, 'receptetrend', 14, '2025-04-07 11:46:37', 'INSERT', NULL, '14'),
(309, 'receptek', 13, '2025-04-07 11:50:28', 'UPDATE_ELFOGADOT', '0', '1'),
(310, 'receptek', 14, '2025-04-07 12:01:10', 'INSERT', NULL, 'Amerikai Palacsinta'),
(311, 'hozzavalok', 9, '2025-04-07 12:01:10', 'INSERT', NULL, 'finomliszt'),
(312, 'hozzavalok', 10, '2025-04-07 12:01:10', 'INSERT', NULL, 'tojás'),
(313, 'hozzavalok', 11, '2025-04-07 12:01:10', 'INSERT', NULL, 'tej'),
(314, 'hozzavalok', 12, '2025-04-07 12:01:10', 'INSERT', NULL, 'sütőpor'),
(315, 'hozzavalok', 13, '2025-04-07 12:01:10', 'INSERT', NULL, 'cukor'),
(316, 'hozzavalok', 14, '2025-04-07 12:01:10', 'INSERT', NULL, 'vaniliás cukor'),
(317, 'hozzavalok', 15, '2025-04-07 12:01:10', 'INSERT', NULL, 'fahéj'),
(318, 'hozzavalok', 16, '2025-04-07 12:01:10', 'INSERT', NULL, 'napraforgó olaj'),
(319, 'receptetrend', 15, '2025-04-07 12:01:10', 'INSERT', NULL, '15'),
(320, 'receptek', 14, '2025-04-07 12:01:28', 'UPDATE_ELFOGADOT', '0', '1'),
(321, 'receptek', 15, '2025-04-07 12:12:36', 'INSERT', NULL, 'Burrito'),
(322, 'hozzavalok', 17, '2025-04-07 12:12:36', 'INSERT', NULL, 'darált marhahús'),
(323, 'hozzavalok', 18, '2025-04-07 12:12:36', 'INSERT', NULL, 'csemegekukorica'),
(324, 'hozzavalok', 19, '2025-04-07 12:12:36', 'INSERT', NULL, 'rizs'),
(325, 'hozzavalok', 20, '2025-04-07 12:12:36', 'INSERT', NULL, 'fűszersó'),
(326, 'hozzavalok', 21, '2025-04-07 12:12:36', 'INSERT', NULL, 'olívaolaj'),
(327, 'hozzavalok', 22, '2025-04-07 12:12:36', 'INSERT', NULL, 'tejfől'),
(328, 'hozzavalok', 23, '2025-04-07 12:12:36', 'INSERT', NULL, 'jalapeño'),
(329, 'hozzavalok', 24, '2025-04-07 12:12:36', 'INSERT', NULL, 'lilahagyma'),
(330, 'hozzavalok', 25, '2025-04-07 12:12:36', 'INSERT', NULL, 'paradicsom'),
(331, 'hozzavalok', 26, '2025-04-07 12:12:36', 'INSERT', NULL, 'koriander'),
(332, 'hozzavalok', 27, '2025-04-07 12:12:36', 'INSERT', NULL, 'lime'),
(333, 'hozzavalok', 28, '2025-04-07 12:12:36', 'INSERT', NULL, 'só'),
(334, 'hozzavalok', 29, '2025-04-07 12:12:36', 'INSERT', NULL, 'bors'),
(335, 'hozzavalok', 30, '2025-04-07 12:12:36', 'INSERT', NULL, 'paradicsomos bab'),
(336, 'hozzavalok', 31, '2025-04-07 12:12:36', 'INSERT', NULL, 'sűrített paradicsom'),
(337, 'hozzavalok', 32, '2025-04-07 12:12:36', 'INSERT', NULL, 'fokhagyma'),
(338, 'hozzavalok', 33, '2025-04-07 12:12:36', 'INSERT', NULL, 'olívaolaj'),
(339, 'hozzavalok', 34, '2025-04-07 12:12:36', 'INSERT', NULL, 'tortilla lap'),
(340, 'receptetrend', 16, '2025-04-07 12:12:36', 'INSERT', NULL, '16'),
(341, 'receptetrend', 17, '2025-04-07 12:12:36', 'INSERT', NULL, '17'),
(342, 'receptetrend', 18, '2025-04-07 12:12:36', 'INSERT', NULL, '18'),
(343, 'receptek', 16, '2025-04-07 12:30:32', 'INSERT', NULL, 'Csirke szárny'),
(344, 'hozzavalok', 35, '2025-04-07 12:30:32', 'INSERT', NULL, 'csirkeszárny'),
(345, 'hozzavalok', 36, '2025-04-07 12:30:32', 'INSERT', NULL, 'só'),
(346, 'hozzavalok', 37, '2025-04-07 12:30:32', 'INSERT', NULL, 'szegfűbors'),
(347, 'hozzavalok', 38, '2025-04-07 12:30:32', 'INSERT', NULL, 'szegfűszeg'),
(348, 'hozzavalok', 39, '2025-04-07 12:30:32', 'INSERT', NULL, 'fahéj'),
(349, 'hozzavalok', 40, '2025-04-07 12:30:32', 'INSERT', NULL, 'fekete bors'),
(350, 'hozzavalok', 41, '2025-04-07 12:30:32', 'INSERT', NULL, 'római kömény'),
(351, 'hozzavalok', 42, '2025-04-07 12:30:32', 'INSERT', NULL, 'édesköménymag'),
(352, 'hozzavalok', 43, '2025-04-07 12:30:32', 'INSERT', NULL, 'zöld kardamom'),
(353, 'hozzavalok', 44, '2025-04-07 12:30:32', 'INSERT', NULL, 'chilipehely'),
(354, 'hozzavalok', 45, '2025-04-07 12:30:32', 'INSERT', NULL, 'fokhagyma'),
(355, 'hozzavalok', 46, '2025-04-07 12:30:32', 'INSERT', NULL, 'gyömbér'),
(356, 'hozzavalok', 47, '2025-04-07 12:30:32', 'INSERT', NULL, 'olívaolaj'),
(357, 'hozzavalok', 48, '2025-04-07 12:30:32', 'INSERT', NULL, 'méz'),
(358, 'hozzavalok', 49, '2025-04-07 12:30:32', 'INSERT', NULL, 'szójaszósz'),
(359, 'receptetrend', 19, '2025-04-07 12:30:32', 'INSERT', NULL, '19'),
(360, 'receptetrend', 20, '2025-04-07 12:30:32', 'INSERT', NULL, '20'),
(361, 'receptek', 16, '2025-04-07 12:31:31', 'UPDATE_ELFOGADOT', '0', '1'),
(362, 'receptek', 15, '2025-04-07 12:31:44', 'UPDATE_ELFOGADOT', '0', '1'),
(363, 'receptek', 17, '2025-04-07 12:49:34', 'INSERT', NULL, 'chocolate chip cookie'),
(364, 'hozzavalok', 50, '2025-04-07 12:49:34', 'INSERT', NULL, 'kukoricakeményítő'),
(365, 'hozzavalok', 51, '2025-04-07 12:49:34', 'INSERT', NULL, 'víz'),
(366, 'hozzavalok', 52, '2025-04-07 12:49:34', 'INSERT', NULL, 'vaj (sótlan)'),
(367, 'hozzavalok', 53, '2025-04-07 12:49:34', 'INSERT', NULL, 'liszt'),
(368, 'hozzavalok', 54, '2025-04-07 12:49:34', 'INSERT', NULL, 'barnacukor'),
(369, 'hozzavalok', 55, '2025-04-07 12:49:34', 'INSERT', NULL, 'kristálycukor'),
(370, 'hozzavalok', 56, '2025-04-07 12:49:34', 'INSERT', NULL, 'tojás'),
(371, 'hozzavalok', 57, '2025-04-07 12:49:34', 'INSERT', NULL, 'vanília kivonat'),
(372, 'hozzavalok', 58, '2025-04-07 12:49:34', 'INSERT', NULL, 'sütőpor'),
(373, 'hozzavalok', 59, '2025-04-07 12:49:34', 'INSERT', NULL, 'szódabikarbóna'),
(374, 'hozzavalok', 60, '2025-04-07 12:49:34', 'INSERT', NULL, 'só'),
(375, 'hozzavalok', 61, '2025-04-07 12:49:34', 'INSERT', NULL, 'csokoládé'),
(376, 'receptetrend', 21, '2025-04-07 12:49:34', 'INSERT', NULL, '21'),
(377, 'receptetrend', 22, '2025-04-07 12:49:34', 'INSERT', NULL, '22'),
(378, 'receptetrend', 23, '2025-04-07 12:49:34', 'INSERT', NULL, '23'),
(379, 'receptetrend', 24, '2025-04-07 12:49:34', 'INSERT', NULL, '24'),
(380, 'receptetrend', 25, '2025-04-07 12:49:34', 'INSERT', NULL, '25'),
(381, 'ertekeles', 35, '2025-04-08 09:54:33', 'INSERT', NULL, '5'),
(382, 'hozzaszolasok', 12, '2025-04-08 09:54:46', 'INSERT', NULL, 'Szuper étel'),
(383, 'bevasarlolista', 34, '2025-04-11 09:39:23', 'INSERT', NULL, '5'),
(384, 'bevasarlolista', 35, '2025-04-11 09:39:23', 'INSERT', NULL, '5'),
(385, 'bevasarlolista', 36, '2025-04-11 09:39:31', 'INSERT', NULL, '5'),
(386, 'kedvenceklista', 13, '2025-04-11 09:39:33', 'INSERT', NULL, '5'),
(387, 'ertekeles', 36, '2025-04-11 09:39:35', 'INSERT', NULL, '3'),
(388, 'bevasarlolista', 37, '2025-04-11 09:40:03', 'INSERT', NULL, '5'),
(389, 'kedvenceklista', 13, '2025-04-11 10:40:48', 'DELETE', '13', NULL),
(390, 'bevasarlolista', 34, '2025-04-11 10:40:52', 'DELETE', '5', NULL),
(391, 'bevasarlolista', 35, '2025-04-11 10:40:54', 'DELETE', '5', NULL),
(392, 'bevasarlolista', 36, '2025-04-11 10:41:02', 'DELETE', '5', NULL),
(393, 'bevasarlolista', 37, '2025-04-11 10:41:22', 'DELETE', '5', NULL),
(394, 'bevasarlolista', 38, '2025-04-11 10:41:26', 'INSERT', NULL, '5'),
(395, 'bevasarlolista', 39, '2025-04-11 10:41:26', 'INSERT', NULL, '5'),
(396, 'bevasarlolista', 40, '2025-04-11 10:41:26', 'INSERT', NULL, '5'),
(397, 'bevasarlolista', 41, '2025-04-11 10:41:27', 'INSERT', NULL, '5'),
(398, 'bevasarlolista', 42, '2025-04-11 10:41:32', 'INSERT', NULL, '5'),
(399, 'bevasarlolista', 43, '2025-04-11 10:41:33', 'INSERT', NULL, '5'),
(400, 'bevasarlolista', 44, '2025-04-11 10:41:33', 'INSERT', NULL, '5'),
(401, 'bevasarlolista', 40, '2025-04-11 10:41:38', 'DELETE', '5', NULL),
(402, 'bevasarlolista', 39, '2025-04-11 10:41:38', 'DELETE', '5', NULL),
(403, 'bevasarlolista', 38, '2025-04-11 10:41:40', 'DELETE', '5', NULL),
(404, 'bevasarlolista', 41, '2025-04-11 10:41:40', 'DELETE', '5', NULL),
(405, 'bevasarlolista', 42, '2025-04-11 10:41:41', 'DELETE', '5', NULL),
(406, 'bevasarlolista', 43, '2025-04-11 10:41:42', 'DELETE', '5', NULL),
(407, 'bevasarlolista', 44, '2025-04-11 10:41:43', 'DELETE', '5', NULL),
(408, 'receptek', 17, '2025-04-11 10:56:00', 'UPDATE_ELFOGADOT', '0', '1'),
(409, 'hozzaszolasok', 11, '2025-04-11 11:02:08', 'DELETE', 'asda\naa', NULL),
(410, 'hozzaszolasok', 10, '2025-04-11 11:02:10', 'DELETE', 'a\na\naaa', NULL),
(411, 'hozzaszolasok', 9, '2025-04-11 11:02:13', 'DELETE', 'asd\nasdasd\nasd', NULL),
(412, 'hozzaszolasok', 8, '2025-04-11 11:02:15', 'DELETE', 'asdd', NULL),
(413, 'hozzaszolasok', 7, '2025-04-11 11:02:16', 'DELETE', 'asdd', NULL),
(414, 'hozzaszolasok', 6, '2025-04-11 11:02:18', 'DELETE', 'asdd', NULL),
(415, 'hozzaszolasok', 5, '2025-04-11 11:02:20', 'DELETE', 'asd', NULL),
(416, 'bevasarlolista', 33, '2025-04-11 11:02:31', 'DELETE', '6', NULL),
(417, 'bevasarlolista', 32, '2025-04-11 11:02:33', 'DELETE', '6', NULL),
(418, 'bevasarlolista', 26, '2025-04-11 11:02:34', 'DELETE', '5', NULL),
(419, 'bevasarlolista', 21, '2025-04-11 11:02:36', 'DELETE', '5', NULL),
(420, 'bevasarlolista', 19, '2025-04-11 11:02:37', 'DELETE', '5', NULL),
(421, 'bevasarlolista', 14, '2025-04-11 11:02:39', 'DELETE', '5', NULL),
(422, 'receptek', 10, '2025-04-12 17:46:03', 'UPDATE_ELFOGADOT', '0', '2'),
(423, 'receptek', 12, '2025-04-12 17:46:39', 'UPDATE_ELFOGADOT', '0', '2'),
(424, 'receptek', 11, '2025-04-12 17:46:45', 'UPDATE_ELFOGADOT', '0', '2'),
(425, 'receptetrend', 4, '2025-04-12 17:53:23', 'DELETE', '4', NULL),
(426, 'receptek', 18, '2025-04-12 17:55:11', 'INSERT', NULL, 'Torles tesut'),
(427, 'hozzavalok', 62, '2025-04-12 17:55:12', 'INSERT', NULL, 'igen'),
(428, 'receptetrend', 26, '2025-04-12 17:55:12', 'INSERT', NULL, '26'),
(429, 'receptetrend', 26, '2025-04-12 17:55:27', 'DELETE', '26', NULL),
(430, 'hozzavalok', 62, '2025-04-12 17:55:27', 'DELETE', 'igen', NULL),
(431, 'receptek', 18, '2025-04-12 17:55:27', 'DELETE', 'Torles tesut', NULL),
(432, 'receptek', 19, '2025-04-12 17:56:53', 'INSERT', NULL, 'a'),
(433, 'hozzavalok', 63, '2025-04-12 17:56:53', 'INSERT', NULL, 'a'),
(434, 'receptetrend', 27, '2025-04-12 17:56:53', 'INSERT', NULL, '27'),
(435, 'receptetrend', 27, '2025-04-12 17:57:08', 'DELETE', '27', NULL),
(436, 'hozzavalok', 63, '2025-04-12 17:57:08', 'DELETE', 'a', NULL),
(437, 'receptek', 19, '2025-04-12 17:57:09', 'DELETE', 'a', NULL),
(438, 'receptek', 20, '2025-04-12 18:18:04', 'INSERT', NULL, 're'),
(439, 'hozzavalok', 64, '2025-04-12 18:18:04', 'INSERT', NULL, 'r'),
(440, 'receptetrend', 28, '2025-04-12 18:18:04', 'INSERT', NULL, '28'),
(441, 'receptetrend', 28, '2025-04-12 18:18:41', 'DELETE', '28', NULL),
(442, 'hozzavalok', 64, '2025-04-12 18:18:41', 'DELETE', 'r', NULL),
(443, 'receptek', 20, '2025-04-12 18:18:41', 'DELETE', 're', NULL),
(444, 'kedvenceklista', 14, '2025-04-12 18:22:52', 'INSERT', NULL, '5'),
(445, 'bevasarlolista', 45, '2025-04-12 18:22:55', 'INSERT', NULL, '5'),
(446, 'bevasarlolista', 45, '2025-04-12 18:23:05', 'DELETE', '5', NULL),
(447, 'kedvenceklista', 14, '2025-04-12 18:23:07', 'DELETE', '14', NULL),
(448, 'receptek', 21, '2025-04-12 18:24:10', 'INSERT', NULL, 'teszt'),
(449, 'hozzavalok', 65, '2025-04-12 18:24:10', 'INSERT', NULL, 'asdf'),
(450, 'receptetrend', 29, '2025-04-12 18:24:10', 'INSERT', NULL, '29'),
(451, 'receptetrend', 30, '2025-04-12 18:24:10', 'INSERT', NULL, '30'),
(452, 'receptek', 21, '2025-04-12 18:24:23', 'UPDATE_ELFOGADOT', '0', '2'),
(453, 'receptek', 21, '2025-04-12 18:24:38', 'UPDATE_ELFOGADOT', '2', '3'),
(454, 'felhasznalok', 5, '2025-04-13 20:16:36', 'UPDATE_EMAIL', 'teszt@teszt.com', 'teszt@teszt.co'),
(455, 'receptek', 22, '2025-04-13 20:27:17', 'INSERT', NULL, 'a'),
(456, 'hozzavalok', 66, '2025-04-13 20:27:17', 'INSERT', NULL, 'a'),
(457, 'receptetrend', 31, '2025-04-13 20:27:17', 'INSERT', NULL, '31'),
(458, 'receptetrend', 31, '2025-04-13 20:41:42', 'DELETE', '31', NULL),
(459, 'hozzavalok', 66, '2025-04-13 20:41:42', 'DELETE', 'a', NULL),
(460, 'receptek', 22, '2025-04-13 20:41:42', 'DELETE', 'a', NULL),
(461, 'hetimenu', 37, '2025-04-13 20:48:33', 'INSERT', NULL, '12'),
(462, 'hetimenu', 37, '2025-04-13 20:48:38', 'DELETE', '12', NULL),
(463, 'gyerekmenu', 1, '2025-04-13 20:48:49', 'INSERT', NULL, '12'),
(464, 'hetimenu', 1, '2025-04-13 20:48:53', 'DELETE', '12', NULL),
(465, 'bevasarlolista', 46, '2025-04-15 07:57:11', 'INSERT', NULL, '5'),
(466, 'bevasarlolista', 47, '2025-04-15 07:57:11', 'INSERT', NULL, '5'),
(467, 'kedvenceklista', 15, '2025-04-15 07:57:13', 'INSERT', NULL, '5'),
(468, 'hozzaszolasok', 13, '2025-04-15 07:57:18', 'INSERT', NULL, 'Ez egy hozzászólás'),
(469, 'kedvenceklista', 15, '2025-04-15 07:57:28', 'DELETE', '15', NULL),
(470, 'bevasarlolista', 46, '2025-04-15 07:57:31', 'DELETE', '5', NULL),
(471, 'bevasarlolista', 47, '2025-04-15 07:57:33', 'DELETE', '5', NULL),
(472, 'bevasarlolista', 48, '2025-04-15 08:00:20', 'INSERT', NULL, '5'),
(473, 'bevasarlolista', 49, '2025-04-15 08:00:20', 'INSERT', NULL, '5'),
(474, 'kedvenceklista', 16, '2025-04-15 08:00:22', 'INSERT', NULL, '5'),
(475, 'hozzaszolasok', 14, '2025-04-15 08:00:28', 'INSERT', NULL, 'Ez egy hozzászólás'),
(476, 'kedvenceklista', 16, '2025-04-15 08:00:38', 'DELETE', '16', NULL),
(477, 'bevasarlolista', 48, '2025-04-15 08:00:41', 'DELETE', '5', NULL),
(478, 'bevasarlolista', 49, '2025-04-15 08:00:43', 'DELETE', '5', NULL),
(479, 'receptek', 23, '2025-04-15 08:23:26', 'INSERT', NULL, 'Corn dog'),
(480, 'hozzavalok', 67, '2025-04-15 08:23:26', 'INSERT', NULL, 'ketchup'),
(481, 'hozzavalok', 68, '2025-04-15 08:23:26', 'INSERT', NULL, 'mustár'),
(482, 'hozzavalok', 69, '2025-04-15 08:23:26', 'INSERT', NULL, 'finom liszt'),
(483, 'hozzavalok', 70, '2025-04-15 08:23:26', 'INSERT', NULL, 'kukorica liszt'),
(484, 'hozzavalok', 71, '2025-04-15 08:23:26', 'INSERT', NULL, 'instant élesztő'),
(485, 'hozzavalok', 72, '2025-04-15 08:23:26', 'INSERT', NULL, 'tojás'),
(486, 'hozzavalok', 73, '2025-04-15 08:23:26', 'INSERT', NULL, 'tej'),
(487, 'hozzavalok', 74, '2025-04-15 08:23:26', 'INSERT', NULL, 'só'),
(488, 'hozzavalok', 75, '2025-04-15 08:23:26', 'INSERT', NULL, 'cukor'),
(489, 'hozzavalok', 76, '2025-04-15 08:23:26', 'INSERT', NULL, 'virsli'),
(490, 'hozzavalok', 77, '2025-04-15 08:23:26', 'INSERT', NULL, 'finomliszt virslihez'),
(491, 'hozzavalok', 78, '2025-04-15 08:23:26', 'INSERT', NULL, 'napraforgó olaj (a sütéshez)'),
(492, 'receptetrend', 32, '2025-04-15 08:23:26', 'INSERT', NULL, '32'),
(493, 'receptek', 17, '2025-04-15 09:42:08', 'UPDATE_ADAG', '1', '3'),
(494, 'receptek', 17, '2025-04-15 09:50:52', 'UPDATE_ADAG', '3', '1'),
(495, 'receptek', 24, '2025-04-15 09:58:15', 'INSERT', NULL, 'Currys csirkemell'),
(496, 'hozzavalok', 79, '2025-04-15 09:58:15', 'INSERT', NULL, 'csirkemellfilé'),
(497, 'hozzavalok', 80, '2025-04-15 09:58:15', 'INSERT', NULL, 'fokhagyma'),
(498, 'hozzavalok', 81, '2025-04-15 09:58:15', 'INSERT', NULL, 'vöröshagyma'),
(499, 'hozzavalok', 82, '2025-04-15 09:58:15', 'INSERT', NULL, 'reszelt gyömbér'),
(500, 'hozzavalok', 83, '2025-04-15 09:58:15', 'INSERT', NULL, 'curry por'),
(501, 'hozzavalok', 84, '2025-04-15 09:58:15', 'INSERT', NULL, 'kókuszkrém'),
(502, 'hozzavalok', 85, '2025-04-15 09:58:15', 'INSERT', NULL, 'paradicsom ivólé'),
(503, 'hozzavalok', 86, '2025-04-15 09:58:15', 'INSERT', NULL, 'bébispenót'),
(504, 'hozzavalok', 87, '2025-04-15 09:58:15', 'INSERT', NULL, 'limelé'),
(505, 'hozzavalok', 88, '2025-04-15 09:58:15', 'INSERT', NULL, 'olívaolaj'),
(506, 'hozzavalok', 89, '2025-04-15 09:58:15', 'INSERT', NULL, 'bors'),
(507, 'receptetrend', 33, '2025-04-15 09:58:15', 'INSERT', NULL, '33'),
(508, 'receptek', 24, '2025-04-15 09:58:41', 'UPDATE_ELFOGADOT', '0', '1'),
(509, 'receptek', 23, '2025-04-15 10:08:26', 'UPDATE_GYEREKMENU', '0', '1'),
(510, 'receptek', 25, '2025-04-15 10:15:04', 'INSERT', NULL, 'Hamburger'),
(511, 'hozzavalok', 90, '2025-04-15 10:15:04', 'INSERT', NULL, 'darált marhahhús'),
(512, 'hozzavalok', 91, '2025-04-15 10:15:04', 'INSERT', NULL, 'fűszerkeverék'),
(513, 'hozzavalok', 92, '2025-04-15 10:15:04', 'INSERT', NULL, 'víz'),
(514, 'hozzavalok', 93, '2025-04-15 10:15:04', 'INSERT', NULL, 'hamburger zsemle'),
(515, 'hozzavalok', 94, '2025-04-15 10:15:04', 'INSERT', NULL, 'cheddar sajt'),
(516, 'hozzavalok', 95, '2025-04-15 10:15:04', 'INSERT', NULL, 'nagy paradicsom'),
(517, 'hozzavalok', 96, '2025-04-15 10:15:04', 'INSERT', NULL, 'közepes fejessaláta'),
(518, 'hozzavalok', 97, '2025-04-15 10:15:04', 'INSERT', NULL, 'vaj'),
(519, 'hozzavalok', 98, '2025-04-15 10:15:04', 'INSERT', NULL, 'olívaolaj'),
(520, 'hozzavalok', 99, '2025-04-15 10:15:04', 'INSERT', NULL, 'burgerszósz'),
(521, 'hozzavalok', 100, '2025-04-15 10:15:04', 'INSERT', NULL, 'majonéz'),
(522, 'hozzavalok', 101, '2025-04-15 10:15:04', 'INSERT', NULL, 'kis lilahagyma'),
(523, 'hozzavalok', 102, '2025-04-15 10:15:04', 'INSERT', NULL, 'csemegeuborka'),
(524, 'hozzavalok', 103, '2025-04-15 10:15:04', 'INSERT', NULL, 'fűszerpaprika'),
(525, 'hozzavalok', 104, '2025-04-15 10:15:04', 'INSERT', NULL, 'csemegeuborka (lé)'),
(526, 'receptetrend', 34, '2025-04-15 10:15:04', 'INSERT', NULL, '34'),
(527, 'receptek', 25, '2025-04-15 10:16:38', 'UPDATE_ELFOGADOT', '0', '1'),
(528, 'receptek', 26, '2025-04-15 10:19:26', 'INSERT', NULL, 'macaron'),
(529, 'hozzavalok', 105, '2025-04-15 10:19:26', 'INSERT', NULL, '3'),
(530, 'hozzavalok', 106, '2025-04-15 10:19:26', 'INSERT', NULL, 'asd'),
(531, 'receptetrend', 35, '2025-04-15 10:19:26', 'INSERT', NULL, '35'),
(532, 'receptetrend', 35, '2025-04-15 10:48:12', 'DELETE', '35', NULL),
(533, 'hozzavalok', 105, '2025-04-15 10:48:12', 'DELETE', '3', NULL),
(534, 'hozzavalok', 106, '2025-04-15 10:48:12', 'DELETE', 'asd', NULL),
(535, 'receptek', 26, '2025-04-15 10:48:12', 'DELETE', 'macaron', NULL),
(536, 'receptek', 27, '2025-04-15 10:53:07', 'INSERT', NULL, 'Macaron'),
(537, 'hozzavalok', 107, '2025-04-15 10:53:07', 'INSERT', NULL, 'habtejszín'),
(538, 'hozzavalok', 108, '2025-04-15 10:53:07', 'INSERT', NULL, 'étcsokoládé'),
(539, 'hozzavalok', 109, '2025-04-15 10:53:07', 'INSERT', NULL, 'mandula'),
(540, 'hozzavalok', 110, '2025-04-15 10:53:07', 'INSERT', NULL, 'porcukor'),
(541, 'hozzavalok', 111, '2025-04-15 10:53:07', 'INSERT', NULL, 'ételfesték (pink és sárga)'),
(542, 'hozzavalok', 112, '2025-04-15 10:53:07', 'INSERT', NULL, 'tojásfehérje'),
(543, 'hozzavalok', 113, '2025-04-15 10:53:07', 'INSERT', NULL, 'só'),
(544, 'hozzavalok', 114, '2025-04-15 10:53:07', 'INSERT', NULL, 'vaníliaaroma'),
(545, 'hozzavalok', 115, '2025-04-15 10:53:07', 'INSERT', NULL, 'citromlé'),
(546, 'receptetrend', 36, '2025-04-15 10:53:07', 'INSERT', NULL, '36'),
(547, 'receptek', 28, '2025-04-15 11:07:18', 'INSERT', NULL, 'Banános zabsüti'),
(548, 'hozzavalok', 116, '2025-04-15 11:07:18', 'INSERT', NULL, 'zabpehely'),
(549, 'hozzavalok', 117, '2025-04-15 11:07:18', 'INSERT', NULL, 'búzakorpa'),
(550, 'hozzavalok', 118, '2025-04-15 11:07:18', 'INSERT', NULL, 'méz'),
(551, 'hozzavalok', 119, '2025-04-15 11:07:18', 'INSERT', NULL, 'banán'),
(552, 'hozzavalok', 120, '2025-04-15 11:07:18', 'INSERT', NULL, 'nagy alma'),
(553, 'hozzavalok', 121, '2025-04-15 11:07:18', 'INSERT', NULL, 'vaníliaaroma'),
(554, 'receptetrend', 37, '2025-04-15 11:07:19', 'INSERT', NULL, '37'),
(555, 'receptek', 28, '2025-04-15 11:12:04', 'UPDATE_ELFOGADOT', '0', '1'),
(556, 'receptek', 29, '2025-04-15 11:41:23', 'INSERT', NULL, 'Vegán pizza'),
(557, 'hozzavalok', 122, '2025-04-15 11:41:23', 'INSERT', NULL, 'dió'),
(558, 'hozzavalok', 123, '2025-04-15 11:41:23', 'INSERT', NULL, 'fokhagymapor'),
(559, 'hozzavalok', 124, '2025-04-15 11:41:23', 'INSERT', NULL, 'só'),
(560, 'hozzavalok', 125, '2025-04-15 11:41:23', 'INSERT', NULL, 'passzírozott paradicsom'),
(561, 'hozzavalok', 126, '2025-04-15 11:41:23', 'INSERT', NULL, 'piros kaliforniai paprika'),
(562, 'hozzavalok', 127, '2025-04-15 11:41:23', 'INSERT', NULL, 'sárga kaliforniai paprika'),
(563, 'hozzavalok', 128, '2025-04-15 11:41:23', 'INSERT', NULL, 'zöld kaliforniai paprika'),
(564, 'hozzavalok', 129, '2025-04-15 11:41:23', 'INSERT', NULL, 'csiperkegomba'),
(565, 'hozzavalok', 130, '2025-04-15 11:41:23', 'INSERT', NULL, 'lilahagyma'),
(566, 'hozzavalok', 131, '2025-04-15 11:41:23', 'INSERT', NULL, 'csemegekukorica'),
(567, 'hozzavalok', 132, '2025-04-15 11:41:23', 'INSERT', NULL, 'só'),
(568, 'hozzavalok', 133, '2025-04-15 11:41:23', 'INSERT', NULL, 'fűszerkömény'),
(569, 'hozzavalok', 134, '2025-04-15 11:41:23', 'INSERT', NULL, 'rukkola'),
(570, 'hozzavalok', 135, '2025-04-15 11:41:23', 'INSERT', NULL, 'olívaolaj'),
(571, 'hozzavalok', 136, '2025-04-15 11:41:23', 'INSERT', NULL, 'víz'),
(572, 'hozzavalok', 137, '2025-04-15 11:41:23', 'INSERT', NULL, 'finomliszt'),
(573, 'hozzavalok', 138, '2025-04-15 11:41:23', 'INSERT', NULL, 'friss élesztő'),
(574, 'hozzavalok', 139, '2025-04-15 11:41:23', 'INSERT', NULL, 'cukor'),
(575, 'hozzavalok', 140, '2025-04-15 11:41:23', 'INSERT', NULL, 'cukor'),
(576, 'receptetrend', 38, '2025-04-15 11:41:23', 'INSERT', NULL, '38'),
(577, 'receptetrend', 39, '2025-04-15 11:41:23', 'INSERT', NULL, '39'),
(578, 'receptetrend', 40, '2025-04-15 11:41:23', 'INSERT', NULL, '40'),
(579, 'receptetrend', 41, '2025-04-15 11:41:23', 'INSERT', NULL, '41'),
(580, 'receptek', 29, '2025-04-15 11:41:51', 'UPDATE_ELFOGADOT', '0', '1'),
(581, 'receptek', 29, '2025-04-15 11:43:05', 'UPDATE_ETELFAJTA', '40', '3'),
(582, 'bevasarlolista', 50, '2025-04-15 11:43:59', 'INSERT', NULL, '5'),
(583, 'bevasarlolista', 51, '2025-04-15 11:43:59', 'INSERT', NULL, '5'),
(584, 'bevasarlolista', 52, '2025-04-15 11:44:03', 'INSERT', NULL, '5'),
(585, 'bevasarlolista', 53, '2025-04-15 11:44:04', 'INSERT', NULL, '5'),
(586, 'bevasarlolista', 50, '2025-04-15 11:44:20', 'DELETE', '5', NULL),
(587, 'bevasarlolista', 51, '2025-04-15 11:44:21', 'DELETE', '5', NULL),
(588, 'bevasarlolista', 52, '2025-04-15 11:44:21', 'DELETE', '5', NULL),
(589, 'bevasarlolista', 53, '2025-04-15 11:44:22', 'DELETE', '5', NULL),
(590, 'hozzavalok', 5, '2025-04-15 11:47:30', 'DELETE', '[value-3]', NULL),
(591, 'hozzavalok', 1, '2025-04-15 11:47:34', 'DELETE', 'teszt', NULL),
(592, 'gyerekmenu', 2, '2025-04-15 17:11:00', 'INSERT', NULL, '14'),
(593, 'gyerekmenu', 3, '2025-04-15 17:11:00', 'INSERT', NULL, '16'),
(594, 'gyerekmenu', 5, '2025-04-15 17:11:00', 'INSERT', NULL, '13'),
(595, 'gyerekmenu', 6, '2025-04-15 17:11:00', 'INSERT', NULL, '29'),
(596, 'gyerekmenu', 7, '2025-04-15 17:11:00', 'INSERT', NULL, '15'),
(597, 'gyerekmenu', 8, '2025-04-15 17:11:00', 'INSERT', NULL, '25'),
(598, 'gyerekmenu', 2, '2025-04-15 17:12:00', 'DELETE', '14', NULL),
(599, 'gyerekmenu', 3, '2025-04-15 17:12:00', 'DELETE', '16', NULL),
(600, 'gyerekmenu', 5, '2025-04-15 17:12:00', 'DELETE', '13', NULL),
(601, 'gyerekmenu', 6, '2025-04-15 17:12:00', 'DELETE', '29', NULL),
(602, 'gyerekmenu', 7, '2025-04-15 17:12:00', 'DELETE', '15', NULL),
(603, 'gyerekmenu', 8, '2025-04-15 17:12:00', 'DELETE', '25', NULL),
(604, 'gyerekmenu', 9, '2025-04-15 17:12:00', 'INSERT', NULL, '16'),
(605, 'gyerekmenu', 10, '2025-04-15 17:12:00', 'INSERT', NULL, '14'),
(606, 'gyerekmenu', 12, '2025-04-15 17:12:00', 'INSERT', NULL, '13'),
(607, 'gyerekmenu', 13, '2025-04-15 17:12:00', 'INSERT', NULL, '29'),
(608, 'gyerekmenu', 14, '2025-04-15 17:12:00', 'INSERT', NULL, '15'),
(609, 'gyerekmenu', 15, '2025-04-15 17:12:00', 'INSERT', NULL, '25'),
(610, 'hetimenu', 31, '2025-04-15 17:14:00', 'DELETE', '16', NULL),
(611, 'hetimenu', 32, '2025-04-15 17:14:00', 'DELETE', '14', NULL),
(612, 'hetimenu', 34, '2025-04-15 17:14:00', 'DELETE', '15', NULL),
(613, 'gyerekmenu', 9, '2025-04-15 17:14:00', 'DELETE', '16', NULL),
(614, 'gyerekmenu', 10, '2025-04-15 17:14:00', 'DELETE', '14', NULL),
(615, 'gyerekmenu', 12, '2025-04-15 17:14:00', 'DELETE', '13', NULL),
(616, 'gyerekmenu', 13, '2025-04-15 17:14:00', 'DELETE', '29', NULL),
(617, 'gyerekmenu', 14, '2025-04-15 17:14:00', 'DELETE', '15', NULL),
(618, 'gyerekmenu', 15, '2025-04-15 17:14:00', 'DELETE', '25', NULL),
(619, 'hetimenu', 35, '2025-04-15 17:14:00', 'DELETE', '13', NULL),
(620, 'gyerekmenu', 16, '2025-04-15 17:14:00', 'INSERT', NULL, '14'),
(621, 'gyerekmenu', 17, '2025-04-15 17:14:00', 'INSERT', NULL, '16'),
(622, 'hetimenu', 38, '2025-04-15 17:14:00', 'INSERT', NULL, '16'),
(623, 'hetimenu', 39, '2025-04-15 17:14:00', 'INSERT', NULL, '14'),
(624, 'hetimenu', 41, '2025-04-15 17:14:00', 'INSERT', NULL, '24'),
(625, 'gyerekmenu', 19, '2025-04-15 17:14:00', 'INSERT', NULL, '13'),
(626, 'hetimenu', 42, '2025-04-15 17:14:00', 'INSERT', NULL, '15'),
(627, 'gyerekmenu', 20, '2025-04-15 17:14:00', 'INSERT', NULL, '29'),
(628, 'hetimenu', 43, '2025-04-15 17:14:00', 'INSERT', NULL, '29'),
(629, 'gyerekmenu', 21, '2025-04-15 17:14:00', 'INSERT', NULL, '15'),
(630, 'hetimenu', 44, '2025-04-15 17:14:00', 'INSERT', NULL, '13'),
(631, 'hetimenu', 48, '2025-04-15 17:14:00', 'INSERT', NULL, '25'),
(632, 'gyerekmenu', 22, '2025-04-15 17:14:00', 'INSERT', NULL, '25'),
(633, 'receptek', 23, '2025-05-11 21:30:56', 'UPDATE_ELFOGADOT', '0', '1'),
(634, 'receptek', 27, '2025-05-11 21:31:03', 'UPDATE_ELFOGADOT', '0', '1'),
(635, 'receptek', 30, '2025-05-11 21:40:40', 'INSERT', NULL, 'Vidám reggeli gyerekeknek'),
(636, 'hozzavalok', 141, '2025-05-11 21:40:40', 'INSERT', NULL, 'szeletelt kenyér'),
(637, 'hozzavalok', 142, '2025-05-11 21:40:41', 'INSERT', NULL, 'nutella'),
(638, 'hozzavalok', 143, '2025-05-11 21:40:41', 'INSERT', NULL, 'banán'),
(639, 'hozzavalok', 144, '2025-05-11 21:40:41', 'INSERT', NULL, 'áfonya'),
(640, 'receptetrend', 42, '2025-05-11 21:40:41', 'INSERT', NULL, '42'),
(641, 'receptetrend', 43, '2025-05-11 21:40:41', 'INSERT', NULL, '43'),
(642, 'receptek', 31, '2025-05-11 21:44:43', 'INSERT', NULL, 'Csirkemellsonkás színes szendvics'),
(643, 'hozzavalok', 145, '2025-05-11 21:44:43', 'INSERT', NULL, 'teljes kiőrlésű kenyér'),
(644, 'hozzavalok', 146, '2025-05-11 21:44:43', 'INSERT', NULL, 'csirkemell sonka'),
(645, 'hozzavalok', 147, '2025-05-11 21:44:44', 'INSERT', NULL, 'krémsajt'),
(646, 'hozzavalok', 148, '2025-05-11 21:44:44', 'INSERT', NULL, 'kígyóuborka'),
(647, 'hozzavalok', 149, '2025-05-11 21:44:44', 'INSERT', NULL, 'paradicsom'),
(648, 'hozzavalok', 150, '2025-05-11 21:44:44', 'INSERT', NULL, 'reszelt répa'),
(649, 'hozzavalok', 151, '2025-05-11 21:44:44', 'INSERT', NULL, 'jégsaláta'),
(650, 'receptetrend', 44, '2025-05-11 21:44:44', 'INSERT', NULL, '44'),
(651, 'receptek', 32, '2025-05-11 21:52:28', 'INSERT', NULL, 'Baconös csirkesaslik sült fokhagymás burgonyapürével'),
(652, 'hozzavalok', 152, '2025-05-11 21:52:28', 'INSERT', NULL, 'csirkemell'),
(653, 'hozzavalok', 153, '2025-05-11 21:52:28', 'INSERT', NULL, 'bacon'),
(654, 'hozzavalok', 154, '2025-05-11 21:52:28', 'INSERT', NULL, 'burgonya'),
(655, 'hozzavalok', 155, '2025-05-11 21:52:28', 'INSERT', NULL, 'fokhagyma'),
(656, 'hozzavalok', 156, '2025-05-11 21:52:29', 'INSERT', NULL, 'tej'),
(657, 'hozzavalok', 157, '2025-05-11 21:52:29', 'INSERT', NULL, 'vaj'),
(658, 'receptetrend', 45, '2025-05-11 21:52:29', 'INSERT', NULL, '45'),
(659, 'receptek', 33, '2025-05-11 21:55:21', 'INSERT', NULL, 'Mókás szendvics gyerekeknek'),
(660, 'hozzavalok', 158, '2025-05-11 21:55:21', 'INSERT', NULL, 'kenyér'),
(661, 'hozzavalok', 159, '2025-05-11 21:55:21', 'INSERT', NULL, 'sonka'),
(662, 'hozzavalok', 160, '2025-05-11 21:55:21', 'INSERT', NULL, 'sajt'),
(663, 'hozzavalok', 161, '2025-05-11 21:55:21', 'INSERT', NULL, 'zöldségek'),
(664, 'receptetrend', 46, '2025-05-11 21:55:21', 'INSERT', NULL, '46'),
(665, 'receptek', 34, '2025-05-11 21:59:02', 'INSERT', NULL, 'Spenótos frittata'),
(666, 'hozzavalok', 162, '2025-05-11 21:59:03', 'INSERT', NULL, 'spenót'),
(667, 'hozzavalok', 163, '2025-05-11 21:59:03', 'INSERT', NULL, 'tojás'),
(668, 'hozzavalok', 164, '2025-05-11 21:59:03', 'INSERT', NULL, 'paradicsom'),
(669, 'hozzavalok', 165, '2025-05-11 21:59:03', 'INSERT', NULL, 'fokhagyma'),
(670, 'hozzavalok', 166, '2025-05-11 21:59:03', 'INSERT', NULL, 'bazsalikom'),
(671, 'hozzavalok', 167, '2025-05-11 21:59:03', 'INSERT', NULL, 'parmezán sajt'),
(672, 'receptetrend', 47, '2025-05-11 21:59:03', 'INSERT', NULL, '47'),
(673, 'receptek', 30, '2025-05-11 21:59:21', 'UPDATE_ELFOGADOT', '0', '1'),
(674, 'receptek', 31, '2025-05-11 21:59:28', 'UPDATE_ELFOGADOT', '0', '1'),
(675, 'receptek', 32, '2025-05-11 21:59:32', 'UPDATE_ELFOGADOT', '0', '1'),
(676, 'receptek', 33, '2025-05-11 21:59:36', 'UPDATE_ELFOGADOT', '0', '1'),
(677, 'receptek', 34, '2025-05-11 21:59:39', 'UPDATE_ELFOGADOT', '0', '1'),
(678, 'receptek', 33, '2025-05-11 22:02:47', 'UPDATE_NAPSZAK', 'UZSONNNA', 'UZSONNA'),
(679, 'receptek', 17, '2025-05-11 22:02:58', 'UPDATE_NAPSZAK', 'UZSONNNA', 'UZSONNA'),
(680, 'receptek', 27, '2025-05-11 22:03:10', 'UPDATE_NAPSZAK', 'UZSONNNA', 'UZSONNA'),
(681, 'receptek', 28, '2025-05-11 22:03:18', 'UPDATE_NAPSZAK', 'UZSONNNA', 'UZSONNA'),
(682, 'felhasznalok', 5, '2025-05-11 22:03:47', 'UPDATE_PROFILEPIC', './feltoltotKepek/profilKepek/admin/admin_profilkep.jpg', './feltoltotKepek/profilKepek/admin/admin_profilkep.png'),
(683, 'receptek', 35, '2025-05-12 12:33:10', 'INSERT', NULL, 'Sonka Wellington'),
(684, 'hozzavalok', 168, '2025-05-12 12:33:10', 'INSERT', NULL, 'mustár'),
(685, 'hozzavalok', 169, '2025-05-12 12:33:10', 'INSERT', NULL, 'méz'),
(686, 'hozzavalok', 170, '2025-05-12 12:33:10', 'INSERT', NULL, 'bors'),
(687, 'hozzavalok', 171, '2025-05-12 12:33:10', 'INSERT', NULL, 'mézeskalács fűszerkeverék'),
(688, 'hozzavalok', 172, '2025-05-12 12:33:10', 'INSERT', NULL, 'főtt sonka'),
(689, 'hozzavalok', 173, '2025-05-12 12:33:10', 'INSERT', NULL, 'leveles tészta'),
(690, 'hozzavalok', 174, '2025-05-12 12:33:11', 'INSERT', NULL, 'tojás'),
(691, 'receptetrend', 48, '2025-05-12 12:33:11', 'INSERT', NULL, '48'),
(692, 'receptek', 35, '2025-05-12 12:34:58', 'UPDATE_ELFOGADOT', '0', '1'),
(693, 'receptek', 36, '2025-05-12 12:40:26', 'INSERT', NULL, 'Gofri'),
(694, 'hozzavalok', 175, '2025-05-12 12:40:26', 'INSERT', NULL, 'finomliszt'),
(695, 'hozzavalok', 176, '2025-05-12 12:40:26', 'INSERT', NULL, 'cukor'),
(696, 'hozzavalok', 177, '2025-05-12 12:40:26', 'INSERT', NULL, 'szódabikarbóna'),
(697, 'hozzavalok', 178, '2025-05-12 12:40:27', 'INSERT', NULL, 'sütőpor'),
(698, 'hozzavalok', 179, '2025-05-12 12:40:27', 'INSERT', NULL, 'só');
INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`) VALUES
(699, 'hozzavalok', 180, '2025-05-12 12:40:27', 'INSERT', NULL, 'író'),
(700, 'hozzavalok', 181, '2025-05-12 12:40:27', 'INSERT', NULL, 'vaj(olvasztott)'),
(701, 'hozzavalok', 182, '2025-05-12 12:40:27', 'INSERT', NULL, 'tojás'),
(702, 'hozzavalok', 183, '2025-05-12 12:40:27', 'INSERT', NULL, 'fahéj'),
(703, 'hozzavalok', 184, '2025-05-12 12:40:27', 'INSERT', NULL, 'vaníliás cukor'),
(704, 'hozzavalok', 185, '2025-05-12 12:40:27', 'INSERT', NULL, 'vaníliaaroma'),
(705, 'receptetrend', 49, '2025-05-12 12:40:27', 'INSERT', NULL, '49'),
(706, 'receptek', 37, '2025-05-12 12:43:44', 'INSERT', NULL, 'Sonkakrém'),
(707, 'hozzavalok', 186, '2025-05-12 12:43:44', 'INSERT', NULL, 'főtt sonka'),
(708, 'hozzavalok', 187, '2025-05-12 12:43:44', 'INSERT', NULL, 'mustár'),
(709, 'hozzavalok', 188, '2025-05-12 12:43:44', 'INSERT', NULL, 'vaj'),
(710, 'hozzavalok', 189, '2025-05-12 12:43:44', 'INSERT', NULL, 'tejföl'),
(711, 'hozzavalok', 190, '2025-05-12 12:43:44', 'INSERT', NULL, 'snidling'),
(712, 'hozzavalok', 191, '2025-05-12 12:43:44', 'INSERT', NULL, 'bors'),
(713, 'hozzavalok', 192, '2025-05-12 12:43:44', 'INSERT', NULL, 'sajt'),
(714, 'hozzavalok', 193, '2025-05-12 12:43:44', 'INSERT', NULL, 'méz'),
(715, 'receptetrend', 50, '2025-05-12 12:43:44', 'INSERT', NULL, '50'),
(716, 'receptek', 38, '2025-05-12 12:48:00', 'INSERT', NULL, 'Mennyei tojáskrém'),
(717, 'hozzavalok', 194, '2025-05-12 12:48:00', 'INSERT', NULL, 'tojás'),
(718, 'hozzavalok', 195, '2025-05-12 12:48:00', 'INSERT', NULL, 'vaj'),
(719, 'hozzavalok', 196, '2025-05-12 12:48:00', 'INSERT', NULL, 'tejföl'),
(720, 'hozzavalok', 197, '2025-05-12 12:48:00', 'INSERT', NULL, 'sült hagyma'),
(721, 'hozzavalok', 198, '2025-05-12 12:48:00', 'INSERT', NULL, 'majonézes torma'),
(722, 'hozzavalok', 199, '2025-05-12 12:48:01', 'INSERT', NULL, 'só'),
(723, 'hozzavalok', 200, '2025-05-12 12:48:01', 'INSERT', NULL, 'bors'),
(724, 'hozzavalok', 201, '2025-05-12 12:48:01', 'INSERT', NULL, 'snidling'),
(725, 'hozzavalok', 202, '2025-05-12 12:48:01', 'INSERT', NULL, 'mustár'),
(726, 'hozzavalok', 203, '2025-05-12 12:48:01', 'INSERT', NULL, 'citromlé'),
(727, 'receptetrend', 51, '2025-05-12 12:48:01', 'INSERT', NULL, '51'),
(728, 'receptek', 39, '2025-05-12 12:50:50', 'INSERT', NULL, 'Reszelt almás cinnamon roll'),
(729, 'hozzavalok', 204, '2025-05-12 12:50:50', 'INSERT', NULL, 'leveles tészta'),
(730, 'hozzavalok', 205, '2025-05-12 12:50:50', 'INSERT', NULL, 'vaj'),
(731, 'hozzavalok', 206, '2025-05-12 12:50:50', 'INSERT', NULL, 'fahéj'),
(732, 'hozzavalok', 207, '2025-05-12 12:50:50', 'INSERT', NULL, 'barna cukor'),
(733, 'hozzavalok', 208, '2025-05-12 12:50:50', 'INSERT', NULL, 'só'),
(734, 'hozzavalok', 209, '2025-05-12 12:50:50', 'INSERT', NULL, 'alma'),
(735, 'hozzavalok', 210, '2025-05-12 12:50:50', 'INSERT', NULL, 'pekándió (pirított)'),
(736, 'receptetrend', 52, '2025-05-12 12:50:50', 'INSERT', NULL, '52'),
(737, 'receptek', 40, '2025-05-12 12:53:16', 'INSERT', NULL, 'Ropogós kiflik'),
(738, 'hozzavalok', 211, '2025-05-12 12:53:16', 'INSERT', NULL, 'finomliszt'),
(739, 'hozzavalok', 212, '2025-05-12 12:53:16', 'INSERT', NULL, 'víz'),
(740, 'hozzavalok', 213, '2025-05-12 12:53:17', 'INSERT', NULL, 'tej'),
(741, 'hozzavalok', 214, '2025-05-12 12:53:17', 'INSERT', NULL, 'olívaolaj'),
(742, 'hozzavalok', 215, '2025-05-12 12:53:17', 'INSERT', NULL, 'só'),
(743, 'hozzavalok', 216, '2025-05-12 12:53:17', 'INSERT', NULL, 'friss élesztő'),
(744, 'receptetrend', 53, '2025-05-12 12:53:17', 'INSERT', NULL, '53'),
(745, 'receptek', 36, '2025-05-12 12:53:28', 'UPDATE_ELFOGADOT', '0', '1'),
(746, 'receptek', 37, '2025-05-12 12:53:31', 'UPDATE_ELFOGADOT', '0', '1'),
(747, 'receptek', 38, '2025-05-12 12:53:33', 'UPDATE_ELFOGADOT', '0', '1'),
(748, 'receptek', 39, '2025-05-12 12:53:36', 'UPDATE_ELFOGADOT', '0', '1'),
(749, 'receptek', 40, '2025-05-12 12:53:38', 'UPDATE_ELFOGADOT', '0', '1'),
(750, 'felhasznalok', 5, '2025-05-12 12:59:06', 'UPDATE_PROFILEPIC', './feltoltotKepek/profilKepek/admin/admin_profilkep.png', './feltoltotKepek/profilKepek/admin/admin_profilkep.jpg'),
(751, 'hetimenu', 38, '2025-05-17 22:04:00', 'DELETE', '16', NULL),
(752, 'hetimenu', 39, '2025-05-17 22:04:00', 'DELETE', '14', NULL),
(753, 'gyerekmenu', 16, '2025-05-17 22:04:00', 'DELETE', '14', NULL),
(754, 'gyerekmenu', 17, '2025-05-17 22:04:00', 'DELETE', '16', NULL),
(755, 'gyerekmenu', 19, '2025-05-17 22:04:00', 'DELETE', '13', NULL),
(756, 'gyerekmenu', 20, '2025-05-17 22:04:00', 'DELETE', '29', NULL),
(757, 'gyerekmenu', 21, '2025-05-17 22:04:00', 'DELETE', '15', NULL),
(758, 'gyerekmenu', 22, '2025-05-17 22:04:00', 'DELETE', '25', NULL),
(759, 'hetimenu', 41, '2025-05-17 22:04:00', 'DELETE', '24', NULL),
(760, 'hetimenu', 42, '2025-05-17 22:04:00', 'DELETE', '15', NULL),
(761, 'hetimenu', 43, '2025-05-17 22:04:00', 'DELETE', '29', NULL),
(762, 'hetimenu', 44, '2025-05-17 22:04:00', 'DELETE', '13', NULL),
(763, 'hetimenu', 48, '2025-05-17 22:04:00', 'DELETE', '25', NULL),
(764, 'hetimenu', 49, '2025-05-17 22:04:00', 'INSERT', NULL, '30'),
(765, 'hetimenu', 50, '2025-05-17 22:04:00', 'INSERT', NULL, '36'),
(766, 'hetimenu', 51, '2025-05-17 22:04:00', 'INSERT', NULL, '39'),
(767, 'hetimenu', 52, '2025-05-17 22:04:00', 'INSERT', NULL, '16'),
(768, 'hetimenu', 53, '2025-05-17 22:04:00', 'INSERT', NULL, '40'),
(769, 'hetimenu', 54, '2025-05-17 22:04:00', 'INSERT', NULL, '38'),
(770, 'hetimenu', 55, '2025-05-17 22:04:00', 'INSERT', NULL, '14'),
(771, 'gyerekmenu', 23, '2025-05-17 22:04:00', 'INSERT', NULL, '39'),
(772, 'gyerekmenu', 24, '2025-05-17 22:04:00', 'INSERT', NULL, '16'),
(773, 'gyerekmenu', 25, '2025-05-17 22:04:00', 'INSERT', NULL, '40'),
(774, 'gyerekmenu', 26, '2025-05-17 22:04:00', 'INSERT', NULL, '38'),
(775, 'gyerekmenu', 27, '2025-05-17 22:04:00', 'INSERT', NULL, '30'),
(776, 'gyerekmenu', 28, '2025-05-17 22:04:00', 'INSERT', NULL, '36'),
(777, 'gyerekmenu', 29, '2025-05-17 22:04:00', 'INSERT', NULL, '37'),
(778, 'hetimenu', 56, '2025-05-17 22:04:00', 'INSERT', NULL, '31'),
(779, 'gyerekmenu', 30, '2025-05-17 22:04:00', 'INSERT', NULL, '31'),
(780, 'hetimenu', 57, '2025-05-17 22:04:00', 'INSERT', NULL, '24'),
(781, 'hetimenu', 58, '2025-05-17 22:04:00', 'INSERT', NULL, '29'),
(782, 'hetimenu', 59, '2025-05-17 22:04:00', 'INSERT', NULL, '23'),
(783, 'hetimenu', 60, '2025-05-17 22:04:00', 'INSERT', NULL, '15'),
(784, 'hetimenu', 61, '2025-05-17 22:04:00', 'INSERT', NULL, '32'),
(785, 'hetimenu', 62, '2025-05-17 22:04:00', 'INSERT', NULL, '35'),
(786, 'hetimenu', 63, '2025-05-17 22:04:00', 'INSERT', NULL, '13'),
(787, 'gyerekmenu', 31, '2025-05-17 22:04:00', 'INSERT', NULL, '23'),
(788, 'gyerekmenu', 32, '2025-05-17 22:04:00', 'INSERT', NULL, '15'),
(789, 'gyerekmenu', 33, '2025-05-17 22:04:00', 'INSERT', NULL, '29'),
(790, 'gyerekmenu', 34, '2025-05-17 22:04:00', 'INSERT', NULL, '13'),
(791, 'gyerekmenu', 35, '2025-05-17 22:04:00', 'INSERT', NULL, '35'),
(792, 'gyerekmenu', 36, '2025-05-17 22:04:00', 'INSERT', NULL, '32'),
(793, 'hetimenu', 64, '2025-05-17 22:04:00', 'INSERT', NULL, '28'),
(794, 'hetimenu', 65, '2025-05-17 22:04:00', 'INSERT', NULL, '17'),
(795, 'hetimenu', 66, '2025-05-17 22:04:00', 'INSERT', NULL, '33'),
(796, 'hetimenu', 67, '2025-05-17 22:04:00', 'INSERT', NULL, '27'),
(797, 'gyerekmenu', 38, '2025-05-17 22:04:00', 'INSERT', NULL, '17'),
(798, 'gyerekmenu', 39, '2025-05-17 22:04:00', 'INSERT', NULL, '28'),
(799, 'gyerekmenu', 40, '2025-05-17 22:04:00', 'INSERT', NULL, '27'),
(800, 'gyerekmenu', 41, '2025-05-17 22:04:00', 'INSERT', NULL, '33'),
(801, 'hetimenu', 71, '2025-05-17 22:04:00', 'INSERT', NULL, '34'),
(802, 'hetimenu', 72, '2025-05-17 22:04:00', 'INSERT', NULL, '25'),
(803, 'gyerekmenu', 45, '2025-05-17 22:04:00', 'INSERT', NULL, '34'),
(804, 'gyerekmenu', 46, '2025-05-17 22:04:00', 'INSERT', NULL, '25'),
(805, 'receptek', 41, '2025-05-17 22:13:48', 'INSERT', NULL, 'Dubai csokis babka'),
(806, 'hozzavalok', 217, '2025-05-17 22:13:48', 'INSERT', NULL, 'tej (langyos)'),
(807, 'hozzavalok', 218, '2025-05-17 22:13:48', 'INSERT', NULL, 'instant élesztő (dr. oetker instant élesztő)'),
(808, 'hozzavalok', 219, '2025-05-17 22:13:48', 'INSERT', NULL, 'porcukor'),
(809, 'hozzavalok', 220, '2025-05-17 22:13:48', 'INSERT', NULL, 'só'),
(810, 'hozzavalok', 221, '2025-05-17 22:13:48', 'INSERT', NULL, 'finomliszt'),
(811, 'hozzavalok', 222, '2025-05-17 22:13:48', 'INSERT', NULL, 'tojás'),
(812, 'hozzavalok', 223, '2025-05-17 22:13:48', 'INSERT', NULL, 'vaj'),
(813, 'hozzavalok', 224, '2025-05-17 22:13:48', 'INSERT', NULL, 'pisztáciakrém'),
(814, 'hozzavalok', 225, '2025-05-17 22:13:48', 'INSERT', NULL, 'cérnametélt'),
(815, 'hozzavalok', 226, '2025-05-17 22:13:48', 'INSERT', NULL, 'tahini'),
(816, 'hozzavalok', 227, '2025-05-17 22:13:48', 'INSERT', NULL, 'vaj'),
(817, 'hozzavalok', 228, '2025-05-17 22:13:49', 'INSERT', NULL, 'étcsokoládé'),
(818, 'hozzavalok', 229, '2025-05-17 22:13:49', 'INSERT', NULL, 'habtejszín'),
(819, 'hozzavalok', 230, '2025-05-17 22:13:49', 'INSERT', NULL, 'pisztácia'),
(820, 'hozzavalok', 231, '2025-05-17 22:13:49', 'INSERT', NULL, 'vanillincukor'),
(821, 'receptetrend', 54, '2025-05-17 22:13:49', 'INSERT', NULL, '54'),
(822, 'receptek', 42, '2025-05-17 22:16:41', 'INSERT', NULL, 'Minibarhesz'),
(823, 'hozzavalok', 232, '2025-05-17 22:16:41', 'INSERT', NULL, 'finomliszt'),
(824, 'hozzavalok', 233, '2025-05-17 22:16:41', 'INSERT', NULL, 'tej'),
(825, 'hozzavalok', 234, '2025-05-17 22:16:42', 'INSERT', NULL, 'porcukor'),
(826, 'hozzavalok', 235, '2025-05-17 22:16:42', 'INSERT', NULL, 'vaj'),
(827, 'hozzavalok', 236, '2025-05-17 22:16:42', 'INSERT', NULL, 'tojás'),
(828, 'hozzavalok', 237, '2025-05-17 22:16:42', 'INSERT', NULL, 'instant élesztő'),
(829, 'hozzavalok', 238, '2025-05-17 22:16:42', 'INSERT', NULL, 'só'),
(830, 'hozzavalok', 239, '2025-05-17 22:16:42', 'INSERT', NULL, 'tojás(nagy)'),
(831, 'hozzavalok', 240, '2025-05-17 22:16:42', 'INSERT', NULL, 'szezámmag'),
(832, 'receptetrend', 55, '2025-05-17 22:16:42', 'INSERT', NULL, '55'),
(833, 'receptek', 43, '2025-05-17 22:22:24', 'INSERT', NULL, 'Céklakrémes dán nyitott szendvics'),
(834, 'hozzavalok', 241, '2025-05-17 22:22:25', 'INSERT', NULL, 'rozskenyér'),
(835, 'hozzavalok', 242, '2025-05-17 22:22:25', 'INSERT', NULL, 'margarin'),
(836, 'hozzavalok', 243, '2025-05-17 22:22:25', 'INSERT', NULL, 'tojás'),
(837, 'hozzavalok', 244, '2025-05-17 22:22:25', 'INSERT', NULL, 'ecetes cékla'),
(838, 'hozzavalok', 245, '2025-05-17 22:22:25', 'INSERT', NULL, 'kecskesajt'),
(839, 'hozzavalok', 246, '2025-05-17 22:22:25', 'INSERT', NULL, 'csírák'),
(840, 'hozzavalok', 247, '2025-05-17 22:22:25', 'INSERT', NULL, 'cékla'),
(841, 'hozzavalok', 248, '2025-05-17 22:22:25', 'INSERT', NULL, 'kecskesajt'),
(842, 'hozzavalok', 249, '2025-05-17 22:22:25', 'INSERT', NULL, 'kapor'),
(843, 'hozzavalok', 250, '2025-05-17 22:22:25', 'INSERT', NULL, 'római kömény'),
(844, 'hozzavalok', 251, '2025-05-17 22:22:25', 'INSERT', NULL, 'korieandermag'),
(845, 'hozzavalok', 252, '2025-05-17 22:22:25', 'INSERT', NULL, 'fokhagyma'),
(846, 'hozzavalok', 253, '2025-05-17 22:22:25', 'INSERT', NULL, 'só'),
(847, 'hozzavalok', 254, '2025-05-17 22:22:25', 'INSERT', NULL, 'bors'),
(848, 'hozzavalok', 255, '2025-05-17 22:22:26', 'INSERT', NULL, 'tejmentes margarin'),
(849, 'hozzavalok', 256, '2025-05-17 22:22:26', 'INSERT', NULL, 'víz'),
(850, 'receptetrend', 56, '2025-05-17 22:22:26', 'INSERT', NULL, '56'),
(851, 'receptek', 44, '2025-05-17 22:27:23', 'INSERT', NULL, 'Húsvéti sonkás burger'),
(852, 'hozzavalok', 257, '2025-05-17 22:27:23', 'INSERT', NULL, 'kalács'),
(853, 'hozzavalok', 258, '2025-05-17 22:27:23', 'INSERT', NULL, 'főtt sonka'),
(854, 'hozzavalok', 259, '2025-05-17 22:27:23', 'INSERT', NULL, 'tojás'),
(855, 'hozzavalok', 260, '2025-05-17 22:27:23', 'INSERT', NULL, 'majonéz'),
(856, 'hozzavalok', 261, '2025-05-17 22:27:23', 'INSERT', NULL, 'ecetes torma'),
(857, 'hozzavalok', 262, '2025-05-17 22:27:23', 'INSERT', NULL, 'újhagyma'),
(858, 'hozzavalok', 263, '2025-05-17 22:27:23', 'INSERT', NULL, 'csemegeuborka'),
(859, 'hozzavalok', 264, '2025-05-17 22:27:23', 'INSERT', NULL, 'só'),
(860, 'hozzavalok', 265, '2025-05-17 22:27:23', 'INSERT', NULL, 'bors'),
(861, 'hozzavalok', 266, '2025-05-17 22:27:23', 'INSERT', NULL, 'cheddar sajt'),
(862, 'hozzavalok', 267, '2025-05-17 22:27:23', 'INSERT', NULL, 'salátalevél'),
(863, 'hozzavalok', 268, '2025-05-17 22:27:23', 'INSERT', NULL, 'paradicsom'),
(864, 'hozzavalok', 269, '2025-05-17 22:27:23', 'INSERT', NULL, 'retek'),
(865, 'hozzavalok', 270, '2025-05-17 22:27:23', 'INSERT', NULL, 'almaecet'),
(866, 'hozzavalok', 271, '2025-05-17 22:27:24', 'INSERT', NULL, 'cukor'),
(867, 'hozzavalok', 272, '2025-05-17 22:27:24', 'INSERT', NULL, 'víz'),
(868, 'hozzavalok', 273, '2025-05-17 22:27:24', 'INSERT', NULL, 'lestyán'),
(869, 'receptetrend', 57, '2025-05-17 22:27:24', 'INSERT', NULL, '57'),
(870, 'receptetrend', 58, '2025-05-17 22:27:24', 'INSERT', NULL, '58'),
(871, 'receptetrend', 59, '2025-05-17 22:27:24', 'INSERT', NULL, '59'),
(872, 'receptetrend', 60, '2025-05-17 22:27:24', 'INSERT', NULL, '60'),
(873, 'receptetrend', 61, '2025-05-17 22:27:24', 'INSERT', NULL, '61'),
(874, 'receptek', 45, '2025-05-17 22:29:18', 'INSERT', NULL, 'Ropogós bagett'),
(875, 'hozzavalok', 274, '2025-05-17 22:29:18', 'INSERT', NULL, 'kenyérliszt bl80'),
(876, 'hozzavalok', 275, '2025-05-17 22:29:18', 'INSERT', NULL, 'víz'),
(877, 'hozzavalok', 276, '2025-05-17 22:29:18', 'INSERT', NULL, 'só'),
(878, 'hozzavalok', 277, '2025-05-17 22:29:18', 'INSERT', NULL, 'friss élesztő'),
(879, 'receptetrend', 62, '2025-05-17 22:29:18', 'INSERT', NULL, '62'),
(880, 'receptetrend', 63, '2025-05-17 22:29:18', 'INSERT', NULL, '63'),
(881, 'receptetrend', 64, '2025-05-17 22:29:18', 'INSERT', NULL, '64'),
(882, 'receptetrend', 65, '2025-05-17 22:29:18', 'INSERT', NULL, '65'),
(883, 'receptetrend', 66, '2025-05-17 22:29:18', 'INSERT', NULL, '66'),
(884, 'receptetrend', 67, '2025-05-17 22:29:18', 'INSERT', NULL, '67'),
(885, 'receptetrend', 68, '2025-05-17 22:29:18', 'INSERT', NULL, '68'),
(886, 'receptetrend', 69, '2025-05-17 22:29:18', 'INSERT', NULL, '69'),
(887, 'receptetrend', 70, '2025-05-17 22:29:18', 'INSERT', NULL, '70'),
(888, 'receptetrend', 71, '2025-05-17 22:29:19', 'INSERT', NULL, '71'),
(889, 'receptetrend', 72, '2025-05-17 22:29:19', 'INSERT', NULL, '72'),
(890, 'receptek', 46, '2025-05-17 22:33:03', 'INSERT', NULL, 'Virslis sültkrumpli-saláta'),
(891, 'hozzavalok', 278, '2025-05-17 22:33:04', 'INSERT', NULL, 'virsli'),
(892, 'hozzavalok', 279, '2025-05-17 22:33:04', 'INSERT', NULL, 'újkrumpli'),
(893, 'hozzavalok', 280, '2025-05-17 22:33:04', 'INSERT', NULL, 'lilahagyma'),
(894, 'hozzavalok', 281, '2025-05-17 22:33:04', 'INSERT', NULL, 'majonéz'),
(895, 'hozzavalok', 282, '2025-05-17 22:33:04', 'INSERT', NULL, 'kapribogyó'),
(896, 'hozzavalok', 283, '2025-05-17 22:33:04', 'INSERT', NULL, 'mustár'),
(897, 'hozzavalok', 284, '2025-05-17 22:33:04', 'INSERT', NULL, 'só'),
(898, 'hozzavalok', 285, '2025-05-17 22:33:04', 'INSERT', NULL, 'bors'),
(899, 'hozzavalok', 286, '2025-05-17 22:33:04', 'INSERT', NULL, 'snidling'),
(900, 'hozzavalok', 287, '2025-05-17 22:33:04', 'INSERT', NULL, 'petrezselyem'),
(901, 'hozzavalok', 288, '2025-05-17 22:33:04', 'INSERT', NULL, 'kapor'),
(902, 'hozzavalok', 289, '2025-05-17 22:33:04', 'INSERT', NULL, 'cimtromhéj'),
(903, 'hozzavalok', 290, '2025-05-17 22:33:04', 'INSERT', NULL, 'tojás'),
(904, 'receptetrend', 73, '2025-05-17 22:33:04', 'INSERT', NULL, '73'),
(905, 'receptetrend', 74, '2025-05-17 22:33:04', 'INSERT', NULL, '74'),
(906, 'receptek', 47, '2025-05-17 22:36:04', 'INSERT', NULL, 'Deluxe epres muffin'),
(907, 'hozzavalok', 291, '2025-05-17 22:36:05', 'INSERT', NULL, 'alma (savanykás)'),
(908, 'hozzavalok', 292, '2025-05-17 22:36:05', 'INSERT', NULL, 'citrom'),
(909, 'hozzavalok', 293, '2025-05-17 22:36:05', 'INSERT', NULL, 'víz'),
(910, 'hozzavalok', 294, '2025-05-17 22:36:05', 'INSERT', NULL, 'rum'),
(911, 'hozzavalok', 295, '2025-05-17 22:36:05', 'INSERT', NULL, 'cukor'),
(912, 'hozzavalok', 296, '2025-05-17 22:36:05', 'INSERT', NULL, 'fahéjrúd'),
(913, 'hozzavalok', 297, '2025-05-17 22:36:05', 'INSERT', NULL, 'szegfűszeg'),
(914, 'hozzavalok', 298, '2025-05-17 22:36:05', 'INSERT', NULL, 'szegfűbors (egész)'),
(915, 'hozzavalok', 299, '2025-05-17 22:36:05', 'INSERT', NULL, 'vanília'),
(916, 'receptetrend', 75, '2025-05-17 22:36:05', 'INSERT', NULL, '75'),
(917, 'receptetrend', 76, '2025-05-17 22:36:05', 'INSERT', NULL, '76'),
(918, 'receptetrend', 77, '2025-05-17 22:36:05', 'INSERT', NULL, '77'),
(919, 'receptetrend', 78, '2025-05-17 22:36:05', 'INSERT', NULL, '78'),
(920, 'receptetrend', 79, '2025-05-17 22:36:05', 'INSERT', NULL, '79'),
(921, 'ertekeles', 4, '2025-05-17 22:36:42', 'DELETE', '6', NULL),
(922, 'ertekeles', 6, '2025-05-17 22:36:46', 'DELETE', '3', NULL),
(923, 'ertekeles', 29, '2025-05-17 22:36:50', 'DELETE', '1', NULL),
(924, 'ertekeles', 33, '2025-05-17 22:36:53', 'DELETE', '4', NULL),
(925, 'receptetrend', 1, '2025-05-17 22:37:10', 'DELETE', '1', NULL),
(926, 'receptek', 1, '2025-05-17 22:37:24', 'DELETE', 'teszt', NULL),
(927, 'receptek', 3, '2025-05-17 22:37:27', 'DELETE', 'iSTEN', NULL),
(928, 'receptek', 41, '2025-05-17 22:37:35', 'UPDATE_ELFOGADOT', '0', '1'),
(929, 'receptek', 42, '2025-05-17 22:37:39', 'UPDATE_ELFOGADOT', '0', '1'),
(930, 'receptek', 43, '2025-05-17 22:37:41', 'UPDATE_ELFOGADOT', '0', '1'),
(931, 'receptek', 44, '2025-05-17 22:37:43', 'UPDATE_ELFOGADOT', '0', '1'),
(932, 'receptek', 45, '2025-05-17 22:37:45', 'UPDATE_ELFOGADOT', '0', '1'),
(933, 'receptek', 46, '2025-05-17 22:37:47', 'UPDATE_ELFOGADOT', '0', '1'),
(934, 'receptek', 47, '2025-05-17 22:37:51', 'UPDATE_ELFOGADOT', '0', '1'),
(935, 'receptek', 48, '2025-05-17 22:44:27', 'INSERT', NULL, 'Vegán melegszendvics'),
(936, 'hozzavalok', 300, '2025-05-17 22:44:27', 'INSERT', NULL, 'kenyér'),
(937, 'hozzavalok', 301, '2025-05-17 22:44:27', 'INSERT', NULL, 'burgonya'),
(938, 'hozzavalok', 302, '2025-05-17 22:44:27', 'INSERT', NULL, 'édesburgonya'),
(939, 'hozzavalok', 303, '2025-05-17 22:44:27', 'INSERT', NULL, 'kesudió'),
(940, 'hozzavalok', 304, '2025-05-17 22:44:27', 'INSERT', NULL, 'fokhagyma'),
(941, 'hozzavalok', 305, '2025-05-17 22:44:27', 'INSERT', NULL, 'olívaolaj'),
(942, 'hozzavalok', 306, '2025-05-17 22:44:27', 'INSERT', NULL, 'víz (főzővíz)'),
(943, 'hozzavalok', 307, '2025-05-17 22:44:27', 'INSERT', NULL, 'élesztőpehely'),
(944, 'hozzavalok', 308, '2025-05-17 22:44:27', 'INSERT', NULL, 'só'),
(945, 'hozzavalok', 309, '2025-05-17 22:44:27', 'INSERT', NULL, 'füstölt pirospaprika'),
(946, 'hozzavalok', 310, '2025-05-17 22:44:27', 'INSERT', NULL, 'csiperkegomba (200 g fehér, 200 g barna)'),
(947, 'hozzavalok', 311, '2025-05-17 22:44:27', 'INSERT', NULL, 'fokhagyma'),
(948, 'hozzavalok', 312, '2025-05-17 22:44:27', 'INSERT', NULL, 'citrom'),
(949, 'hozzavalok', 313, '2025-05-17 22:44:27', 'INSERT', NULL, 'olívaolaj'),
(950, 'hozzavalok', 314, '2025-05-17 22:44:28', 'INSERT', NULL, 'só'),
(951, 'hozzavalok', 315, '2025-05-17 22:44:28', 'INSERT', NULL, 'bors'),
(952, 'hozzavalok', 316, '2025-05-17 22:44:28', 'INSERT', NULL, 'fehérbab (konzerv)'),
(953, 'hozzavalok', 317, '2025-05-17 22:44:28', 'INSERT', NULL, 'sűrített paradicsom'),
(954, 'receptetrend', 80, '2025-05-17 22:44:28', 'INSERT', NULL, '80'),
(955, 'receptetrend', 81, '2025-05-17 22:44:28', 'INSERT', NULL, '81'),
(956, 'receptek', 49, '2025-05-17 22:47:56', 'INSERT', NULL, 'Parmezános ropogós keksz'),
(957, 'hozzavalok', 318, '2025-05-17 22:47:57', 'INSERT', NULL, 'zabpehely'),
(958, 'hozzavalok', 319, '2025-05-17 22:47:57', 'INSERT', NULL, 'finomliszt'),
(959, 'hozzavalok', 320, '2025-05-17 22:47:57', 'INSERT', NULL, 'vaj'),
(960, 'hozzavalok', 321, '2025-05-17 22:47:57', 'INSERT', NULL, 'tojás'),
(961, 'hozzavalok', 322, '2025-05-17 22:47:57', 'INSERT', NULL, 'napraforgómag'),
(962, 'hozzavalok', 323, '2025-05-17 22:47:57', 'INSERT', NULL, 'parmezán sajt'),
(963, 'hozzavalok', 324, '2025-05-17 22:47:57', 'INSERT', NULL, 'szezámmag'),
(964, 'receptetrend', 82, '2025-05-17 22:47:57', 'INSERT', NULL, '82'),
(965, 'receptetrend', 83, '2025-05-17 22:47:57', 'INSERT', NULL, '83'),
(966, 'receptetrend', 84, '2025-05-17 22:47:57', 'INSERT', NULL, '84'),
(967, 'receptek', 50, '2025-05-17 22:52:07', 'INSERT', NULL, 'Retró sajtos tallér'),
(968, 'hozzavalok', 325, '2025-05-17 22:52:07', 'INSERT', NULL, 'finomliszt'),
(969, 'hozzavalok', 326, '2025-05-17 22:52:07', 'INSERT', NULL, 'szódabikarbóna'),
(970, 'hozzavalok', 327, '2025-05-17 22:52:07', 'INSERT', NULL, 'sajt'),
(971, 'hozzavalok', 328, '2025-05-17 22:52:07', 'INSERT', NULL, 'vaj'),
(972, 'hozzavalok', 329, '2025-05-17 22:52:07', 'INSERT', NULL, 'tojás'),
(973, 'hozzavalok', 330, '2025-05-17 22:52:07', 'INSERT', NULL, 'tejföl'),
(974, 'hozzavalok', 331, '2025-05-17 22:52:07', 'INSERT', NULL, 'napraforgó olaj'),
(975, 'hozzavalok', 332, '2025-05-17 22:52:07', 'INSERT', NULL, 'só'),
(976, 'hozzavalok', 333, '2025-05-17 22:52:07', 'INSERT', NULL, 'bors'),
(977, 'hozzavalok', 334, '2025-05-17 22:52:08', 'INSERT', NULL, 'őrölt fűszerkömény'),
(978, 'hozzavalok', 335, '2025-05-17 22:52:08', 'INSERT', NULL, 'füstölt pirospaprika'),
(979, 'receptetrend', 85, '2025-05-17 22:52:08', 'INSERT', NULL, '85'),
(980, 'receptetrend', 86, '2025-05-17 22:52:08', 'INSERT', NULL, '86'),
(981, 'receptetrend', 87, '2025-05-17 22:52:08', 'INSERT', NULL, '87'),
(982, 'receptek', 48, '2025-05-17 22:52:17', 'UPDATE_ELFOGADOT', '0', '1'),
(983, 'receptek', 49, '2025-05-17 22:52:19', 'UPDATE_ELFOGADOT', '0', '1'),
(984, 'receptek', 50, '2025-05-17 22:52:21', 'UPDATE_ELFOGADOT', '0', '1'),
(985, 'receptek', 51, '2025-05-17 22:56:45', 'INSERT', NULL, 'Borsos tokány'),
(986, 'hozzavalok', 336, '2025-05-17 22:56:46', 'INSERT', NULL, 'sertéscomb'),
(987, 'hozzavalok', 337, '2025-05-17 22:56:46', 'INSERT', NULL, 'kolozsvári szalonna'),
(988, 'hozzavalok', 338, '2025-05-17 22:56:46', 'INSERT', NULL, 'libazsír'),
(989, 'hozzavalok', 339, '2025-05-17 22:56:46', 'INSERT', NULL, 'vöröshagyma'),
(990, 'hozzavalok', 340, '2025-05-17 22:56:46', 'INSERT', NULL, 'fokhagyma'),
(991, 'hozzavalok', 341, '2025-05-17 22:56:46', 'INSERT', NULL, 'paradicsom'),
(992, 'hozzavalok', 342, '2025-05-17 22:56:46', 'INSERT', NULL, 'tv-paprika'),
(993, 'hozzavalok', 343, '2025-05-17 22:56:46', 'INSERT', NULL, 'só'),
(994, 'hozzavalok', 344, '2025-05-17 22:56:46', 'INSERT', NULL, 'bors'),
(995, 'hozzavalok', 345, '2025-05-17 22:56:46', 'INSERT', NULL, 'alaplé'),
(996, 'receptetrend', 88, '2025-05-17 22:56:46', 'INSERT', NULL, '88'),
(997, 'receptetrend', 89, '2025-05-17 22:56:47', 'INSERT', NULL, '89'),
(998, 'receptetrend', 90, '2025-05-17 22:56:47', 'INSERT', NULL, '90'),
(999, 'receptetrend', 91, '2025-05-17 22:56:47', 'INSERT', NULL, '91'),
(1000, 'receptetrend', 92, '2025-05-17 22:56:47', 'INSERT', NULL, '92'),
(1001, 'receptetrend', 93, '2025-05-17 22:56:47', 'INSERT', NULL, '93'),
(1002, 'receptetrend', 94, '2025-05-17 22:56:47', 'INSERT', NULL, '94'),
(1003, 'receptek', 52, '2025-05-17 22:59:33', 'INSERT', NULL, 'Egyszerű tojásfasírt'),
(1004, 'hozzavalok', 346, '2025-05-17 22:59:33', 'INSERT', NULL, 'tojás'),
(1005, 'hozzavalok', 347, '2025-05-17 22:59:33', 'INSERT', NULL, 'zsemle'),
(1006, 'hozzavalok', 348, '2025-05-17 22:59:33', 'INSERT', NULL, 'tej'),
(1007, 'hozzavalok', 349, '2025-05-17 22:59:33', 'INSERT', NULL, 'vöröshagyma'),
(1008, 'hozzavalok', 350, '2025-05-17 22:59:33', 'INSERT', NULL, 'fokhagyma'),
(1009, 'hozzavalok', 351, '2025-05-17 22:59:33', 'INSERT', NULL, 'napraforgó olaj'),
(1010, 'hozzavalok', 352, '2025-05-17 22:59:33', 'INSERT', NULL, 'petrezselyem'),
(1011, 'hozzavalok', 353, '2025-05-17 22:59:33', 'INSERT', NULL, 'kapor'),
(1012, 'hozzavalok', 354, '2025-05-17 22:59:33', 'INSERT', NULL, 'metélőhagyma'),
(1013, 'hozzavalok', 355, '2025-05-17 22:59:34', 'INSERT', NULL, 'zsemlemorzsa'),
(1014, 'hozzavalok', 356, '2025-05-17 22:59:34', 'INSERT', NULL, 'só'),
(1015, 'hozzavalok', 357, '2025-05-17 22:59:34', 'INSERT', NULL, 'bors'),
(1016, 'hozzavalok', 358, '2025-05-17 22:59:34', 'INSERT', NULL, 'napraforgó olaj'),
(1017, 'receptetrend', 95, '2025-05-17 22:59:34', 'INSERT', NULL, '95'),
(1018, 'receptek', 53, '2025-05-17 23:03:42', 'INSERT', NULL, 'Paprikás újburgonya'),
(1019, 'hozzavalok', 359, '2025-05-17 23:03:42', 'INSERT', NULL, 'napraforgó olaj'),
(1020, 'hozzavalok', 360, '2025-05-17 23:03:42', 'INSERT', NULL, 'vöröshagyma'),
(1021, 'hozzavalok', 361, '2025-05-17 23:03:42', 'INSERT', NULL, 'fokhagyma'),
(1022, 'hozzavalok', 362, '2025-05-17 23:03:43', 'INSERT', NULL, 'kápia paprika'),
(1023, 'hozzavalok', 363, '2025-05-17 23:03:43', 'INSERT', NULL, 'paradicsom'),
(1024, 'hozzavalok', 364, '2025-05-17 23:03:43', 'INSERT', NULL, 'sűrített paradicsom'),
(1025, 'hozzavalok', 365, '2025-05-17 23:03:43', 'INSERT', NULL, 'őrölt fűszerkömény'),
(1026, 'hozzavalok', 366, '2025-05-17 23:03:43', 'INSERT', NULL, 'füstölt pirospaprika'),
(1027, 'hozzavalok', 367, '2025-05-17 23:03:43', 'INSERT', NULL, 'fűszerpaprika'),
(1028, 'hozzavalok', 368, '2025-05-17 23:03:43', 'INSERT', NULL, 'só'),
(1029, 'hozzavalok', 369, '2025-05-17 23:03:43', 'INSERT', NULL, 'bors'),
(1030, 'hozzavalok', 370, '2025-05-17 23:03:43', 'INSERT', NULL, 'víz'),
(1031, 'hozzavalok', 371, '2025-05-17 23:03:43', 'INSERT', NULL, 'újkrumpli'),
(1032, 'receptetrend', 96, '2025-05-17 23:03:43', 'INSERT', NULL, '96'),
(1033, 'receptek', 54, '2025-05-17 23:06:47', 'INSERT', NULL, 'Sonkaléleves medvehagymás maceszgombóccal'),
(1034, 'hozzavalok', 372, '2025-05-17 23:06:47', 'INSERT', NULL, 'macesz'),
(1035, 'hozzavalok', 373, '2025-05-17 23:06:47', 'INSERT', NULL, 'tojás'),
(1036, 'hozzavalok', 374, '2025-05-17 23:06:47', 'INSERT', NULL, 'olívaolaj'),
(1037, 'hozzavalok', 375, '2025-05-17 23:06:47', 'INSERT', NULL, 'szódavíz'),
(1038, 'hozzavalok', 376, '2025-05-17 23:06:47', 'INSERT', NULL, 'medvehagyma'),
(1039, 'hozzavalok', 377, '2025-05-17 23:06:47', 'INSERT', NULL, 'só'),
(1040, 'hozzavalok', 378, '2025-05-17 23:06:47', 'INSERT', NULL, 'bors'),
(1041, 'hozzavalok', 379, '2025-05-17 23:06:47', 'INSERT', NULL, 'sonkalé'),
(1042, 'hozzavalok', 380, '2025-05-17 23:06:47', 'INSERT', NULL, 'sárgarépa'),
(1043, 'hozzavalok', 381, '2025-05-17 23:06:47', 'INSERT', NULL, 'fehérrépa'),
(1044, 'hozzavalok', 382, '2025-05-17 23:06:47', 'INSERT', NULL, 'karalábé'),
(1045, 'hozzavalok', 383, '2025-05-17 23:06:47', 'INSERT', NULL, 'vöröshagyma'),
(1046, 'hozzavalok', 384, '2025-05-17 23:06:48', 'INSERT', NULL, 'bors (egész)'),
(1047, 'hozzavalok', 385, '2025-05-17 23:06:48', 'INSERT', NULL, 'só'),
(1048, 'receptetrend', 97, '2025-05-17 23:06:48', 'INSERT', NULL, '97'),
(1049, 'receptetrend', 98, '2025-05-17 23:06:48', 'INSERT', NULL, '98'),
(1050, 'receptetrend', 99, '2025-05-17 23:06:48', 'INSERT', NULL, '99'),
(1051, 'receptetrend', 100, '2025-05-17 23:06:48', 'INSERT', NULL, '100'),
(1052, 'receptetrend', 101, '2025-05-17 23:06:48', 'INSERT', NULL, '101'),
(1053, 'receptetrend', 102, '2025-05-17 23:06:48', 'INSERT', NULL, '102'),
(1054, 'receptetrend', 103, '2025-05-17 23:06:48', 'INSERT', NULL, '103'),
(1055, 'receptek', 55, '2025-05-17 23:09:45', 'INSERT', NULL, 'Sonkás rántott palacsinta'),
(1056, 'hozzavalok', 386, '2025-05-17 23:09:45', 'INSERT', NULL, 'finomliszt'),
(1057, 'hozzavalok', 387, '2025-05-17 23:09:45', 'INSERT', NULL, 'tojás'),
(1058, 'hozzavalok', 388, '2025-05-17 23:09:45', 'INSERT', NULL, 'zsemlemorzsa'),
(1059, 'hozzavalok', 389, '2025-05-17 23:09:45', 'INSERT', NULL, 'napraforgó olaj'),
(1060, 'hozzavalok', 390, '2025-05-17 23:09:45', 'INSERT', NULL, 'főtt sonka'),
(1061, 'hozzavalok', 391, '2025-05-17 23:09:45', 'INSERT', NULL, 'tejföl'),
(1062, 'hozzavalok', 392, '2025-05-17 23:09:46', 'INSERT', NULL, 'só'),
(1063, 'hozzavalok', 393, '2025-05-17 23:09:46', 'INSERT', NULL, 'bors'),
(1064, 'hozzavalok', 394, '2025-05-17 23:09:46', 'INSERT', NULL, 'finomliszt'),
(1065, 'hozzavalok', 395, '2025-05-17 23:09:46', 'INSERT', NULL, 'tojás'),
(1066, 'hozzavalok', 396, '2025-05-17 23:09:46', 'INSERT', NULL, 'tej'),
(1067, 'hozzavalok', 397, '2025-05-17 23:09:46', 'INSERT', NULL, 'szódavíz'),
(1068, 'hozzavalok', 398, '2025-05-17 23:09:46', 'INSERT', NULL, 'só'),
(1069, 'hozzavalok', 399, '2025-05-17 23:09:46', 'INSERT', NULL, 'napraforgó olaj'),
(1070, 'receptetrend', 104, '2025-05-17 23:09:46', 'INSERT', NULL, '104'),
(1071, 'receptetrend', 105, '2025-05-17 23:09:46', 'INSERT', NULL, '105'),
(1072, 'receptetrend', 106, '2025-05-17 23:09:46', 'INSERT', NULL, '106'),
(1073, 'receptek', 56, '2025-05-17 23:12:00', 'INSERT', NULL, 'Zsidótojás'),
(1074, 'hozzavalok', 400, '2025-05-17 23:12:00', 'INSERT', NULL, 'libazsír'),
(1075, 'hozzavalok', 401, '2025-05-17 23:12:00', 'INSERT', NULL, 'fehér hagyma'),
(1076, 'hozzavalok', 402, '2025-05-17 23:12:00', 'INSERT', NULL, 'csirkemáj (vagy libamáj, ha megengedhetjük)'),
(1077, 'hozzavalok', 403, '2025-05-17 23:12:00', 'INSERT', NULL, 'só'),
(1078, 'hozzavalok', 404, '2025-05-17 23:12:00', 'INSERT', NULL, 'bors'),
(1079, 'hozzavalok', 405, '2025-05-17 23:12:00', 'INSERT', NULL, 'tojás'),
(1080, 'hozzavalok', 406, '2025-05-17 23:12:00', 'INSERT', NULL, 'mustár'),
(1081, 'hozzavalok', 407, '2025-05-17 23:12:00', 'INSERT', NULL, 'füstölt pirospaprika'),
(1082, 'receptetrend', 107, '2025-05-17 23:12:00', 'INSERT', NULL, '107'),
(1083, 'receptek', 51, '2025-05-17 23:12:36', 'UPDATE_ELFOGADOT', '0', '1'),
(1084, 'receptek', 52, '2025-05-17 23:12:38', 'UPDATE_ELFOGADOT', '0', '1'),
(1085, 'receptek', 53, '2025-05-17 23:12:40', 'UPDATE_ELFOGADOT', '0', '1'),
(1086, 'receptek', 54, '2025-05-17 23:12:42', 'UPDATE_ELFOGADOT', '0', '1'),
(1087, 'receptek', 55, '2025-05-17 23:12:45', 'UPDATE_ELFOGADOT', '0', '1'),
(1088, 'receptek', 56, '2025-05-17 23:12:47', 'UPDATE_ELFOGADOT', '0', '1'),
(1089, 'gyerekmenu', 23, '2025-05-17 23:14:00', 'DELETE', '39', NULL),
(1090, 'gyerekmenu', 24, '2025-05-17 23:14:00', 'DELETE', '16', NULL),
(1091, 'gyerekmenu', 25, '2025-05-17 23:14:00', 'DELETE', '40', NULL),
(1092, 'gyerekmenu', 26, '2025-05-17 23:14:00', 'DELETE', '38', NULL),
(1093, 'gyerekmenu', 27, '2025-05-17 23:14:00', 'DELETE', '30', NULL),
(1094, 'gyerekmenu', 28, '2025-05-17 23:14:00', 'DELETE', '36', NULL),
(1095, 'gyerekmenu', 29, '2025-05-17 23:14:00', 'DELETE', '37', NULL),
(1096, 'gyerekmenu', 30, '2025-05-17 23:14:00', 'DELETE', '31', NULL),
(1097, 'gyerekmenu', 31, '2025-05-17 23:14:00', 'DELETE', '23', NULL),
(1098, 'gyerekmenu', 32, '2025-05-17 23:14:00', 'DELETE', '15', NULL),
(1099, 'gyerekmenu', 33, '2025-05-17 23:14:00', 'DELETE', '29', NULL),
(1100, 'gyerekmenu', 34, '2025-05-17 23:14:00', 'DELETE', '13', NULL),
(1101, 'gyerekmenu', 35, '2025-05-17 23:14:00', 'DELETE', '35', NULL),
(1102, 'gyerekmenu', 36, '2025-05-17 23:14:00', 'DELETE', '32', NULL),
(1103, 'gyerekmenu', 38, '2025-05-17 23:14:00', 'DELETE', '17', NULL),
(1104, 'gyerekmenu', 39, '2025-05-17 23:14:00', 'DELETE', '28', NULL),
(1105, 'gyerekmenu', 40, '2025-05-17 23:14:00', 'DELETE', '27', NULL),
(1106, 'gyerekmenu', 41, '2025-05-17 23:14:00', 'DELETE', '33', NULL),
(1107, 'gyerekmenu', 45, '2025-05-17 23:14:00', 'DELETE', '34', NULL),
(1108, 'gyerekmenu', 46, '2025-05-17 23:14:00', 'DELETE', '25', NULL),
(1109, 'gyerekmenu', 47, '2025-05-17 23:14:00', 'INSERT', NULL, '30'),
(1110, 'gyerekmenu', 48, '2025-05-17 23:14:00', 'INSERT', NULL, '14'),
(1111, 'gyerekmenu', 49, '2025-05-17 23:14:00', 'INSERT', NULL, '36'),
(1112, 'gyerekmenu', 50, '2025-05-17 23:14:00', 'INSERT', NULL, '38'),
(1113, 'gyerekmenu', 51, '2025-05-17 23:14:00', 'INSERT', NULL, '40'),
(1114, 'gyerekmenu', 52, '2025-05-17 23:14:00', 'INSERT', NULL, '39'),
(1115, 'gyerekmenu', 53, '2025-05-17 23:14:00', 'INSERT', NULL, '16'),
(1116, 'gyerekmenu', 54, '2025-05-17 23:14:00', 'INSERT', NULL, '41'),
(1117, 'gyerekmenu', 55, '2025-05-17 23:14:00', 'INSERT', NULL, '47'),
(1118, 'gyerekmenu', 56, '2025-05-17 23:14:00', 'INSERT', NULL, '44'),
(1119, 'gyerekmenu', 57, '2025-05-17 23:14:00', 'INSERT', NULL, '43'),
(1120, 'gyerekmenu', 58, '2025-05-17 23:14:00', 'INSERT', NULL, '31'),
(1121, 'gyerekmenu', 59, '2025-05-17 23:14:00', 'INSERT', NULL, '45'),
(1122, 'gyerekmenu', 60, '2025-05-17 23:14:00', 'INSERT', NULL, '46'),
(1123, 'gyerekmenu', 61, '2025-05-17 23:14:00', 'INSERT', NULL, '13'),
(1124, 'gyerekmenu', 62, '2025-05-17 23:14:00', 'INSERT', NULL, '15'),
(1125, 'gyerekmenu', 63, '2025-05-17 23:14:00', 'INSERT', NULL, '32'),
(1126, 'gyerekmenu', 64, '2025-05-17 23:14:00', 'INSERT', NULL, '35'),
(1127, 'gyerekmenu', 65, '2025-05-17 23:14:00', 'INSERT', NULL, '23'),
(1128, 'gyerekmenu', 66, '2025-05-17 23:14:00', 'INSERT', NULL, '29'),
(1129, 'gyerekmenu', 68, '2025-05-17 23:14:00', 'INSERT', NULL, '27'),
(1130, 'gyerekmenu', 69, '2025-05-17 23:14:00', 'INSERT', NULL, '28'),
(1131, 'gyerekmenu', 70, '2025-05-17 23:14:00', 'INSERT', NULL, '49'),
(1132, 'gyerekmenu', 71, '2025-05-17 23:14:00', 'INSERT', NULL, '17'),
(1133, 'gyerekmenu', 72, '2025-05-17 23:14:00', 'INSERT', NULL, '48'),
(1134, 'gyerekmenu', 73, '2025-05-17 23:14:00', 'INSERT', NULL, '33'),
(1135, 'gyerekmenu', 74, '2025-05-17 23:14:00', 'INSERT', NULL, '50'),
(1136, 'gyerekmenu', 75, '2025-05-17 23:14:00', 'INSERT', NULL, '54'),
(1137, 'gyerekmenu', 76, '2025-05-17 23:14:00', 'INSERT', NULL, '25'),
(1138, 'gyerekmenu', 77, '2025-05-17 23:14:00', 'INSERT', NULL, '52'),
(1139, 'gyerekmenu', 78, '2025-05-17 23:14:00', 'INSERT', NULL, '55'),
(1140, 'gyerekmenu', 79, '2025-05-17 23:14:00', 'INSERT', NULL, '53'),
(1141, 'gyerekmenu', 80, '2025-05-17 23:14:00', 'INSERT', NULL, '51'),
(1142, 'gyerekmenu', 81, '2025-05-17 23:14:00', 'INSERT', NULL, '34'),
(1143, 'hetimenu', 49, '2025-05-17 23:15:00', 'DELETE', '30', NULL),
(1144, 'hetimenu', 50, '2025-05-17 23:15:00', 'DELETE', '36', NULL),
(1145, 'hetimenu', 51, '2025-05-17 23:15:00', 'DELETE', '39', NULL),
(1146, 'gyerekmenu', 47, '2025-05-17 23:15:00', 'DELETE', '30', NULL),
(1147, 'gyerekmenu', 48, '2025-05-17 23:15:00', 'DELETE', '14', NULL),
(1148, 'gyerekmenu', 49, '2025-05-17 23:15:00', 'DELETE', '36', NULL),
(1149, 'gyerekmenu', 50, '2025-05-17 23:15:00', 'DELETE', '38', NULL),
(1150, 'gyerekmenu', 51, '2025-05-17 23:15:00', 'DELETE', '40', NULL),
(1151, 'gyerekmenu', 52, '2025-05-17 23:15:00', 'DELETE', '39', NULL),
(1152, 'gyerekmenu', 53, '2025-05-17 23:15:00', 'DELETE', '16', NULL),
(1153, 'gyerekmenu', 54, '2025-05-17 23:15:00', 'DELETE', '41', NULL),
(1154, 'gyerekmenu', 55, '2025-05-17 23:15:00', 'DELETE', '47', NULL),
(1155, 'gyerekmenu', 56, '2025-05-17 23:15:00', 'DELETE', '44', NULL),
(1156, 'hetimenu', 52, '2025-05-17 23:15:00', 'DELETE', '16', NULL),
(1157, 'gyerekmenu', 57, '2025-05-17 23:15:00', 'DELETE', '43', NULL),
(1158, 'gyerekmenu', 58, '2025-05-17 23:15:00', 'DELETE', '31', NULL),
(1159, 'hetimenu', 53, '2025-05-17 23:15:00', 'DELETE', '40', NULL),
(1160, 'gyerekmenu', 59, '2025-05-17 23:15:00', 'DELETE', '45', NULL),
(1161, 'hetimenu', 54, '2025-05-17 23:15:00', 'DELETE', '38', NULL),
(1162, 'gyerekmenu', 60, '2025-05-17 23:15:00', 'DELETE', '46', NULL),
(1163, 'hetimenu', 55, '2025-05-17 23:15:00', 'DELETE', '14', NULL),
(1164, 'gyerekmenu', 61, '2025-05-17 23:15:00', 'DELETE', '13', NULL),
(1165, 'hetimenu', 56, '2025-05-17 23:15:00', 'DELETE', '31', NULL),
(1166, 'hetimenu', 57, '2025-05-17 23:15:00', 'DELETE', '24', NULL),
(1167, 'gyerekmenu', 62, '2025-05-17 23:15:00', 'DELETE', '15', NULL),
(1168, 'hetimenu', 58, '2025-05-17 23:15:00', 'DELETE', '29', NULL),
(1169, 'hetimenu', 59, '2025-05-17 23:15:00', 'DELETE', '23', NULL),
(1170, 'gyerekmenu', 63, '2025-05-17 23:15:00', 'DELETE', '32', NULL),
(1171, 'hetimenu', 60, '2025-05-17 23:15:00', 'DELETE', '15', NULL),
(1172, 'gyerekmenu', 64, '2025-05-17 23:15:00', 'DELETE', '35', NULL),
(1173, 'hetimenu', 61, '2025-05-17 23:15:00', 'DELETE', '32', NULL),
(1174, 'gyerekmenu', 65, '2025-05-17 23:15:00', 'DELETE', '23', NULL),
(1175, 'hetimenu', 62, '2025-05-17 23:15:00', 'DELETE', '35', NULL),
(1176, 'gyerekmenu', 66, '2025-05-17 23:15:00', 'DELETE', '29', NULL),
(1177, 'hetimenu', 63, '2025-05-17 23:15:00', 'DELETE', '13', NULL),
(1178, 'gyerekmenu', 68, '2025-05-17 23:15:00', 'DELETE', '27', NULL),
(1179, 'hetimenu', 64, '2025-05-17 23:15:00', 'DELETE', '28', NULL),
(1180, 'gyerekmenu', 69, '2025-05-17 23:15:00', 'DELETE', '28', NULL),
(1181, 'hetimenu', 65, '2025-05-17 23:15:00', 'DELETE', '17', NULL),
(1182, 'gyerekmenu', 70, '2025-05-17 23:15:00', 'DELETE', '49', NULL),
(1183, 'hetimenu', 66, '2025-05-17 23:15:00', 'DELETE', '33', NULL),
(1184, 'gyerekmenu', 71, '2025-05-17 23:15:00', 'DELETE', '17', NULL),
(1185, 'hetimenu', 67, '2025-05-17 23:15:00', 'DELETE', '27', NULL),
(1186, 'gyerekmenu', 72, '2025-05-17 23:15:00', 'DELETE', '48', NULL),
(1187, 'hetimenu', 71, '2025-05-17 23:15:00', 'DELETE', '34', NULL),
(1188, 'gyerekmenu', 73, '2025-05-17 23:15:00', 'DELETE', '33', NULL),
(1189, 'hetimenu', 72, '2025-05-17 23:15:00', 'DELETE', '25', NULL),
(1190, 'gyerekmenu', 74, '2025-05-17 23:15:00', 'DELETE', '50', NULL),
(1191, 'gyerekmenu', 75, '2025-05-17 23:15:00', 'DELETE', '54', NULL),
(1192, 'gyerekmenu', 76, '2025-05-17 23:15:00', 'DELETE', '25', NULL),
(1193, 'gyerekmenu', 77, '2025-05-17 23:15:00', 'DELETE', '52', NULL),
(1194, 'gyerekmenu', 78, '2025-05-17 23:15:00', 'DELETE', '55', NULL),
(1195, 'gyerekmenu', 79, '2025-05-17 23:15:00', 'DELETE', '53', NULL),
(1196, 'gyerekmenu', 80, '2025-05-17 23:15:00', 'DELETE', '51', NULL),
(1197, 'gyerekmenu', 81, '2025-05-17 23:15:00', 'DELETE', '34', NULL),
(1198, 'gyerekmenu', 82, '2025-05-17 23:15:00', 'INSERT', NULL, '16'),
(1199, 'gyerekmenu', 83, '2025-05-17 23:15:00', 'INSERT', NULL, '40'),
(1200, 'gyerekmenu', 84, '2025-05-17 23:15:00', 'INSERT', NULL, '38'),
(1201, 'gyerekmenu', 85, '2025-05-17 23:15:00', 'INSERT', NULL, '39'),
(1202, 'gyerekmenu', 86, '2025-05-17 23:15:00', 'INSERT', NULL, '30'),
(1203, 'gyerekmenu', 87, '2025-05-17 23:15:00', 'INSERT', NULL, '37'),
(1204, 'gyerekmenu', 88, '2025-05-17 23:15:00', 'INSERT', NULL, '14'),
(1205, 'hetimenu', 73, '2025-05-17 23:15:00', 'INSERT', NULL, '16'),
(1206, 'hetimenu', 74, '2025-05-17 23:15:00', 'INSERT', NULL, '38'),
(1207, 'hetimenu', 75, '2025-05-17 23:15:00', 'INSERT', NULL, '36'),
(1208, 'hetimenu', 76, '2025-05-17 23:15:00', 'INSERT', NULL, '39'),
(1209, 'hetimenu', 77, '2025-05-17 23:15:00', 'INSERT', NULL, '14'),
(1210, 'hetimenu', 78, '2025-05-17 23:15:00', 'INSERT', NULL, '37'),
(1211, 'hetimenu', 79, '2025-05-17 23:15:00', 'INSERT', NULL, '40'),
(1212, 'gyerekmenu', 89, '2025-05-17 23:15:00', 'INSERT', NULL, '43'),
(1213, 'gyerekmenu', 90, '2025-05-17 23:15:00', 'INSERT', NULL, '42'),
(1214, 'gyerekmenu', 91, '2025-05-17 23:15:00', 'INSERT', NULL, '47'),
(1215, 'gyerekmenu', 92, '2025-05-17 23:15:00', 'INSERT', NULL, '46'),
(1216, 'gyerekmenu', 93, '2025-05-17 23:15:00', 'INSERT', NULL, '44'),
(1217, 'gyerekmenu', 94, '2025-05-17 23:15:00', 'INSERT', NULL, '45'),
(1218, 'gyerekmenu', 95, '2025-05-17 23:15:00', 'INSERT', NULL, '31'),
(1219, 'hetimenu', 80, '2025-05-17 23:15:00', 'INSERT', NULL, '31'),
(1220, 'hetimenu', 81, '2025-05-17 23:15:00', 'INSERT', NULL, '47'),
(1221, 'hetimenu', 82, '2025-05-17 23:15:00', 'INSERT', NULL, '43'),
(1222, 'hetimenu', 83, '2025-05-17 23:15:00', 'INSERT', NULL, '42'),
(1223, 'hetimenu', 84, '2025-05-17 23:15:00', 'INSERT', NULL, '44'),
(1224, 'hetimenu', 85, '2025-05-17 23:15:00', 'INSERT', NULL, '45'),
(1225, 'hetimenu', 86, '2025-05-17 23:15:00', 'INSERT', NULL, '46'),
(1226, 'gyerekmenu', 96, '2025-05-17 23:15:00', 'INSERT', NULL, '23'),
(1227, 'gyerekmenu', 97, '2025-05-17 23:15:00', 'INSERT', NULL, '35'),
(1228, 'gyerekmenu', 98, '2025-05-17 23:15:00', 'INSERT', NULL, '15'),
(1229, 'gyerekmenu', 99, '2025-05-17 23:15:00', 'INSERT', NULL, '13'),
(1230, 'gyerekmenu', 100, '2025-05-17 23:15:00', 'INSERT', NULL, '32'),
(1231, 'gyerekmenu', 101, '2025-05-17 23:15:00', 'INSERT', NULL, '29'),
(1232, 'hetimenu', 87, '2025-05-17 23:15:00', 'INSERT', NULL, '24'),
(1233, 'hetimenu', 88, '2025-05-17 23:15:00', 'INSERT', NULL, '23'),
(1234, 'hetimenu', 89, '2025-05-17 23:15:00', 'INSERT', NULL, '32'),
(1235, 'hetimenu', 90, '2025-05-17 23:15:00', 'INSERT', NULL, '15'),
(1236, 'hetimenu', 91, '2025-05-17 23:15:00', 'INSERT', NULL, '13'),
(1237, 'hetimenu', 92, '2025-05-17 23:15:00', 'INSERT', NULL, '29'),
(1238, 'hetimenu', 93, '2025-05-17 23:15:00', 'INSERT', NULL, '35'),
(1239, 'gyerekmenu', 103, '2025-05-17 23:15:00', 'INSERT', NULL, '33'),
(1240, 'gyerekmenu', 104, '2025-05-17 23:15:00', 'INSERT', NULL, '49'),
(1241, 'gyerekmenu', 105, '2025-05-17 23:15:00', 'INSERT', NULL, '27'),
(1242, 'gyerekmenu', 106, '2025-05-17 23:15:00', 'INSERT', NULL, '28'),
(1243, 'gyerekmenu', 107, '2025-05-17 23:15:00', 'INSERT', NULL, '17'),
(1244, 'gyerekmenu', 108, '2025-05-17 23:15:00', 'INSERT', NULL, '50'),
(1245, 'gyerekmenu', 109, '2025-05-17 23:15:00', 'INSERT', NULL, '48'),
(1246, 'hetimenu', 94, '2025-05-17 23:15:00', 'INSERT', NULL, '27'),
(1247, 'hetimenu', 95, '2025-05-17 23:15:00', 'INSERT', NULL, '49'),
(1248, 'hetimenu', 96, '2025-05-17 23:15:00', 'INSERT', NULL, '33'),
(1249, 'hetimenu', 97, '2025-05-17 23:15:00', 'INSERT', NULL, '28'),
(1250, 'hetimenu', 98, '2025-05-17 23:15:00', 'INSERT', NULL, '48'),
(1251, 'hetimenu', 99, '2025-05-17 23:15:00', 'INSERT', NULL, '17'),
(1252, 'hetimenu', 100, '2025-05-17 23:15:00', 'INSERT', NULL, '50'),
(1253, 'gyerekmenu', 110, '2025-05-17 23:15:00', 'INSERT', NULL, '55'),
(1254, 'gyerekmenu', 111, '2025-05-17 23:15:00', 'INSERT', NULL, '51'),
(1255, 'gyerekmenu', 112, '2025-05-17 23:15:00', 'INSERT', NULL, '54'),
(1256, 'gyerekmenu', 113, '2025-05-17 23:15:00', 'INSERT', NULL, '52'),
(1257, 'gyerekmenu', 114, '2025-05-17 23:15:00', 'INSERT', NULL, '53'),
(1258, 'gyerekmenu', 115, '2025-05-17 23:15:00', 'INSERT', NULL, '25'),
(1259, 'gyerekmenu', 116, '2025-05-17 23:15:00', 'INSERT', NULL, '56'),
(1260, 'hetimenu', 101, '2025-05-17 23:15:00', 'INSERT', NULL, '34'),
(1261, 'hetimenu', 102, '2025-05-17 23:15:00', 'INSERT', NULL, '55'),
(1262, 'hetimenu', 103, '2025-05-17 23:15:00', 'INSERT', NULL, '25'),
(1263, 'hetimenu', 104, '2025-05-17 23:15:00', 'INSERT', NULL, '54'),
(1264, 'hetimenu', 105, '2025-05-17 23:15:00', 'INSERT', NULL, '53'),
(1265, 'hetimenu', 106, '2025-05-17 23:15:00', 'INSERT', NULL, '56'),
(1266, 'hetimenu', 107, '2025-05-17 23:15:00', 'INSERT', NULL, '51'),
(1267, 'gyerekmenu', 82, '2025-05-17 23:16:00', 'DELETE', '16', NULL),
(1268, 'gyerekmenu', 83, '2025-05-17 23:16:00', 'DELETE', '40', NULL),
(1269, 'gyerekmenu', 84, '2025-05-17 23:16:00', 'DELETE', '38', NULL),
(1270, 'gyerekmenu', 85, '2025-05-17 23:16:00', 'DELETE', '39', NULL),
(1271, 'gyerekmenu', 86, '2025-05-17 23:16:00', 'DELETE', '30', NULL),
(1272, 'gyerekmenu', 87, '2025-05-17 23:16:00', 'DELETE', '37', NULL),
(1273, 'gyerekmenu', 88, '2025-05-17 23:16:00', 'DELETE', '14', NULL),
(1274, 'gyerekmenu', 89, '2025-05-17 23:16:00', 'DELETE', '43', NULL),
(1275, 'gyerekmenu', 90, '2025-05-17 23:16:00', 'DELETE', '42', NULL),
(1276, 'gyerekmenu', 91, '2025-05-17 23:16:00', 'DELETE', '47', NULL),
(1277, 'gyerekmenu', 92, '2025-05-17 23:16:00', 'DELETE', '46', NULL),
(1278, 'gyerekmenu', 93, '2025-05-17 23:16:00', 'DELETE', '44', NULL),
(1279, 'gyerekmenu', 94, '2025-05-17 23:16:00', 'DELETE', '45', NULL),
(1280, 'gyerekmenu', 95, '2025-05-17 23:16:00', 'DELETE', '31', NULL),
(1281, 'gyerekmenu', 96, '2025-05-17 23:16:00', 'DELETE', '23', NULL),
(1282, 'gyerekmenu', 97, '2025-05-17 23:16:00', 'DELETE', '35', NULL),
(1283, 'gyerekmenu', 98, '2025-05-17 23:16:00', 'DELETE', '15', NULL),
(1284, 'gyerekmenu', 99, '2025-05-17 23:16:00', 'DELETE', '13', NULL),
(1285, 'gyerekmenu', 100, '2025-05-17 23:16:00', 'DELETE', '32', NULL),
(1286, 'gyerekmenu', 101, '2025-05-17 23:16:00', 'DELETE', '29', NULL),
(1287, 'gyerekmenu', 103, '2025-05-17 23:16:00', 'DELETE', '33', NULL),
(1288, 'gyerekmenu', 104, '2025-05-17 23:16:00', 'DELETE', '49', NULL),
(1289, 'gyerekmenu', 105, '2025-05-17 23:16:00', 'DELETE', '27', NULL),
(1290, 'gyerekmenu', 106, '2025-05-17 23:16:00', 'DELETE', '28', NULL),
(1291, 'gyerekmenu', 107, '2025-05-17 23:16:00', 'DELETE', '17', NULL),
(1292, 'gyerekmenu', 108, '2025-05-17 23:16:00', 'DELETE', '50', NULL),
(1293, 'gyerekmenu', 109, '2025-05-17 23:16:00', 'DELETE', '48', NULL),
(1294, 'gyerekmenu', 110, '2025-05-17 23:16:00', 'DELETE', '55', NULL),
(1295, 'gyerekmenu', 111, '2025-05-17 23:16:00', 'DELETE', '51', NULL),
(1296, 'gyerekmenu', 112, '2025-05-17 23:16:00', 'DELETE', '54', NULL),
(1297, 'gyerekmenu', 113, '2025-05-17 23:16:00', 'DELETE', '52', NULL),
(1298, 'gyerekmenu', 114, '2025-05-17 23:16:00', 'DELETE', '53', NULL),
(1299, 'gyerekmenu', 115, '2025-05-17 23:16:00', 'DELETE', '25', NULL),
(1300, 'gyerekmenu', 116, '2025-05-17 23:16:00', 'DELETE', '56', NULL),
(1301, 'gyerekmenu', 117, '2025-05-17 23:16:00', 'INSERT', NULL, '16'),
(1302, 'gyerekmenu', 118, '2025-05-17 23:16:00', 'INSERT', NULL, '14'),
(1303, 'gyerekmenu', 119, '2025-05-17 23:16:00', 'INSERT', NULL, '38'),
(1304, 'gyerekmenu', 120, '2025-05-17 23:16:00', 'INSERT', NULL, '36'),
(1305, 'gyerekmenu', 121, '2025-05-17 23:16:00', 'INSERT', NULL, '37'),
(1306, 'gyerekmenu', 122, '2025-05-17 23:16:00', 'INSERT', NULL, '40'),
(1307, 'gyerekmenu', 123, '2025-05-17 23:16:00', 'INSERT', NULL, '39'),
(1308, 'gyerekmenu', 124, '2025-05-17 23:16:00', 'INSERT', NULL, '47'),
(1309, 'gyerekmenu', 125, '2025-05-17 23:16:00', 'INSERT', NULL, '31'),
(1310, 'gyerekmenu', 126, '2025-05-17 23:16:00', 'INSERT', NULL, '45'),
(1311, 'gyerekmenu', 127, '2025-05-17 23:16:00', 'INSERT', NULL, '46'),
(1312, 'gyerekmenu', 128, '2025-05-17 23:16:00', 'INSERT', NULL, '41'),
(1313, 'gyerekmenu', 129, '2025-05-17 23:16:00', 'INSERT', NULL, '43'),
(1314, 'gyerekmenu', 130, '2025-05-17 23:16:00', 'INSERT', NULL, '42'),
(1315, 'gyerekmenu', 131, '2025-05-17 23:16:00', 'INSERT', NULL, '32'),
(1316, 'gyerekmenu', 132, '2025-05-17 23:16:00', 'INSERT', NULL, '15'),
(1317, 'gyerekmenu', 133, '2025-05-17 23:16:00', 'INSERT', NULL, '29'),
(1318, 'gyerekmenu', 134, '2025-05-17 23:16:00', 'INSERT', NULL, '23'),
(1319, 'gyerekmenu', 135, '2025-05-17 23:16:00', 'INSERT', NULL, '13'),
(1320, 'gyerekmenu', 136, '2025-05-17 23:16:00', 'INSERT', NULL, '35'),
(1321, 'gyerekmenu', 138, '2025-05-17 23:16:00', 'INSERT', NULL, '50'),
(1322, 'gyerekmenu', 139, '2025-05-17 23:16:00', 'INSERT', NULL, '48'),
(1323, 'gyerekmenu', 140, '2025-05-17 23:16:00', 'INSERT', NULL, '28'),
(1324, 'gyerekmenu', 141, '2025-05-17 23:16:00', 'INSERT', NULL, '27'),
(1325, 'gyerekmenu', 142, '2025-05-17 23:16:00', 'INSERT', NULL, '17'),
(1326, 'gyerekmenu', 143, '2025-05-17 23:16:00', 'INSERT', NULL, '49'),
(1327, 'gyerekmenu', 144, '2025-05-17 23:16:00', 'INSERT', NULL, '33'),
(1328, 'gyerekmenu', 145, '2025-05-17 23:16:00', 'INSERT', NULL, '51'),
(1329, 'gyerekmenu', 146, '2025-05-17 23:16:00', 'INSERT', NULL, '54'),
(1330, 'gyerekmenu', 147, '2025-05-17 23:16:00', 'INSERT', NULL, '55'),
(1331, 'gyerekmenu', 148, '2025-05-17 23:16:00', 'INSERT', NULL, '25'),
(1332, 'gyerekmenu', 149, '2025-05-17 23:16:00', 'INSERT', NULL, '53'),
(1333, 'gyerekmenu', 150, '2025-05-17 23:16:00', 'INSERT', NULL, '56'),
(1334, 'gyerekmenu', 151, '2025-05-17 23:16:00', 'INSERT', NULL, '34'),
(1335, 'receptek', 24, '2025-05-17 23:18:53', 'UPDATE_GYEREKMENU', '0', '1'),
(1336, 'hetimenu', 73, '2025-05-17 23:20:00', 'DELETE', '16', NULL),
(1337, 'hetimenu', 74, '2025-05-17 23:20:00', 'DELETE', '38', NULL),
(1338, 'hetimenu', 75, '2025-05-17 23:20:00', 'DELETE', '36', NULL),
(1339, 'hetimenu', 76, '2025-05-17 23:20:00', 'DELETE', '39', NULL),
(1340, 'hetimenu', 77, '2025-05-17 23:20:00', 'DELETE', '14', NULL),
(1341, 'hetimenu', 78, '2025-05-17 23:20:00', 'DELETE', '37', NULL),
(1342, 'hetimenu', 79, '2025-05-17 23:20:00', 'DELETE', '40', NULL),
(1343, 'hetimenu', 80, '2025-05-17 23:20:00', 'DELETE', '31', NULL),
(1344, 'gyerekmenu', 117, '2025-05-17 23:20:00', 'DELETE', '16', NULL),
(1345, 'hetimenu', 81, '2025-05-17 23:20:00', 'DELETE', '47', NULL),
(1346, 'hetimenu', 82, '2025-05-17 23:20:00', 'DELETE', '43', NULL),
(1347, 'hetimenu', 83, '2025-05-17 23:20:00', 'DELETE', '42', NULL),
(1348, 'gyerekmenu', 118, '2025-05-17 23:20:00', 'DELETE', '14', NULL),
(1349, 'hetimenu', 84, '2025-05-17 23:20:00', 'DELETE', '44', NULL),
(1350, 'hetimenu', 85, '2025-05-17 23:20:00', 'DELETE', '45', NULL),
(1351, 'gyerekmenu', 119, '2025-05-17 23:20:00', 'DELETE', '38', NULL),
(1352, 'hetimenu', 86, '2025-05-17 23:20:00', 'DELETE', '46', NULL),
(1353, 'gyerekmenu', 120, '2025-05-17 23:20:00', 'DELETE', '36', NULL),
(1354, 'hetimenu', 87, '2025-05-17 23:20:00', 'DELETE', '24', NULL),
(1355, 'gyerekmenu', 121, '2025-05-17 23:20:00', 'DELETE', '37', NULL),
(1356, 'hetimenu', 88, '2025-05-17 23:20:00', 'DELETE', '23', NULL),
(1357, 'gyerekmenu', 122, '2025-05-17 23:20:00', 'DELETE', '40', NULL),
(1358, 'hetimenu', 89, '2025-05-17 23:20:00', 'DELETE', '32', NULL),
(1359, 'gyerekmenu', 123, '2025-05-17 23:20:00', 'DELETE', '39', NULL),
(1360, 'hetimenu', 90, '2025-05-17 23:20:00', 'DELETE', '15', NULL),
(1361, 'gyerekmenu', 124, '2025-05-17 23:20:00', 'DELETE', '47', NULL),
(1362, 'hetimenu', 91, '2025-05-17 23:20:00', 'DELETE', '13', NULL),
(1363, 'gyerekmenu', 125, '2025-05-17 23:20:00', 'DELETE', '31', NULL),
(1364, 'hetimenu', 92, '2025-05-17 23:20:00', 'DELETE', '29', NULL),
(1365, 'gyerekmenu', 126, '2025-05-17 23:20:00', 'DELETE', '45', NULL),
(1366, 'hetimenu', 93, '2025-05-17 23:20:00', 'DELETE', '35', NULL),
(1367, 'gyerekmenu', 127, '2025-05-17 23:20:00', 'DELETE', '46', NULL),
(1368, 'hetimenu', 94, '2025-05-17 23:20:00', 'DELETE', '27', NULL),
(1369, 'gyerekmenu', 128, '2025-05-17 23:20:00', 'DELETE', '41', NULL),
(1370, 'hetimenu', 95, '2025-05-17 23:20:00', 'DELETE', '49', NULL),
(1371, 'gyerekmenu', 129, '2025-05-17 23:20:00', 'DELETE', '43', NULL),
(1372, 'hetimenu', 96, '2025-05-17 23:20:00', 'DELETE', '33', NULL),
(1373, 'gyerekmenu', 130, '2025-05-17 23:20:00', 'DELETE', '42', NULL),
(1374, 'hetimenu', 97, '2025-05-17 23:20:00', 'DELETE', '28', NULL),
(1375, 'gyerekmenu', 131, '2025-05-17 23:20:00', 'DELETE', '32', NULL),
(1376, 'hetimenu', 98, '2025-05-17 23:20:00', 'DELETE', '48', NULL),
(1377, 'gyerekmenu', 132, '2025-05-17 23:20:00', 'DELETE', '15', NULL),
(1378, 'hetimenu', 99, '2025-05-17 23:20:00', 'DELETE', '17', NULL),
(1379, 'gyerekmenu', 133, '2025-05-17 23:20:00', 'DELETE', '29', NULL),
(1380, 'hetimenu', 100, '2025-05-17 23:20:00', 'DELETE', '50', NULL),
(1381, 'gyerekmenu', 134, '2025-05-17 23:20:00', 'DELETE', '23', NULL),
(1382, 'hetimenu', 101, '2025-05-17 23:20:00', 'DELETE', '34', NULL),
(1383, 'gyerekmenu', 135, '2025-05-17 23:20:00', 'DELETE', '13', NULL),
(1384, 'hetimenu', 102, '2025-05-17 23:20:00', 'DELETE', '55', NULL),
(1385, 'gyerekmenu', 136, '2025-05-17 23:20:00', 'DELETE', '35', NULL),
(1386, 'hetimenu', 103, '2025-05-17 23:20:00', 'DELETE', '25', NULL),
(1387, 'gyerekmenu', 138, '2025-05-17 23:20:00', 'DELETE', '50', NULL),
(1388, 'hetimenu', 104, '2025-05-17 23:20:00', 'DELETE', '54', NULL),
(1389, 'hetimenu', 105, '2025-05-17 23:20:00', 'DELETE', '53', NULL),
(1390, 'hetimenu', 106, '2025-05-17 23:20:00', 'DELETE', '56', NULL),
(1391, 'hetimenu', 107, '2025-05-17 23:20:00', 'DELETE', '51', NULL);
INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`) VALUES
(1392, 'gyerekmenu', 139, '2025-05-17 23:20:00', 'DELETE', '48', NULL),
(1393, 'gyerekmenu', 140, '2025-05-17 23:20:00', 'DELETE', '28', NULL),
(1394, 'gyerekmenu', 141, '2025-05-17 23:20:00', 'DELETE', '27', NULL),
(1395, 'gyerekmenu', 142, '2025-05-17 23:20:00', 'DELETE', '17', NULL),
(1396, 'gyerekmenu', 143, '2025-05-17 23:20:00', 'DELETE', '49', NULL),
(1397, 'gyerekmenu', 144, '2025-05-17 23:20:00', 'DELETE', '33', NULL),
(1398, 'gyerekmenu', 145, '2025-05-17 23:20:00', 'DELETE', '51', NULL),
(1399, 'gyerekmenu', 146, '2025-05-17 23:20:00', 'DELETE', '54', NULL),
(1400, 'gyerekmenu', 147, '2025-05-17 23:20:00', 'DELETE', '55', NULL),
(1401, 'gyerekmenu', 148, '2025-05-17 23:20:00', 'DELETE', '25', NULL),
(1402, 'gyerekmenu', 149, '2025-05-17 23:20:00', 'DELETE', '53', NULL),
(1403, 'gyerekmenu', 150, '2025-05-17 23:20:00', 'DELETE', '56', NULL),
(1404, 'gyerekmenu', 151, '2025-05-17 23:20:00', 'DELETE', '34', NULL),
(1405, 'hetimenu', 108, '2025-05-17 23:20:00', 'INSERT', NULL, '36'),
(1406, 'hetimenu', 109, '2025-05-17 23:20:00', 'INSERT', NULL, '39'),
(1407, 'hetimenu', 110, '2025-05-17 23:20:00', 'INSERT', NULL, '40'),
(1408, 'hetimenu', 111, '2025-05-17 23:20:00', 'INSERT', NULL, '37'),
(1409, 'hetimenu', 112, '2025-05-17 23:20:00', 'INSERT', NULL, '14'),
(1410, 'gyerekmenu', 152, '2025-05-17 23:20:00', 'INSERT', NULL, '39'),
(1411, 'hetimenu', 113, '2025-05-17 23:20:00', 'INSERT', NULL, '38'),
(1412, 'hetimenu', 114, '2025-05-17 23:20:00', 'INSERT', NULL, '16'),
(1413, 'gyerekmenu', 153, '2025-05-17 23:20:00', 'INSERT', NULL, '30'),
(1414, 'gyerekmenu', 154, '2025-05-17 23:20:00', 'INSERT', NULL, '36'),
(1415, 'gyerekmenu', 155, '2025-05-17 23:20:00', 'INSERT', NULL, '40'),
(1416, 'gyerekmenu', 156, '2025-05-17 23:20:00', 'INSERT', NULL, '16'),
(1417, 'gyerekmenu', 157, '2025-05-17 23:20:00', 'INSERT', NULL, '14'),
(1418, 'gyerekmenu', 158, '2025-05-17 23:20:00', 'INSERT', NULL, '37'),
(1419, 'hetimenu', 115, '2025-05-17 23:20:00', 'INSERT', NULL, '45'),
(1420, 'hetimenu', 116, '2025-05-17 23:20:00', 'INSERT', NULL, '31'),
(1421, 'hetimenu', 117, '2025-05-17 23:20:00', 'INSERT', NULL, '44'),
(1422, 'hetimenu', 118, '2025-05-17 23:20:00', 'INSERT', NULL, '43'),
(1423, 'hetimenu', 119, '2025-05-17 23:20:00', 'INSERT', NULL, '42'),
(1424, 'hetimenu', 120, '2025-05-17 23:20:00', 'INSERT', NULL, '46'),
(1425, 'hetimenu', 121, '2025-05-17 23:20:00', 'INSERT', NULL, '41'),
(1426, 'gyerekmenu', 159, '2025-05-17 23:20:00', 'INSERT', NULL, '43'),
(1427, 'gyerekmenu', 160, '2025-05-17 23:20:00', 'INSERT', NULL, '42'),
(1428, 'gyerekmenu', 161, '2025-05-17 23:20:00', 'INSERT', NULL, '44'),
(1429, 'gyerekmenu', 162, '2025-05-17 23:20:00', 'INSERT', NULL, '47'),
(1430, 'gyerekmenu', 163, '2025-05-17 23:20:00', 'INSERT', NULL, '46'),
(1431, 'gyerekmenu', 164, '2025-05-17 23:20:00', 'INSERT', NULL, '31'),
(1432, 'gyerekmenu', 165, '2025-05-17 23:20:00', 'INSERT', NULL, '45'),
(1433, 'gyerekmenu', 166, '2025-05-17 23:20:00', 'INSERT', NULL, '13'),
(1434, 'gyerekmenu', 167, '2025-05-17 23:20:00', 'INSERT', NULL, '32'),
(1435, 'gyerekmenu', 168, '2025-05-17 23:20:00', 'INSERT', NULL, '29'),
(1436, 'gyerekmenu', 169, '2025-05-17 23:20:00', 'INSERT', NULL, '24'),
(1437, 'gyerekmenu', 170, '2025-05-17 23:20:00', 'INSERT', NULL, '15'),
(1438, 'gyerekmenu', 171, '2025-05-17 23:20:00', 'INSERT', NULL, '23'),
(1439, 'gyerekmenu', 172, '2025-05-17 23:20:00', 'INSERT', NULL, '35'),
(1440, 'hetimenu', 122, '2025-05-17 23:20:00', 'INSERT', NULL, '15'),
(1441, 'hetimenu', 123, '2025-05-17 23:20:00', 'INSERT', NULL, '24'),
(1442, 'hetimenu', 124, '2025-05-17 23:20:00', 'INSERT', NULL, '23'),
(1443, 'hetimenu', 125, '2025-05-17 23:20:00', 'INSERT', NULL, '32'),
(1444, 'hetimenu', 126, '2025-05-17 23:20:00', 'INSERT', NULL, '35'),
(1445, 'hetimenu', 127, '2025-05-17 23:20:00', 'INSERT', NULL, '13'),
(1446, 'hetimenu', 128, '2025-05-17 23:20:00', 'INSERT', NULL, '29'),
(1447, 'gyerekmenu', 173, '2025-05-17 23:20:00', 'INSERT', NULL, '48'),
(1448, 'gyerekmenu', 174, '2025-05-17 23:20:00', 'INSERT', NULL, '33'),
(1449, 'gyerekmenu', 175, '2025-05-17 23:20:00', 'INSERT', NULL, '27'),
(1450, 'gyerekmenu', 176, '2025-05-17 23:20:00', 'INSERT', NULL, '28'),
(1451, 'gyerekmenu', 177, '2025-05-17 23:20:00', 'INSERT', NULL, '50'),
(1452, 'gyerekmenu', 178, '2025-05-17 23:20:00', 'INSERT', NULL, '49'),
(1453, 'gyerekmenu', 179, '2025-05-17 23:20:00', 'INSERT', NULL, '17'),
(1454, 'hetimenu', 129, '2025-05-17 23:20:00', 'INSERT', NULL, '33'),
(1455, 'hetimenu', 130, '2025-05-17 23:20:00', 'INSERT', NULL, '27'),
(1456, 'hetimenu', 131, '2025-05-17 23:20:00', 'INSERT', NULL, '49'),
(1457, 'hetimenu', 132, '2025-05-17 23:20:00', 'INSERT', NULL, '17'),
(1458, 'hetimenu', 133, '2025-05-17 23:20:00', 'INSERT', NULL, '48'),
(1459, 'hetimenu', 134, '2025-05-17 23:20:00', 'INSERT', NULL, '28'),
(1460, 'hetimenu', 135, '2025-05-17 23:20:00', 'INSERT', NULL, '50'),
(1461, 'gyerekmenu', 180, '2025-05-17 23:20:00', 'INSERT', NULL, '55'),
(1462, 'gyerekmenu', 181, '2025-05-17 23:20:00', 'INSERT', NULL, '51'),
(1463, 'gyerekmenu', 182, '2025-05-17 23:20:00', 'INSERT', NULL, '56'),
(1464, 'gyerekmenu', 183, '2025-05-17 23:20:00', 'INSERT', NULL, '34'),
(1465, 'gyerekmenu', 184, '2025-05-17 23:20:00', 'INSERT', NULL, '54'),
(1466, 'hetimenu', 136, '2025-05-17 23:20:00', 'INSERT', NULL, '51'),
(1467, 'gyerekmenu', 185, '2025-05-17 23:20:00', 'INSERT', NULL, '53'),
(1468, 'hetimenu', 137, '2025-05-17 23:20:00', 'INSERT', NULL, '54'),
(1469, 'gyerekmenu', 186, '2025-05-17 23:20:00', 'INSERT', NULL, '52'),
(1470, 'hetimenu', 138, '2025-05-17 23:20:00', 'INSERT', NULL, '53'),
(1471, 'hetimenu', 139, '2025-05-17 23:20:00', 'INSERT', NULL, '52'),
(1472, 'hetimenu', 140, '2025-05-17 23:20:00', 'INSERT', NULL, '25'),
(1473, 'hetimenu', 141, '2025-05-17 23:20:00', 'INSERT', NULL, '55'),
(1474, 'hetimenu', 142, '2025-05-17 23:20:00', 'INSERT', NULL, '56'),
(1475, 'receptek', 57, '2025-05-17 23:20:58', 'INSERT', NULL, 's'),
(1476, 'hozzavalok', 408, '2025-05-17 23:20:58', 'INSERT', NULL, 's'),
(1477, 'receptetrend', 108, '2025-05-17 23:20:58', 'INSERT', NULL, '108'),
(1478, 'receptetrend', 108, '2025-05-17 23:21:17', 'DELETE', '108', NULL),
(1479, 'hozzavalok', 408, '2025-05-17 23:21:17', 'DELETE', 's', NULL),
(1480, 'receptek', 57, '2025-05-17 23:21:17', 'DELETE', 's', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `receptek`
--

CREATE TABLE `receptek` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) DEFAULT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `napszak` varchar(255) DEFAULT NULL,
  `etelfajta_id` int(11) DEFAULT NULL,
  `kaloria` int(11) DEFAULT NULL,
  `kepek` text DEFAULT NULL,
  `nehezseg` text DEFAULT NULL COMMENT 'Milyen nehéz megcsin',
  `ido` int(11) DEFAULT NULL,
  `adag` int(11) DEFAULT NULL,
  `ar` varchar(255) DEFAULT NULL,
  `mikor_feltolt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `konyha_id` int(11) DEFAULT NULL,
  `elkeszites` text DEFAULT NULL,
  `elfogadot` tinyint(1) DEFAULT NULL,
  `modositas_jav` text DEFAULT NULL,
  `gyerekmenu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `receptek`
--

INSERT INTO `receptek` (`id`, `neve`, `felhasznalo_id`, `napszak`, `etelfajta_id`, `kaloria`, `kepek`, `nehezseg`, `ido`, `adag`, `ar`, `mikor_feltolt`, `konyha_id`, `elkeszites`, `elfogadot`, `modositas_jav`, `gyerekmenu`) VALUES
(5, 'Tükör tojás', 5, 'REGGELI', 6, NULL, NULL, 'könnyű', 3, 1, '34', '2025-03-28 19:57:17', 28, 'asd', NULL, NULL, 1),
(6, 'Hagymás tojássaláta', 14, 'TÍZÓRAI', 5, 4, NULL, 'Nehéz', 3, 1, '356', '2025-03-28 19:58:23', 23, 'asdddd', NULL, NULL, NULL),
(7, 'Virslis-lencsés tész', 6, 'TÍZÓRAI', 6, 345, NULL, 'Közepes', 2, 1, '8', '2025-03-28 19:59:40', 28, 'aaaaaa', NULL, NULL, NULL),
(8, 'Rántott karfiol', 6, 'EBÉD', 5, 3, NULL, 'Könnyű', 4, 1, '34', '2025-03-28 20:00:26', NULL, 'ffff', NULL, NULL, NULL),
(9, 'Sonkás-tormás babka', 5, 'UZSONNA', 6, 4, NULL, 'Könnyű', 3, 1, '23', '2025-03-28 20:01:28', 23, 'hhhhhhhh', NULL, NULL, 0),
(10, 'Avokádókrém', 6, 'UZSONNA', 37, 3, NULL, 'Nehéz', 3, 1, '4455', '2025-04-12 15:46:03', 4, 'ggggg', 2, 'asd', 0),
(11, 'Tojásfasírt', 6, 'VACSORA', 4, 3, NULL, 'Nehéz', 23, 1, '34', '2025-04-12 15:46:45', 2, 'qqqqq', 2, 'd', 0),
(12, 'Rösztipizza', 6, 'VACSORA', 4, 3, NULL, 'Közepes', 23, 1, NULL, '2025-04-12 15:46:39', 8, NULL, 2, 'a', 0),
(13, 'Poutine', 5, 'EBÉD', 3, 750, './receptkepek/admin/admin_recept_13.png', 'KÖNNYÜ', 25, 1, 'OLCSÓ', '2025-04-07 09:50:28', 20, 'Megsütjük a krumplit. A krumplira rá szórjuk a sajtos túró darabkakákat majd nyakon öntjük a szafttal és ízlés szerint tálaljuk.', 1, NULL, 1),
(14, 'Amerikai Palacsinta', 5, 'REGGELI', 1, 323, './receptkepek/admin/admin_recept_14.jpg', 'KÖNNYÜ', 30, 1, 'ÁTLAGOS', '2025-04-07 10:01:28', 26, 'Az összes hozzávalót beletesszük a turmixba, és alaposan összemixeljük. Érdemes 2 részletben hozzáadni a tejet és a lisztet, így egyszerűbb, hatékonyabb. Felforrósítunk és beolajozunk egy teflon serpenyőt. A tésztakeverékből 2-3 korongot csorgatunk bele. A turmix kiöntője segítségével egyszerű adagolni. Aranybarnára sütjük mindkét oldalát. Ízlés szerint fogyaszthatjuk mézzel, mogyorókrémmel, olvasztott csokival, lekvárral, juharsziruppal.', 1, NULL, 1),
(15, 'Burrito', 5, 'EBÉD', 3, 600, './receptkepek/admin/admin_recept_15.jpg', 'NEHÉZ', 50, 1, 'DRÁGA', '2025-04-07 10:31:44', 29, 'Összeállítás Hevítsük fel az olajat és pirítsuk meg rajta a darált húst, amit fűszerezünk a burrito fűszerrel (vagy házilag is keverhetünk: pirospaprika, oregánó,barna cukor, só, cayenne bors, fokhagymapor, vöröshagymapor). A tortillát kenjük meg tejföllel, majd kanalazzunk rá a babból. Jöhet rá a sült hús, főtt rizs, kukorica, pico de gallo, 1-2 karika jalapeno. Csavarjuk fel és serpenyőben süssük meg mindkét oldalát. Csavarjuk alufóliába, hogy jobban összeálljon. Vágjuk félbe és tálaljuk tejföllel és jalapenoval. Pico de gallo Mindent vágjunk fel nagyon apróra, majd facsarjuk rá a lime levét és sózzuk-borsozzuk. Paradicsomos bab Hevítsük fel az olajat és az apróra vágott lila hagymát, fokhagymát dinszteljük meg. Tegyük rá a paradicsompürét és kicsit karamellizáljuk. Jöhet rá az átöblített konzerves bab, amit sózzunk-borsozzunk. Öntsük fel kis vízzel és főzzük puhára.', 1, NULL, 1),
(16, 'Csirke szárny', 5, 'REGGELI', 38, 350, './receptkepek/admin/admin_recept_16.jpg', 'KÖNNYÜ', 45, 1, 'OLCSÓ', '2025-04-07 10:31:31', 26, 'A csirkeszárnyakat megmossuk, majd \"összecsomagoljuk\", hogy sütés közben ne nyíljanak ki. A fűszereket alaposan összekeverjük a lereszelt fokhagymával és gyömbérrel, valamint az olívaolajjal és a mézzel. Kevés szójaszósszal ízesítjük a pácot, és megkenjük vele a szárnyakat. Hagyjuk legalább fél órát szobahőmérsékleten pácolódni, aztán tegyük sütőpapírral bélelt tepsire, majd a 180 fokra előmelegített sütőbe 30-35 percre, amíg szépen meg nem pirul.', 1, NULL, 1),
(17, 'chocolate chip cookie', 5, 'UZSONNA', 12, 200, './receptkepek/admin/admin_recept_17.jpg', 'KÖNNYÜ', 30, 1, 'ÁTLAGOS', '2025-05-11 20:02:58', 26, 'Melegítsd elő a sütőt 180°C-ra, és bélelj ki egy tepsit sütőpapírral. Egy kis tálban keverd össze a kukoricakeményítőt és a vizet, majd tedd félre. Egy nagyobb tálban habosítsd fel a vajat a barna és kristálycukorral. Add hozzá a tojást és a vaníliakivonatot, majd keverd simára. Szitáld hozzá a lisztet, sütőport, szódabikarbónát és sót, majd keverd össze. Öntsd hozzá a keményítős keveréket, majd óvatosan dolgozd össze a tésztát. Forgasd bele a csokoládét. Egy kanál segítségével adagold a tésztát a sütőpapírra, kb. 5 cm távolságra egymástól. Süsd 10-12 percig, vagy amíg a szélei aranybarnára sülnek. Hűtsd ki rácson, majd tálald.', 1, NULL, 1),
(21, 'teszt', 5, 'REGGELI', 40, 123, './receptkepek/admin/admin_recept_21.png', 'KÖNNYÜ', 123, 1, 'OLCSÓ', '2025-04-12 16:24:38', 29, 'sdf', 3, 'Ez így gatya', 0),
(23, 'Corn dog', 5, 'EBÉD', 38, 1410, './receptkepek/admin/admin_recept_23.jpg', 'KÖNNYÜ', 13, 1, 'ÁTLAGOS', '2025-05-11 19:30:56', 26, 'A langyos tejet elkeverjük egy csipet cukorral, a szobahőmérsékletű\ntojással, és az élesztővel. A liszteket elegyítjük, majd a tejes keverékkel\nösszekeverjük, sóval ízesítjük, és egy magas falú pohárba töltjük.\nVirsliket lisztben meghempergetjük, nyársra húzzuk. Az olajat\nfelforrosítjuk (bő olajban kell sütni!), majd a virslinyársakat a masszába\nmártjuk, kicsit lecsöpögtetjük, és pár perc alatt megsütjük. Ketchup-pal,\nmustárral, majonézzel tálaljuk.', 1, NULL, 1),
(24, 'Currys csirkemell', 5, 'EBÉD', 3, 557, './receptkepek/admin/admin_recept_24.png', 'KÖZEPES', 60, 4, 'ÁTLAGOS', '2025-05-17 21:18:53', 10, 'Serpenyőben olívaolajon lepirítjuk a csirkemellet, majd ha jól átsült,\nfélretesszük. Az apróra vágott hagymát, fokhagymát és reszelt\ngyömbért lepirítjuk, majd amikor üvegesre pároltuk, ráöntjük a\ncurryport. Hozzáadjuk a csirkemellet, és hozzáöntjük a kókuszkrémet és\na paradicsomot. Jól összeforraljuk, borsozzuk, végül a spenótot is\nhozzárakjuk. Pár percig főzzük még, végül rizzsel tálaljuk.', 1, NULL, 1),
(25, 'Hamburger', 5, 'VACSORA', 3, 563, './receptkepek/admin/admin_recept_25.jpg', 'KÖNNYÜ', 30, 4, 'ÁTLAGOS', '2025-04-15 08:16:38', 26, 'Hamburger A Knorr Szaftos Hamburger Alapját elkeverjük 175 ml forró\nvízzel, majd 5 percig állni hagyjuk, amíg a keverék felveszi a\nnedvességet. Ezután hozzáadjuk a darált marhahúshoz, végül\negyneművé keverjük a húspogácsát. A húspogácsák kisütése előtt\nállítsuk össze a burgerszószt, vágjuk fel a paradicsomot karikákra, és\npirítsuk elő a hamburgerbucikat. A hamburgerbucikat vágjuk ketté, és\nközepesen forró serpenyőben egy kevés vajon pirítsuk aranybarnára\nőket. Beolajozott kézzel 4 vastagabb (vagy 6 vékonyabb) húspogácsát\nformázzunk, majd tegyük őket forró serpenyőbe pirulni. Oldalanként 4-\n5 percig süssük, és mielőtt elkészülnének, tegyünk rájuk 1-1 szelet\ncheddar sajtot, és hagyjuk ráolvadni. A pirított bucik alját kenjük meg a\nburgerszósszal, tépjünk rá salátát, majd helyezzünk rá egy szelet\nparadicsomot. Erre jöhet az elkészült szaftos húspogácsa, végül a bucik\nteteje. Tálaljuk coleslaw salátával, fogyasszuk el mihamarabb!\nBurgerszósz A csemegeuborkát és a lilahagymát vágjuk fel nagyon\nfinomra, és adjuk hozzá a majonézhez. Fűszerezzük egy kevés füstölt\nfűszerpaprikával, és némi uborkalével hígítsuk fel. Kavarjuk\negyneművé.', 1, NULL, 1),
(27, 'Macaron', 5, 'UZSONNA', 12, 990, './receptkepek/admin/admin_recept_27.jpg', 'NEHÉZ', 44, 4, 'ÁTLAGOS', '2025-05-11 20:03:10', 29, 'Macaron A tojásfehérjét kemény habbá verjük egy csipet sóval. A mandulát\nés porcukrot át szoktam egész finomra darálni, majd egy tálba szitálom. A\ntojásfehérjét szétválasztjuk annyi felé, amennyi színű macaront szeretnénk,\nés hozzákeverjük az ételfestéket. (3 felé választottam, pirosra, sárgára\nfestettem, egyet pedig színező nélkül.) Hozzátesszük a vanília aromát és egy\ncsepp citromlevet is. Óvatosan a tojásfehérjéhez dolgozzuk a mandulás\nporcukros keveréket, apránként adagoljuk. Egy tepsit kibélelünk sütőpapírral\n(legjobb 2 réteggel), és a masszát nyomózsák segítségével kis kör alakú\n\nformákra nyomjuk ki. Nem sütjük azonnal ki, várunk egy órát, hogy\nmegszáradjon a teteje. 140 fokon 14 percig sütjük, maradjon halvány.\nHagyjuk teljesen kihűlni, és óvatosan elválasztjuk a sütőpapírtól. Töltelék\nVízgőz felett megolvasztjuk a csokoládét, elkeverjük benne a tejszínt és a\nvajat. Lefóliázzuk, és hagyjuk kihűlni. Egy robotgép segítségével kihabosítjuk.\nNyomózsákba töltjük, megtöltjük a macaronokat, és összetapasztjuk őket.', 1, NULL, 1),
(28, 'Banános zabsüti', 5, 'UZSONNA', 1, 222, './receptkepek/admin/admin_recept_28.jpg', 'KÖNNYÜ', 22, 4, 'ÁTLAGOS', '2025-05-11 20:03:18', 4, 'A korpát keverjük össze a pépes banánnal, a lereszelt almával, mézzel,\na pár csepp vanília aromával és a fűszerrel. Ha kész a massza, keverjük\nbele a zabpelyhet is (azért csak ekkor adjuk hozzá, hogy ne tudja magát\na gyümölcsök és a méz miatt túlságosan megszívni, ne legyen\nszétpuhulva teljesen). Adjunk hozzá annyi vizet, amitől kissé ragacsos,\ntrutyis állagú lesz. Egy kanál segítségével sütőpapírral kibélelt tepsibe\n\nrakosgassuk korongokat (nem szükséges kilapítani, úgyis szétterül még\negy picit). Előmelegített, 180°C-os sütőben addig sütjük, amíg a külseje\nmár nem ragad, elkezdenek ropogósak lenni rajta a zabszemek. Hagyjuk\nőket kihűlni (persze ha bírsz várni:)).', 1, NULL, 1),
(29, 'Vegán pizza', 5, 'EBÉD', 3, 691, './receptkepek/admin/admin_recept_29.jpg', 'KÖNNYÜ', 60, 4, 'OLCSÓ', '2025-04-15 09:43:05', 3, 'A tésztához\nA liszt harmadát elkeverjük a langyos vízzel, cukorral és élesztővel, majd 20 percig állni hagyjuk. Utána hozzáadjuk a maradék lisztet és az olajat és ruganyos tésztát gyúrunk. Ekkor adjuk hozzá a sót, hogy ne semlegesítse az élesztőt. Ha túl ragacsos lenne, adjunk hozzá kevés plusz lisztet, de ne túl sokat. A lényeg, hogy ne ragadjon a deszkához.\nA tésztát 10 percig dagasztjuk, amíg egy feszes gombócot nem kapunk. Kiolajozott tálba tesszük és a gombócot is bevonjuk olajjal, nehogy kiszáradjon. Lefedjük frissentartó fóliával és meleg helyen duplájára kelesztjük a tésztát.\nA feltétekhez\nA paprikákat megmossuk, majd vékony csíkokra vágjuk. Egy serpenyőben felhevítjük az olajat, majd belevetjük a paprikákat. Megszórjuk a köménnyel, oreganóval, majd ízlés szerint sózzuk-borsozzuk. Magas lángon, 3-5 perc alatt alaposan lepirítjuk és egy tálba tesszük.\nElőmelegítjük a sütőnket 240 fokra. A megkelt tésztát két részre osztjuk, kigombócozzuk, majd sodrófával vékonyra nyújtjuk. Kilisztezünk egy gáztepsit, ráhelyezzük az első pizzatésztát, majd megkenjük passatával. Szórunk rá a sült paprikából, a szeletekre vágott gombából, szeletekre vágott lilahagymából és kukoricából. Megsózzuk az egészet, majd betesszük a sütőbe és 10-15 perc alatt készre sütjük.\nFrissen felvágjuk, majd rukkolával, olívaolajjal és „diósajtos” szórással tálaljuk.\nA „diósajthoz”\nA diót száraz serpenyőben addig pirítjuk, míg aromás nem lesz. Ekkor késes aprítóba tesszük a fűszerekkel és szemcsésre dolgozzuk. Ezzel tálaljuk a pizzát.', 1, NULL, 1),
(30, 'Vidám reggeli gyerekeknek', 5, 'REGGELI', 7, 250, './receptkepek/admin/admin_recept_30.jpg', 'KÖNNYÜ', 5, 1, 'OLCSÓ', '2025-05-11 19:59:21', 26, '1. A kenyérszeleteket megkenjük Nutellával.\n\n2. Banánkarikákkal és áfonyával díszítjük, hogy mókás arcot formázzunk.', 1, NULL, 1),
(31, 'Csirkemellsonkás színes szendvics', 5, 'TÍZÓRAI', 35, 300, './receptkepek/admin/admin_recept_31.jpg', 'KÖNNYÜ', 10, 1, 'OLCSÓ', '2025-05-11 19:59:28', 26, '1. A kenyérszeleteket megkenjük krémsajttal.\n\n2. Ráhelyezzük a csirkemell sonkát és a zöldségeket.\n\n3. Összehajtjuk vagy szendvicssütőben melegítjük.', 1, NULL, 1),
(32, 'Baconös csirkesaslik sült fokhagymás burgonyapürével', 5, 'EBÉD', 3, 2400, './receptkepek/admin/admin_recept_32.jpg', 'KÖZEPES', 90, 4, 'ÁTLAGOS', '2025-05-11 19:59:32', 5, '1. A csirkemell darabokat baconbe tekerjük és nyársra húzzuk.\n\n2. Sütőben megsütjük.\n \n3. A burgonyát megfőzzük, összetörjük, hozzáadjuk a vajat, tejet és a zúzott fokhagymát.\n\n', 1, NULL, 1),
(33, 'Mókás szendvics gyerekeknek', 5, 'UZSONNA', 35, 250, './receptkepek/admin/admin_recept_33.jpg', 'KÖNNYÜ', 10, 1, 'OLCSÓ', '2025-05-11 20:02:47', 5, 'A kenyérre helyezzük a sonkát, sajtot.\nZöldségekkel arcot formázunk a szendvicsen.', 1, NULL, 1),
(34, 'Spenótos frittata', 5, 'VACSORA', 9, 400, './receptkepek/admin/admin_recept_34.jpg', 'KÖNNYÜ', 20, 1, 'ÁTLAGOS', '2025-05-11 19:59:39', 3, 'A spenótot megpároljuk fokhagymával.\nHozzáadjuk a felvert tojásokat, paradicsomot, bazsalikomot és parmezánt.\nSütőben megsütjük, amíg a teteje aranybarna lesz.', 1, NULL, 1),
(35, 'Sonka Wellington', 5, 'EBÉD', 3, 168, './receptkepek/admin/admin_recept_35.jpg', 'KÖNNYÜ', 60, 8, 'ÁTLAGOS', '2025-05-12 10:34:58', 4, 'Egy kis tálkában kikeverjük a mézet és a mustárt, amit ízlés szerint fűszerezünk a mézeskalács-fűszerkeverékkel és borssal.\nA főtt sonkát késsel beirdaljuk, majd alaposan bekenjük a mézes-mustáros mázzal. Egy kis tepsiben 180 fokon 20 percet sütjük, majd hagyjuk kicsit kihűlni.\nA leveles tésztát kinyújtjuk/kihajtogatjuk, lekenjük a mézes-mustáros páccal, majd a közepére helyezzük a sült sonkát. Becsomagoljuk a leveles tésztába, a felesleget pedig levágjuk.\nSütőpapíros tepsire helyezzük a tésztába csomagolt sonkát, a tetejét pedig lekenjük a felvert tojással. 190 fokos sütőben 15-20 perc alatt aranybarnára sütjük.\nA kész sonka Wellingtont hagyjuk picit hűlni, majd szeletelhetjük.', 1, NULL, 1),
(36, 'Gofri', 5, 'REGGELI', 40, 344, './receptkepek/admin/admin_recept_36.jpg', 'KÖNNYÜ', 40, 6, 'OLCSÓ', '2025-05-12 10:53:28', 26, '1. A száraz hozzávalókat (liszt, cukor, vaníliás cukor, szódabikarbóna, sütőpor, fahéj) keverjük össze egy edényben, majd rakjuk félre.\n2. A felolvasztott, de már kihűlt vajat és az írót botmixer segítségével keverjük el, majd adjuk hozzá a tojásokat, és keverjük tovább.\n3. A két tál tartalmát vegyítsük össze, adjunk hozzá egy kevés sót és vaníliakivonatot, majd keverjük sűrű, csomómentes masszává. Ha elkészült, pár percre rakjuk félre pihenni.\n4. A gofrisütőt ecset segítségével kenjük ki olajjal, majd merjünk bele annyi tésztát, hogy az sütéskor ne folyjon ki a sütőből.\n5. Ismételjük addig a folyamatot, amíg az összes tészta el nem fogy. A sütőt minden újabb gofrinál kenjük át olajjal.\n6. Az elkészült gofrikat még melegen tálaljuk. Szórjuk meg porcukorral, kenjünk rá nutellát, lekvárt, tejszínhabot, gyümölcsöket, vagy egyszerűen csak öntsük jól nyakon \n    juharsziruppal.', 1, NULL, 1),
(37, 'Sonkakrém', 5, 'REGGELI', 54, 173, './receptkepek/admin/admin_recept_37.jpg', 'KÖNNYÜ', 10, 8, 'OLCSÓ', '2025-05-12 10:53:31', 5, 'A főtt sonkát felkockázzuk, majd a többi hozzávalóval együtt (a mézet kivéve) egy nagyobb keverőtálba tesszük. Sózni az elején semmiképpen nem szabad, hiszen a sonka magában is elég sós, utólag viszont még lehet javítani ezen.\nAz alapanyagokat botturmix segítségével krémesre turmixoljuk. Nem kell teljesen egyneműnek lennie, de nagyobb húsdarabok ne legyenek a kész krémben.\nA sonkakrémet fogyaszthatjuk azonnal: magában, egy szelet kalácsra kenve, főtt tésztához forgatva vagy palacsintába kenve is kiváló. Ha szeretnétek picit még pikánsabbá tenni, csorgassatok rá kevéske mézet, nagyon jól áll neki!', 1, NULL, 1),
(38, 'Mennyei tojáskrém', 5, 'REGGELI', 7, 210, './receptkepek/admin/admin_recept_38.jpg', 'KÖNNYÜ', 20, 8, 'OLCSÓ', '2025-05-12 10:53:33', 5, 'A tojásokat megmossuk, lábasba fektetjük, majd felöntjük hideg vízzel. Felforraljuk a vizet, forrástól számított 10 percig főzzük, majd jeges vízben lehűtjük a tojásokat, amiket így könnyen meg tudunk majd pucolni.\nA tojások fehérjét és sárgáját szétválasztjuk. Először a fehérjéket tesszük késes aprítóba, lezúzzuk finom, morzsás állagúra, majd félretesszük.\nEzután jönnek a tojássárgák az aprítóba, ezeket azonban már ízesítjük is: puha vaj, tejföl, majonézes torma és kevés citromlé mindenképp kerüljön bele, na meg só-bors is! A hagyma is jól áll a tojáskrémnek, mi most friss snidlinget és pirított hagymát tettünk bele, amitől kicsit pikánsabb lett a végeredmény.\nA tojássárgájás keveréket ezután krémmé turmixoljuk, majd egy nagy tálba kanalazzuk és összeforgatjuk az előkészített tojásfehérjével, ami remek légies állagot ad a kész tojáskrémnek.\nFelhasználásig tartsuk hűtőben a tojáskrémet, tálaláskor pedig díszíthetjük pirított hagymával és aprított snidlinggel megszórva.', 1, NULL, 1),
(39, 'Reszelt almás cinnamon roll', 5, 'REGGELI', 1, 269, './receptkepek/admin/admin_recept_39.jpg', 'KÖNNYÜ', 40, 9, 'OLCSÓ', '2025-05-12 10:53:36', 26, 'A puha vajat elkeverjük a fahéjjal, a barna cukorral és a sóval.\nA leveles tésztát kiterítjük, megkenjük a fahéjas töltelékkel.\nAz almákat ketté vágjuk, eltávolítjuk a magházat, majd egy szeletelővel legyaluljuk.\nAz almaszeleteket a fahéjas töltelékre fektetjük.\nA pekándiót pár perc alatt száraz serpenyőn megpirítjuk, majd Philips Series 5000 aprítógépben felaprítjuk, az almát tetejére szórjuk.\nA tésztát a rövidebb oldalánál fogva feltekerjük, majd egy recés kenyérszelő kés segítségével 9 felé szeljük.\nA Philips Airfryer Combi XXL forrólevegős sütő sütőformáját kikenjük vajjal, majd felsorakoztatjuk benne a tekercseket.\n180°C-on kb. 15-20 perc alatt készre sütjük őket.\nAz elkészült csigákat díszítsük mascarponés krémmel.', 1, NULL, 1),
(40, 'Ropogós kiflik', 5, 'REGGELI', 43, 578, './receptkepek/admin/admin_recept_40.jpg', 'KÖNNYÜ', 60, 4, 'OLCSÓ', '2025-05-12 10:53:38', 5, 'Az élesztőt a langyos tejben felfuttatjuk 10 perc alatt. A lisztet egy kelesztőtálba szitáljuk, majd ha az élesztő felfutott, az összes többi hozzávalóval hozzáadjuk. Alaposan kidagasztjuk és meleg helyen 40 percet kelesztjük.\nHa szépen megkelt a tészta 8 egyenlő részre osztjuk és gombócokat formázunk belőlük. Újra letakarjuk és 20 percet pihentetjük. Egyesével háromszög alakú formákra nyújtjuk, minél vékonyabbra, és a tészta szélesebbik részénél kezdve feltekerjük őket, majd sütőpapírral bélelt tepsire helyezzük úgy, hogy tisztes távolságot hagyunk közöttük, mert még a tepsiben kelni fognak.\nLetakarjuk és duplájára kelesztjük őket. A sütőt előmelegítjük 200 fokra, a sütő aljába egy edénybe vagy egy másik tepsibe vizet teszünk, hiszen gőzben fogjuk sütni. Ha megkeltek akkor lespricceljük a tetejüket vízzel és betoljuk a sütőbe. Amikor már színt kaptak, kivesszük a gőzös edényt, és így sütjük tovább, amíg gyönyörű aranybarnára nem sülnek. Megszórhatjuk magvakkal, ha valaki úgy szereti. Langyosra hűtjük és kínáljuk.', 1, NULL, 1),
(41, 'Dubai csokis babka', 5, 'TÍZÓRAI', 17, 690, './receptkepek/admin/admin_recept_41.jpg', 'KÖZEPES', 140, 10, 'DRÁGA', '2025-05-17 20:37:35', 8, 'Először keverjük össze a langyos tejet, az élesztőt, a porcukrot és a sót egy tálban. Ezután adjuk hozzá a lisztet és a tojásokat, majd keverjük össze ezt is. Gyúrjuk 8-10 percig, amíg sima és rugalmas nem lesz, félidőben pedig adjuk hozzá a puha vajat, és dolgozzuk el vele. Lisztes deszkán átgyúrhatjuk, majd fedjük le a tésztát, és hagyjuk kelni 1 órán át, amíg a duplájára nő.\nPirítsuk meg a kadayif tésztát 50 g vajban, amíg aranybarna nem lesz, majd még langyosan adjuk hozzá a pisztáciakrémet és a tahinit. Jól keverjük össze, és hagyjuk állni. A csokoládétöltelékhez olvasszuk fel a 70%-os csokoládét egy kevés tejszínnel, amíg sima állagú nem lesz. Hagyjuk picit hűlni.\nMiután a tészta megkelt, nyújtsuk ki kb 30 × 40 cm-es téglalapformára. Kenjük meg a csokoládéval, egyengessük el rajta a pisztáciás keveréket, majd szórjuk meg finomra vágott, pirított pisztáciával is.\nTekerjük fel a tésztát bejglialakúra, majd vágjuk fel hosszában, és csavarjuk össze a két rudat úgy, mintha fonatot csinálnánk.\nHelyezzük a babkát egy sütőpapírral bélelt kenyérformába, majd süssük előmelegített sütőben 180 °C-on 30-35 percig, amíg aranyszínű nem lesz. Tálaljuk extra csokoládéval és pisztáciával!', 1, NULL, 1),
(42, 'Minibarhesz', 5, 'TÍZÓRAI', 20, 691, './receptkepek/admin/admin_recept_42.jfif', 'KÖZEPES', 120, 5, 'OLCSÓ', '2025-05-17 20:37:39', 5, 'Keverjük össze a száraz hozzávalókat egy nagy keverőtálban (a lisztet, az élesztőt, a porcukrot és a csipet sót.)\nAdjuk hozzá a langyos tejet és a tojásokat a lisztes keverékhez. Alaposan dolgozzuk össze, amíg sima tésztát nem kapunk. Mikor már szinte összeállt, adagoljuk hozzá a vajat, és dolgozzuk sima, rugalmas tésztává. A munkapulton kissé át is gyúrhatjuk. A tésztát letakarva kelesszük 1 órán át, amíg a duplájára nő.\nA megkelt tésztát borítsuk lisztezett felületre, és formázzunk kis gombócokat belőle. Minden gombócot lapítsunk ki, majd tekerjük fel őket, és sodorjunk hosszúkás rudakat. Egy kalácshoz 4 rúdra lesz szükségünk. A fonáshoz a szálakat úgy rendezzük el, hogy mindig a második szálat emeljük fel, és hozzuk át a mellette lévő két szálon, majd az első szálat húzzuk át a mellette lévő szálon.\nA kész minibarheszeket helyezzük sütőpapírral bélelt tepsire, újra takarjuk le, majd kelesszük 30 percig, míg szépen megnőnek.\nMelegítsük elő a sütőt 180 °C-ra. A barheszeket kenjük meg a felvert tojással, és szórjuk meg a szezámmaggal. Süssük őket 15-20 percig, amíg aranybarnák nem lesznek.\nMiután kihűltek, helyezzük őket egy tálcára. Fogyaszthatjuk önmagában, hús, saláta mellé vagy jól megtöltve, akár hamburgerként is.', 1, NULL, 1),
(43, 'Céklakrémes dán nyitott szendvics', 5, 'TÍZÓRAI', 20, 260, './receptkepek/admin/admin_recept_43.jpg', 'KÖNNYÜ', 20, 10, 'OLCSÓ', '2025-05-17 20:37:41', 12, 'céklakrém\nHa nyers céklából készítjük a krémet, akkor a céklákat meghámozzuk és lereszeljük. Ha főzni szeretnénk a céklát, akkor hámozás után kockázzuk és vízben főzzük puhára.\nA reszelt céklát tegyük egy nagy tálba, és adjuk hozzá a kecskesajtot, a kaprot, valamint a fűszereket. Hogy még krémesebb legyen, adjunk hozzá pár kanál Vénusz Klasszik kenőmargarint is.\nNagyteljesítményű robotgéppel vagy botturmix segítségével turmixoljuk az egészet selymessé. Ha szükséges, csorgassunk hozzá kevés vizet is, hogy könnyebben összeálljon a krémünk.\n\nösszeállítás\nA rozskenyeret vékonyan felszeleteljük, megkenjük Vénusz Klasszik kenőmargarinnal, majd 1-2 kanállal kenünk rá a céklakrémből is.\nA tetejét tetszés szerint díszítsük tojással, kockázott kecskesajttal, ecetes céklával és mikrozöldekkel.', 1, NULL, 1),
(44, 'Húsvéti sonkás burger', 5, 'TÍZÓRAI', 3, 12851, './receptkepek/admin/admin_recept_44.jpg', 'KÖNNYÜ', 60, 1, 'ÁTLAGOS', '2025-05-17 20:37:43', 4, 'A tojássalátához főzzük a tojásokat lobogó sós vízben kb. 10 percig, majd hűtsük le őket hideg vízben. Hámozzuk meg, tegyük őket egy tálba, villával törjük össze, majd keverjük el majonézzel, tormával, finomra vágott újhagymával, csemegeuborkával, egy kevés lestyánnal, sóval és borssal. Jól forgassuk át, hogy homogén, de kissé darabos tojásos masszát kapjunk. Tegyük a hűtőbe állni, hogy összeérjenek az ízek.\nAz ecetes retekhez a retkeket alaposan mossuk meg, majd mandolinon vágjuk vékony szeletekre. Sózzuk le. Mehet rá a langyos almaecet, a cukor és a meleg víz is. Jó keverjük át, majd tegyük a hűtőbe. Minél tovább áll, annál ízletesebb lesz!\nA burger összeállításához vágjuk félbe a kis kalácsokat, kenjük meg tojássalátával, helyezzük rá a vékonyra szeletelt főtt sonkát, és olvasszunk rá két szelet cheddart. Erre jöhet 2-3 levél saláta, egy adag ecetes retek és néhány karika paradicsom. Kanalazzunk rá bőségesen még a tojássalátából, végül zárjuk le a kalács tetejével.\nA sonkaburgereket tálaljuk azonnal, még több friss zöldséggel vagy akár sült burgonyával!', 1, NULL, 1),
(45, 'Ropogós bagett', 5, 'TÍZÓRAI', 43, 606, './receptkepek/admin/admin_recept_45.jpg', 'KÖNNYÜ', 40, 3, 'OLCSÓ', '2025-05-17 20:37:45', 29, 'Egy keverőtálba öntsük bele a hideg vizet, morzsoljuk bele az élesztőt, majd kavarjuk el.\nAdjuk hozzá a kenyérlisztet és a sót, utána dagasszuk ki alaposan a tésztát.\nLetakarva pihentessük max. 1 órát szobahőmérsékleten. Közben hajtogathatunk rajta egyet, vagy laminálhatjuk is félúton.\nEzután mehet be a hűtőbe éjszakára pihenni. Fontos, hogy légmentesen legyen lezárva a kelesztőtál, különben kiszárad és kérges lesz a tészta.\nA hűtőből kivéve borítsuk ki enyhén lisztes felületre, majd vágjuk 4-5 egyenlő részre.\nOpcionálisan előformázhatjuk, ezután hagyjuk kb. 15 percet pihenni letakarva.\nUtána jöhet a végső formázás. Először az egyik oldalt hajtogassuk óvatosan a közepébe, majd rá a másik oldalát. Végül húzzuk át teljesen, és nyomkodjuk össze az alját.\nKözépről indulva sodorjuk kifelé gyengéden a tésztát. A végeit nyomjuk jobban össze, hogy szép hegyesek legyenek.\nFogjunk egy konyharuhát, amit szórjunk meg rizsliszttel, és tegyük rá a bagettet. Toljuk rá a szélére a konyharuhát, majd mehet mellé a következő. Ez azért fontos, mert így nem fognak összeérni a tészták, és felfelé fognak kelni, nem oldal irányban. Hagyjuk őket letakarva 30-60 percet kelni.\nÓvatosan helyezük át a megkelt bagetteket egy tepsire, majd metszük be őket hosszanti irányban.\nElőmelegített 250°C-os, begőzölt sütőbe tegyük őket kb. 20 percre sülni.', 1, NULL, 1),
(46, 'Virslis sültkrumpli-saláta', 5, 'TÍZÓRAI', 49, 264, './receptkepek/admin/admin_recept_46.jpg', 'KÖNNYÜ', 50, 8, 'OLCSÓ', '2025-05-17 20:37:47', 5, 'Először keményre főzzük a tojásokat sós vízben. 9-10 perc elteltével jeges vízbe tesszük őket, majd megpucoljuk, és félretesszük tálalásig.\nEzt követően közepes darabokra vágjuk az újburgonyát, és sós vízben puhára főzzük. Miután megfőtt, leszűrjük, meglocsoljuk zsírral, olívaolajjal, és ízesítjük sóval, borssal. Jól átkeverjük, majd sütőpapíros tepsire halmozzuk, és 260 fokon 20-25 perc alatt aranybarnára, ropogósra sütjük.\nAmíg a burgonya sül, előkészítjük a virslit. Felkarikázzuk, majd egy serpenyőben egy kevés zsíron aranybarnára sütjük. Ezután félretesszük.\nA lilahagymát és a kapribogyót apróra vágjuk, a többi zöldfűszert pedig egészen finomra aprítjuk.\nEgy nagy tálban összekeverjük a majonézt és a mustárt. Ezután hozzáadjuk a lilahagymát, a kaprit és a zöldfűszereket. Ecettel, citromhéjjal, sóval és borssal ízesítjük, majd alaposan összekeverjük, hogy minden hozzávaló elvegyüljön.\nEzután még langyosan hozzáadjuk a burgonyát és a sült virslit. A salátát legalább 30 percig pihentetjük a hűtőben, hogy az ízek jól összeérjenek, de langyosan is fogyaszthatjuk.\nTálaljuk friss salátaágyon, főtt tojással megkoronázva.', 1, NULL, 1),
(47, 'Deluxe epres muffin', 5, 'TÍZÓRAI', 13, 132, './receptkepek/admin/admin_recept_47.jpg', 'KÖNNYÜ', 30, 10, 'OLCSÓ', '2025-05-17 20:37:51', 5, 'Az almákat meghámozzuk, negyedeljük és kimagozzuk. A citromok héját levágjuk krumplihámozóval és kifacsarjuk a levüket. A citromlé felét az almára öntjük, majd átmasszírozzuk vele, hogy ne barnuljon be.\nEgy nagy fazék aljába szórjuk a cukrot, majd közepes lángon, az edényt néha forgatva megolvasztjuk, majd enyhén karamellizáljuk, míg szép mélybarna színt nem kap. Ekkor hozzáadjuk a fűszereket, majd a karamellt felöntjük a citromlével, rummal és vízzel.\nA karamell vissza fog keményedni: magas lángon addig főzzük a fazék tartalmát, míg a cukor újra fel nem oldódik.\nAz alapfőzethez adjuk a citromhéjat, majd az almagerezdeket is. Alacsony lángon, a vizet épp csak gyöngyözve, a kompótot néha megkavarva addig főzzük, míg a gyümölcs puha nem lesz. Vigyázzunk, ne főzzük szét!\nA kompótot tálalhatjuk azon melegében, de hidegen is. Sima üvegben egy hétig eláll a hűtőben, steril üvegben, dunszttal elrakva pedig több hónapot is kibír a kamrában.', 1, NULL, 1),
(48, 'Vegán melegszendvics', 5, 'UZSONNA', 10, 545, './receptkepek/admin/admin_recept_48.jpg', 'KÖNNYÜ', 60, 6, 'ÁTLAGOS', '2025-05-17 20:52:17', 4, 'A szendvicskrémhez\nA gombát megtisztítjuk és vékony szeletekre vágjuk. Egy nagy serpenyőt felforrósítunk, majd a gomba felét belevetjük és hagyjuk magas lángon kiizadni. Amikor a nedvesség elpárolgott, megsózzuk a gombát, ezzel kicsalva a maradék vizet is.\nA gombát meglocsoljuk két evőkanál olajjal, majd hozzáadjuk a fokhagyma felét. Borsozzuk és alaposan lepirítjuk, míg aranybarna és aromás nem lesz. A legvégén egy facsarásnyi citrommal meglocsoljuk, hogy a lesült ízes részek feloldódjanak. Egy tálba tesszük a sült gombát, majd a fent leírtak szerint elkészítjük a másik felét is.\nEgy késes aprítóba tesszük a leszűrt és alaposan átöblített babot, a sűrített paradicsomot és három evőkanál olívaolajat. Teljesen simára turmixoljuk, majd hozzáadjuk a sült gombát is. Pár pulzáló darálással egységes, de kissé darabos, rusztikus krémmé dolgozzuk az alapanyagokat. Megkóstoljuk és ha kell, sóval, borssal, citromlével ízesítjük.\nA sajtszószhoz\nA burgonyát és édesburgonyát meghámozzuk, megmossuk, majd kockákra vágjuk. Egy lábosba tesszük a kesudióval és fokhagymával, majd felöntjük annyi vízzel, hogy az ellepjen mindent. Fedő alatt addig főzzük az egészet, míg a zöldségek megpuhulnak. Ha kész, a főzővízből félreteszünk annyit, amennyi a recepthez kell.\nEgy turmixgépbe tesszük a zöldségeket, a kesudiót, majd hozzáadjuk a főzővizet, olívaolajat és fűszereket. Teljesen simára dolgozzuk (ha túl sűrű lenne, adjunk hozzá további főzővizet), majd megkóstoljuk és ízlés szerint tovább fűszerezzük.\nAz összeállításhoz\nA sütőnket előmelegítjük 200 fokra. A kenyérszeleteket egy tepsire tesszük, majd vastagon megkenjük a szendvicskrémmel. Rákanalazunk a sajtszószból is, majd betoljuk a tepsit a sütőbe. A szendvicseket először 10 percig sütjük hőlégkeverésen, majd további 10 percig felső sütési funkción. Ha szép, aranybarna a tetejük, elkészültek. Frissen, zöldségekkel, savanyúsággal, szószokkal tálaljuk.', 1, NULL, 1),
(49, 'Parmezános ropogós keksz', 5, 'UZSONNA', 15, 180, './receptkepek/admin/admin_recept_49.jpg', 'KÖNNYÜ', 45, 10, 'ÁTLAGOS', '2025-05-17 20:52:19', 45, 'A puha vajat a tojással keverjük habosra. Keverjünk bele minden hozzávalót, kivéve a szezámmagot, majd gyúrjuk össze a tésztát, picit ragacsos lesz.\nFormázzunk diónagyságú golyókat, majd hempergessük meg őket a szezámmagban úgy, hogy mindenhol befedje a külsejüket.\nTegyük a golyókat sütőpapírral bélelt tepsire, hagyjunk köztük 5 centi helyet. Tegyünk a tetejükre sütőpapírt, hogy ne ragadjon rá a tészta a pohárra, majd egy pohár aljával lapítsuk ki őket.\nMehet a sütőbe 15 percre, vagy amíg aranybarnák és ropogósak nem lesznek. Hagyjuk a tepsiben hűlni őket 4-5 percig, majd tegyük át egy rácsra, míg teljesen kihűlnek.', 1, NULL, 1),
(50, 'Retró sajtos tallér', 5, 'UZSONNA', 36, 387, './receptkepek/admin/admin_recept_50.jpg', 'KÖNNYÜ', 35, 6, 'ÁTLAGOS', '2025-05-17 20:52:21', 5, 'A hozzávalókat egy tálban összegyúrjuk, majd kicsi diónyi golyókba gyúrjuk.\nTallérsütőben a sütőhelyeknek megfelelő adagokban kisütjük.\nRövid hűtés után tálaljuk. Jó étvágyat hozzá!', 1, NULL, 1),
(51, 'Borsos tokány', 5, 'VACSORA', 9, 878, './receptkepek/admin/admin_recept_51.jpg', 'KÖNNYÜ', 115, 4, 'ÁTLAGOS', '2025-05-17 21:12:36', 5, 'A szalonnát vágjuk fel csíkokra és kezdjük el pirítani. Kanalazzunk rá egy evőkanál zsírt is pluszban. Mehet rá az apróra vágott vöröshagyma, és fokhagyma. Dinszteljük üvegesre.\nA sertéscombot vágjuk csíkokra (\"tokány\" méretűre) és tegyük a hagymás szalonnára. Pirítsuk fehéredésig és sózzuk-borsozzuk.\nA paradicsomot és a paprikát vágjuk fel apró kockákra.\nHa kifehéredett a húst, akkor adjuk hozzá a paradicsomot és a paprikát. Pár percig főzzük így.\nMajd öntsünk rá annyi alaplevet (vagy vizet), hogy ellepje. Adhatunk még hozzá egy evőkanál zsírt.\nFedő alatt főzzük puhára. Ez a hústól is függ, de kb. 1 órát mindenképp főzzük. (érdemes megkóstolni majd a húst, hogy biztosan megpuhult e) Az a lényeg, hogy a lé nagy része elfőjőn, és egy szaftos húst kapjunk a végén.\nTálaljuk rizzsel!', 1, NULL, 1),
(52, 'Egyszerű tojásfasírt', 5, 'VACSORA', 9, 316, './receptkepek/admin/admin_recept_52.jfif', 'KÖNNYÜ', 40, 6, 'OLCSÓ', '2025-05-17 21:12:38', 29, 'A tojások közül 9 darabot keményre főzünk, kihűtünk, majd meghámozunk. Ha száraz a zsemlénk, felkockázzuk, ha nem, darabokra vágjuk és megsütjük.\nA zsemlekockákat leöntjük a tejjel, majd hagyjuk, hogy megszívják magukat. A zöldfűszereket felaprítjuk. A hagymát felkockázzuk és némi olajon üvegesre dinszteljük. A fokhagymát felaprítjuk és 1-2 perc alatt lepirítjuk egy kevés olajon.\nA beáztatott zsemlét alaposan kinyomkodjuk, majd egy tálba tesszük a maradék nyers tojással, hagymával és fokhagymával, illetve az aprított zöldfűszerekkel. Hozzáreszeljük a főtt tojásokat is és az egészet ízlés szerint sózzuk, borsozzuk.\nKézzel egységes masszává dolgozzuk a fasírt alapját: ha túl száraz lenne, adjunk hozzá még nyers tojást, amennyiben viszont túl nedves, némi zsemlemorzsával korrigáljunk. A massza akkor jó, ha összenyomva egyben marad, de nem ragad a kézre.\nKis pogácsákat formázunk, majd zsemlemorzsába forgatjuk és forró olajban aranybarnára sütjük őket mindkét oldalon. Frissen, kedvünk szerint tálaljuk.', 1, NULL, 1),
(53, 'Paprikás újburgonya', 5, 'VACSORA', 9, 185, './receptkepek/admin/admin_recept_53.jpg', 'KÖNNYÜ', 65, 4, 'ÁTLAGOS', '2025-05-17 21:12:40', 5, 'A kápiákat megmossuk, szárazra töröljük, majd 200 fokos sütőben 20-25 perc alatt teljesen puhára sütjük. Egy tálba tesszük, frissentartó fóliával lefedjük és hagyjuk 15-20 percig pihenni. Utána eltávolítjuk a csumát és a magházat, illetve lehúzzuk a paprikák héját. A sült paprikahúst félretesszük.\nEgy fazékban az olajon elkezdjük dinsztelni a felkockázott hagymát. Fedő alatt 5-7 perc alatt üvegesre pároljuk, majd hozzáadjuk az aprított fokhagymát. 1-2 perc alatt lepirítjuk, ekkor jöhet a sűrített paradicsom. Közepes lángon, kevergetés mellett karamellizáljuk a sűrítményt, majd a tűzről lehúzva rászórjuk a fűszereket.\nA fűszeres alaphoz adjuk a kockázott paradicsomot, majd alacsony lángon, fedő alatt teljesen szétfőzzük. Hozzáadjuk a sült paprikát és a vizet, majd az egészet 10 perc alatt összefőzzük. Botmixerrel teljesen simára dolgozzuk az alapot.\nAz újburgonyát megmossuk, majd kisebb kockákra vágjuk. Hozzáadjuk a paradicsomos-paprikás alaphoz, majd fedő alatt puhára főzzük. Ha kell, ízlés szerint tovább fűszerezzük. Friss petrezselyemmel és kenyérrel tálaljuk.', 1, NULL, 1),
(54, 'Sonkaléleves medvehagymás maceszgombóccal', 5, 'VACSORA', 9, 230, './receptkepek/admin/admin_recept_54.jfif', 'KÖNNYÜ', 50, 8, 'OLCSÓ', '2025-05-17 21:12:42', 5, 'A leveshez\nA hagymát megpucoljuk. A zöldségeket megtisztítjuk és feldaraboljuk. A sonkalevet feltesszük főni a zöldségekkel, sóval és borssal: ha felforrt, beletesszük a maceszgombócokat és mindent puhára főzünk.\nA maceszgombóchoz\nA maceszt összetörjük egy konyharuhában, míg finom, de enyhén darabos állaga nem lesz. Elkeverjük a sóval, borssal és aprított medvehagymával.\nA száraz alaphoz adjuk a felvert tojásokat, olajat és szódavizet, majd egységes, nem túl ragacsos masszát keverünk. 30 percig pihentetjük, ez idő alatt jól megszívja magát.\nA pihentetett masszából vizes kézzel tetszőleges méretű gombócokat formázunk, majd a gyöngyöző levesbe engedjük őket. 30 perc alatt készre főzzük a levesben a gombócokat (mérettől függően).\nTálalás előtt a levest leszűrjük, majd a tiszta levet a főtt zöldségekkel és egy-két gombóccal tálaljuk.', 1, NULL, 1),
(55, 'Sonkás rántott palacsinta', 5, 'VACSORA', 9, 608, './receptkepek/admin/admin_recept_55.jfif', 'KÖNNYÜ', 60, 6, 'ÁTLAGOS', '2025-05-17 21:12:45', 5, 'A palacsintához\nA tojást, tejet, olajat és sót egy botmixerrel simára dolgozzuk egy tálban, majd hozzáadjuk a lisztet és azt is csomómentesre turmixoljuk. Fellazítjuk a szódával, amit kézi habverővel, óvatosan keverünk el a tésztában, majd az egészet 30 percig pihentetjük.\nForró serpenyőben (olajra nem lesz szükség, mert kisül elég a tésztából) kisütjük a palacsintákat: 10 közepes méretűt fogunk kapni.\nA sonkakrémhez\nAz összes hozzávalót krémesre dolgozzuk egy késes aprítóban.\nAz összeállításhoz\nFogunk egy palacsintát, a felénk eső alsó harmadába töltünk két evőkanál sonkakrémet, majd behajtjuk a kör két szélét és felcsavarjuk a tekercset. Miután az összes palacsintát megtöltöttük, 30 percre a fagyasztóba tesszük őket.\nA töltött palacsintákat bepanírozzuk a lisztben, tojásban és morzsában, majd a forró olajban aranybarnára sütjük őket. Frissen, azon melegében tálaljuk őket, némi tartármártás társaságában.', 1, NULL, 1),
(56, 'Zsidótojás', 5, 'VACSORA', 9, 231, './receptkepek/admin/admin_recept_56.jpg', 'KÖNNYÜ', 35, 8, 'OLCSÓ', '2025-05-17 21:12:47', 5, 'A tojásokat keményre főzzük, majd jeges vízbe tesszük hűlni és megpucoljuk őket.\nA libazsír felét egy serpenyőben felhevítjük és puhára pirítjuk rajta a finomra aprított fehér hagymát.\nAmikor a hagyma már üveges és pirult, hozzáadjuk a májat és gyakori kevergetés mellett, közepes lángon kb. 10-12 perc alatt megsütjük. Amikor kész, sózzuk-borsozzuk, majd félretesszük hűlni.\nA tojásokat lereszeljük nagylyukú reszelőn és hozzáadjuk a mustárt, a libazsír másik felét, a fűszerpaprikát és sózzuk-borsozzuk ezt is. Alaposan összeforgatjuk az egészet.\nA kész hagymás májat késsel finomra aprítjuk, majd a tojásos keverékhez forgatjuk.\nKanalazzuk át egy vagy több tálalóedénybe és fogyasztás előtt hagyjuk 1 órát pihenni, hogy összeérjenek az ízek. Fogyasszuk a kedvenc pékárunkra kenve vagy akár magában.', 1, NULL, 1);

--
-- Eseményindítók `receptek`
--
DELIMITER $$
CREATE TRIGGER `receptek_Delete` AFTER DELETE ON `receptek` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'receptek', OLD.id, NOW(), 'DELETE', OLD.neve, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `receptek_Insert` AFTER INSERT ON `receptek` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'receptek', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `receptek_Update` AFTER UPDATE ON `receptek` FOR EACH ROW BEGIN
    -- Log changes to email
    IF OLD.neve <> NEW.neve THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_NEVE', OLD.neve, NEW.neve);
    END IF;

   

    -- Log changes to user role
    IF OLD.napszak <> NEW.napszak THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_NAPSZAK', OLD.napszak, NEW.napszak);
    END IF;


    -- Log changes to profile picture
    IF OLD.etelfajta_id<> NEW.etelfajta_id THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_ETELFAJTA', OLD.etelfajta_id, NEW.etelfajta_id);
    END IF;

   IF OLD.kaloria <> NEW.kaloria THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_KALORIA', OLD.kaloria , NEW.kaloria);
    END IF;


   IF OLD.kepek <> NEW.kepek THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_KEPEK', OLD.kepek , NEW.kepek );
    END IF;


   IF OLD.nehezseg <> NEW.nehezseg THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_NEHEZSEG', OLD.nehezseg , NEW.nehezseg );
    END IF;    


   IF OLD.ido <> NEW.ido THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_IDO', OLD.ido , NEW.ido );
    END IF;       

   IF OLD.adag <> NEW.adag THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_ADAG', OLD.adag , NEW.adag );
    END IF;       

   IF OLD.ar <> NEW.ar THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_AR', OLD.ar , NEW.ar );
    END IF;           

   IF OLD.konyha_id <> NEW.konyha_id THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_KONYHAID', OLD.konyha_id , NEW.konyha_id );
    END IF; 

   IF OLD.elkeszites <> NEW.elkeszites THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_ELKESZITES', OLD.elkeszites , NEW.elkeszites );
    END IF; 	
   
   IF OLD.elfogadot <> NEW.elfogadot THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_ELFOGADOT', OLD.elfogadot , NEW.elfogadot );
    END IF; 

 IF OLD.gyerekmenu <> NEW.gyerekmenu THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptek', NEW.id, NOW(), 'UPDATE_GYEREKMENU', OLD.gyerekmenu , NEW.gyerekmenu );
    END IF; 
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `receptetrend`
--

CREATE TABLE `receptetrend` (
  `id` int(11) NOT NULL,
  `etrend_id` int(11) NOT NULL,
  `recept_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `receptetrend`
--

INSERT INTO `receptetrend` (`id`, `etrend_id`, `recept_id`) VALUES
(5, 50, 5),
(6, 48, 6),
(7, 3, 7),
(8, 48, 8),
(9, 42, 9),
(10, 27, 10),
(11, 19, 11),
(12, 34, 12),
(13, 5, 13),
(14, 4, 13),
(15, 5, 14),
(16, 5, 15),
(17, 63, 15),
(18, 62, 15),
(19, 46, 16),
(20, 44, 16),
(21, 5, 17),
(22, 47, 17),
(23, 45, 17),
(24, 44, 17),
(25, 8, 17),
(29, 3, 21),
(30, 7, 21),
(32, 13, 23),
(33, 5, 24),
(34, 2, 25),
(36, 5, 27),
(37, 5, 28),
(38, 54, 29),
(39, 56, 29),
(40, 57, 29),
(41, 55, 29),
(42, 57, 30),
(43, 54, 30),
(44, 7, 31),
(45, 13, 32),
(46, 13, 33),
(47, 57, 34),
(48, 13, 35),
(49, 13, 36),
(50, 13, 37),
(51, 13, 38),
(52, 13, 39),
(53, 13, 40),
(54, 13, 41),
(55, 13, 42),
(56, 13, 43),
(57, 33, 44),
(58, 45, 44),
(59, 47, 44),
(60, 59, 44),
(61, 13, 44),
(62, 13, 45),
(63, 66, 45),
(64, 44, 45),
(65, 45, 45),
(66, 46, 45),
(67, 47, 45),
(68, 54, 45),
(69, 57, 45),
(70, 68, 45),
(71, 56, 45),
(72, 55, 45),
(73, 13, 46),
(74, 69, 46),
(75, 13, 47),
(76, 57, 47),
(77, 56, 47),
(78, 55, 47),
(79, 54, 47),
(80, 54, 48),
(81, 57, 48),
(82, 13, 49),
(83, 69, 49),
(84, 41, 49),
(85, 13, 50),
(86, 67, 50),
(87, 2, 50),
(88, 13, 51),
(89, 19, 51),
(90, 20, 51),
(91, 53, 51),
(92, 62, 51),
(93, 66, 51),
(94, 68, 51),
(95, 13, 52),
(96, 13, 53),
(97, 13, 54),
(98, 67, 54),
(99, 66, 54),
(100, 62, 54),
(101, 44, 54),
(102, 45, 54),
(103, 47, 54),
(104, 13, 55),
(105, 66, 55),
(106, 62, 55),
(107, 13, 56);

--
-- Eseményindítók `receptetrend`
--
DELIMITER $$
CREATE TRIGGER `receptEtrend_Delete` AFTER DELETE ON `receptetrend` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'receptetrend', OLD.id, NOW(), 'DELETE', OLD.id, NULL)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `receptEtrend_Insert` AFTER INSERT ON `receptetrend` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'receptetrend', NEW.id, NOW(), 'INSERT', NULL, NEW.id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `receptEtrend_Update	` AFTER UPDATE ON `receptetrend` FOR EACH ROW BEGIN

    IF OLD.etrend_id <> NEW.etrend_id THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptetrend', NEW.id, NOW(), 'UPDATE_ETREND', OLD.etrend_id, NEW.etrend_id);
    END IF;


    IF OLD.recept_id <> NEW.recept_id THEN
        INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
        VALUES (NULL, 'receptetrend', NEW.id, NOW(), 'UPDATE_RECEPT', OLD.recept_id, NEW.recept_id);
    END IF;
END
$$
DELIMITER ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bevasarlolista`
--
ALTER TABLE `bevasarlolista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `hozzavalok_id` (`hozzavalok_id`);

--
-- A tábla indexei `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `recept_id` (`recept_id`);

--
-- A tábla indexei `etelfajta`
--
ALTER TABLE `etelfajta`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `etrend`
--
ALTER TABLE `etrend`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalojog`
--
ALTER TABLE `felhasznalojog`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `joga_id` (`joga_id`);

--
-- A tábla indexei `gyerekmenu`
--
ALTER TABLE `gyerekmenu`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `hetimenu`
--
ALTER TABLE `hetimenu`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `receptek_id` (`receptek_id`);

--
-- A tábla indexei `hozzavalok`
--
ALTER TABLE `hozzavalok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recept_id` (`recept_id`);

--
-- A tábla indexei `kedvenceklista`
--
ALTER TABLE `kedvenceklista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `recept_id` (`recept_id`);

--
-- A tábla indexei `konyha`
--
ALTER TABLE `konyha`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_konyha_neve` (`neve`);

--
-- A tábla indexei `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `receptek`
--
ALTER TABLE `receptek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `konyha_id` (`konyha_id`),
  ADD KEY `etelfajta_id` (`etelfajta_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `receptetrend`
--
ALTER TABLE `receptetrend`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etrend` (`etrend_id`),
  ADD KEY `recept` (`recept_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bevasarlolista`
--
ALTER TABLE `bevasarlolista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT a táblához `etelfajta`
--
ALTER TABLE `etelfajta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT a táblához `etrend`
--
ALTER TABLE `etrend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT a táblához `felhasznalojog`
--
ALTER TABLE `felhasznalojog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `gyerekmenu`
--
ALTER TABLE `gyerekmenu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT a táblához `hetimenu`
--
ALTER TABLE `hetimenu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `hozzavalok`
--
ALTER TABLE `hozzavalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=409;

--
-- AUTO_INCREMENT a táblához `kedvenceklista`
--
ALTER TABLE `kedvenceklista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `konyha`
--
ALTER TABLE `konyha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT a táblához `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1481;

--
-- AUTO_INCREMENT a táblához `receptek`
--
ALTER TABLE `receptek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT a táblához `receptetrend`
--
ALTER TABLE `receptetrend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bevasarlolista`
--
ALTER TABLE `bevasarlolista`
  ADD CONSTRAINT `bevasarlolista_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `bevasarlolista_ibfk_2` FOREIGN KEY (`hozzavalok_id`) REFERENCES `hozzavalok` (`id`);

--
-- Megkötések a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD CONSTRAINT `ertekeles_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `ertekeles_ibfk_2` FOREIGN KEY (`recept_id`) REFERENCES `receptek` (`id`);

--
-- Megkötések a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`joga_id`) REFERENCES `felhasznalojog` (`id`);

--
-- Megkötések a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  ADD CONSTRAINT `hozzaszolasok_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `hozzaszolasok_ibfk_2` FOREIGN KEY (`receptek_id`) REFERENCES `receptek` (`id`);

--
-- Megkötések a táblához `hozzavalok`
--
ALTER TABLE `hozzavalok`
  ADD CONSTRAINT `hozzavalok_ibfk_1` FOREIGN KEY (`recept_id`) REFERENCES `receptek` (`id`);

--
-- Megkötések a táblához `kedvenceklista`
--
ALTER TABLE `kedvenceklista`
  ADD CONSTRAINT `kedvenceklista_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `kedvenceklista_ibfk_2` FOREIGN KEY (`recept_id`) REFERENCES `receptek` (`id`);

--
-- Megkötések a táblához `receptek`
--
ALTER TABLE `receptek`
  ADD CONSTRAINT `receptek_ibfk_1` FOREIGN KEY (`konyha_id`) REFERENCES `konyha` (`id`),
  ADD CONSTRAINT `receptek_ibfk_3` FOREIGN KEY (`etelfajta_id`) REFERENCES `etelfajta` (`id`),
  ADD CONSTRAINT `receptek_ibfk_4` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);

--
-- Megkötések a táblához `receptetrend`
--
ALTER TABLE `receptetrend`
  ADD CONSTRAINT `etrend` FOREIGN KEY (`etrend_id`) REFERENCES `etrend` (`id`),
  ADD CONSTRAINT `recept` FOREIGN KEY (`recept_id`) REFERENCES `receptek` (`id`);

DELIMITER $$
--
-- Események
--
CREATE DEFINER=`root`@`localhost` EVENT `hetimenu_general` ON SCHEDULE EVERY 1 WEEK STARTS '2025-05-17 23:20:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Delete the old menu
    DELETE FROM hetimenu;
    
    -- Insert new random recipes for breakfast
    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'REGGELI' FROM receptek
    WHERE napszak = 'REGGELI' AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'TÍZÓRAI' FROM receptek
    WHERE napszak = 'TÍZÓRAI' AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for lunch
    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'EBÉD' FROM receptek
    WHERE napszak = 'EBÉD' AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'UZSONNA' FROM receptek
    WHERE napszak = 'UZSONNA' AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for dinner
    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'VACSORA' FROM receptek
    WHERE napszak = 'VACSORA' AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7; -- Adjust as needed
END$$

CREATE DEFINER=`root`@`localhost` EVENT `gyerekmenu_general` ON SCHEDULE EVERY 1 WEEK STARTS '2025-05-17 23:20:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Delete the old menu
    DELETE FROM gyerekmenu;
    
    -- Insert new random recipes for breakfast
    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'REGGELI' FROM receptek
    WHERE napszak = 'REGGELI' AND receptek.gyerekmenu = 1 AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'TÍZÓRAI' FROM receptek
    WHERE napszak = 'TÍZÓRAI' AND receptek.gyerekmenu = 1 AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for lunch
    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'EBÉD' FROM receptek
    WHERE napszak = 'EBÉD' AND receptek.gyerekmenu = 1 AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'UZSONNA' FROM receptek
    WHERE napszak = 'UZSONNA' AND receptek.gyerekmenu = 1 AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for dinner
    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'VACSORA' FROM receptek
    WHERE napszak = 'VACSORA' AND receptek.gyerekmenu = 1 AND receptek.elfogadot = 1
    ORDER BY RAND()
    LIMIT 7; -- Adjust as needed
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
