<?php
   

    // Get JSON data from request body
    $inputData = json_decode(file_get_contents("php://input"));

    
    if (!$inputData) {
        echo json_encode(["error" => "Nem érkezet adat!"]);
        exit;
        
    }

    $decodedData = json_decode(file_get_contents("php://input"), true);
    
    if (!$decodedData || !isset($decodedData["sqlKod"])) {
        echo json_encode(["error" => "Nincsnen sql lekérés!"]);
        exit;

    }

    $muvelet = $decodedData["sqlKod"];

    $db = new mysqli ('localhost', 'root', '', 'vizsgaremek');
    if ($db->connect_errno == 0 ) {
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

?>