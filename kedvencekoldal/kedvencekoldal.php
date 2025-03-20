<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receptek</title>
    <link rel="stylesheet" href="kedvencekoldal.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body class="hatter">
     <!--START NAVBAR-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Logo helye</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">Főoldal</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Receptek</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Heti menü</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Recept feltöltés</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Rólunk</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Gyerek menü</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#">Kedvenc receptek és bevásárlólista</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Profil</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <!--END NAVBAR-->
  <div class="container">

    <div>
      <fieldset id="fieldset" class="mx-auto filter-box border p-3 bg-light rounded my-3">
        <legend class="text-center my-4">Kedvenc receptek</legend>
        <div id="kedvencReceptekKartyak">

        </div>
      </fieldset>
    </div>


  </div>
    
    

    
  <script src="kedvencekoldal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>