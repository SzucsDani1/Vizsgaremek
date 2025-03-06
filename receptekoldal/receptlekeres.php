<?php
//RewriteRule ^(.*)$ /13c-szucs/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]
//RewriteRule ^(.*)$ /13osztaly/Viszgaremek/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]

    include "./sql_fuggvenyek.php";
    $teljesURL = explode("/", $_SERVER["REQUEST_URI"]);
    $url = explode("?", end($teljesURL));

    $bodyAdatok = json_decode(file_get_contents("php://input"), true);

    switch (mb_strtolower($url[0])){
       case "nehezseg":
           if($_SERVER["REQUEST_METHOD"] == "GET"){
                $nehezseg = adatokLekerdezese("SELECT receptek.nehezseg FROM receptek;");
                if(is_array($nehezseg) && !empty($nehezseg)){
                    echo json_encode($nehezseg, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;
        case "etelfajta":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $etelfajta = adatokLekerdezese("SELECT etelfajta.neve FROM etelfajta;");
                if(is_array($etelfajta) && !empty($etelfajta)){
                    echo json_encode($etelfajta, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;
        case "alapanyag":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $alapanyag = adatokLekerdezese("SELECT hozzavalok.hozzavalo FROM `hozzavalok`;");
                if(is_array($alapanyag) && !empty($alapanyag)){
                    echo json_encode($alapanyag, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "konyha":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $konyha = adatokLekerdezese("SELECT konyha.neve FROM konyha");
                if(is_array($konyha) && !empty($konyha)){
                    echo json_encode($konyha, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "etrend":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $etrend = adatokLekerdezese("SELECT etrend.neve FROM `etrend`;");
                if(is_array($etrend) && !empty($etrend)){
                    echo json_encode($etrend, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;


        case "szures":
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                // Szűréshez használt feltételek tömbje
                $szuroFeltetelek = [];
        
                // Kategória szűrés (az etelfajta táblából)
                if (!empty($bodyAdatok["kategoriak"]) && is_array($bodyAdatok["kategoriak"])) {
                    $kategoriakAzonositoTomb = [];
                    foreach ($bodyAdatok["kategoriak"] as $kivalasztottKategoria) {
                        $kategoriaNev = trim($kivalasztottKategoria);
                        $eredmenySor = adatokLekerdezese("SELECT id FROM etelfajta WHERE LOWER(neve) = LOWER('$kategoriaNev')");
                        if (is_array($eredmenySor) && !empty($eredmenySor)) {
                            $kategoriakAzonositoTomb[] = $eredmenySor[0]['id'];
                        }
                    }
                    if (!empty($kategoriakAzonositoTomb)) {
                        $azonositoLista = implode(",", $kategoriakAzonositoTomb);
                        $szuroFeltetelek[] = "receptek.etelfajta_id IN ($azonositoLista)";
                    }
                }
        
                // Alapanyag szűrés (az hozzavalok táblából – a receptnek tartalmaznia kell az összes választott alapanyagot)
                if (!empty($bodyAdatok["alapanyagok"]) && is_array($bodyAdatok["alapanyagok"])) {
                    $alapanyagFeltetelek = [];
                    foreach ($bodyAdatok["alapanyagok"] as $kivalasztottAlapanyag) {
                        $alapanyagNev = trim($kivalasztottAlapanyag);
                        $alapanyagFeltetelek[] = "EXISTS (SELECT 1 FROM hozzavalok WHERE hozzavalok.recept_id = receptek.id AND LOWER(hozzavalok.hozzavalo) = LOWER('$alapanyagNev'))";
                    }
                    if (!empty($alapanyagFeltetelek)) {
                        $szuroFeltetelek[] = "(" . implode(" AND ", $alapanyagFeltetelek) . ")";
                    }
                }
        
                // Kizárt alapanyag szűrés (azok a receptek, amelyek nem tartalmazzák a választott kizárt alapanyagokat)
                if (!empty($bodyAdatok["alapanyagok_nelkul"]) && is_array($bodyAdatok["alapanyagok_nelkul"])) {
                    $kizartAlapanyagFeltetelek = [];
                    foreach ($bodyAdatok["alapanyagok_nelkul"] as $kivalasztottKizartAlapanyag) {
                        $kizartAlapanyagNev = trim($kivalasztottKizartAlapanyag);
                        $kizartAlapanyagFeltetelek[] = "NOT EXISTS (SELECT 1 FROM hozzavalok WHERE hozzavalok.recept_id = receptek.id AND LOWER(hozzavalok.hozzavalo) = LOWER('$kizartAlapanyagNev'))";
                    }
                    if (!empty($kizartAlapanyagFeltetelek)) {
                        $szuroFeltetelek[] = "(" . implode(" AND ", $kizartAlapanyagFeltetelek) . ")";
                    }
                }
        
                // Étrend szűrés (az etrend táblából)
                if (!empty($bodyAdatok["etrend"]) && is_array($bodyAdatok["etrend"])) {
                    $etrendAzonositoTomb = [];
                    foreach ($bodyAdatok["etrend"] as $kivalasztottEtrend) {
                        $etrendNev = trim($kivalasztottEtrend);
                        $eredmenySor = adatokLekerdezese("SELECT id FROM etrend WHERE LOWER(neve) = LOWER('$etrendNev')");
                        if (is_array($eredmenySor) && !empty($eredmenySor)) {
                            $etrendAzonositoTomb[] = $eredmenySor[0]['id'];
                        }
                    }
                    if (!empty($etrendAzonositoTomb)) {
                        $azonositoLista = implode(",", $etrendAzonositoTomb);
                        $szuroFeltetelek[] = "receptek.etrend_id IN ($azonositoLista)";
                    }
                }
        
                // Konyha szűrés (a konyha táblából)
                if (!empty($bodyAdatok["konyha"]) && is_array($bodyAdatok["konyha"])) {
                    $konyhaAzonositoTomb = [];
                    foreach ($bodyAdatok["konyha"] as $kivalasztottKonyha) {
                        $konyhaNev = trim($kivalasztottKonyha);
                        $eredmenySor = adatokLekerdezese("SELECT id FROM konyha WHERE LOWER(neve) = LOWER('$konyhaNev')");
                        if (is_array($eredmenySor) && !empty($eredmenySor)) {
                            $konyhaAzonositoTomb[] = $eredmenySor[0]['id'];
                        }
                    }
                    if (!empty($konyhaAzonositoTomb)) {
                        $azonositoLista = implode(",", $konyhaAzonositoTomb);
                        $szuroFeltetelek[] = "receptek.konyha_id IN ($azonositoLista)";
                    }
                }
        
                // A végső SQL lekérdezés összeállítása
                $sql = "SELECT receptek.id, receptek.neve, receptek.felhasznalo_id, receptek.etrend_id, receptek.napszak, 
                               receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, 
                               receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, 
                               felhasznalok.felhnev 
                        FROM receptek 
                        INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id";
                
                // Ha van érvényes szűrőfeltétel, azt hozzáadjuk a lekérdezéshez
                if (!empty($szuroFeltetelek)) {
                    $sql .= " WHERE " . implode(" AND ", $szuroFeltetelek);
                }
        
                // Lekérdezés végrehajtása a meglévő függvénnyel
                $receptLista = adatokLekerdezese($sql);
        
                // Találatok visszaadása vagy hibaüzenet
                if (is_array($receptLista) && !empty($receptLista)) {
                    echo json_encode($receptLista, JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
            } else {
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            }
            break;
        

            

        default:
            echo "Hiba";
    }


?>