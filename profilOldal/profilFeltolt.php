
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
</body>
</html>

<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
            $feltoltesiUtvonal = '../feltoltotKepek/profilKepek/'; // Tároló mapp elérési utvonala
            $feltoltendoFajl = $feltoltesiUtvonal . basename($_FILES['image']['name']); 
        
            // Vizsgálja, hogy kép e
            $check = getimagesize($_FILES['image']['tmp_name']);

        if ($check !== false) {
            // Move the uploaded file to the target directory
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


