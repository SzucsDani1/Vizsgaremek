<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receptek</title>
    <link rel="stylesheet" href="receptekoldal.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
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
    <!--VÉGE NAVBAR-->    


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

                    <!-- Kategóriák szűrő -->
                    <div class="dropdown">
                        <button class="btn btn-warning dropdown-toggle w-100" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Kategóriák
                        </button>
                    <ul class="dropdown-menu" aria-labelledby="filterDropdown">
                        <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox">
                            <label class="form-check-label">Levesek</label>
                        </div>
                        </li>
                        <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox">
                            <label class="form-check-label">Főételek</label>
                        </div>
                        </li>
                        <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox">
                            <label class="form-check-label">Desszertek</label>
                        </div>
                        </li>
                    </ul>
                    </div>

                    <!-- Nehézségi szint szűrő -->
                    <div class="mb-3">
                        <label class="form-label">Nehézségi szint</label>
                        <input type="range" class="form-range" min="0" max="10" step="1">
                    </div>

                    <!-- Elkészítési idő szűrő -->
                    <div class="mb-3">
                        <label for="timeRange" class="form-label">Elkészítési idő (perc)</label>
                        <input type="number" class="form-control" id="timeMin" placeholder="Min idő">
                        <input type="number" class="form-control mt-2" placeholder="Max idő">
                    </div>

                    <!-- Checkbox szűrő -->
                    <div class="mb-3">
                        <h6>Speciális igények</h6>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox">
                            <label class="form-check-label">Gluténmentes</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox">
                            <label class="form-check-label">Laktózmentes</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox">
                            <label class="form-check-label">Vegán</label>
                        </div>
                    </div>

                    <!-- Szűrés gomb -->
                    <button class="btn btn-primary w-100" id="szures_gomb">Szűrés</button>
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