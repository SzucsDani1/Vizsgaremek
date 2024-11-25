<?php 
    function regisztracio($felhnev, $email, $jelszo) {
        
        $db = new mysqli ('localhost', 'root', '', 'vizsgaremek');
        if ($db->connect_errno == 0 ) {
            //muvelet megírása
            $muvelet = "";
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
    }

    $adat = json_decode(file_get_contents("php://input"), true);

    if (isset($data['felhnev']) && isset($data['email']) && isset($data['jelszo'])) {
        $felhnev = $data['felhnev'];
        $email = $data['email'];
        $jelszo = password_hash($data["jelszo"], PASSWORD_DEFAULT);
        
    
        // Call the insertData function
        $valasz = regisztracio($felhnev, $email, $jelszo);
    } else {
        // Return an error message if required data is missing
        $valasz = ["message" => "Nem megfelelő adatok. Felhasználónév, email cím és jelszó kötelező."];
    }
    
    // Return the response as JSON
    echo json_encode($valasz);
?>