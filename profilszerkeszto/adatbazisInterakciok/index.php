<?php

include './adatbazisInterakciok.php';

$teljesUrl = $_SERVER["REQUEST_URI"];
$url= explode("/",$teljesUrl);
$metodus = $_SERVER['REQUEST_METHOD'];
$adatok = trim(file_get_contents("php://input"));
$adatPost = json_decode($adatok,true);

switch (end($url)) {
    case '': {
        if ($metodus === 'GET') {
            $tipusokSQL = "SELECT DISTINCT tipus FROM `hajok`;";
            $tipusok = adatokLekerese($tipusokSQL);
            echo json_encode($tipusok, JSON_UNESCAPED_UNICODE);
        }
        else {
            echo json_encode(['valasz' => 'Hibás metódus!'], JSON_UNESCAPED_UNICODE);
            header('Method Not Allowed', true, 405);
        }
        break;
    }

    case 'modositAlapadatok': {
        if ($metodus === 'POST') {
           
            $melyikMezo = $adatPost["melyikMezo"];
            $mezoAdat = $adatPost["mezoAdat"];
            $felhasznaloId = $adatPost["felhasznaloId"]; 

            if (!empty($melyikMezo) || !empty($mezoAdat) || !empty($felhasznaloId)) {
                if($melyikMezo == "jelszo"){
                    $mezoAdat = password_hash($mezoAdat, PASSWORD_DEFAULT);
                }
                $hajokSQL = "UPDATE `felhasznalok` SET `$melyikMezo` = '$mezoAdat' WHERE `felhasznalok`.`id` = $felhasznaloId";
                $hajok = adatokValtoztatasa($hajokSQL);
                if (!is_array($hajok)) {
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
    }    
    
    default:
        echo '';
        break;
}


?>