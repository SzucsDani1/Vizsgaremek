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
     <!--
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
    -->
    <!--END CAROUSEL-->


    <h1 class="display-2 text-center my-5">Receptek szűrése</h1>

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
            <!-- Szűrőpanel-->
            <div class="col-lg-4 col-md-5 col-sm-12">
                <div class="filter-box border p-2 bg-light rounded">
                    <h4 class="display-6">Szűrés</h4>
                    <hr>

                    <!--Kategóriák szűrése-->
                    <div class="my-2 form-floating">
                      <input type="text" class="form-control" id="kategoriakKereses" placeholder="Keresés a kategóriák között...">
                      <label for="kategoriakKereses" class="form-label">Kategóriák keresése</label>
                    </div>
                    <div class="dropdown" id="kategoriakDropdown">
                      <div class="dropdown-menu" id="kategoriakLista"></div>
                    </div>
                    <div id="kivalasztottKategoriak"></div>

                    <!--Alapanyagok szűrése-->
                    <div class="my-2 form-floating">
                      <input type="text" class="form-control" id="alapanyagKereses" placeholder="Keresés az alapanyagok között...">
                      <label for="alapanyagKereses" class="form-label">Alapanyagok</label>
                    </div>
                    <div class="dropdown" id="alapanyagDropdown">
                      <div class="dropdown-menu" id="alapanyagLista"></div>
                    </div>
                    <div class="my-3" id="kivalasztottAlapanyagok"></div>

                     <!--Alapanyag nélkül szűrése-->
                     <div class="my-2 form-floating">
                      <input type="text" class="form-control" id="alapanyagNelkulKereses" placeholder="Keresés az alapanyagok között...">
                      <label for="AlapanyagNelkulKereses" class="form-label">Alapanyagok nélkül</label>
                    </div>
                    <div class="dropdown" id="alapanyagNelkulDropdown">
                      <div class="dropdown-menu" id="alapanyagNelkulLista"></div>
                    </div>
                    <div id="kivalasztottAlapanyagNelkul"></div>


                    <!--Étrend szűrő-->
                    <div class="my-2 form-floating">
                      <input type="text" class="form-control" id="etrendKereses" placeholder="Keresés az étrendek között...">
                      <label for="etrendKereses" class="form-label">Étrend</label>
                    </div>
                    <div class="dropdown" id="etrendDropdown">
                      <div class="dropdown-menu" id="etrendLista"></div>
                    </div>
                    <div id="kivalasztottEtrend"></div>

                    <!--Konyha szűrő-->
                    <div class="my-2 form-floating">
                      <input type="text" class="form-control" id="konyhaKereses" placeholder="Keresés a konyhák között...">
                      <label for="konyhaKereses" class="form-label">Konyha</label>
                    </div>
                    <div class="dropdown" id="konyhaDropdown">
                      <div class="dropdown-menu" id="konyhaLista"></div>
                    </div>
                    <div id="kivalasztottKonyha"></div>

                    <!-- Napszak szűrő -->
                    <div class="btn-group d-flex flex-wrap" role="group">
                      <input type="checkbox" class="btn-check" id="napszakReggeli" autocomplete="off" value="Reggeli">
                      <label class="btn btn-outline-primary flex-fill" for="napszakReggeli">Reggeli</label>

                      <input type="checkbox" class="btn-check" id="napszakTizorai" autocomplete="off" value="Tízórai">
                      <label class="btn btn-outline-primary flex-fill" for="napszakTizorai">Tízórai</label>

                      <input type="checkbox" class="btn-check" id="napszakEbed" autocomplete="off" value="Ebéd">
                      <label class="btn btn-outline-primary flex-fill" for="napszakEbed">Ebéd</label>

                      <input type="checkbox" class="btn-check" id="napszakUzsonna" autocomplete="off" value="Uzsonna">
                      <label class="btn btn-outline-primary flex-fill" for="napszakUzsonna">Uzsonna</label>

                      <input type="checkbox" class="btn-check" id="napszakVacsora" autocomplete="off" value="Vacsora">
                      <label class="btn btn-outline-primary flex-fill" for="napszakVacsora">Vacsora</label>
                    </div>

                    <!-- Ár szint szűrő -->
                    <div class="my-3">
                        <label class="form-label">Ár</label>
                        <input type="range" class="form-range" id="arInput" value="0" min="0" max="3" step="1">
                        <div id="arKiir" class="form-text">Mind</div>
                    </div>

                     <!-- Idő szint szűrő -->
                     <div class="my-3">
                        <label class="form-label">Elkészítési idő</label>
                        <input type="range" class="form-range" id="idoInput" value="0" min="0" max="3" step="1">
                        <div id="idoKiir" class="form-text">Mind</div>
                    </div>

                    <!-- Kalória szint szűrő -->
                    <div class="my-3">
                        <label class="form-label">Kalória</label>
                        <input type="range" class="form-range" id="kaloriaInput" value="0" min="0" max="4" step="1">
                        <div id="kaloriaKiir" class="form-text">Mind</div>
                    </div>


                    <!-- Nehézségi szint szűrő -->
                    <div class="my-3">
                      <label class="form-label">Nehézségi szint</label>
                      <input type="range" class="form-range" id="nehezsegInput" value="0" min="0" max="3" step="1">
                      <div id="nehezsegKiir" class="form-text">Mind</div>
                    </div>
                    
                    <!-- Szűrés gomb -->
                    <button class="btn btn-warning w-100 my-2" id="btnNullazas">Szűrők lenullázása</button>
                    <button class="btn btn-primary w-100 my-2" id="btnSzures">Szűrés</button>
                </div>
            </div>
            <!--Káryák-->
            <div class="col-lg-8 col-md-7 col-sm-12">
              <fieldset id="fieldset" class="mx-auto filter-box border p-3 bg-light rounded my-3">
                <legend id="legend" class="display-6 text-center">Receptek listája</legend>
                <div id="kartyak"></div>
              </fieldset>
              
            </div>
        </div>
    </div>

<!--END SZŰRÉS-->


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script type="module" src="receptekoldal.js"></script>

</body>
</html>