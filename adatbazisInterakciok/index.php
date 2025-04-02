<?php

    include "./adatbazisInterakciok.php";
    $teljesUrl = $_SERVER["REQUEST_URI"];
    $url= explode("/",$teljesUrl);

    $bodyAdatok = json_decode(file_get_contents("php://input"), true);

    switch (end($url)){
        case 'sessionProfilkepValtozot': 
            if ($_SERVER["REQUEST_METHOD"] === 'GET') {
                session_start();
    
                // Check if the session variable 'userpicture' is set
                if (isset($_SESSION['profilkep'])) {
                    echo $_SESSION['profilkep']; // Output the session value (user's picture path)
                }   
                else {
                    echo 'No picture set'; // Fallback if no picture is set
                }
            }
            else {
                echo json_encode(['valasz' => 'Hibás metódus!'], JSON_UNESCAPED_UNICODE);
                header('Method Not Allowed', true, 405);
            }
            break;
        
    
        case 'sessionLekerFelhasznaloId': 
            if ($_SERVER["REQUEST_METHOD"] === 'GET') {
                session_start();
    
                // Check if the session variable 'userpicture' is set
                if (isset($_SESSION['bejelentkezetFelhasznaloId'])) {
                    echo $_SESSION['bejelentkezetFelhasznaloId']; // Output the session value (user's picture path)
                }   
                else {
                    echo 'No id'; // Fallback if no picture is set
                }
            }
            else {
                echo json_encode(['valasz' => 'Hibás metódus!'], JSON_UNESCAPED_UNICODE);
                header('Method Not Allowed', true, 405);
            }
            break;
        
    
        case 'modositAlapadatok': 
            if ($_SERVER["REQUEST_METHOD"] === 'POST') {
               
                $melyikMezo = $bodyAdatok["melyikMezo"];
                $mezoAdat = $bodyAdatok["mezoAdat"];
                $felhasznaloId = $bodyAdatok["felhasznaloId"]; 
                
                if (!empty($melyikMezo) || !empty($mezoAdat) || !empty($felhasznaloId)) {
                    if($melyikMezo == "jelszo"){
                        $mezoAdat = password_hash($mezoAdat, PASSWORD_DEFAULT);
                    }
            
                    if($melyikMezo != "mindketto"){
                        $ujadatSQL = "UPDATE `felhasznalok` SET `$melyikMezo` = '$mezoAdat' WHERE `felhasznalok`.`id` = $felhasznaloId";
                    }   
                    else{
                        $email = $mezoAdat[0];
                        $jelszo = password_hash($mezoAdat[1], PASSWORD_DEFAULT);
                        $ujadatSQL = "UPDATE `felhasznalok` SET `jelszo` = '$jelszo', `email` = '$email' WHERE `felhasznalok`.`id` = $felhasznaloId";
                    }
                    $adat = adatokValtoztatasa($ujadatSQL);
                    if (!is_array($adat)) {
                        echo json_encode("Sikeres modosítás!");
                    }
                    else {
                        echo json_encode(['valasz' => 'Sikertelen modosítás!'], JSON_UNESCAPED_UNICODE);
                        header('BAD REQUEST', true, 400);
                    }
                }
                else {
                    echo json_encode(['valasz' => 'Hiányos adatok!'], JSON_UNESCAPED_UNICODE);
                    header('BAD REQUEST', true, 400);
                } 
            }
            else {
                echo json_encode(['valasz' => 'Hibás metódus!'], JSON_UNESCAPED_UNICODE);
                header('Method Not Allowed', true, 405);
            }
            break;
        
        
        case 'LekerAlapAdat': 
            if ($_SERVER["REQUEST_METHOD"] === 'POST') {
               
                $felhasznaloId = $bodyAdatok["felhasznaloId"];
                
                if (!empty($felhasznaloId)) {
                    $sqlKod =  "SELECT `felhasznalok`.`felhnev`, `felhasznalok`.`letrehozas`, `felhasznalok`.`email` FROM `felhasznalok` WHERE `felhasznalok`.`id` = $felhasznaloId;";
                    
                    $adat = adatokLekerdezese($sqlKod);
                    if (is_array($adat)) {
                        echo json_encode($adat);
                    }
                    else {
                        echo json_encode(['valasz' => 'Sikertelen lekérés!'], JSON_UNESCAPED_UNICODE);
                        header('BAD REQUEST', true, 400);
                    }
                }
                else {
                    echo json_encode(['valasz' => 'Hiányos adatok!'], JSON_UNESCAPED_UNICODE);
                    header('BAD REQUEST', true, 400);
                } 
            }
            else {
                echo json_encode(['valasz' => 'Hibás metódus!'], JSON_UNESCAPED_UNICODE);
                header('Method Not Allowed', true, 405);
            }
            break;
        

        case "legujabbreceptek":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $legujabbReceptek = adatokLekerdezese("SELECT receptek.id,receptek.neve, receptek.felhasznalo_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev, etrend.neve AS etrend_nev, etrend.id AS etrend_id FROM receptek INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptek.id = receptetrend.recept_id INNER JOIN etrend ON receptetrend.etrend_id = etrend.id WHERE receptek.elfogadot = 1 ORDER by receptek.mikor_feltolt DESC LIMIT 15;;");
                if(is_array($legujabbReceptek) && !empty($legujabbReceptek)){
                    echo json_encode($legujabbReceptek, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "kijelentkezes":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                require_once '../bejelentkezes/backendBejelentkezes/sessionConfig.php';

                // Töröljük az összes session változót
                $_SESSION = array();

                // Ha van session cookie, azt is töröljük
                if (ini_get("session.use_cookies")) {
                    $params = session_get_cookie_params();
                    setcookie(session_name(), '', time() - 42000,
                        $params["path"], $params["domain"],
                        $params["secure"], $params["httponly"]
                    );
                }

                // Megszüntetjük a session-t
                session_destroy();
            }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "ajanlottreceptek":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $ajanlottReceptek = adatokLekerdezese("SELECT receptek.id,receptek.neve, receptek.felhasznalo_id, etrend.neve AS etrend_nev, etrend.id AS etrend_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev, AVG(ertekeles.ertek) AS atlag FROM receptek INNER JOIN ertekeles ON ertekeles.recept_id = receptek.id INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.recept_id = receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id WHERE receptek.elfogadot = 1 GROUP BY receptek.id ORDER BY atlag DESC;;");
                if(is_array($ajanlottReceptek) && !empty($ajanlottReceptek)){
                    echo json_encode($ajanlottReceptek, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "keresesrecept":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["recept_neve"])){
                    $recept_nev = $bodyAdatok["recept_neve"];
                    $keresesReceptek = adatokLekerdezese("SELECT receptek.id,receptek.neve, receptek.felhasznalo_id, etrend.neve AS etrend_neve,etrend.id AS etrend_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev FROM receptek INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.recept_id= receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id WHERE LOWER(receptek.neve) = LOWER('{$recept_nev}') AND receptek.elfogadot = 1;");
                    if(is_array($keresesReceptek) && !empty($keresesReceptek)){
                        echo json_encode($keresesReceptek, JSON_UNESCAPED_UNICODE);
                    }
                    else{
                        echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                        header("bad request", true, 400);
                    }
                }
                else{
                    header("bad request", true, 400);
                    echo json_encode(["valasz" => "Kérem adjon meg keresési értéket!"], JSON_UNESCAPED_UNICODE);
                    
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
           
        }
        break;




        //reszletesreceptoldal
        case "ertekeles":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $ertekelesReceptId = $bodyAdatok["receptek_id"];
                $ertekeles = adatokLekerdezese("SELECT AVG(ertekeles.ertek) AS ertekeles FROM `ertekeles` WHERE recept_id = {$ertekelesReceptId} ;");
                if(is_array($ertekeles) && !empty($ertekeles)){
                    echo json_encode($ertekeles, JSON_UNESCAPED_UNICODE);
                }
                else{
                    echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "hozzaszolasleker":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $receptek_id = $bodyAdatok["receptek_id"];
                $leker = adatokLekerdezese("SELECT hozzaszolasok.id, hozzaszolasok.felhasznalo_id, hozzaszolasok.hozzaszolas, hozzaszolasok.receptek_id, hozzaszolasok.feltoltes_ideje, felhasznalok.profilkep,felhasznalok.felhnev AS felhasznalonev FROM `hozzaszolasok` INNER JOIN felhasznalok ON felhasznalok.id = hozzaszolasok.felhasznalo_id WHERE receptek_id = {$receptek_id} ORDER BY hozzaszolasok.id DESC;");
                if(is_array($leker)){
                    echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                }
                else{
                    header("bad request", true, 400);
                    echo json_encode(["valasz" => "Még nincs hozzászólás!"], JSON_UNESCAPED_UNICODE);
                    
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;


        case "ertekelt":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["recept_id"]) && !empty($bodyAdatok["felhasznalo_id"])){
                    $recept_id = $bodyAdatok["recept_id"];
                    $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                    $leker = adatokLekerdezese("SELECT * FROM ertekeles WHERE ertekeles.recept_id = {$recept_id} AND ertekeles.felhasznalo_id = {$felhasznalo_id};");
                    if(is_array($leker)){
                        echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                        
                    }
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "hozzavalokleker":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["recept_id"])){
                    $recept_id = $bodyAdatok["recept_id"];
                    $leker = adatokLekerdezese("SELECT * FROM hozzavalok WHERE hozzavalok.recept_id = {$recept_id};");
                    if(is_array($leker)){
                        echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                        
                    }
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "kategorialeker":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["recept_id"])){
                    $recept_id = $bodyAdatok["recept_id"];
                    $leker = adatokLekerdezese("SELECT * FROM `hozzavalok` WHERE hozzavalok.recept_id = {$recept_id} GROUP BY hozzavalok.kategoria;");
                    if(is_array($leker)){
                        echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                        
                    }
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        
        case "bevasarlolistaleker":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["felhasznalo_id"])){
                    $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                    $leker = adatokLekerdezese("SELECT DISTINCT bevasarlolista.hozzavalok_id, hozzavalok.hozzavalo FROM bevasarlolista INNER JOIN hozzavalok ON hozzavalok.id=bevasarlolista.hozzavalok_id WHERE bevasarlolista.felhasznalo_id = {$felhasznalo_id};");
                    if(is_array($leker)){
                        echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                        
                    }
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        case "hozzaszolasfeltoltes":
            if($_SERVER["REQUEST_METHOD"] == "PUT"){
                if(!empty($bodyAdatok["hozzaszolas"]) && !empty($bodyAdatok["felhasznalo_id"]) && !empty($bodyAdatok["receptek_id"])){
                    $hozzaszolas = $bodyAdatok["hozzaszolas"];
                    $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                    $receptek_id = $bodyAdatok["receptek_id"];
                    
                    // speciális karakterek lekérdezéséhez
                    $db = new mysqli('localhost', 'root', '', 'vizsgaremek');
                    $hozzaszolas_escaped = $db->real_escape_string($hozzaszolas);
                    $db->close();
                    
                    $sql_feltoltes = adatokValtoztatasa("INSERT INTO `hozzaszolasok`(`felhasznalo_id`, `hozzaszolas`, `receptek_id`) VALUES ({$felhasznalo_id},'{$hozzaszolas_escaped}',{$receptek_id})");
                    
                    if($sql_feltoltes == "Sikeres művelet!"){
                        header("CREATED", true, 201);
                        echo json_encode(["valasz" => "Hozzászólás elküldve"], JSON_UNESCAPED_UNICODE);
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Sikertelen művelet"], JSON_UNESCAPED_UNICODE);
                    }
                }
                else{
                    header("bad request", true, 400);
                    echo json_encode(["valasz" => "Hiányos adatok"], JSON_UNESCAPED_UNICODE);
                }
            }
            else{
                header("bad request", true, 400);
                echo json_encode(["valasz" => "Hibás metódus"], JSON_UNESCAPED_UNICODE);
            }
            break;
        

            case "receptleker":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["recept_id"])){
                        $recept_id = $bodyAdatok["recept_id"];
                        $recept = adatokLekerdezese("SELECT
                        receptek.neve, receptek.felhasznalo_id, etrend.neve AS etrend_neve, etrend.id,
                        receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek,
                        receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt,
                        receptek.konyha_id, receptek.elkeszites, konyha.neve AS konyha_nev,felhasznalok.felhnev,
                        etelfajta.neve AS etelfajta_nev
                        FROM receptek INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id
                        INNER JOIN etelfajta ON etelfajta.id=receptek.etelfajta_id INNER JOIN konyha ON konyha.id = receptek.konyha_id
                        INNER JOIN receptetrend ON receptetrend.recept_id = receptek.id
                        INNER JOIN etrend ON etrend.id=receptetrend.etrend_id WHERE receptek.id = {$recept_id}
                        ");
                        if(is_array($recept) && !empty($recept)){
                            echo json_encode($recept, JSON_UNESCAPED_UNICODE);
                        }
                        else{
                            echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;
            
            case "ertekeleselkuld":
                if($_SERVER["REQUEST_METHOD"] == "PUT"){
                    if(!empty($bodyAdatok["recept_id"]) && !empty($bodyAdatok["felhasznalo_id"]) && !empty($bodyAdatok["ertekeles"])){
                        $recept_id = $bodyAdatok["recept_id"];
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                        $ertekeles = $bodyAdatok["ertekeles"];
                        $recept = adatokValtoztatasa("INSERT INTO `ertekeles`( `felhasznalo_id`, `recept_id`, `ertek`) VALUES ({$felhasznalo_id},{$recept_id},{$ertekeles});");
                        if($recept == "Sikeres művelet!"){
                            header("CREATED", true, 201);
                            echo json_encode(["valasz" => "Értékelés elküldve!"], JSON_UNESCAPED_UNICODE);
                            
                        }
                        else{
                            echo json_encode(["valasz" => "Sikertelen feltöltés!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;

            case "bevasarlolistahozzaad":
                if($_SERVER["REQUEST_METHOD"] == "PUT"){
                    if(!empty($bodyAdatok["hozzavalo_id"]) && !empty($bodyAdatok["felhasznalo_id"]) && !empty($bodyAdatok["adag"])){
                        $hozzavalo_id = $bodyAdatok["hozzavalo_id"];
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                        $adag = $bodyAdatok["adag"];

                        $recept = adatokValtoztatasa("INSERT INTO `bevasarlolista`( `felhasznalo_id`, `hozzavalok_id`, `adag`) VALUES ({$felhasznalo_id},{$hozzavalo_id},{$adag})");
                        if($recept == "Sikeres művelet!"){
                            header("CREATED", true, 201);
                            echo json_encode(["valasz" => "Sikeres rögzítés"], JSON_UNESCAPED_UNICODE);
                            
                        }
                        else{
                            echo json_encode(["valasz" => "Sikertelen feltöltés!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;

            case "bevasarlolistatorol":
                if($_SERVER["REQUEST_METHOD"] == "DELETE"){
                    if(!empty($bodyAdatok["hozzavalok_id"]) && !empty($bodyAdatok["felhasznalo_id"])){
                        $hozzavalok_id = $bodyAdatok["hozzavalok_id"];
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];

                        $kedvencRecept = adatokValtoztatasa("DELETE FROM `bevasarlolista` WHERE bevasarlolista.felhasznalo_id = {$felhasznalo_id} AND bevasarlolista.hozzavalok_id ={$hozzavalok_id}");
                        if($kedvencRecept == "Sikeres művelet!"){
                            header("NO CONTENT", true, 204);
                            echo json_encode(["valasz" => "Sikeres törlés"], JSON_UNESCAPED_UNICODE);
                            
                        }
                        else{
                            echo json_encode(["valasz" => "Sikertelen törlés!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;

            case "kedvencrecepthozzaad":
                if($_SERVER["REQUEST_METHOD"] == "PUT"){
                    if(!empty($bodyAdatok["receptek_id"]) && !empty($bodyAdatok["felhasznalo_id"])){
                        $receptek_id = $bodyAdatok["receptek_id"];
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];

                        $kedvencRecept = adatokValtoztatasa("INSERT INTO `kedvenceklista`(`felhasznalo_id`, `recept_id`) VALUES ({$felhasznalo_id},$receptek_id);");
                        if($kedvencRecept == "Sikeres művelet!"){
                            header("CREATED", true, 201);
                            echo json_encode(["valasz" => "Sikeres rögzítés"], JSON_UNESCAPED_UNICODE);
                            
                        }
                        else{
                            echo json_encode(["valasz" => "Sikertelen feltöltés!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;

            case "kedvencrecepttorol":
                if($_SERVER["REQUEST_METHOD"] == "DELETE"){
                    if(!empty($bodyAdatok["receptek_id"]) && !empty($bodyAdatok["felhasznalo_id"])){
                        $receptek_id = $bodyAdatok["receptek_id"];
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];

                        $kedvencRecept = adatokValtoztatasa("DELETE FROM `kedvenceklista` WHERE kedvenceklista.felhasznalo_id = {$felhasznalo_id} AND kedvenceklista.recept_id = {$receptek_id}");
                        if($kedvencRecept == "Sikeres művelet!"){
                            header("NO CONTENT", true, 204);
                            echo json_encode(["valasz" => "Sikeres törlés"], JSON_UNESCAPED_UNICODE);
                            
                        }
                        else{
                            echo json_encode(["valasz" => "Sikertelen törlés!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;


            case "kedvencreceptleker":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["felhasznalo_id"])){
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                        $leker = adatokLekerdezese("SELECT kedvenceklista.id as kedvenceklista_id, kedvenceklista.felhasznalo_id as kedvenceklista_felhasznalo_id, kedvenceklista.recept_id as kedvenceklista_recept_id,receptek.id, receptek.neve, receptek.felhasznalo_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev FROM receptek INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN kedvenceklista ON kedvenceklista.recept_id = receptek.id WHERE kedvenceklista.felhasznalo_id ={$felhasznalo_id} AND receptek.elfogadot = 1;");
                        if(is_array($leker) && !empty($leker)){
                            echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                        }
                        else{
                            echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                            
                        }
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            }
            break;
            
            case "kedvencreceptlekerreceptnel":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["felhasznalo_id"] && !empty($bodyAdatok["receptek_id"]))){
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                        $receptek_id = $bodyAdatok["receptek_id"];
                        $leker = adatokLekerdezese("SELECT * FROM `kedvenceklista` WHERE kedvenceklista.felhasznalo_id = {$felhasznalo_id} AND kedvenceklista.recept_id = {$receptek_id};");
                        if(is_array($leker) && !empty($leker)){
                            echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                        }
                        else{
                            echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                            
                        }
                    }
            }
            else{
                echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            }
            break;

            case "bevasarlolistahozzavalokleker":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["felhasznalo_id"])){
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                        $leker = adatokLekerdezese("SELECT DISTINCT bevasarlolista.hozzavalok_id, bevasarlolista.adag,hozzavalok.hozzavalo, hozzavalok.recept_id, hozzavalok.mennyiseg, hozzavalok.mertek_egyseg, hozzavalok.kategoria FROM bevasarlolista INNER JOIN hozzavalok ON hozzavalok.id=bevasarlolista.hozzavalok_id WHERE bevasarlolista.felhasznalo_id = {$felhasznalo_id};");
                        if(is_array($leker)){
                            echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                        }
                        else{
                            header("bad request", true, 400);
                            echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                            
                        }
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            }
            break;
    

            case "receptnevlekerbevasarlolistabol":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["felhasznalok_id"])){
                        $felhasznalok_id = $bodyAdatok["felhasznalok_id"];
                        $recept = adatokLekerdezese("SELECT DISTINCT receptek.id, receptek.neve FROM receptek INNER JOIN hozzavalok ON receptek.id = hozzavalok.recept_id INNER JOIN bevasarlolista ON bevasarlolista.hozzavalok_id = hozzavalok.id INNER JOIN felhasznalok ON bevasarlolista.felhasznalo_id = felhasznalok.id WHERE felhasznalok.id = {$felhasznalok_id} AND receptek.elfogadot = 1;");
                        if(is_array($recept) && !empty($recept)){
                            echo json_encode($recept, JSON_UNESCAPED_UNICODE);
                        }
                        else{
                            echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
            }
            else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            
            }
            break;






            //Hetimenü oldal

            case "hetimenuleker":
                if($_SERVER["REQUEST_METHOD"] == "GET"){
                    $hetimenuk = adatokLekerdezese("SELECT receptek.id,receptek.neve, receptek.felhasznalo_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, hetimenu.id as hetimenu_id,felhasznalok.felhnev, etrend.neve AS etrend_nev, etrend.id  as etrend_id FROM receptek INNER JOIN hetimenu ON hetimenu.recept_id = receptek.id INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.recept_id= receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id WHERE receptek.elfogadot = 1 ORDER BY hetimenu.id;");
                    if(is_array($hetimenuk) && !empty($hetimenuk)){
                        echo json_encode($hetimenuk, JSON_UNESCAPED_UNICODE);
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

            //gyerekmenu oldal

            case "gyerekmenuleker":
                if($_SERVER["REQUEST_METHOD"] == "GET"){
                    $gyerekmenu = adatokLekerdezese("SELECT receptek.id,receptek.neve, receptek.felhasznalo_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, hetimenu.id as hetimenu_id,felhasznalok.felhnev, etrend.neve AS etrend_nev, etrend.id  as etrend_id FROM receptek INNER JOIN gyerekmenu ON gyerekmenu.recept_id = receptek.id INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.recept_id= receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id WHERE receptek.elfogadot = 1 ORDER BY gyerekmenu.id;");
                    if(is_array($gyerekmenu) && !empty($gyerekmenu)){
                        echo json_encode($gyerekmenu, JSON_UNESCAPED_UNICODE);
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

        
            case "hetnapja":
                if($_SERVER["REQUEST_METHOD"] == "GET"){
                    $nap = adatokLekerdezese("SELECT WEEKDAY(CURRENT_DATE()) as nap;");
                    if(is_array($nap) && !empty($nap)){
                        switch ($nap[0]["nap"]) {
                            case 0:
                                echo json_encode(["valasz"=>"Hetfo"], JSON_UNESCAPED_UNICODE);
                                break;
                            case 1:
                                echo json_encode(["valasz"=>"Kedd"], JSON_UNESCAPED_UNICODE);
                                break;
                            case 2:
                                echo json_encode(["valasz"=>"Szerda"], JSON_UNESCAPED_UNICODE);
                                break;
                            case 3:
                                echo json_encode(["valasz"=>"Csutortok"], JSON_UNESCAPED_UNICODE);
                                break;
                            case 4:
                                echo json_encode(["valasz"=>"Pentek"], JSON_UNESCAPED_UNICODE);
                                break;
                            case 5:
                                echo json_encode(["valasz"=>"Szombat"], JSON_UNESCAPED_UNICODE);
                                break;
                            case 6:
                                echo json_encode(["valasz"=>"Vasarnap"], JSON_UNESCAPED_UNICODE);
                                break;
                            default:
                                echo json_encode(["valasz"=>"Hiba"], JSON_UNESCAPED_UNICODE);
                                header("bad request", true, 400);
                            
                        }
                        
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




            //Receptekoldal
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
                    $jsonData = file_get_contents('php://input');
                    $bodyAdatok = json_decode($jsonData, true);
                    
                    $szuroFeltetelek = [];
                    
                    // Kategória szűrés
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
    
    
                    
                    // Konyha szűrés 
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
                    INNER JOIN receptetrend ON receptetrend.recept_id = receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id";
                
                    
                    if (!empty($szuroFeltetelek)) {
                        $sql .= " WHERE  receptek.elfogadot = 1 AND " . implode(" AND ", $szuroFeltetelek);
                    }
                    
                    $sql .= " ORDER BY receptek.neve ASC LIMIT 30";
                    
                    $receptLista = adatokLekerdezese($sql);
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
                    echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                    header('bad request', true, 400);
                }
                break;


            //SELECT felhasznalok.joga_id FROM felhasznalok WHERE felhasznalok.id = 5;

            case "jogosultsag":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["felhasznalo_id"])){
                        $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                        $leker = adatokLekerdezese("SELECT felhasznalok.joga_id FROM felhasznalok WHERE felhasznalok.id = {$felhasznalo_id};");
                        if(is_array($leker) && !empty($leker)){
                            echo json_encode($leker, JSON_UNESCAPED_UNICODE);
                        }
                        else{
                            echo json_encode(["valasz" => "Nincs találat!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                            
                        }
                    }
            }
            else{
                echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            }
            break;

            case 'receptekNemElf':
                if ($_SERVER["REQUEST_METHOD"] === 'GET') {
                    $sql = "SELECT * FROM `receptek` WHERE `receptek`.`elfogadot` = 0;";
                    $adat = adatokLekerdezese($sql);
        
                    if (is_array($adat)) {
                        echo json_encode($adat, JSON_UNESCAPED_UNICODE);
                    }
                    else {
                        echo json_encode(['valasz' => 'Sikertelen modosítás!'], JSON_UNESCAPED_UNICODE);
                        header('BAD REQUEST', true, 400);
                    } 
                }
                else {
                    echo json_encode(['valasz' => 'Hibás metódus!'], JSON_UNESCAPED_UNICODE);
                    header('Method Not Allowed', true, 405);
                }
                break;
             


            case "receptElfogad":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["recept_id"]) ){
                        $recept_id = $bodyAdatok["recept_id"];
                      
   
                        $kedvencRecept = adatokValtoztatasa("UPDATE `receptek` SET `elfogadot` = '1' WHERE `receptek`.`id` = $recept_id");
                        if($kedvencRecept == "Sikeres művelet!"){
           
                           echo json_encode(["valasz" => "Sikeres módosítás!"], JSON_UNESCAPED_UNICODE);
                            
                        }
                        else{
                            echo json_encode(["valasz" => "Sikertelen módosítás!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;

            case "javaslatFeltolt":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["recept_id"]) && !empty($bodyAdatok["javaslat"]) ){
                        $recept_id = $bodyAdatok["recept_id"];
                        $javaslat = $bodyAdatok["javaslat"];
                      
   
                        $kedvencRecept = adatokValtoztatasa("UPDATE `receptek` SET `elfogadot` = '2', `modositas_jav` = '$javaslat' WHERE `receptek`.`id` = $recept_id");
                        if($kedvencRecept == "Sikeres művelet!"){
           
                           echo json_encode(["valasz" => "Sikeres módosítás!"], JSON_UNESCAPED_UNICODE);
                            
                        }
                        else{
                            echo json_encode(["valasz" => "Sikertelen módosítás!"], JSON_UNESCAPED_UNICODE);
                            header("bad request", true, 400);
                        }
                    }
                    else{
                        header("bad request", true, 400);
                        echo json_encode(["valasz" => "Hiányos adatok!"], JSON_UNESCAPED_UNICODE);
                        
                    }
               }
               else{
                echo json_encode(['valasz' => 'Hibás metódus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
               
            }
            break;
   

        default:
            echo "Hiba";
    }


?>


