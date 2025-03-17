<?php

function adatokLekerese($muvelet, $tipus = null, $adat = null) {
    $db = new mysqli('localhost', 'root', '', 'balatonihajok');
    if ($db->connect_errno != 0) {
        return $db->connect_error;
    }

    if (!is_null($tipus) && !is_null($adat)) {
        $stmt = $db->prepare($muvelet);
        $stmt->bind_param($tipus, ...$adat);
        $stmt->execute();
        $eredmeny = $stmt->get_result();
    }
    else {
        $eredmeny = $db->query($muvelet);
    }

    if ($db->errno != 0) {
        return $db->error;
    }

    if ($eredmeny->num_rows == 0) {
        return 'Nincsenek találatok!';
    }

    return $eredmeny->fetch_all(MYSQLI_ASSOC);
}


function adatokValtoztatasa($muvelet, $tipus, $adat) {
    $db = new mysqli('localhost', 'root', '', 'balatonihajok');

    if ($db->connect_errno != 0) {
        return $db->connect_error;
    }

    if (!is_null($tipus) && !is_null($adat)) {
        $stmt = $db->prepare($muvelet);
        $stmt->bind_param($tipus, ...$adat);
        $stmt->execute();
    }
    else {
        $db->query($muvelet);
    }

    if ($db->errno != 0) {
        return $db->error;
    }

    return $db->affected_rows > 0 ? true : false;
}

?>