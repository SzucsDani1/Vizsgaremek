<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receptek</title>
    <link rel="stylesheet" href="receptfeltolto.css">
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
                <a class="nav-link active" aria-current="page" href="#">Profil</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <!--END NAVBAR-->    

    <!--CÍM-->
    <h1 class="text-center">Recept feltöltés</h1>



    <!--START ŰRLAP ELEMEK-->
    <div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-3">
            <form class="form-floating">
                <input type="text" class="form-control" id="recept_nev" placeholder="Név">
                <label for="recept_nev">Recept neve</label>
            </form>
        </div>
    </div>
    
    <div class="filter-box border p-3 bg-light rounded my-3">
        <h4 class="display-6 text-start">Hozzávalók</h4>
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <form class="form-floating">
                    <input type="text" class="form-control" id="hozzavalo1" placeholder="Hozzávaló">
                    <label for="hozzavalo1">Hozzávaló</label>
                </form>
            </div>
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <form class="form-floating">
                    <input type="text" class="form-control" id="hozzavalo2" placeholder="Hozzávaló">
                    <label for="hozzavalo2">Hozzávaló</label>
                </form>
            </div>
        </div>
    </div>
</div>

    <!--END ŰRLAP ELEMEK-->




    


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="receptekoldal.js"></script>
</body>
</html>