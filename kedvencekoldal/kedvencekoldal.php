<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kedvencek</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="kedvencekoldal.css">
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
                <a class="nav-link" href="../rolunk/rolunk.php">Rólunk</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../gyerekmenu/gyerekmenu.php">Gyerek menü</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="./kedvencekoldal.php">Kedvencek</a>
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
  <div class="container">

    <div>
      <fieldset id="fieldset" class="mx-auto filter-box border p-3 bg-light rounded my-3">
        <legend class="text-center my-4 display-6">Kedvenc receptek</legend>
        <div id="kedvencReceptekKartyak">

        </div>
      </fieldset>
    </div>

    <fieldset id="fieldset" class="mx-auto filter-box border p-3 bg-light rounded my-5">
        <legend class="text-center my-4 display-6">Bevásárló lista</legend>
        <div class="accordion" id="accordionHozzavalok">
        </div>
    </fieldset>
    

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
    
  <script type="module" src="kedvencekoldal.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>