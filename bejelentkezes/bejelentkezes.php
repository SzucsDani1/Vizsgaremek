<?php include "./adatbazisInterakciok/adatbazisInterakciok.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejelentkezés</title>
    <link rel="stylesheet" href="bejelentkezes.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">    
</head>
<body>
    <h1 style="text-align: center;">Bejelentkezés</h1>

    <!--START CAROUSEL-->
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="kepek/etel4.jpg" class="d-block w-100" alt="Bolognai">
                <div class="carousel-caption d-sm-block">
                    <h1>Finom falatok</h1>
                </div>
            </div>
        </div>
    </div>
    
    <!--END CAROUSEL-->


    <!--START FELHASZNÁLÓNÉV ÉS JELSZÓ MEZŐK-->
    <div class="container">
        <form method="get">
            <div class="row">
                <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-12">
                    <!-- FELHASZNÁLÓVÉV -->
                    <input type="text" name="Bejfelhasznalonev" class="form-control inputMezo" placeholder="Felhasználónév" aria-label="Recept">
                </div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-12">
                    <!-- JELSZÓ -->
                    <input type="text" name="Bejjelszo" class="form-control inputMezo" placeholder="Jelszó" aria-label="Recept">
                </div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-12">
                    <input type="submit" value="Bejelentkezés" name="bejelentkezes" type="button" class="btn btn-outline-primary btn-md w-100 inputMezo" />
                </div>
                <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
            </div>
            </form>
    </div>
    <!--END FELHASZNÁLÓNÉV ÉS JELSZÓ MEZŐK-->

<!-- bejelentkezés -->
    <div>
        <?php 
            if(isset($_GET["bejelentkezes"])){
                $felhasznalonev = $_GET["Bejfelhasznalonev"];
                $jelszo = $_GET["Bejjelszo"];
                if(!empty($felhasznalonev) && !empty($jelszo)){
                    try {
                        $muvelet = "SELECT `felhasznalok`.`id`, `felhasznalok`.`felhnev`, `felhasznalok`.`jelszo` FROM `felhasznalok` where `felhasznalok`.`felhnev` = '". $felhasznalonev ."';";
                        $lekerdez = adatokLekerdezese($muvelet);
                        if(is_array($lekerdez)){
                            $lekertJelszo = $lekerdez[0]["jelszo"];
                            if(password_verify($jelszo, $lekertJelszo)){
                                echo "<h2>Sikeres bejelentkezés</h2>";
                                $cookie_value = $lekerdez[0]["id"];
                                setcookie("bejelentkezetFelhasznaloId", $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 nap
                            }
                            else{
                                echo "<h2>Sikertelen bejelentkezés!</h2>";
                            }
                        }
                        else{
                            echo "<h2>Sikertelen bejelentkezés!</h2>";
                        }
                        
                    }
                    catch(Exception $e) {
                        echo 'Message: ' .$e->getMessage();
                    }
                }
                else{
                    echo("<h2>Kérem minden adatott adjon meg!</h2>");
                }
            }
            ?>
    </div>


    <!--START FELUGRÓ ABLAK GOMBJA-->
    <div class="container inputMezo">
        <div class="row">
            <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
            <div class="col-12 col-lg-4 col-md-4 col-sm-12">
                <button type="button" class="btn btn-outline-primary btn-md w-100" data-toggle="modal" data-target="#felugro" data-whatever="@mdo">Regisztráció</button>
            </div>
            <div class="col-12 col-lg-4 col-md-4 col-sm-12"></div>
        </div>
    </div>
    <!--END FELUGRÓ ABLAK GOMBJA-->


    <!--START FELUGRÓ ABLAK-->
    <div class="modal fade" id="felugro" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Regisztráció</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
           
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                    <div class="mb-3">
                            <label class="form-label">Felhasználónév</label>
                            <input type="text" class="form-control" id="Regfelhasznalonev">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Jelszó</label>
                            <input type="password" class="form-control" id="Regpassword">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Jelszó újra</label>
                            <input type="password" class="form-control" id = "RegpasswordMegint">
                        </div>
                        <label class="form-label">e-mail cím</label>
                        <input type="email" class="form-control" id ="Regemail" >
                        </div>                        
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Bezárás</button>
                    <button type="button" class="btn btn-primary" id = "regisztral">Regisztráció</button>
                </div>
                </form>
          
        </div>
    </div>
    </div>
    <!--END FELUGRÓ ABLAK-->
    
    

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"></script>

    <script src="./bejelentkezes.js"></script>

</body>
</html>

