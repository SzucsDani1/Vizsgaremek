
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="./profilOldal.css">
</head>
<body>
    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="image" required>
        <button type="submit">Feltöltés</button>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="./profiloldal.js"></script>
</body>
</html>

<?php
    // ! Töröld majd ki csak ideiglenes teszt!!!!
    setcookie("felhasznalonev", "PistaBá", time() + 2 * 24 * 60 * 60); 


    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
            $felhasznalonev = $_COOKIE["felhasznalonev"];
            $feltoltesiUtvonal = '../feltoltotKepek/profilKepek/'. $felhasznalonev; // Tároló mappa elérési utvonala
            
            if(!file_exists($feltoltesiUtvonal)){
                mkdir($feltoltesiUtvonal,0777, true);
            }

            // Get the file extension of the uploaded image
            $fileFormatum = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

            // Create a custom filename (e.g., "username_profilkep_randomID.jpg")
            $egyeniEleresiNev = $felhasznalonev . "_profilkep" . "." . $fileFormatum;

            // Set the full path for saving the image
            $feltoltendoFajl = $feltoltesiUtvonal . '/' . $egyeniEleresiNev;            


            // Vizsgálja, hogy kép e
            $check = getimagesize($_FILES['image']['tmp_name']);

        if ($check !== false) {
           

            //! feltöltöt file a kijelolt mappába rakása
            if (move_uploaded_file($_FILES['image']['tmp_name'], $feltoltendoFajl)) {
                echo "Profilkép sikeresen fellet töltve";
            } 
            else 
            {
                echo "Hiba történt a kép feltöltése közben.";
            }
        } 
        else 
        {
            echo "A feltöltendő kép formátuma nem megfelelő !";
        }
    }

?>


