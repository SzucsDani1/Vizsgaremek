<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receptek</title>
    <link rel="stylesheet" href="reszletesreceptoldal.css">
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
                <a class="nav-link active" aria-current="page" href="#">Profil</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <!--END NAVBAR-->


    <div class="container">
      <!--Ételfajta-->
      <h1 class="display-6 text-body-secondary text-center my-3" id="etelfajtaKiir"></h1>

      <!--Vonal-->
      <hr class="border border-warning border-1 opacity-20 w-50 mx-auto">


      <!--Recept neve-->
      <h1 class="display-1 text-center my-3" id="receptNeve"></h1>

      <!--Csillagos értékelés-->
      <div id="ertekelesMegjelenites" class="text-center">
        <span class="star" id="csillagMegjelen" data-value="1">&#9734;</span>
        <span class="star" id="csillagMegjelen" data-value="2">&#9734;</span>
        <span class="star" id="csillagMegjelen" data-value="3">&#9734;</span>
        <span class="star" id="csillagMegjelen" data-value="4">&#9734;</span>
        <span class="star" id="csillagMegjelen" data-value="5">&#9734;</span>
      </div>

      <!--Kép megjelenítés-->
      <img src="https://www.kreactivity.hu/img/23190/G00176/264x264,r/Kis-tigris-festes-es-gyemantszemes-kreativ-hibrid-kep.webp?time=1715340732" class="rounded mx-auto img-fluid d-block" alt="...">

      <!--Idő, költség és nehézség táblázatban-->
      <table class="table table-bordered w-75 mx-auto mt-3 text-center table-warning ">
        <thead>
          <tr class="border-top-0 border-bottom-0">
            <th scope="col">Idő</th>
            <th scope="col">Költség</th>
            <th scope="col">Nehézség</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-top-0 border-bottom-0">
            <td id="receptIdeje"></td>
            <td id="receptKoltseg"></td>
            <td id="receptNehezseg"></td>
          </tr>
        </tbody>
      </table>

      <!--Hozzávalók-->
      <div id="hozzavalokMegjelenit"></div>

      <!--Recept infó-->
      <div class="row">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12">
          <div class="filter-box border p-3 rounded my-3 mx-auto">
            <div class="list-group" id="receptInfo"></div>
          </div>
        </div>
      </div>

      <!--Vonal-->
      <hr class="border border-warning border-1 opacity-20 w-80 mx-auto">

      <!--Csillagos értékelés a felhasználótól-->
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="filter-box border p-3 rounded my-3 mx-auto" id="divErtekelFelhasznalo">
            <h1 class="display-6 text-center">Értékelés</h1>
            <label id="ertekeltSzoveg"></label>
            <div id="ertekelesFelhasznalotol" class="text-center">
              <span class="star" id="csillagErtekel" data-value="1">&#9734;</span>
              <span class="star" id="csillagErtekel" data-value="2">&#9734;</span>
              <span class="star" id="csillagErtekel" data-value="3">&#9734;</span>
              <span class="star" id="csillagErtekel" data-value="4">&#9734;</span>
              <span class="star" id="csillagErtekel" data-value="5">&#9734;</span>
            </div>
            
          </div>
          <input type="button" value="Küldés" id="btnErtekelesKuld" class="btn btn-warning w-100 mb-5">
        </div>
        <div id="ertekelesAlert"></div>
      </div>
      
      
      

      <h1 class="display-6 text-center">Hozzászólás írása</h1>

      <!--Hozzászólás-->
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="hozzaszolas" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Hozzászólás</label>
      </div>

      <!--Küldés gomb-->
        <input type="button" value="Küldés" class="btn btn-primary col-12 mb-5 mt-3" id="btnHozzaszolasKuldes">


      <!--Hozzászólás elküldésének sikeressége-->
      <div id="hozzaszolasUzenet"></div>

      <div id="divHozzaszolasok" class="filter-box border p-3 bg-light rounded">
        <h1 id="cimHozzaszolas" class="display-6 my-4">Hozzászólások</h1>
        <ul class="list-group list-group-flush"  id="hozzaszolasok"></ul>
      </div>
    </div>
    

    
  <script src="reszletesreceptoldal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>