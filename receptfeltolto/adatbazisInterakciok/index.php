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

        case "receptFeltolt":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $receptNev = $bodyAdatok[""];
                $etelfajta = $bodyAdatok[""];
                $napszak = $bodyAdatok[""];

                $etrend = $bodyAdatok[""];
                $konyhak = $bodyAdatok[""];
                $nehezseg = $bodyAdatok[""];

                $ar = $bodyAdatok[""];
                $adag = $bodyAdatok[""];
                $ido = $bodyAdatok[""];

                $kaloria = $bodyAdatok[""];
                $receptLeiras = $bodyAdatok[""];
                $kep = $bodyAdatok[""];

                $felhsznaloId = $bodyAdatok["felhsznaloId"];
                $gyerekmenu = $bodyAdatok[""];
                
                if(!empty($receptNev) && !empty($etelfajta) && !empty($napszak) && !empty($etrend) 
                && !empty($konyhak) && !empty($nehezseg) && !empty($ar)
                && !empty($adag) &&!empty($ido) && !empty($kaloria) && !empty($receptLeiras) && !empty($kep) 
                ){
                    $sql = "INSERT INTO `receptek` (`id`, `neve`, `felhasznalo_id`, `napszak`, `etelfajta_id`, `kaloria`, `kepek`, `nehezseg`, `ido`, `adag`, `ar`, `mikor_feltolt`
                    , `konyha_id`, `elkeszites`, `elfogadot`, `gyerekmenu`) 
                    VALUES (NULL, '$receptNev', '$felhsznaloId', '$napszak', '$etelfajta', '$kaloria', '$kep', '$nehezseg', '$ido', '$adag', '$ar', current_timestamp(), '$konyha',
                     '$receptLeiras', '0', '$gyerekmenu') ";
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