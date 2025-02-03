<?php 

function adatokLekerdezese($muvelet) {
    //adatbazisra kapcsolodás
    $db = new mysqli ('localhost', 'root', '', 'vizsgaremek');
    if ($db->connect_errno == 0 ) {
        $eredmeny = $db->query($muvelet);
        if ($db->errno == 0) {
            if ($eredmeny->num_rows != 0) {
                return $adatok = $eredmeny->fetch_all(MYSQLI_ASSOC);
            }
            else {
                return 'Nincs találat!';
            }
        }
        return $db->error;
    }
    else {
        return $db->connect_error;
    }
}
    function regisztracio($felhnev, $email, $jelszo) {
        
        $db = new mysqli ('localhost', 'root', '', 'vizsgaremek');
        if ($db->connect_errno == 0 ) {
            //muvelet megírása
            $muvelet = "INSERT INTO `felhasznalok` (`id`, `felhnev`, `jelszo`, `joga_id`, `email`, `profilkep`, `letrehozas`, `feltoltot_receptek_szama`) 
            VALUES (NULL, '". $felhnev ."', '". $jelszo ."', '2', '". $email ."', NULL, current_timestamp(), NULL);";
            $db->query($muvelet);
            if ($db->errno == 0) {
                if ($db->affected_rows > 0) {
                    return 'Sikeres művelet!';
                }
                else if ($db->affected_rows == 0) {
                    return 'Sikertelen művelet!';
                }
                else {
                    return $db->error;
                }
            }
            return $db->error;
        }
        else {
            return $db->connect_error;
        }
        $db->close();
    }

    $adat = json_decode(file_get_contents("php://input"), true);

    
    if (isset($adat['felhnev']) && isset($adat['email']) && isset($adat['jelszo'])) {
        $felhnev = $adat['felhnev'];
        $email = $adat['email'];
        $jelszo = password_hash($adat["jelszo"], PASSWORD_DEFAULT);
        
        $muvelet = "SELECT * FROM `felhasznalok` where `felhasznalok`.`felhnev` LIKE '". $felhnev ."';";
        $foglalt = adatokLekerdezese($muvelet);
        if(is_array($foglalt)){
            $valasz = ["message" => "Ez a felhasználónév foglalt. Kérjük válasszon másikat."];
        }
        else{
            // Call the insertData function
            $valasz =  ["message" => regisztracio($felhnev, $email, $jelszo)];
        }
    } else {
        // Return an error message if required data is missing
        $valasz = ["message" => "Nem megfelelő adatok. Felhasználónév, email cím és jelszó kötelező."];
    }
    
    // Return the response as JSON
    echo json_encode($valasz);
?>