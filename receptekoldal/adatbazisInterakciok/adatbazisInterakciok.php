<?php
    
    function adatokValtoztatasa($muvelet) {
        $db = new mysqli ('localhost', 'root', '', 'vizsgaremek');

        if ($db->connect_errno == 0 ) {
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
   

    function adatokLekerdezese($muvelet){
        $db = new mysqli ('localhost', 'root', '', 'vizsgaremek');

        if($db->connect_errno == 0) {
            $eredmeny = $db->query($muvelet);
            if ($db->errno == 0) {
                if ($eredmeny->num_rows != 0) {
                    $adatok = $eredmeny->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($adatok);
                    exit; 
                }
                else {
                    echo json_encode('Nincs találat!');
                    exit;
                }
            }
            echo json_encode($db->error);
            exit;
        }
        else {
            echo json_encode($db->connect_error);
            exit;
        }
    }

?>