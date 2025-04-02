<?php
    require_once "../adatbazisInterakciok/sessionConfig.php";
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recept elfogadása</title>
    <link rel="stylesheet" href="./adminElfogad.css">
    <link rel="stylesheet" href="../footer.css">
    <link rel="stylesheet" href="../navbar.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

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
              <a class="nav-link" href="#">Recept feltöltés</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="../rolunk/rolunk.php">Rólunk</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../gyerekmenu/gyerekmenu.php">Gyerek menü</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../kedvencekoldal/kedvencekoldal.php">Kedvencek</a>
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


        <!-- START RECEPT -->

        <div class="container">
          <!--Ételfajta-->
          <h1 class="display-6 text-body-secondary text-center my-3" id="etelfajtaKiir"></h1>
    
          <!--Vonal-->
          <hr class="border border-warning border-1 opacity-20 w-50 mx-auto">
    
    
          <!--Recept neve-->
          <h1 class="display-1 text-center my-3" id="receptNeve"></h1>
    
    
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
    
          <div class="text-center mt-5">
            <input type="button" value="-" class="btn btn-warning btn-lg mb-4" id="adagKivon">
            <span class="display-6 mx-3" id="adagKiir">Adag: </span>
            <input type="button" value="+" class="btn btn-warning btn-lg mb-4" id="adagHozzaad">
          </div>
          
          <!--Hozzávalók-->
          <div id="hozzavalokMegjelenit"></div>
    
          <div id='hozzavalokAlert' role='alert' hidden></div>
          <div id='hozzavalokProgressBar' hidden style=' height: 5px; width: 100%;'></div>
    
          <!--Recept infó-->
          <div class="row">
            <div class="col-12 col-lg-12 col-md-12 col-sm-12">
              <div class="filter-box border p-3 bg-light rounded my-3 mx-auto">
                <h1 class="display-6 my-3 text-center">Recept infó</h1>
                <ul class="list-group text-center" id="receptInfo"></ul>
              </div>
            </div>
          </div>
    
          <div class="row">
            <div class="col-12 col-lg-12 col-md-12 col-sm-12">
              <div class="filter-box border p-5 bg-light rounded my-3 mx-auto">
                <h1 class="display-4 text-center">Recept leírás</h1>
                <hr class="border border-secondary border-1 opacity-20 w-50 mx-auto">
                <h1 class="display-6 my-3 text-center message-containter" id="receptLeiras"></h1>
              </div>
            </div>
          </div>
          <!--Vonal-->
          <hr class="border border-warning border-1 opacity-20 w-80 mx-auto">
    
         
        </div>
        

        <!-- END RECEPT -->

        <!-- START OPCIÓK -->
        <form id="opciokDiv" class="d-flex justify-content-center gap-2 row mx-3">
            <button id="elfogadRec" type="button" class="btn btn-success col-md-3 col-sm-12">Elfogadás</button>
            <button id="modositasJavButton" type="button" class="btn btn-warning col-md-3 col-sm-12">Módosítási javaslat írása</button>
            <button id="opcioMegse" type="button" class="btn btn-danger col-md-3 col-sm-12">Mégse</button>
        </form>
        <!-- END OPCIÓK -->

       

        <!-- START JAVASLAT -->
        <div id="javaslatHelye" class="container my-3 " style="visibility: hidden;">
          <div  >
              <div class="input-group my-3">
                  <textarea  id="javaslat" placeholder="Módosítási javaslat" class="form-control"></textarea>
              </div>

              <div class="d-flex justify-content-center gap-2 flex-wrap mb-3">
                  <button id="javaslatKuld" type="button" class="btn btn-success  col-12">Javaslat küldése</button>
                  <button id="javaslatMegse" type="button" class="btn btn-danger  col-12">Mégse</button>
              </div>
          </div>
            <div id="javaslatAlert" role="alert"   hidden ></div>

        </div>

      
        <!-- END JAVASLAT -->

    <footer class="footer">
        <p>Elérhetőségek: 
          <br>
          <a href="mailto:szucsdaniel1@gmail.com">szucsdaniel1@gmail.com</a>
          <br>
          <a href="mailto:toth.balazs050313@gmail.com">toth.balazs050313@gmail.com</a>
        </p>
        
        <!-- <p>&copy; 2024 Your Company. All rights reserved.</p> -->
      </footer>
    
      
    <script  type="module" src="./segit.js"></script>
    <script src="../javascriptFuggvenyek/bejelentkezesVizsgalat.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>
</html>