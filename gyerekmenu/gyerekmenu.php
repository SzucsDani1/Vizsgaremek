<?php
    require_once "../adatbazisInterakciok/sessionConfig.php";
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gyerek menü</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="./gyerekmenu.css">
    <link rel="stylesheet" href="../footer.css">
    <link rel="stylesheet" href="../navbar.css">
    <link rel="icon" type="image/png" href="../bejelentkezes/logo/FinomFalatokLogo.png">

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
                <a class="nav-link active" href="../gyerekmenu/gyerekmenu.php">Gyerek menü</a>
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
    <!--END NAVBAR-->

    <div class="container">
      <div class="row">
        <h1 class="display-3 my-4 text-center">Gyerek menük</h1>
      </div>
      <div class="row my-4">
          <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto my-2">
              <input type="radio" class="btn-check" id="btnHetfo" name="hetNapjai" value="0" autocomplete="off">
              <label class="btn btn-outline-dark w-100" for="btnHetfo">Hétfő</label>
          </div>
          <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto my-2">
              <input type="radio" class="btn-check" id="btnKedd" name="hetNapjai" value="1" autocomplete="off">
              <label class="btn btn-outline-dark w-100" for="btnKedd">Kedd</label>
          </div>
          <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto my-2">
              <input type="radio" class="btn-check" id="btnSzerda" name="hetNapjai" value="2" autocomplete="off">
              <label class="btn btn-outline-dark w-100" for="btnSzerda">Szerda</label>
          </div>
          <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto my-2">
              <input type="radio" class="btn-check" id="btnCsutortok" name="hetNapjai" value="3" autocomplete="off">
              <label class="btn btn-outline-dark w-100" for="btnCsutortok">Csütörtök</label>
          </div>
          <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto my-2">
              <input type="radio" class="btn-check" id="btnPentek" name="hetNapjai" value="4" autocomplete="off">
              <label class="btn btn-outline-dark w-100" for="btnPentek">Péntek</label>
          </div>
          <div class="mx-auto col-lg-4 col-md-4 col-sm-6 my-2 col-12">
              <input type="radio" class="btn-check" id="btnSzombat" name="hetNapjai" value="5" autocomplete="off">
              <label class="btn btn-outline-dark w-100" for="btnSzombat">Szombat</label>
          </div>
          <div class=" mx-auto col-lg-4 col-md-4 col-sm-6 my-2 col-12">
              <input type="radio" class="btn-check" id="btnVasarnap" name="hetNapjai" value="6" autocomplete="off">
              <label class="btn btn-outline-dark w-100" for="btnVasarnap">Vasárnap</label>
          </div>
      </div>
      <div class="row filter-box border p-3 bg-light rounded">
        <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto">
          <h3>Reggeli</h3>
          <div id="reggeliMegjelenites" class="row"></div>
        </div>
        <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto">
          <h3>Tízórai</h3>
          <div id="tízóraiMegjelenites" class="row"></div>
        </div>
        <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto">
          <h3>Ebéd</h3>
          <div id="ebédMegjelenites" class="row"></div>
        </div>
        <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto">
          <h3>Uzsonna</h3>
          <div id="uzsonnaMegjelenites" class="row"></div>
        </div>
        <div class="col-12 col-lg-4 col-md-4 col-sm-6 mx-auto">
          <h3>Vacsora</h3>
          <div id="vacsoraMegjelenites" class="row"></div>
        </div>
      </div>
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

    <script type="module" src="./gyerekmenu.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>