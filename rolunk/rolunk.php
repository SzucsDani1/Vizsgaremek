<?php
    require_once "../adatbazisInterakciok/sessionConfig.php";
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rólunk</title>
    <link rel="stylesheet" href="./rolunk.css">
    <link rel="stylesheet" href="../footer.css">
    <link rel="stylesheet" href="../navbar.css">
    <link rel="icon" type="image/png" href="../bejelentkezes/logo/FinomFalatokLogo.png">
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
              <a class="nav-link" href="../receptfeltolto/receptfeltolto.php">Recept feltöltés</a>
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

      

      <div class="container text-center">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6 col-sm-12 d-flex justify-content-center my-5">
            <div class="card" style="width: 18rem;">
              <img id="kepek" src="./kepek/Dani.jpg" class="card-img-top" alt="Szűcs Dániel">
              <div class="card-body">
                <h5 class="card-title">Szűcs Dániel</h5>
                <p class="card-text">Szűcs Dániel vagyok, 19 éves szoftverfejlesztő és tesztelő. Kedvenc programnyelveim: javascript, php.
                Terveim szerint egyetemen fogom folytatni tanulmányaimat és az informatikai szektorban szeretnék elhelyezkedni diplomámmal.</p>
                <a href="https://github.com/SzucsDani1" target="_blank" class="btn btn-primary">Github profil</a>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-sm-12 d-flex justify-content-center my-5">
            <div class="card" style="width: 18rem;">
                <img id="kepek" src="./kepek/Balazs.jpg" class="card-img-top" alt="Tóth Balázs">
                <div class="card-body">
                  <h5 class="card-title">Tóth Balázs</h5>
                  <p class="card-text">Tóth Balázs vagyok, 20 éves szoftverfejlesztő és tesztelő. Kedvenc programnyelveim: php, javascript, c#.
                    Terveim szerint egyetemen fogom folytatni tanulmányaimat és az informatikai szektorban szeretnék elhelyezkedni diplomámmal.
                  </p>
                  <a href="https://github.com/tothbalazsipari" target="_blank" class="btn btn-primary">Github profil</a>
                </div>
              </div>
            </div>
        </div>
      </div>
          
      
      <div id="leiras">
        <p>
          A vizsgaremekünk célja egy olyan oldal elkészítése volt, amin a felhasználók egy egyszerű felületen képesek receptek után kutatni.
          <br>
          A legnagyobb probléma a jelenleg jelenlévő oldalakkal, hogy rengeteg reklám van rajtuk és vannak olyan megoldások amik fölösleges oldal újra töltésekhez vezetnek.
          A munkánk sorrán megprobáltuk a <strong>weboldal újratöltését elkerülni</strong> ahol lehet ezzel is egy letiusztulba UX kinálva és az oldal <strong> nem tartalmaz reklámokkat</strong>.
        </p>
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
    
    <script src="../javascriptFuggvenyek/bejelentkezesVizsgalat.js"></script>
      
    <script type="module" src="./rolunk.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>


