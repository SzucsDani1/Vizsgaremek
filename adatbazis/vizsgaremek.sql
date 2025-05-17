-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Máj 17. 21:59
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `receptek`
--

DROP TABLE IF EXISTS `receptek`;
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
(24, 'Currys csirkemell', 5, 'EBÉD', 3, 557, './receptkepek/admin/admin_recept_24.png', 'KÖZEPES', 60, 4, 'ÁTLAGOS', '2025-04-15 07:58:41', 10, 'Serpenyőben olívaolajon lepirítjuk a csirkemellet, majd ha jól átsült,\nfélretesszük. Az apróra vágott hagymát, fokhagymát és reszelt\ngyömbért lepirítjuk, majd amikor üvegesre pároltuk, ráöntjük a\ncurryport. Hozzáadjuk a csirkemellet, és hozzáöntjük a kókuszkrémet és\na paradicsomot. Jól összeforraljuk, borsozzuk, végül a spenótot is\nhozzárakjuk. Pár percig főzzük még, végül rizzsel tálaljuk.', 1, NULL, 0),
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
(40, 'Ropogós kiflik', 5, 'REGGELI', 43, 578, './receptkepek/admin/admin_recept_40.jpg', 'KÖNNYÜ', 60, 4, 'OLCSÓ', '2025-05-12 10:53:38', 5, 'Az élesztőt a langyos tejben felfuttatjuk 10 perc alatt. A lisztet egy kelesztőtálba szitáljuk, majd ha az élesztő felfutott, az összes többi hozzávalóval hozzáadjuk. Alaposan kidagasztjuk és meleg helyen 40 percet kelesztjük.\nHa szépen megkelt a tészta 8 egyenlő részre osztjuk és gombócokat formázunk belőlük. Újra letakarjuk és 20 percet pihentetjük. Egyesével háromszög alakú formákra nyújtjuk, minél vékonyabbra, és a tészta szélesebbik részénél kezdve feltekerjük őket, majd sütőpapírral bélelt tepsire helyezzük úgy, hogy tisztes távolságot hagyunk közöttük, mert még a tepsiben kelni fognak.\nLetakarjuk és duplájára kelesztjük őket. A sütőt előmelegítjük 200 fokra, a sütő aljába egy edénybe vagy egy másik tepsibe vizet teszünk, hiszen gőzben fogjuk sütni. Ha megkeltek akkor lespricceljük a tetejüket vízzel és betoljuk a sütőbe. Amikor már színt kaptak, kivesszük a gőzös edényt, és így sütjük tovább, amíg gyönyörű aranybarnára nem sülnek. Megszórhatjuk magvakkal, ha valaki úgy szereti. Langyosra hűtjük és kínáljuk.', 1, NULL, 1);

--
-- Eseményindítók `receptek`
--
DROP TRIGGER IF EXISTS `receptek_Delete`;
DELIMITER $$
CREATE TRIGGER `receptek_Delete` AFTER DELETE ON `receptek` FOR EACH ROW INSERT INTO `log` (`id`, `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES (NULL, 'receptek', OLD.id, NOW(), 'DELETE', OLD.neve, NULL)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `receptek_Insert`;
DELIMITER $$
CREATE TRIGGER `receptek_Insert` AFTER INSERT ON `receptek` FOR EACH ROW INSERT INTO `log` ( `tablazat_nev`, `valtozott_id`, `datum`, `log_tipus`, `elozo_ertek`, `uj_ertek`)
    VALUES ( 'receptek', NEW.id, NOW(), 'INSERT', NULL, NEW.neve)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `receptek_Update`;
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

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `receptek`
--
ALTER TABLE `receptek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `konyha_id` (`konyha_id`),
  ADD KEY `etelfajta_id` (`etelfajta_id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `receptek`
--
ALTER TABLE `receptek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `receptek`
--
ALTER TABLE `receptek`
  ADD CONSTRAINT `receptek_ibfk_1` FOREIGN KEY (`konyha_id`) REFERENCES `konyha` (`id`),
  ADD CONSTRAINT `receptek_ibfk_3` FOREIGN KEY (`etelfajta_id`) REFERENCES `etelfajta` (`id`),
  ADD CONSTRAINT `receptek_ibfk_4` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
