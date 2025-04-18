<?php
    require_once "../adatbazisInterakciok/sessionConfig.php";
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Főoldal</title>
    <link rel="stylesheet" href="fooldal.css">
    <link rel="stylesheet" href="../footer.css">
    <link rel="stylesheet" href="../navbar.css">
    <link rel="icon" type="image/png" href="../bejelentkezes/logo/FinomFalatokLogo.png">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body id="body">
    <!--START NAVBAR-->
    <nav class="navbar navbar-expand-lg" style="background-color: rgb(253, 222, 197);">
        <div class="container-fluid">
          <a class="navbar-brand" href="./fooldal.php"><img src="../bejelentkezes/logo/FinomFalatokLogoSzeles.png" alt="logo" title="logo" height="49px" width="130px"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav" id="navbarUl">
              <li class="nav-item text-center">
                <a class="nav-link" href="../receptekoldal/receptekoldal.php">Receptek</a>
              </li>
              <li class="nav-item text-center">
                <a class="nav-link" href="../hetimenuoldal/hetimenuoldal.php">Heti menü</a>
              </li>
              <li class="nav-item text-center">
                <a class="nav-link" href="../receptfeltolto/receptfeltolto.php">Recept feltöltés</a>
              </li>
              <li class="nav-item text-center">
                <a class="nav-link" href="../rolunk/rolunk.php">Rólunk</a>
              </li>
              <li class="nav-item text-center">
                <a class="nav-link" href="../gyerekmenu/gyerekmenu.php">Gyerek menü</a>
              </li>
              <li class="nav-item text-center">
                <a class="nav-link" href="../kedvencekoldal/kedvencekoldal.php">Kedvencek</a>
              </li>
              <li class="nav-item text-center">
                <a class="nav-link" href="../profilszerkeszto/profilszerkeszto.php">Profil</a>
              </li>
            </ul>
            <div class="text-center">
              <input type="button" value="Kijelentkezés" class="btn btn-outline-danger mt-1" id="btnKijelentkezes">
            </div>
          </div>
        </div>
      </nav>
    <!--VÉGE NAVBAR-->


    <!--START CAROUSEL-->
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="kepek/etel4.jpg" class="d-block w-100" alt="Étel">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel2.jpg" class="d-block w-100" alt="Étel">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel5.jpg" class="d-block w-100" alt="Étel">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel6.jpg" class="d-block w-100" alt="Étel">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel7.jpg" class="d-block w-100" alt="Étel">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel8.jpg" class="d-block w-100" alt="Étel">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel9.jpg" class="d-block w-100" alt="Étel">
        </div>
      </div>
    </div>

    <!--END CAROUSEL-->

    <!--START KERESÉS-->
    <div class="container my-4">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-4 col-md-12 col-sm-12">
          <div class="input-group">
            <input type="text" class="form-control" id="text_kereses" placeholder="Keresés" aria-label="Recept">
            <div class="input-group-append">
              <button class="btn btn-primary" id="button_kereses" type="button">Keresés</button>
            </div>
          </div>
        </div>
      </div>
    
    
      <!--END KERESÉS-->


      <div id="keresesiTalalat"></div>
          <!--START LEGÚJABB RECEPTEK KÁRTYÁK-->
        <div>
          <fieldset id="fieldset" class="mx-auto filter-box border p-3 bg-light rounded my-3">
            <legend class="text-center my-4 display-6">Legújabb Receptek</legend>
            <div id="legujabbReceptekKartyak"></div>
          </fieldset>
        </div>
        <!--END LEGÚJABB RECEPTEK KÁRTYÁK-->


        <!--START AJÁNLOTT RECEPTEK-->
        <div>
          <fieldset id="fieldset" class="mx-auto filter-box border p-3 bg-light rounded my-3">
            <legend class="text-center my-4 display-6">Ajánlott receptek</legend>
            <div id="ajanlottReceptekKartyak"></div>
          </fieldset>
        </div>
        <!--END AJÁNLOTT RECEPTEK-->
      </div>
      


      <!--FOOTER KEZDET-->
      <footer class="footer">
        <p>Elérhetőségek: 
          <br>
          <a href="mailto:szucsdaniel1@gmail.com">szucsdaniel1@gmail.com</a>
          <br>
          <a href="mailto:toth.balazs050313@gmail.com">toth.balazs050313@gmail.com</a>
        </p>
        
        <!-- <p>&copy; 2024 Your Company. All rights reserved.</p> -->
      </footer>
      <!--FOOTER VEGE-->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <script type="module" src="fooldal.js"></script>
    <script src="../javascriptFuggvenyek/bejelentkezesVizsgalat.js"></script>

</body>
</html>