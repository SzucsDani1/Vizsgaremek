<?php


    include "./adatbazisInterakciok.php";
    $teljesUrl = $_SERVER["REQUEST_URI"];
    $url= explode("/",$teljesUrl);

    $metodus = $_SERVER['REQUEST_METHOD'];

    $bodyAdatok = json_decode(file_get_contents("php://input"), true);

    switch (end($url)){
        case 'sessionLekerFelhasznaloId': {
            if ($metodus === 'GET') {
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
        }
        case "etelfajta":
            if($metodus== "GET"){
                $etelfajta = adatokLekerese("SELECT * FROM etelfajta ORDER BY etelfajta.neve;");
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
            if($metodus == "GET"){
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
            if($metodus == "GET"){
                $konyha = adatokLekerese("SELECT * FROM konyha ORDER BY konyha.neve");
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
            if($metodus == "GET"){
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

        case "feltoltRecept":
          
            if($metodus == "POST"){
                $receptNev = $bodyAdatok["receptNev"];
                $gyereke = $bodyAdatok["gyereke"];
                if($gyereke == true){
                    $gyereke = 1;
                }
                else{
                    $gyereke = 0;
                }
                $hozzavalok = $bodyAdatok["hozzavalok"];
                $etelfajta = $bodyAdatok["etelfajta"];
                $napszak = $bodyAdatok["napszak"];

                $etrend = $bodyAdatok["etrendek"];
                $konyhak = $bodyAdatok["konyha"];
                $nehezseg = $bodyAdatok["nehezseg"];

                $ar = $bodyAdatok["ar"];
                $adag = $bodyAdatok["adag"];
                $ido = $bodyAdatok["ido"];

                $kaloria = $bodyAdatok["kaloria"];
                $receptLeiras = $bodyAdatok["leiras"];
                $kep = $bodyAdatok["kep"];

                $felhsznaloId = $bodyAdatok["felhasznaloId"];
                
                
                if(!empty($receptNev) && !empty($etelfajta) && !empty($napszak) && !empty($etrend) 
                && !empty($konyhak) && !empty($nehezseg) && !empty($ar)
                && !empty($adag) &&!empty($ido) && !empty($kaloria) && !empty($receptLeiras) && !empty($kep) && !empty($felhsznaloId) && !empty($hozzavalok) && isset($gyereke) 
                ){
                    //feltolt a recept és visszakapjuk az új recept id-t
                    $sql = "INSERT INTO `receptek` ( `neve`, `felhasznalo_id`, `napszak`, `etelfajta_id`, `kaloria`, `kepek`, `nehezseg`, `ido`, `adag`, `ar`, `mikor_feltolt`
                    , `konyha_id`, `elkeszites`, `elfogadot`, `gyerekmenu`) 
                    VALUES ( '$receptNev', '$felhsznaloId', '$napszak', '$etelfajta', '$kaloria', '$kep', '$nehezseg', '$ido', '$adag', '$ar', current_timestamp(), '$konyhak',
                     '$receptLeiras', '0', '$gyereke') ";
                     //echo $sql;
                    $id = adatokValtoztatasa($sql);
                    
                    //hozzavalok
                    foreach ($hozzavalok as $adat) {
                        $hozaval = $adat["hozzavNev"];
                        $mennyiseg  = $adat["hozzavMenny"];
                        $mertekEgyseg  = $adat["hozzavMertek"];
                        $kategoria   = $adat["kategoria"];
                        $hozav = "INSERT INTO `hozzavalok` ( `recept_id`, `hozzavalo`, `mennyiseg`, `mertek_egyseg`, `kategoria`)
                                    VALUES ('$id', '$hozaval', '$mennyiseg', '$mertekEgyseg', '$kategoria')";

                        adatokValtoztatasa($hozav);
                    }
                    //recepetrend   
                    foreach ($etrend as $adat) {
                        

                       $etrid = adatokLekerese("SELECT etrend.id FROM etrend where etrend.neve LIKE '$adat';");
                       //echo($adat);
                       $seg = isset($etrid[0]["id"]) ? $etrid[0]["id"] : $etrid["id"];

                        $etr = "INSERT INTO `receptetrend` (`etrend_id`, `recept_id`) VALUES ('$seg', '$id')";
                        var_dump($etr);
                       // $seg = $etrid[0]["id"];
                        $etr = "INSERT INTO `receptetrend` (`etrend_id`, `recept_id`) VALUES ('$seg', '$id')";
                        var_dump("INSERT INTO `receptetrend` (`etrend_id`, `recept_id`) VALUES ('$seg', '$id')");
                        
                        adatokValtoztatasa($etr);
                    }

                }   
                else{
                    echo json_encode(["valasz" => "Nincs minden adat kitöltve!"], JSON_UNESCAPED_UNICODE);
                    header("bad request", true, 400);
                }

           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        default:
            echo "Hiba";
    }


?>