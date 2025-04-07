-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 07. 12:50
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
-- A tábla adatainak kiíratása `bevasarlolista`
--

INSERT INTO `bevasarlolista` (`id`, `felhasznalo_id`, `hozzavalok_id`, `adag`) VALUES
(14, 5, 5, 1),
(19, 5, 5, 5),
(21, 5, 5, 6),
(26, 5, 1, 7),
(32, 6, 1, 5),
(33, 6, 5, 7);

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
(4, 6, 1, 6, '2025-03-08 17:16:26'),
(6, 14, 1, 3, '2025-03-17 17:34:13'),
(29, 5, 1, 1, '2025-03-20 16:44:14'),
(33, 16, 3, 4, '2025-03-28 21:49:42'),
(34, 16, 12, 5, '2025-03-28 21:52:21');

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
(5, 'admin', '$2y$10$ZJb/iRnFrzUGOeYjX12IV.Hut6wYiVh4c2Q/Zv9Fd8E4GmncYHfx.', 1, 'teszt@teszt.com', './feltoltotKepek/profilKepek/admin/admin_profilkep.jpg', '2025-04-07 10:32:43', NULL),
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
(16, 3, 'iSTEN', 'REGGELI'),
(17, 5, 'Tükör tojás', 'REGGELI'),
(19, 7, 'Virslis-lencsés tész', 'TÍZÓRAI'),
(20, 6, 'Hagymás tojássaláta', 'TÍZÓRAI'),
(22, 1, 'teszt', 'EBÉD'),
(23, 8, 'Rántott karfiol', 'EBÉD'),
(25, 10, 'Avokádókrém', 'UZSONNA'),
(26, 9, 'Sonkás-tormás babka', 'UZSONNA'),
(28, 12, 'Rösztipizza', 'VACSORA'),
(29, 11, 'Tojásfasírt', 'VACSORA');

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
(5, 5, 'asd', 1, '2025-03-16 22:43:32'),
(6, 5, 'asdd', 1, '2025-03-17 18:23:33'),
(7, 5, 'asdd', 1, '2025-03-17 18:25:58'),
(8, 5, 'asdd', 1, '2025-03-17 18:26:00'),
(9, 5, 'asd\nasdasd\nasd', 1, '2025-03-19 22:20:35'),
(10, 5, 'a\na\naaa', 1, '2025-03-19 23:13:31'),
(11, 6, 'asda\naa', 1, '2025-03-20 18:00:21');

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
(1, 1, 'teszt', 12, 'kg', 'Próba'),
(5, 1, '[value-3]', 3, '[value-5]', 'Próba'),
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
(61, 17, 'csokoládé', 1, 'csésze', 'tészta');

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
(380, 'receptetrend', 25, '2025-04-07 12:49:34', 'INSERT', NULL, '25');

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
(1, 'teszt', 5, 'REGGELI', 40, 120, NULL, 'Könnyű', 5, 4, 'Olcsó', '2025-03-29 09:10:56', 15, 'Gyorsan', 0, NULL, 0),
(3, 'iSTEN', 5, 'REGGELI', 40, 15000, 'asd', 'easy', 150, 85, 'drtaga', '2025-03-29 09:08:16', 15, 'asdkjfhsaldif', 0, NULL, 1),
(5, 'Tükör tojás', 5, 'REGGELI', 6, NULL, NULL, 'könnyű', 3, 1, '34', '2025-03-28 19:57:17', 28, 'asd', NULL, NULL, 1),
(6, 'Hagymás tojássaláta', 14, 'TÍZÓRAI', 5, 4, NULL, 'Nehéz', 3, 1, '356', '2025-03-28 19:58:23', 23, 'asdddd', NULL, NULL, NULL),
(7, 'Virslis-lencsés tész', 6, 'TÍZÓRAI', 6, 345, NULL, 'Közepes', 2, 1, '8', '2025-03-28 19:59:40', 28, 'aaaaaa', NULL, NULL, NULL),
(8, 'Rántott karfiol', 6, 'EBÉD', 5, 3, NULL, 'Könnyű', 4, 1, '34', '2025-03-28 20:00:26', NULL, 'ffff', NULL, NULL, NULL),
(9, 'Sonkás-tormás babka', 5, 'UZSONNA', 6, 4, NULL, 'Könnyű', 3, 1, '23', '2025-03-28 20:01:28', 23, 'hhhhhhhh', NULL, NULL, 0),
(10, 'Avokádókrém', 6, 'UZSONNA', 37, 3, NULL, 'Nehéz', 3, 1, '4455', '2025-03-28 20:02:35', 4, 'ggggg', 0, NULL, 0),
(11, 'Tojásfasírt', 6, 'VACSORA', 4, 3, NULL, 'Nehéz', 23, 1, '34', '2025-03-28 20:03:29', 2, 'qqqqq', 0, NULL, 0),
(12, 'Rösztipizza', 6, 'VACSORA', 4, 3, NULL, 'Közepes', 23, 1, NULL, '2025-03-28 20:04:04', 8, NULL, 0, NULL, 0),
(13, 'Poutine', 5, 'EBÉD', 3, 750, './receptkepek/admin/admin_recept_13.png', 'KÖNNYÜ', 25, 1, 'OLCSÓ', '2025-04-07 09:50:28', 20, 'Megsütjük a krumplit. A krumplira rá szórjuk a sajtos túró darabkakákat majd nyakon öntjük a szafttal és ízlés szerint tálaljuk.', 1, NULL, 1),
(14, 'Amerikai Palacsinta', 5, 'REGGELI', 1, 323, './receptkepek/admin/admin_recept_14.jpg', 'KÖNNYÜ', 30, 1, 'ÁTLAGOS', '2025-04-07 10:01:28', 26, 'Az összes hozzávalót beletesszük a turmixba, és alaposan összemixeljük. Érdemes 2 részletben hozzáadni a tejet és a lisztet, így egyszerűbb, hatékonyabb. Felforrósítunk és beolajozunk egy teflon serpenyőt. A tésztakeverékből 2-3 korongot csorgatunk bele. A turmix kiöntője segítségével egyszerű adagolni. Aranybarnára sütjük mindkét oldalát. Ízlés szerint fogyaszthatjuk mézzel, mogyorókrémmel, olvasztott csokival, lekvárral, juharsziruppal.', 1, NULL, 1),
(15, 'Burrito', 5, 'EBÉD', 3, 600, './receptkepek/admin/admin_recept_15.jpg', 'NEHÉZ', 50, 1, 'DRÁGA', '2025-04-07 10:31:44', 29, 'Összeállítás Hevítsük fel az olajat és pirítsuk meg rajta a darált húst, amit fűszerezünk a burrito fűszerrel (vagy házilag is keverhetünk: pirospaprika, oregánó,barna cukor, só, cayenne bors, fokhagymapor, vöröshagymapor). A tortillát kenjük meg tejföllel, majd kanalazzunk rá a babból. Jöhet rá a sült hús, főtt rizs, kukorica, pico de gallo, 1-2 karika jalapeno. Csavarjuk fel és serpenyőben süssük meg mindkét oldalát. Csavarjuk alufóliába, hogy jobban összeálljon. Vágjuk félbe és tálaljuk tejföllel és jalapenoval. Pico de gallo Mindent vágjunk fel nagyon apróra, majd facsarjuk rá a lime levét és sózzuk-borsozzuk. Paradicsomos bab Hevítsük fel az olajat és az apróra vágott lila hagymát, fokhagymát dinszteljük meg. Tegyük rá a paradicsompürét és kicsit karamellizáljuk. Jöhet rá az átöblített konzerves bab, amit sózzunk-borsozzunk. Öntsük fel kis vízzel és főzzük puhára.', 1, NULL, 1),
(16, 'Csirke szárny', 5, 'REGGELI', 38, 350, './receptkepek/admin/admin_recept_16.jpg', 'KÖNNYÜ', 45, 1, 'OLCSÓ', '2025-04-07 10:31:31', 26, 'A csirkeszárnyakat megmossuk, majd \"összecsomagoljuk\", hogy sütés közben ne nyíljanak ki. A fűszereket alaposan összekeverjük a lereszelt fokhagymával és gyömbérrel, valamint az olívaolajjal és a mézzel. Kevés szójaszósszal ízesítjük a pácot, és megkenjük vele a szárnyakat. Hagyjuk legalább fél órát szobahőmérsékleten pácolódni, aztán tegyük sütőpapírral bélelt tepsire, majd a 180 fokra előmelegített sütőbe 30-35 percre, amíg szépen meg nem pirul.', 1, NULL, 1),
(17, 'chocolate chip cookie', 5, 'UZSONNNA', 12, 200, './receptkepek/admin/admin_recept_17.jpg', 'KÖNNYÜ', 30, 1, 'ÁTLAGOS', '2025-04-07 10:49:34', 26, 'Melegítsd elő a sütőt 180°C-ra, és bélelj ki egy tepsit sütőpapírral. Egy kis tálban keverd össze a kukoricakeményítőt és a vizet, majd tedd félre. Egy nagyobb tálban habosítsd fel a vajat a barna és kristálycukorral. Add hozzá a tojást és a vaníliakivonatot, majd keverd simára. Szitáld hozzá a lisztet, sütőport, szódabikarbónát és sót, majd keverd össze. Öntsd hozzá a keményítős keveréket, majd óvatosan dolgozd össze a tésztát. Forgasd bele a csokoládét. Egy kanál segítségével adagold a tésztát a sütőpapírra, kb. 5 cm távolságra egymástól. Süsd 10-12 percig, vagy amíg a szélei aranybarnára sülnek. Hűtsd ki rácson, majd tálald.', 0, NULL, 1);

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
(1, 1, 1),
(4, 33, 3),
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
(25, 8, 17);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `hetimenu`
--
ALTER TABLE `hetimenu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `hozzavalok`
--
ALTER TABLE `hozzavalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT a táblához `kedvenceklista`
--
ALTER TABLE `kedvenceklista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `konyha`
--
ALTER TABLE `konyha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT a táblához `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=381;

--
-- AUTO_INCREMENT a táblához `receptek`
--
ALTER TABLE `receptek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `receptetrend`
--
ALTER TABLE `receptetrend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
CREATE DEFINER=`root`@`localhost` EVENT `hetimenu_general` ON SCHEDULE EVERY 1 WEEK STARTS '2025-03-24 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Delete the old menu
    DELETE FROM hetimenu;
    
    -- Insert new random recipes for breakfast
    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'REGGELI' FROM receptek
    WHERE napszak = 'REGGELI'
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'TÍZÓRAI' FROM receptek
    WHERE napszak = 'TÍZÓRAI'
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for lunch
    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'EBÉD' FROM receptek
    WHERE napszak = 'EBÉD'
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'UZSONNA' FROM receptek
    WHERE napszak = 'UZSONNA'
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for dinner
    INSERT INTO hetimenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'VACSORA' FROM receptek
    WHERE napszak = 'VACSORA'
    ORDER BY RAND()
    LIMIT 7; -- Adjust as needed
END$$

CREATE DEFINER=`root`@`localhost` EVENT `gyerekmenu_general` ON SCHEDULE EVERY 1 WEEK STARTS '2025-03-24 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Delete the old menu
    DELETE FROM gyerekmenu;
    
    -- Insert new random recipes for breakfast
    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'REGGELI' FROM receptek
    WHERE napszak = 'REGGELI' AND receptek.gyerekmenu = 1
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'TÍZÓRAI' FROM receptek
    WHERE napszak = 'TÍZÓRAI' AND receptek.gyerekmenu = 1
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for lunch
    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'EBÉD' FROM receptek
    WHERE napszak = 'EBÉD' AND receptek.gyerekmenu = 1
    ORDER BY RAND()
    LIMIT 7;

    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'UZSONNA' FROM receptek
    WHERE napszak = 'UZSONNA' AND receptek.gyerekmenu = 1
    ORDER BY RAND()
    LIMIT 7;
    
    -- Insert new random recipes for dinner
    INSERT INTO gyerekmenu (recept_id, recept_neve, napszak)
    SELECT id, neve, 'VACSORA' FROM receptek
    WHERE napszak = 'VACSORA' AND receptek.gyerekmenu = 1
    ORDER BY RAND()
    LIMIT 7; -- Adjust as needed
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
