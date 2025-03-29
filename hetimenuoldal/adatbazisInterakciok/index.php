<?php
//RewriteRule ^(.*)$ /13c-szucs/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]
//RewriteRule ^(.*)$ /13osztaly/Viszgaremek/Vizsgaremek/receptekoldal/receptlekeres.php [NC,L,QSA]

    include "./adatbazisInterakciok.php";
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
                $etelfajta = adatokLekerdezese("SELECT * FROM etelfajta ORDER BY etelfajta.neve;");
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
                $konyha = adatokLekerdezese("SELECT * FROM konyha ORDER BY konyha.neve");
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
                        echo json_encode(["valasz" => "Nincs találat"], JSON_UNESCAPED_UNICODE);
                        
                    }
                }
           }
           else{
            echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
            header('bad request', true, 400);
        }
        break;

        //SELECT DISTINCT bevasarlolista.hozzavalok_id FROM bevasarlolista WHERE bevasarlolista.hozzavalok_id = 1 AND bevasarlolista.felhasznalo_id = 5;


        
//SELECT receptek.neve, receptek.felhasznalo_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, hetimenu.id,felhasznalok.felhnev, etrend.neve AS etrend_nev, etrend.id FROM receptek INNER JOIN hetimenu ON hetimenu.recept_id = receptek.id INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.recept_id= receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id ORDER BY hetimenu.id;

            case "hetimenuleker":
                if($_SERVER["REQUEST_METHOD"] == "GET"){
                    $hetimenuk = adatokLekerdezese("SELECT receptek.neve, receptek.felhasznalo_id, receptek.napszak, receptek.etelfajta_id, receptek.kaloria, receptek.kepek, receptek.nehezseg, receptek.ido, receptek.adag, receptek.ar, receptek.mikor_feltolt, receptek.konyha_id, receptek.elkeszites, hetimenu.id,felhasznalok.felhnev, etrend.neve AS etrend_nev, etrend.id FROM receptek INNER JOIN hetimenu ON hetimenu.recept_id = receptek.id INNER JOIN felhasznalok ON felhasznalok.id = receptek.felhasznalo_id INNER JOIN receptetrend ON receptetrend.recept_id= receptek.id INNER JOIN etrend ON etrend.id=receptetrend.etrend_id ORDER BY hetimenu.id;");
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

            /*case "receptleker":
                if($_SERVER["REQUEST_METHOD"] == "POST"){
                    if(!empty($bodyAdatok["recept_id"])){
                        $recept_id = $bodyAdatok["recept_id"];
                        $recept = adatokLekerdezese(";
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
            break;*/
        
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


            default:
            echo "Hiba";
    }

    


?>