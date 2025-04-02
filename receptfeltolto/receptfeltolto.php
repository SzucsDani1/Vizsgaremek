<?php
    require_once "./adatbazisInterakciok/sessionConfig.php";
    include "./adatbazisInterakciok/adatbazisFeltolt.php";
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receptek</title>
    <link rel="stylesheet" href="receptfeltolto.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
<body id="body">
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
    <h1 class="text-center display-3 my-5">Recept feltöltés</h1>



    <!--START ŰRLAP ELEMEK-->

    <!--RECEPT NEVE-->
    <div class="container">

    <!--MÓDOSÍTÁSI JAVASLAT-->
    <div class="accordion mt-3 mb-5" hidden id="modositasiJavaslatAccordion"></div>
     
    <!--Recept neve-->
    <div class="row  align-items-center g-3">
      <div class="col-sm-12 col-md-6">
          <form class="form-floating">
              <input type="text" class="form-control" id="receptNev" placeholder="Név">
              <label for="receptNev">Recept neve</label>
          </form>
      </div>

      <!-- GYEREK Checkbox -->
      <div class="col-auto d-flex align-items-center">
          <input type="checkbox" class="form-check-input me-2" id="gyerekmenuE">
          <label for="gyerekmenuE" class="form-check-label">Gyerekeknek megfelelő recept?</label>
      </div>
    </div>

    <button type="button" class="btn btn-warning w-100 my-3" id="hozzaadKategoriaGomb">Hozzávalók hozzáadása</button>

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
              <label>Ételfajták</label>
              <select class="selectpicker form-select w-100" data-live-search="true" data-dropup-auto="false" id="etelfajtaSearch">
                
              </select>
            </div>
        </div>
    </div>

    <!--NAPSZAK FELTÖLTÉSE-->
    <div class="row">
      <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="mb-3">
          <label>Napszak</label>
          <select class="selectpicker form-select w-100" data-live-search="true" data-dropup-auto="false" id="napszak">
            <option value="REGGELI" data-tokens="Reggeli">REGGELI</option>
            <option value="TÍZÓRAI" data-tokens="Tízórai">TÍZÓRAI</option>
            <option value="EBÉD" data-tokens="Ebéd">EBÉD</option>
            <option value="UZSONNNA" data-tokens="Uzsonna">UZSONNA</option>
            <option value="VACSORA" data-tokens="Vacsora">VACSORA</option>
          </select>
        </div>
      </div>          
    </div>

    <!--ÉTREND SZŰRÉSE-->
    <div class="row">
      <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="mb-3">
          <label class="mb-1">Étrend</label>
          <form class="form-floating">
            <input type="text" class="form-control" id="etrendSearch">
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
          <label>Konyhák</label>
          <select class="selectpicker form-select w-100" data-live-search="true" data-dropup-auto="false" id="konyhaSearch">
           
          </select>
        </div>
      </div>          
    </div>

     <!--NEHÉZSÉG FELVITELE-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="my-3">
          <label class="form-label">Nehézségi szint</label>
          <input type="range" class="form-range" id="nehezsegInput" value="0" min="0" max="2" step="1">
          <div id="nehezsegKiir" class="form-text">KÖNNYÜ</div>
        </div>
        </div>
      </div>
      
      <!--ÁR FELVITELE-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="my-3">
          <label class="form-label">Ár</label>
          <input type="range" class="form-range" id="arInput" value="0" min="0" max="2" step="1">
          <div id="arKiir" class="form-text">OLCSÓ</div>
        </div>
        </div>
      </div>


      <!--ADAG FELVITELE -->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="my-3">
          <label class="form-label">Adag</label>
          <input type="range" class="form-range" id="adagInput" value="1" min="1" max="10" step="1">
          <div id="adagKiir" class="form-text">1 adag</div>
        </div>
        </div>
      </div>

      <!--IDŐ FELVITELE-->
      <div class="row">
        <div class="filter-box border p-3 bg-light rounded my-3">
          <label class="mb-1">Idő (perc)</label> 
            <div class="col-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                <form class="form-floating">
                    <input type="number" class="form-control" id="idoInput">
                    <label for="idoInput" class="form-label">Idő</label>
                </form>
            </div>
        </div>
      </div>

      <!--KALÓRIA FELVITELE-->
      <div class="row">
      <div class="filter-box border p-3 bg-light rounded my-3">
        <div class="mb-3">
          <label class="mb-1">Kalória (kcal)</label>
          <form class="form-floating">
            <input type="number" class="form-control" id="kaloriaInput">
            <label for="kaloriaInput" class="form-label">Kalória</label>
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
        <div class="recept-container">
                
                <div id="receptPicture" class="recept-picture ">Nincs kép</div>
                <div >
                    <form method="POST" enctype="multipart/form-data" class="my-3">
                        <input type="file" id="fileInput" name="image" class="form-control mt-2" accept="image/*">
                        <button id="receptMentesButton" type="submit" class="btn btn-success w-100 my-3" style="display: none;">Mentés</button>
                    </form>
                    <button id="removeButton" class="btn btn-danger w-100 mt-2 my-3" style="display: none; ">Mégsem</button>
                    <?php


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
        $felhasznalonev = $_SESSION["felhasznalonev"];
  
        $feltoltesiUtvonal = './feltoltotKepek/profilKepek/'. $felhasznalonev; // Tároló mappa elérési utvonala
        
        if(!file_exists($feltoltesiUtvonal)){
            mkdir($feltoltesiUtvonal,0777, true);
        }

        // fájl formátum
        $fileFormatum = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);

        // fájl neve
        $egyeniEleresiNev = $felhasznalonev . "_profilkep" . "." . $fileFormatum;

        // fájl az elérési utvonalal
        $feltoltendoFajl = $feltoltesiUtvonal . '/' . $egyeniEleresiNev;            


        // Vizsgálja, hogy kép e
        $check = getimagesize($_FILES['image']['tmp_name']);

    if ($check !== false) {
    

        // * feltöltöt file a kijelolt mappába rakása
        if (move_uploaded_file($_FILES['image']['tmp_name'], $feltoltendoFajl)) {
            
            bejelentHiba("Sikeres módosítás!", false);
            $eleresiUtvonal = "UPDATE 
                                    `felhasznalok` 
                                SET 
                                    `profilkep` = '". $feltoltendoFajl ."' 
                                WHERE 
                                    `felhasznalok`.`felhnev` 
                                LIKE 
                                '". $felhasznalonev."';";

            
            adatokValtoztatasa($eleresiUtvonal);
            $_SESSION["profilkep"] = $feltoltendoFajl;
            
        } 
        else 
        {
            bejelentHiba("Hiba történt a kép feltöltése közben.", true);
        }
    } 
    else 
    {
        bejelentHiba("A feltöltendő kép formátuma nem megfelelő !", true);
    }
}
?>
                </div>   
              </div>        
        </div>
      </div>      
                            
      <div class="row">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12">
          <input type="button" value="Recept feltöltése" class="btn btn-warning m-2 col-12 col-lg-12 col-md-12 col-sm-12" id="btnReceptFeltoltes">
        </div>
      </div>
      <div class="row" id="hibaUzenet">

      </div>
</div>

    <!--END ŰRLAP ELEMEK-->



    


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script type="module" src="receptfeltolto.js"></script>
</body>
</html>