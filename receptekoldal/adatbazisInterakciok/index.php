<?php
//RewriteRule ^(.*)$ /13c-szucs/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]
//RewriteRule ^(.*)$ /13osztaly/Viszgaremek/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]

    include "./adatbazisInterakciok.php";
    $teljesURL = explode("/", $_SERVER["REQUEST_URI"]);
    $url = explode("?", end($teljesURL));

    $bodyAdatok = json_decode(file_get_contents("php://input"), true);

    switch (mb_strtolower($url[0])){
        case "etelfajta":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $etelfajta = adatokLekerese("SELECT etelfajta.neve FROM etelfajta;");
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
                $alapanyag = adatokLekerese("SELECT hozzavalok.hozzavalo FROM `hozzavalok`;");
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
                $konyha = adatokLekerese("SELECT konyha.neve FROM konyha");
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
                $etrend = adatokLekerese("SELECT etrend.neve FROM `etrend`;");
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

        case "osszesrecept":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $osszesrecept = adatokLekerese("SELECT receptek.neve, receptek.felhasznalo_id, etrend.neve AS etrend_nev, etrend.id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev, AVG(ertekeles.ertek) FROM receptek INNER JOIN ertekeles ON ertekeles.recept_id = receptek.id INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.etrend_id = receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id GROUP BY receptek.id ORDER BY receptek.neve;");
                if(is_array($osszesrecept) && !empty($osszesrecept)){
                    echo json_encode($osszesrecept, JSON_UNESCAPED_UNICODE);
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

        case "szuresreceptek":
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $jsonData = file_get_contents('php://input');
                $bodyAdatok = json_decode($jsonData, true);
                
                $szuroFeltetelek = [];
                
                // Kategória szűrés
                if (!empty($bodyAdatok["kategoriak"]) && is_array($bodyAdatok["kategoriak"])) {
                    $kategoriakAzonositoTomb = [];
                    foreach ($bodyAdatok["kategoriak"] as $kivalasztottKategoria) {
                        $kategoriaNev = trim($kivalasztottKategoria);
                        $eredmenySor = adatokLekerese("SELECT id FROM etelfajta WHERE LOWER(neve) = LOWER('$kategoriaNev')");
                        if (is_array($eredmenySor) && !empty($eredmenySor)) {
                            $kategoriakAzonositoTomb[] = $eredmenySor[0]['id'];
                        }
                    }
                    if (!empty($kategoriakAzonositoTomb)) {
                        $azonositoLista = implode(",", $kategoriakAzonositoTomb);
                        $szuroFeltetelek[] = "receptek.etelfajta_id IN ($azonositoLista)";
                    }
                }
                
                // Alapanyag szűrés
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
                
                //Alapanyag nélkül szűrés
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
                
               // Étrend szűrés
                if (!empty($bodyAdatok["etrend"]) && is_array($bodyAdatok["etrend"])) {
                    $etrendAzonositoTomb = [];
                    foreach ($bodyAdatok["etrend"] as $kivalasztottEtrend) {
                        $etrendNev = trim($kivalasztottEtrend);
                        $eredmenySor = adatokLekerese("SELECT id FROM etrend WHERE LOWER(neve) = LOWER('$etrendNev')");
                        if (is_array($eredmenySor) && !empty($eredmenySor)) {
                            $etrendAzonositoTomb[] = $eredmenySor[0]['id'];
                        }
                    }
                    if (!empty($etrendAzonositoTomb)) {
                        $azonositoLista = implode(",", $etrendAzonositoTomb);
                        $szuroFeltetelek[] = "EXISTS (
                            SELECT 1 FROM receptetrend
                            WHERE receptetrend.recept_id = receptek.id
                            AND receptetrend.etrend_id IN ($azonositoLista)
                        )";
                    }
                }


                
                // Konyha szűrés 
                if (!empty($bodyAdatok["konyha"]) && is_array($bodyAdatok["konyha"])) {
                    $konyhaAzonositoTomb = [];
                    foreach ($bodyAdatok["konyha"] as $kivalasztottKonyha) {
                        $konyhaNev = trim(strtolower($kivalasztottKonyha));
                        $eredmenySor = adatokLekerese("SELECT id FROM konyha WHERE neve = '$konyhaNev'");
                        if (is_array($eredmenySor) && !empty($eredmenySor)) {
                            $konyhaAzonositoTomb[] = $eredmenySor[0]['id'];
                        }
                    }
                    if (!empty($konyhaAzonositoTomb)) {
                        $azonositoLista = implode(",", $konyhaAzonositoTomb);
                        $szuroFeltetelek[] = "receptek.konyha_id IN ($azonositoLista)";
                    }
                }
            
                // Idő szűrés
                if (!empty($bodyAdatok["ido"])) {
                    $ido = (int)$bodyAdatok["ido"];
                    if ($ido === 30) { 
                        $szuroFeltetelek[] = "receptek.ido < 30";
                    } else if ($ido === 60) { 
                        $szuroFeltetelek[] = "receptek.ido >= 30 AND receptek.ido <= 60";
                    } else if ($ido === 120) { 
                        $szuroFeltetelek[] = "receptek.ido > 60";
                    }
                }

                
                // Napszak szűrés
                if (!empty($bodyAdatok["napszak"]) && is_array($bodyAdatok["napszak"])) {
                    $helyesNapszakok = [];
                    foreach ($bodyAdatok["napszak"] as $napszak) {
                        $napszak = strtolower(trim($napszak));
                        if ($napszak == "reggeli" || $napszak == "tízórai" || $napszak == "ebéd" || $napszak =="vacsora" || $napszak == "uzsonna") {
                            $helyesNapszakok[] = "'" . $napszak . "'";
                        }
                    }
                    
                    if (!empty($helyesNapszakok)) {
                        $szuroFeltetelek[] = "LOWER(receptek.napszak) IN (" . implode(",", $helyesNapszakok) . ")";
                    }
                }

                
                // Ár szűrés
                if (!empty($bodyAdatok["ar"])) {
                    $ar = trim($bodyAdatok["ar"]);
                    $szuroFeltetelek[] = "LOWER(receptek.ar) = LOWER('$ar')";
                }

                
                
                // Kalória szűrés
                if (!empty($bodyAdatok["kaloria"])) {
                    $kaloria = (int)$bodyAdatok["kaloria"];
                    if ($kaloria === 200) { 
                        $szuroFeltetelek[] = "receptek.kaloria < 200";
                    } else if ($kaloria === 400) { 
                        $szuroFeltetelek[] = "receptek.kaloria >= 200 AND receptek.kaloria <= 400";
                    } else if ($kaloria === 600) {
                        $szuroFeltetelek[] = "receptek.kaloria >= 400 AND receptek.kaloria <= 600";
                    } else if ($kaloria === 601) { 
                        $szuroFeltetelek[] = "receptek.kaloria > 600";
                    }
                }
                
                // Adag szűrés
                if (!empty($bodyAdatok["adag"])) {
                    $szuroFeltetelek[] = "receptek.adag = " . intval($bodyAdatok["adag"]);
                }
                
                // Nehézségi szint szűrés
                if (!empty($bodyAdatok["nehezseg"])) {
                    $nehezseg = trim($bodyAdatok["nehezseg"]);
                    $szuroFeltetelek[] = "LOWER(receptek.nehezseg) = LOWER('$nehezseg')";
                }
                
                
                // Recept név keresés
                if (!empty($bodyAdatok["kereses"])) {
                    $searchTerm = trim($bodyAdatok["kereses"]);
                    $szuroFeltetelek[] = "LOWER(receptek.neve) LIKE LOWER('%$searchTerm%')";
                }
  

                $sql = "SELECT receptek.id, receptek.neve, receptek.felhasznalo_id, receptek.napszak, 
                receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, 
                receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, 
                receptek.elkeszites, felhasznalok.felhnev, etrend.neve AS etrend_nev, 
                etrend.id AS etrend_id FROM receptek INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id 
                INNER JOIN receptetrend ON receptetrend.etrend_id = receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id";
            
                
                if (!empty($szuroFeltetelek)) {
                    $sql .= " WHERE " . implode(" AND ", $szuroFeltetelek);
                }
                
                $sql .= " ORDER BY receptek.neve ASC";
                
                $receptLista = adatokLekerese($sql);
                foreach ($receptLista as $recept) {
                    $formattedReceptek[] = [
                        'id' => $recept['id'],
                        'felhasznalo_id' => $recept['felhasznalo_id'],
                        'napszak' => $recept['napszak'],
                        'etelfajta_id' => $recept['etelfajta_id'],
                        'ar' => $recept['ar'],
                        'mikor_feltolt' => $recept['mikor_feltolt'],
                        'konyha_id' => $recept['konyha_id'],
                        'felhnev' => $recept['felhnev'],
                        'neve' => $recept['neve'],
                        'kepek' => $recept['kepek'],
                        'kaloria' => $recept['kaloria'],
                        'nehezseg' => $recept['nehezseg'],
                        'ido' => $recept['ido'],
                        'etrend_nev' => $recept['etrend_nev'],
                        'etrend_id' => $recept['etrend_id'],
                        'adag' => $recept['adag'],
                        'elkeszites' => $recept['elkeszites']
                        
                    ];
                }
                if (is_array($receptLista) && !empty($receptLista)) {
                    $formattedReceptek = [];
                    foreach ($receptLista as $recept) {
                        $formattedReceptek[] = [
                        'id' => $recept['id'],
                        'felhasznalo_id' => $recept['felhasznalo_id'],
                        'napszak' => $recept['napszak'],
                        'etelfajta_id' => $recept['etelfajta_id'],
                        'ar' => $recept['ar'],
                        'mikor_feltolt' => $recept['mikor_feltolt'],
                        'konyha_id' => $recept['konyha_id'],
                        'felhnev' => $recept['felhnev'],
                        'neve' => $recept['neve'],
                        'kepek' => $recept['kepek'],
                        'kaloria' => $recept['kaloria'],
                        'nehezseg' => $recept['nehezseg'],
                        'ido' => $recept['ido'],
                        'etrend_nev' => $recept['etrend_nev'],
                        'etrend_id' => $recept['etrend_id'],
                        'adag' => $recept['adag'],
                        'elkeszites' => $recept['elkeszites']
                        ];
                    }
                    
                    echo json_encode($receptLista, JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
            } else {
                echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            }
            break;
        
        

            

        default:
            echo "Hiba";
    }


?>