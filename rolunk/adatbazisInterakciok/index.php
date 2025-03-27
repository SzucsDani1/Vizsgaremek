<?php
include './adatbazisInterakciok.php';


$teljesUrl = $_SERVER["REQUEST_URI"];
$url= explode("/",$teljesUrl);
$metodus = $_SERVER['REQUEST_METHOD'];
$adatok = trim(file_get_contents("php://input"));
$bodyAdatok = json_decode($adatok,true);

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
    case "nehezseg":
        if($_SERVER["REQUEST_METHOD"] == "GET"){
             $nehezseg = adatokLekerese("SELECT receptek.nehezseg FROM receptek;");
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

     case "ertekeles":
         if($_SERVER["REQUEST_METHOD"] == "POST"){
             $ertekelesReceptId = $bodyAdatok["receptek_id"];
             $ertekeles = adatokLekerese("SELECT AVG(ertekeles.ertek) AS ertekeles FROM `ertekeles` WHERE recept_id = {$ertekelesReceptId} ;");
             if(is_array($ertekeles) && !empty($ertekeles)){
                 echo json_encode($ertekeles, JSON_UNESCAPED_UNICODE);
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

     case "hozzaszolasleker":
         if($_SERVER["REQUEST_METHOD"] == "POST"){
             $receptek_id = $bodyAdatok["receptek_id"];
             $leker = adatokLekerese("SELECT hozzaszolasok.id, hozzaszolasok.felhasznalo_id, hozzaszolasok.hozzaszolas, hozzaszolasok.receptek_id, hozzaszolasok.feltoltes_ideje, felhasznalok.profilkep,felhasznalok.felhnev AS felhasznalonev FROM `hozzaszolasok` INNER JOIN felhasznalok ON felhasznalok.id = hozzaszolasok.felhasznalo_id WHERE receptek_id = {$receptek_id} ORDER BY hozzaszolasok.id DESC;");
             if(is_array($leker)){
                 echo json_encode($leker, JSON_UNESCAPED_UNICODE);
             }
             else{
                 header("bad request", true, 400);
                 echo json_encode(["valasz" => "Nincs találat"], JSON_UNESCAPED_UNICODE);
                 
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
                 $leker = adatokLekerese("SELECT * FROM ertekeles WHERE ertekeles.recept_id = {$recept_id} AND ertekeles.felhasznalo_id = {$felhasznalo_id};");
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

     case "hozzavalokleker":
         if($_SERVER["REQUEST_METHOD"] == "POST"){
             if(!empty($bodyAdatok["recept_id"])){
                 $recept_id = $bodyAdatok["recept_id"];
                 $leker = adatokLekerese("SELECT * FROM hozzavalok WHERE hozzavalok.recept_id = {$recept_id};");
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

     case "kategorialeker":
         if($_SERVER["REQUEST_METHOD"] == "POST"){
             if(!empty($bodyAdatok["recept_id"])){
                 $recept_id = $bodyAdatok["recept_id"];
                 $leker = adatokLekerese("SELECT * FROM `hozzavalok` WHERE hozzavalok.recept_id = {$recept_id} GROUP BY hozzavalok.kategoria;");
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


     case "bevasarlolistaleker":
         if($_SERVER["REQUEST_METHOD"] == "POST"){
             if(!empty($bodyAdatok["felhasznalo_id"])){
                 $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                 $leker = adatokLekerese("SELECT DISTINCT bevasarlolista.hozzavalok_id, hozzavalok.hozzavalo FROM bevasarlolista INNER JOIN hozzavalok ON hozzavalok.id=bevasarlolista.hozzavalok_id WHERE bevasarlolista.felhasznalo_id = {$felhasznalo_id};");
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
                     $recept = adatokLekerese("SELECT
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
        echo 'Hiba';
        break;
}




?>