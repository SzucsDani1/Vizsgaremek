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
            if($metodus == "GET"){
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
            if($metodus == "GET"){
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
            if($metodus == "GET"){
                $etrend = adatokLekerdezese("SELECT etrend.neve, etrend.id FROM `etrend`;");
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


        //SELECT receptek.id, receptek.neve, receptek.felhasznalo_id, receptek.modositas_jav, receptek.elfogadot, felhasznalok.felhnev FROM receptek INNER JOIN felhasznalok ON receptek.felhasznalo_id = felhasznalok.id WHERE felhasznalo_id =5 AND receptek.elfogadot = 1
        case "modositasijavaslatleker":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["felhasznalo_id"])){
                    $felhasznalo_id = $bodyAdatok["felhasznalo_id"];
                    $recept = adatokLekerdezese("SELECT receptek.id, receptek.neve, receptek.felhasznalo_id, receptek.modositas_jav, receptek.elfogadot, felhasznalok.felhnev FROM receptek INNER JOIN felhasznalok ON receptek.felhasznalo_id = felhasznalok.id WHERE felhasznalo_id ={$felhasznalo_id} AND receptek.elfogadot = 2");
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

                $felhsznaloId = $bodyAdatok["felhasznaloId"];
                
                
                if(!empty($receptNev) && !empty($etelfajta) && !empty($napszak) && !empty($etrend) 
                && !empty($konyhak) && !empty($nehezseg) && !empty($ar)
                && !empty($adag) &&!empty($ido) && !empty($kaloria) && !empty($receptLeiras) && !empty($felhsznaloId) && !empty($hozzavalok) && isset($gyereke) 
                ){
                    //feltolt a recept és visszakapjuk az új recept id-t
                    $sql = "INSERT INTO `receptek` ( `neve`, `felhasznalo_id`, `napszak`, `etelfajta_id`, `kaloria`,  `nehezseg`, `ido`, `adag`, `ar`, `mikor_feltolt`
                    , `konyha_id`, `elkeszites`, `elfogadot`, `gyerekmenu`) 
                    VALUES ( '$receptNev', '$felhsznaloId', '$napszak', '$etelfajta', '$kaloria', '$nehezseg', '$ido', '$adag', '$ar', current_timestamp(), '$konyhak',
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

                        // Fetch the ID of the etrend based on its name
                        $etrid = adatokLekerdezese("SELECT etrend.id FROM etrend WHERE etrend.neve = '$adat';");
                    
                        if ($etrid == 'Nincs találat!') {
                            // Handle the case where no result is found
                            echo "No matching data found for $adat";
                            continue; // Skip this entry and move to the next one
                        }
                        
                        if (is_string($etrid)) {
                            // If there's an error message, display it
                            echo "Error: $etrid";
                            continue;
                        }
                    
                        // Check if the result is in the expected format
                        if (isset($etrid[0]["id"])) {
                            $seg = $etrid[0]["id"]; // Ensure that "id" exists
                        } else {
                            // Handle the case where no "id" is found in the result
                            echo "ID not found for $adat";
                            continue;
                        }
                    
                        // Prepare the SQL insert statement
                        $etr = "INSERT INTO `receptetrend` (`etrend_id`, `recept_id`) VALUES ('$seg', '$id')";
                    
                        // Output the query for debugging purposes
                     
                        
                        // Execute the query
                        adatokValtoztatasa($etr);
                    }

                    
                        echo json_encode(["id" => $id]);
                    exit;
                  
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

        //kep feltolt
        case "kepfeltolt":
            
            session_start();

            if($metodus == "POST"){
            $kep = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $ujReceptID = intval($_POST['ujReceptID']);
            $felhasznalonev = $_SESSION["felhasznalonev"];
      
            $feltoltesiUtvonal = './receptkepek/'. $felhasznalonev; // Tároló mappa elérési utvonala
            
            if(!file_exists($feltoltesiUtvonal)){
                mkdir($feltoltesiUtvonal,0777, true);
            }
    
            // fájl formátum
            
    
            // fájl neve
            $egyeniEleresiNev = $felhasznalonev . "_recept_". $ujReceptID . "." . $kep;
    
            // fájl az elérési utvonalal
            $feltoltendoFajl = $feltoltesiUtvonal . '/' . $egyeniEleresiNev;            
    
    
            // Vizsgálja, hogy kép e
            $check = getimagesize($_FILES['image']['tmp_name']);
    
            if ($check !== false) {
            
        
                // * feltöltöt file a kijelolt mappába rakása
                if (move_uploaded_file($_FILES['image']['tmp_name'], $feltoltendoFajl)) {
                    
                    $eleresiUtvonal = "UPDATE `receptek` SET `kepek` = '$feltoltendoFajl' 
                    WHERE `receptek`.`id` = $ujReceptID";
                                        
        
                    
                    adatokValtoztatasa($eleresiUtvonal);
                    $_SESSION["profilkep"] = $feltoltendoFajl;
                    
                } 
                else 
                {
                    echo json_encode(["message" => "Hiba történt a kép mentése közben."]);
                }
            } 
            else 
            {
                echo json_encode(["message" => "A fájl nem kép formátumú."]);
            }
            }
            else{
                echo json_encode(['valasz' => 'Hibás metődus'], JSON_UNESCAPED_UNICODE);
                header('bad request', true, 400);
            }
            break;


        case "elfogadottmodosit":
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                if(!empty($bodyAdatok["recept_id"])){
                    $recept_id = $bodyAdatok["recept_id"];
                    $recept = adatokLekerdezese("UPDATE `receptek` SET `elfogadot`=3 WHERE receptek.id = {$recept_id};");
                    if(is_array($recept) && !empty($recept)){
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