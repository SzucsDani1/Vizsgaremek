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

    <!--RECEPT NEVE-->
    <div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-3">
            <form class="form-floating">
                <input type="text" class="form-control" id="recept_nev" placeholder="Név">
                <label for="recept_nev">Recept neve</label>
            </form>
        </div>
    </div>

    <button type="button" class="btn btn-warning w-100" id="hozzaadKategoriaGomb">Kategória hozzáadása</button>

    <div id="hozzavaloKategoriak"></div>

    <!--HOZZÁVALÓK FELVITELÁHEZ SZÜKSÉGES INPUT MEZŐK-->
    <div class="filter-box border p-3 bg-light rounded my-3" hidden>
        <h4 class="display-6 text-start">Hozzávalók</h4> 
        <div class="row">
            <div class="col-12 col-lg-4 col-md-12 col-sm-12 mb-3">
                <form class="form-floating">
                    <input type="text" class="form-control" id="hozzavalo_neve" placeholder="Hozzávaló">
                    <label for="hozzavalo_neve">Hozzávaló neve</label>
                </form>
            </div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12 mb-3">
                <form class="form-floating">
                    <input type="text" class="form-control" id="hozzavalo_mennyiseg" placeholder="Hozzávaló mennyiség">
                    <label for="hozzavalo_mennyiseg">Hozzávaló mennyiség</label>
                </form>
            </div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12 mb-3">
                <form class="form-floating">
                    <input type="text" class="form-control" id="hozzavalo_mertekegyseg" placeholder="Hozzávaló mennyiség">
                    <label for="hozzavalo_mertekegyseg">Hozzávaló mértékegysége</label>
                </form>
            </div>
            <button type="button" class="btn btn-success" id="btn_hozzaad">Hozzáad</button>
        </div>
    </div>
    
    <!--RECEPT HOZZÁVALÓ TÁBLÁZAT-->
    <div class="row">
    <table class="table table-success" id="table_hozzavalok" hidden>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Név</th>
          <th scope="col">Mennyiség</th>
          <th scope="col">Mértékegység</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody id="tbody_hozzavalok">
      </tbody>
    </table>
    <div class="alert alert-danger" id="figyelmezteto_uzenet" hidden role="alert">

    </div>

    <!--ÉTELFAJTÁK SZŰRÉSE-->
    <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
            <div class="mb-3">
              <label class="mb-1">Ételfajták</label>
              <form class="form-floating">
                <input type="text" class="form-control" id="etelfajtaSearch" placeholder="Keresés az Ételfajták között...">
                <label for="etelfajtaSearch" class="form-label">Ételfajta keresése</label>
              </form>
            </div>
            <div class="dropdown" id="etelfajtaDropdown">
                <div class="dropdown-menu" id="etelfajtaLista"></div>
            </div>
            <div class="mt-3" id="kivalasztottEtelfajta"></div>
        </div>
    </div>

    <!--ÉTREND SZŰRÉSE-->
    <div class="row">
      <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="mb-3">
          <label class="mb-1">Étrend</label>
          <form class="form-floating">
            <input type="text" class="form-control" id="etrendSearch" placeholder="Keresés az étrendek között...">
            <label for="etrendSearch" class="form-label">Étrend keresése</label>
          </form>
        </div>
        <div class="dropdown" id="etrendDropdown">
          <div class="dropdown-menu" id="etrendLista"></div>
        </div>
        <div class="mt-3" id="kivalasztottEtrend"></div>
      </div>          
    </div>

    <!--KONYHÁK SZŰRÉSE-->
    <div class="row">
      <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="mb-3">
          <label class="mb-1">Konyhák</label>
          <form class="form-floating">
            <input type="text" class="form-control" id="konyhaSearch" placeholder="Keresés az konyhák között...">
            <label for="konyhaSearch" class="form-label">Konyhák keresése</label>
          </form>
        </div>
        <div class="dropdown" id="konyhaDropdown">
          <div class="dropdown-menu" id="konyhaLista"></div>
        </div>
        <div class="mt-3" id="kivalasztottKonyha"></div>
      </div>          
    </div>

     <!--ALAPANYAGOK SZŰRÉSE-->
     <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <div class="mb-3">
            <label class="mb-1">Alapanyagok</label>
            <form class="form-floating">
              <input type="text" class="form-control" id="alapanyagSearch" placeholder="Keresés az alapanyagok között...">
              <label for="AlapanyagSearch" class="form-label">Alapanyagok keresése</label>
            </form>
          </div>
          <div class="dropdown" id="alapanyagDropdown">
            <div class="dropdown-menu" id="alapanyagLista"></div>
          </div>
          <div class="mt-3" id="kivalasztottAlapanyagok"></div>
        </div>
     </div>

     <!--NEHÉZSÉG FELVITELE-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <div class="mb-3">
            <label class="form-label">Nehézségi szint</label>
            <input type="range" class="form-range" id="nehezsegInput" value="0" min="0" max="3" step="1">
            <div id="nehezsegKiir" class="form-text">Mind</div>
          </div>
        </div>
      </div>
      
      <!--ÁR FELVITELE-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <div class="mb-3">
            <label class="form-label">Ár</label>
            <input type="range" class="form-range" id="arInput" value="0" min="0" max="3" step="1">
            <div id="arKiir" class="form-text">Mind</div>
          </div>
        </div>
      </div>

      <!--KALÓRIA FELVITELE-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <div class="mb-3">
            <label class="form-label">Kalória</label>
            <input type="range" class="form-range" id="kaloriaInput" value="0" min="0" max="4" step="1">
            <div id="kaloriaKiir" class="form-text">Mind</div>
          </div>
        </div>
      </div>

      <!--ADAG FELVITELE -->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <div class="mb-3">
            <label class="form-label">Adag</label>
            <input type="range" class="form-range" id="adagInput" value="0" min="0" max="9" step="1">
            <div id="adagKiir" class="form-text">1 adag</div>
          </div>
        </div>
      </div>

      <!--IDŐ FELVITELE-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <label class="mb-1">Idő</label> 
            <div class="col-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <form class="form-floating">
                    <input type="text" class="form-control" id="ido" placeholder="Idő beállítása">
                    <label for="ido">Idő</label>
                </form>
            </div>
        </div>
      </div>

      <!--RECEPT LEÍRÁSA-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <label class="mb-1">Recept leírása</label>
          <div class="form-floating">
            <textarea class="form-control" placeholder="Recept leírása" id="receptLeiras" style="height: 200px"></textarea>
            <label for="receptLeiras">Recept Leírás</label>
          </div>
        </div>
    </div>

      <!--KÉPFELTÖLTÉS-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <div class="col-12">
            <label class="mb-1">Kép feltöltés</label>
            <div class="form-group">
              <label for="kepFeltoltInput" class="btn btn-primary w-100">
                Fájlok kiválasztása
              </label>
              <input type="file" class="d-none" id="kepFeltoltInput" multiple accept="image/*">
            </div>
            <div class="row" id="kepMegjelenit">
            </div>
          </div>
        </div>
      </div>
</div>

    <!--END ŰRLAP ELEMEK-->




    


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="receptfeltolto.js"></script>
</body>
</html>