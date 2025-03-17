<?php

include './sql_function.php';

$teljesUrl = $_SERVER["REQUEST_URI"];
$url= explode("/",$teljesUrl);
$metodus = $_SERVER['REQUEST_METHOD'];
$adatok = trim(file_get_contents("php://input"));
$adatPost = json_decode($adatok,true);

switch (end($url)) {
    case 'hajotipusok': {
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

    case 'hajok': {
        if ($metodus === 'POST') {
            $keresettTipusok = $adatPost["tipusok"];
            if (!empty($keresettTipusok)) {
                $hajokSQL = "SELECT hajok.nev AS hajo, tulajdonos.nev AS tulajdonos, hajok.uzemel, hajok.tipus FROM hajok INNER JOIN tulajdonos ON hajok.tulaz = tulajdonos.az WHERE ";
                $feltetelek = array_map(fn($tipus) => "hajok.tipus = '".$tipus."'", $keresettTipusok);
                $hajokSQL .= implode(" OR ", $feltetelek);
                $hajokSQL .= " ORDER BY hajok.nev;";
                $hajok = adatokLekerese($hajokSQL);
                if (is_array($hajok)) {
                    echo json_encode($hajok, JSON_UNESCAPED_UNICODE);
                }
                else {
                    echo json_encode(['valasz' => 'Nincsenek találatok!'], JSON_UNESCAPED_UNICODE);
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
        echo 'Hajótípusok!';
        break;
}


?>