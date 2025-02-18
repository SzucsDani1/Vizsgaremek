<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receptek</title>
    <link rel="stylesheet" href="receptekoldal.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body style="background-color: rgb(253, 222, 197);">
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
                <a class="nav-link active" aria-current="page" href="#">Receptek</a>
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
                <a class="nav-link" href="#">Profil</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <!--END NAVBAR-->    


     <!--START CAROUSEL-->
     <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="kepek/etel4.jpg" class="d-block w-100" alt="Bolognai">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel2.jpg" class="d-block w-100" alt="Gyümölcsök">
        </div>
        <div class="carousel-item">
          <img src="kepek/etel5.jpg" class="d-block w-100" alt="Tészta">
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
              <button class="btn btn-outline-secondary" id="button_kereses" type="button">Keresés</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--END KERESÉS-->


    <!--START SZŰRÉS-->
    <div class="container">
        <div class="row">
            <!-- Szűrőpanel helye -->
            <div class="col-lg-4 col-md-5 col-sm-12">
                <div class="filter-box border p-3 bg-light rounded">
                    <h4>Szűrés</h4>
                    <hr>

                    <!--Kategóriák szűrése-->
                    <div class="mb-3">
                      <label for="kategoriakSearch" class="form-label">Kategóriák keresése</label>
                      <input type="text" class="form-control" id="kategoriakSearch" placeholder="Keresés a kategóriák között...">
                    </div>
                    <div class="dropdown" id="kategoriakDropdown">
                      <div class="dropdown-menu" id="kategoriakLista"></div>
                    </div>
                    <div class="mt-3" id="kivalasztottKategoriak"></div>


                    <!-- Nehézségi szint szűrő -->
                    <div class="mb-3">
                        <label class="form-label">Nehézségi szint</label>
                        <input type="range" class="form-range" id="nehezsegInput" value="1" min="0" max="2" step="1">
                        <div id="nehezsegKiir" class="form-text"></div>
                    </div>

                    <!-- Elkészítési idő szűrő -->
                    <div class="mb-3">
                        <label for="timeRange" class="form-label">Elkészítési idő (perc)</label>
                        <input type="number" class="form-control" id="timeMin" placeholder="Min idő">
                        <input type="number" class="form-control mt-2" placeholder="Max idő">
                    </div>


                    <!-- Napszak szűrő -->
                    <div class="btn-group d-flex flex-wrap" role="group">
                      <input type="checkbox" class="btn-check" id="napszakReggeli" autocomplete="off">
                      <label class="btn btn-outline-danger flex-fill" for="napszakReggeli">Reggeli</label>

                      <input type="checkbox" class="btn-check" id="napszakTizorai" autocomplete="off">
                      <label class="btn btn-outline-danger flex-fill" for="napszakTizorai">Tízórai</label>

                      <input type="checkbox" class="btn-check" id="napszakEbed" autocomplete="off">
                      <label class="btn btn-outline-danger flex-fill" for="napszakEbed">Ebéd</label>

                      <input type="checkbox" class="btn-check" id="napszakUzsonna" autocomplete="off">
                      <label class="btn btn-outline-danger flex-fill" for="napszakUzsonna">Uzsonna</label>

                      <input type="checkbox" class="btn-check" id="napszakVacsora" autocomplete="off">
                      <label class="btn btn-outline-danger flex-fill" for="napszakVacsora">Vacsora</label>
                    </div>

                    <!--Alapanyagok szűrése-->
                    <div class="mb-3">
                      <label for="AlapanyagSearch" class="form-label mt-2">Alapanyagok</label>
                      <input type="text" class="form-control" id="alapanyagSearch" placeholder="Keresés az alapanyagok között...">
                    </div>
                    <div class="dropdown" id="alapanyagDropdown">
                      <div class="dropdown-menu" id="alapanyagLista"></div>
                    </div>
                    <div class="mt-3" id="kivalasztottAlapanyagok"></div>

                     <!--Alapanyag nélkül szűrése-->
                     <div class="mb-3">
                      <label for="AlapanyagNelkulSearch" class="form-label mt-2">Alapanyagok nélkül</label>
                      <input type="text" class="form-control" id="alapanyagNelkulSearch" placeholder="Keresés az alapanyagok között...">
                    </div>
                    <div class="dropdown" id="alapanyagNelkulDropdown">
                      <div class="dropdown-menu" id="alapanyagNelkulLista"></div>
                    </div>
                    <div class="mt-3" id="kivalasztottAlapanyagNelkul"></div>


                    <!--Étrend szűrő-->
                    <div class="mb-3">
                      <label for="etrendSearch" class="form-label mt-2">Étrend</label>
                      <input type="text" class="form-control" id="etrendSearch" placeholder="Keresés az étrendek között...">
                    </div>
                    <div class="dropdown" id="etrendDropdown">
                      <div class="dropdown-menu" id="etrendLista"></div>
                    </div>
                    <div class="mt-3" id="kivalasztottEtrend"></div>


                    <!--Konyha szűrő-->
                    <div class="mb-3">
                      <label for="konyhaSearch" class="form-label mt-2">Konyha</label>
                      <input type="text" class="form-control" id="konyhaSearch" placeholder="Keresés a konyhák között...">
                    </div>
                    <div class="dropdown" id="konyhaDropdown">
                      <div class="dropdown-menu" id="konyhaLista"></div>
                    </div>
                    <div class="mt-3" id="kivalasztottKonyha"></div>


                    <!-- Ár szint szűrő -->
                    <div class="mb-3">
                        <label class="form-label">Ár</label>
                        <input type="range" class="form-range" id="arInput" value="0" min="0" max="3" step="1">
                        <div id="arKiir" class="form-text">Mind</div>
                    </div>

                    <!-- Kalória szint szűrő -->
                    <div class="mb-3">
                        <label class="form-label">Kalória</label>
                        <input type="range" class="form-range" id="kaloriaInput" value="0" min="0" max="4" step="1">
                        <div id="kaloriaKiir" class="form-text">Mind</div>
                    </div>

                    <!-- Adag szint szűrő -->
                    <div class="mb-3">
                        <label class="form-label">Adag</label>
                        <input type="range" class="form-range" id="adagInput" value="0" min="0" max="9" step="1">
                        <div id="adagKiir" class="form-text">1 adag</div>
                    </div>

                    <!-- Konyha szűrő -->
                    <div class="btn-group d-flex flex-wrap" role="group" id="konyhaDiv">
                    </div>

                    
                    <!-- Checkbox szűrő -->
                    <div class="dropdown">
                    </div>

                    

                    <!-- Szűrés gomb -->
                    <button class="btn btn-danger w-100" id="szures_gomb">Szűrés</button>
                </div>
            </div>
            <!--Káryák-->
            <div class="col-lg-8 col-md-7 col-sm-12">
                <h2>Receptek listája</h2>
            <div id="kartyak"></div>
            </div>
        </div>
    </div>

<!--END SZŰRÉS-->


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="receptekoldal.js"></script>
</body>
</html>