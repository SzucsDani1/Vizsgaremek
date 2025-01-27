-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Jan 13. 13:01
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
  `hozzavalok_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `bevasarlolista`
--

INSERT INTO `bevasarlolista` (`id`, `felhasznalo_id`, `hozzavalok_id`) VALUES
(2, 6, 1);

--
-- Eseményindítók `bevasarlolista`
--
DELIMITER $$
CREATE TRIGGER `bevasarloLista_Insert` AFTER INSERT ON `bevasarlolista` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'bevasarlolista', NEW.id, NOW(), 'INSERT', NULL, NEW.felhasznalo_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `bevasarloLista_Update` AFTER UPDATE ON `bevasarlolista` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'bevasarlolista', NEW.id, NOW(), 'UPDATE', OLD.hozzavalok_id, NEW.hozzavalok_id)
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
(1, 5, 1, 2, '2025-01-13 11:47:50');

--
-- Eseményindítók `ertekeles`
--
DELIMITER $$
CREATE TRIGGER `ertekeles_Insert` AFTER INSERT ON `ertekeles` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'ertekeles', NEW.id, NOW(), 'INSERT', NULL, NEW.ertek)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ertekeles_Update` AFTER UPDATE ON `ertekeles` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'ertekeles', NEW.id, NOW(), 'UPDATE', OLD.ertek, NEW.ertek)
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
(55, 'mentes receptek'),
(56, 'as'),
(59, 'igeen');

--
-- Eseményindítók `etelfajta`
--
DELIMITER $$
CREATE TRIGGER `etelfajta_Insert` AFTER INSERT ON `etelfajta` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'etelefajta', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `etelfajta_Update` AFTER UPDATE ON `etelfajta` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'etelfajta', NEW.id, NOW(), 'UPDATE', OLD.neve, NEW.neve)
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
CREATE TRIGGER `etrend_Insert` AFTER INSERT ON `etrend` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'etrend', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `etrend_Update` AFTER UPDATE ON `etrend` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'etrend', NEW.id, NOW(), 'UPDATE', OLD.neve, NEW.neve)
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
CREATE TRIGGER `felhasznalojog_Insert` AFTER INSERT ON `felhasznalojog` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'felhasznalojog', NEW.id, NOW(), 'INSERT', NULL, NEW.jognev)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `felhasznalojog_Update` AFTER UPDATE ON `felhasznalojog` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'felhasznalojog', NEW.id, NOW(), 'UPDATE', OLD.jognev, NEW.jognev)
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
(4, 'asd', '$2y$10$omRgOuk08KQt7wdUq5KiOexQRVwCx0ocPwiwHHSzSg4hiT0UCDuC.', 2, 'asd', NULL, '2024-11-25 11:38:06', NULL),
(5, 'admin', '$2y$10$ZJb/iRnFrzUGOeYjX12IV.Hut6wYiVh4c2Q/Zv9Fd8E4GmncYHfx.', 1, 'teszt@teszt.com', NULL, '2024-11-25 11:41:01', NULL),
(6, 'alma', '$2y$10$mbd.cLq9dRTJd/51lHCEF.fs3uh.UBfi6SHfe7KKoXeSMQmQe2DBK', 2, 'alma', NULL, '2024-11-25 11:54:58', NULL),
(7, 'tes', '$2y$10$MQ5RwHhR9GU1UJp51U47H.wdPXzmBXoWOpnJ8UyE7ibGaqNwpazDa', 2, 'tes', NULL, '2024-11-25 11:55:55', NULL);

--
-- Eseményindítók `felhasznalok`
--
DELIMITER $$
CREATE TRIGGER `felhasznalok_Insert` AFTER INSERT ON `felhasznalok` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'felhasznalok', NEW.id, NOW(), 'INSERT', NULL, NEW.felhnev)
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
  `receptek_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Eseményindítók `hozzaszolasok`
--
DELIMITER $$
CREATE TRIGGER `hozzaszolasok_Insert` AFTER INSERT ON `hozzaszolasok` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'hozzaszolasok', NEW.id, NOW(), 'INSERT', NULL, NEW.hozzaszolas)
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
  `mertek_egyseg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `hozzavalok`
--

INSERT INTO `hozzavalok` (`id`, `recept_id`, `hozzavalo`, `mennyiseg`, `mertek_egyseg`) VALUES
(1, 1, 'teszt', 12, 'kg');

--
-- Eseményindítók `hozzavalok`
--
DELIMITER $$
CREATE TRIGGER `hozzavalok_Insert` AFTER INSERT ON `hozzavalok` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'hozzavalok', NEW.id, NOW(), 'INSERT', NULL, NEW.hozzavalo)
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
CREATE TRIGGER `kedvenceklista_Insert` BEFORE INSERT ON `kedvenceklista` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'kedvenceklista', NEW.id, NOW(), 'INSERT', NULL, NEW.felhasznalo_id)
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
(1, ' német'),
(2, ' francia'),
(3, ' olasz'),
(4, ' angol'),
(5, ' magyar'),
(6, ' spanyol'),
(7, ' orosz'),
(8, ' arab'),
(9, ' kínai'),
(10, ' japán'),
(11, ' thai'),
(12, ' skandináv'),
(13, ' mexikói'),
(14, ' indiai'),
(15, ' afrikai'),
(16, ' izlandi'),
(17, ' izraeli'),
(18, ' osztrák'),
(19, ' svájci'),
(20, ' holland'),
(21, ' bolgár'),
(22, ' görög'),
(23, ' albán'),
(24, ' török'),
(25, ' román'),
(26, ' amerikai'),
(27, ' lengyel'),
(28, ' grúz'),
(29, ' afgán'),
(30, ' mongol'),
(31, ' argentin'),
(32, ' koreai'),
(33, ' brazil'),
(34, ' kubai'),
(35, ' cigány'),
(36, ' kanadai'),
(37, ' azerbajdzsáni'),
(38, ' kirgizisztán'),
(39, ' tatár'),
(40, ' vietnami'),
(41, ' pakisztáni'),
(42, ' filippínó'),
(43, ' malajziai'),
(44, ' örmény'),
(45, ' britt'),
(46, ' ausztráliai');

--
-- Eseményindítók `konyha`
--
DELIMITER $$
CREATE TRIGGER `konyha_Insert` AFTER INSERT ON `konyha` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'konyha', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
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
(12, 'felhasznalojog', 3, '2025-01-13 12:53:01', 'UPDATE', 'teszt', 'igen');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `receptek`
--

CREATE TABLE `receptek` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) DEFAULT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `etrend_id` int(11) DEFAULT NULL,
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
  `elfogadot` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `receptek`
--

INSERT INTO `receptek` (`id`, `neve`, `felhasznalo_id`, `etrend_id`, `napszak`, `etelfajta_id`, `kaloria`, `kepek`, `nehezseg`, `ido`, `adag`, `ar`, `mikor_feltolt`, `konyha_id`, `elkeszites`, `elfogadot`) VALUES
(1, 'teszt', 5, 32, 'reggeli', 40, 120, NULL, 'Könnyű', 5, 4, 'Olcsó', '2025-01-13 11:09:47', 15, 'Gyorsan', 0);

--
-- Eseményindítók `receptek`
--
DELIMITER $$
CREATE TRIGGER `receptek_Insert` AFTER INSERT ON `receptek` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ('' , 'receptek', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
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
  ADD KEY `joga_id` (`joga_id`),
  ADD KEY `feltoltot_receptek_szama` (`feltoltot_receptek_szama`);

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
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `etrend_id` (`etrend_id`),
  ADD KEY `etelfajta_id` (`etelfajta_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bevasarlolista`
--
ALTER TABLE `bevasarlolista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `etelfajta`
--
ALTER TABLE `etelfajta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT a táblához `etrend`
--
ALTER TABLE `etrend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT a táblához `felhasznalojog`
--
ALTER TABLE `felhasznalojog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `hozzaszolasok`
--
ALTER TABLE `hozzaszolasok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `hozzavalok`
--
ALTER TABLE `hozzavalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `kedvenceklista`
--
ALTER TABLE `kedvenceklista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `konyha`
--
ALTER TABLE `konyha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT a táblához `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `receptek`
--
ALTER TABLE `receptek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`joga_id`) REFERENCES `felhasznalojog` (`id`),
  ADD CONSTRAINT `felhasznalok_ibfk_2` FOREIGN KEY (`feltoltot_receptek_szama`) REFERENCES `receptek` (`felhasznalo_id`);

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
  ADD CONSTRAINT `receptek_ibfk_2` FOREIGN KEY (`etrend_id`) REFERENCES `etrend` (`id`),
  ADD CONSTRAINT `receptek_ibfk_3` FOREIGN KEY (`etelfajta_id`) REFERENCES `etelfajta` (`id`),
  ADD CONSTRAINT `receptek_ibfk_4` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
