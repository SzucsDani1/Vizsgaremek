<?php
    require_once "../adatbazisInterakciok/sessionConfig.php";
    include "./adatbazisInterakciok/hibakKiirat.php";
    include "./adatbazisInterakciok/adatbazisFeltolt.php";

?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profilszerkesztő</title>
    <link rel="stylesheet" href="profilszerkeszto.css">
    <link rel="stylesheet" href="../footer.css">
    <link rel="stylesheet" href="../navbar.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body id="body">
    
    <!--START NAVBAR-->
    <nav class="navbar navbar-expand-lg" style="background-color: rgb(253, 222, 197);">
        <div class="container-fluid">
        <a class="navbar-brand" href="../fooldal/fooldal.php"><img src="../bejelentkezes/logo/FinomFalatokLogoSzeles.png" alt="logo" title="logo" height="49px" width="130px"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav" id="navbarUl">
              <li class="nav-item">
                <a class="nav-link" href="../receptekoldal/receptekoldal.php">Receptek</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../hetimenuoldal/hetimenuoldal.php">Heti menü</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="#">Recept feltöltés</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="../rolunk/rolunk.php">Rólunk</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../gyerekmenu/gyerekmenu.php">Gyerek menü</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../kedvencekoldal/kedvencekoldal.php">Kedvencek</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../profilszerkeszto/profilszerkeszto.php">Profil</a>
              </li>
            </ul>
            <input type="button" value="Kijelentkezés" class="btn btn-outline-danger mt-1" id="btnKijelentkezes">
          </div>
        </div>
      </nav>
      <!--END NAVBAR-->

      <!--Regisztráció dátuma-->

      
          
      
    
    <div class="container mt-4">
        <div class="row">
          <div class="col-12 col-lg-6 order-lg-1 text-center">
                <div class="profile-container">
                
                    <div id="profilePicture" class="profile-picture ">Nincs profilkép</div>
                    <div >
                        <form method="POST" enctype="multipart/form-data" class="my-3">
                            <input type="file" id="fileInput" name="image" class="form-control mt-2" accept="image/*">
                            <button id="profilkepMentesButton" type="submit" class="btn btn-success w-100 my-3" style="display: none;">Mentés</button>
                        </form>
                        <button id="removeButton" class="btn btn-danger w-100 mt-2 my-3" style="display: none; ">Mégsem</button>
                        <?php


                            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
                                    $felhasznalonev = $_SESSION["felhasznalonev"];
                              
                                    $feltoltesiUtvonal = './feltoltotKepek/profilKepek/'. $felhasznalonev; // Tároló mappa elérési utvonala
                                    
                                    if(!file_exists($feltoltesiUtvonal)){
                                        mkdir($feltoltesiUtvonal,0777, true);
                                    }

                                    // fájl formátum
                                    $fileFormatum = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

                                    // fájl neve
                                    $egyeniEleresiNev = $felhasznalonev . "_profilkep" . "." . $fileFormatum;

                                    // fájl az elérési utvonalal
                                    $feltoltendoFajl = $feltoltesiUtvonal . '/' . $egyeniEleresiNev;            


                                    // Vizsgálja, hogy kép e
                                    $check = getimagesize($_FILES['image']['tmp_name']);

                                if ($check !== false) {
                                

                                    // * feltöltöt file a kijelolt mappába rakása
                                    if (move_uploaded_file($_FILES['image']['tmp_name'], $feltoltendoFajl)) {
                                        
                                        bejelentHiba("Sikeres módosítás!", false);
                                        $eleresiUtvonal = "UPDATE 
                                                                `felhasznalok` 
                                                            SET 
                                                                `profilkep` = '". $feltoltendoFajl ."' 
                                                            WHERE 
                                                                `felhasznalok`.`felhnev` 
                                                            LIKE 
                                                            '". $felhasznalonev."';";

                                        
                                        adatokValtoztatasa($eleresiUtvonal);
                                        $_SESSION["profilkep"] = $feltoltendoFajl;
                                        
                                    } 
                                    else 
                                    {
                                        bejelentHiba("Hiba történt a kép feltöltése közben.", true);
                                    }
                                } 
                                else 
                                {
                                    bejelentHiba("A feltöltendő kép formátuma nem megfelelő !", true);
                                }
                    }
                ?>
                    </div>
                </div>
               
          </div>
            <div class="col-12 col-lg-6 order-lg-2 form-section ">
                <div class="filter-box border p-3 bg-light rounded my-3">
                    <label class="mb-1">Regisztráció dátuma</label>
                    <form class="form-floating">
                        <input type="text" class="form-control" id="regisztracioDatuma" disabled>
                        <label for="regisztracioDatuma" class="form-label">Dátum</label>
                    </form>
                </div>
                <div class="filter-box border p-3 bg-light rounded my-3">
                    <label class="mb-1">Felhasználónév</label>
                    <form class="form-floating">
                        <input type="text" class="form-control" id="felhasznalonev" disabled>
                        <label for="felhasznalonev" class="form-label">Felhasználónév</label>
                    </form>
                </div>
                <div class="filter-box border p-3 bg-light rounded my-3">
                    <label class="mb-1">Jelszó</label>
                    <form class="form-floating">
                        <input value="placeholder" type="password" class="form-control" id="jelszo"  disabled>
                        <label for="jelszo" class="form-label">Jelszó</label>
                    </form>
                </div>
                <div class="filter-box border p-3 bg-light rounded my-3">
                    <label class="mb-1">E-mail cím</label>
                    <form class="form-floating">
                        <input type="email" class="form-control" id="email" disabled>
                        <label for="email" class="form-label">E-mail cím</label>
                    </form>
                </div>
                <div  id="gombokHelye">
                    <button id="modositas"  type="button" class="btn btn-primary w-100 " onclick="modositasFelold()">Módosítás</button>
                </div>
            </div>
        </div>

      
    </div>
      

    <footer class="footer">
        <p>Elérhetőségek: 
          <br>
          <a href="mailto:szucsdaniel1@gmail.com">szucsdaniel1@gmail.com</a>
          <br>
          <a href="mailto:toth.balazs050313@gmail.com">toth.balazs050313@gmail.com</a>
      </p>
        
        <!-- <p>&copy; 2024 Your Company. All rights reserved.</p> -->
    </footer>

    <script src="../javascriptFuggvenyek/bejelentkezesVizsgalat.js"></script>
    
    <script src="profilszerkeszto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>


