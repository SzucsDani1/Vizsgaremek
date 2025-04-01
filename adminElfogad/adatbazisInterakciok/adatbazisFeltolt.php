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


?>