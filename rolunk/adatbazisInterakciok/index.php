<?php
include './adatbazisInterakciok.php';


$teljesUrl = $_SERVER["REQUEST_URI"];
$url= explode("/",$teljesUrl);
$metodus = $_SERVER['REQUEST_METHOD'];
$adatok = trim(file_get_contents("php://input"));
$adatPost = json_decode($adatok,true);

switch (end($url)) {

    case 'sessionProfilkepValtozot': {
        if ($metodus === 'GET') {
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
    }

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

    case 'modositAlapadatok': {
        if ($metodus === 'POST') {
           
            $melyikMezo = $adatPost["melyikMezo"];
            $mezoAdat = $adatPost["mezoAdat"];
            $felhasznaloId = $adatPost["felhasznaloId"]; 
            
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
    }    
    case 'receptekNemElf': {
        if ($metodus === 'GET') {
            $sql = "SELECT * FROM `receptek` WHERE `receptek`.`elfogadot` = 0;";
            $adat = adatokLekerese($sql);

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
    }    
    
    default:
        echo '';
        break;
}




?>