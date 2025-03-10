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


        case "szuresreceptek":
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                // Parse the JSON data from the request body
                $jsonData = file_get_contents('php://input');
                $bodyAdatok = json_decode($jsonData, true);
                
                // Initialize array for filter conditions
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
                
                // Alapanyag szűrés (az hozzavalok táblából)
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
                
                // Kizárt alapanyag szűrés
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
                
               // Étrend szűrés (receptetrend tábla használata)
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
                        $szuroFeltetelek[] = "EXISTS (
                            SELECT 1 FROM receptetrend 
                            WHERE receptetrend.recept_id = receptek.id 
                            AND receptetrend.etrend_id IN ($azonositoLista)
                        )";
                    }
                }

                
                // Konyha szűrés javított verziója
                if (!empty($bodyAdatok["konyha"]) && is_array($bodyAdatok["konyha"])) {
                    $konyhaAzonositoTomb = [];
                    foreach ($bodyAdatok["konyha"] as $kivalasztottKonyha) {
                        $konyhaNev = trim(strtolower($kivalasztottKonyha));
                        $eredmenySor = adatokLekerdezese("SELECT id FROM konyha WHERE neve = '$konyhaNev'");
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
                    $ido = trim($bodyAdatok["ido"]);
                    $szuroFeltetelek[] = "receptek.ido LIKE '$ido'";
                }
                
                
                // Napszak szűrés
                if (!empty($bodyAdatok["napszak"])) {
                    $napszak = trim($bodyAdatok["napszak"]);
                    $szuroFeltetelek[] = "LOWER(receptek.napszak) = LOWER('$napszak')";
                }

                
                // Ár szűrés
                if (!empty($bodyAdatok["ar"])) {
                    $ar = trim($bodyAdatok["ar"]);
                    $szuroFeltetelek[] = "LOWER(receptek.ar) = LOWER('$ar')";
                }

                
                
                // Kalória szűrés
                if (!empty($bodyAdatok["kaloria"])) {
                    $kaloria = intval($bodyAdatok["kaloria"]);
                    if ($kaloria === 1000) { // "600 felett"
                        $szuroFeltetelek[] = "receptek.kaloria > 600";
                    } else {
                        $szuroFeltetelek[] = "receptek.kaloria <= " . $kaloria;
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
                
                // A végső SQL lekérdezés összeállítása
                $sql = "SELECT
                    receptek.id,
                    receptek.neve,
                    receptek.felhasznalo_id,
                    receptek.napszak,
                    receptek.etelfajta_id,
                    receptek.kaloria,
                    receptek.kepek,
                    receptek.nehezseg,
                    receptek.ido,
                    receptek.adag,
                    receptek.ar,
                    receptek.elkeszites
                    FROM receptek";
            
                
                // Ha van érvényes szűrőfeltétel, azt hozzáadjuk a lekérdezéshez
                if (!empty($szuroFeltetelek)) {
                    $sql .= " WHERE " . implode(" AND ", $szuroFeltetelek);
                }
                
                // Receptek rendezése név szerint
                $sql .= " ORDER BY receptek.neve ASC";
                
                // Lekérdezés végrehajtása
                $receptLista = adatokLekerdezese($sql);
                // Formázott adatok előkészítése
                foreach ($receptLista as $recept) {
                    $formattedReceptek[] = [
                        'id' => $recept['id'],
                        'nev' => $recept['neve'],
                        'kep' => $recept['kepek'],
                        'kaloria' => $recept['kaloria'],
                        'nehezseg' => $recept['nehezseg'],
                        'ido' => $recept['ido'],
                        'adag' => $recept['adag'],
                        'leiras' => $recept['elkeszites']
                        
                    ];
                }
                if (is_array($receptLista) && !empty($receptLista)) {
                    $formattedReceptek = [];
                    foreach ($receptLista as $recept) {
                        $formattedReceptek[] = [
                            'id' => $recept['id'],
                            'nev' => $recept['neve'],
                            'kep' => $recept['kepek'],
                            'kaloria' => $recept['kaloria'],
                            'nehezseg' => $recept['nehezseg'],
                            'ido' => $recept['ido'],
                            'adag' => $recept['adag'],
                            'leiras' => $recept['elkeszites']
                        ];
                    }
                    
                    echo json_encode($formattedReceptek, JSON_UNESCAPED_UNICODE);
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