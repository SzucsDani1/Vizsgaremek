<?php
//RewriteRule ^(.*)$ /13c-szucs/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]
//RewriteRule ^(.*)$ /13osztaly/Viszgaremek/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]

    include "./sql_fuggvenyek.php";
    $teljesURL = explode("/", $_SERVER["REQUEST_URI"]);
    $url = explode("?", end($teljesURL));

    $bodyAdatok = json_decode(file_get_contents("php://input"), true);

    switch (mb_strtolower($url[0])){
        case "legujabbreceptek":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $legujabbReceptek = adatokLekerdezese("SELECT receptek.neve, receptek.felhasznalo_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev, etrend.neve AS etrend_nev, etrend.id FROM receptek INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.etrend_id = receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id ORDER by receptek.mikor_feltolt DESC LIMIT 15;;");
                if(is_array($legujabbReceptek) && !empty($legujabbReceptek)){
                    echo json_encode($legujabbReceptek, JSON_UNESCAPED_UNICODE);
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

        case "ajanlottreceptek":
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $ajanlottReceptek = adatokLekerdezese("SELECT receptek.neve, receptek.felhasznalo_id, etrend.neve AS etrend_nev, etrend.id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev, AVG(ertekeles.ertek) FROM receptek INNER JOIN ertekeles ON ertekeles.recept_id = receptek.id INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.etrend_id = receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id GROUP BY receptek.id ORDER BY ertekeles.ertek;");
                if(is_array($ajanlottReceptek) && !empty($ajanlottReceptek)){
                    echo json_encode($ajanlottReceptek, JSON_UNESCAPED_UNICODE);
                }//SELECT felhasznalok.felhnev, receptek.mikor_feltolt FROM receptek INNER JOIN felhasznalok ON receptek.felhasznalo_id = felhasznalok.id
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

        case "keresesrecept":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["recept_neve"])){
                    $recept_nev = $bodyAdatok["recept_neve"];
                    $keresesReceptek = adatokLekerdezese("SELECT receptek.neve, receptek.felhasznalo_id, etrend.neve AS etrend_neve,etrend.id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, felhasznalok.felhnev FROM receptek INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.etrend_id = receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id WHERE LOWER(receptek.neve) = LOWER('{$recept_nev}');");
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
        default:
            echo "Hiba";
    }


?>