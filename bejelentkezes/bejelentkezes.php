<?php 
    require_once "./backendBejelentkezes/sessionConfig.php";
    include "../adatbazisInterakciok/adatbazisInterakciok.php" ;
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bejelentkezés</title>
    <link rel="stylesheet" href="bejelentkezes.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body id="body">
<img src="logo/FinomFalatokLogoSzeles.png" class="rounded mx-auto d-block img-fluid mt-1" id="logo" alt="...">


<!--START FELHASZNÁLÓNÉV ÉS JELSZÓ MEZŐK-->
<div class="container">
    <fieldset id="fieldset" class="mx-auto filter-box border pb-4 bg-light rounded my-3">
        <div class="px-4 row">
            <legend class="text-center my-5 display-6">Bejelentkezés</legend>

        </div>    
        <form method="post">
        <div class="row my-5 mx-2">
            <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12">
                <!-- FELHASZNÁLÓVÉV -->
                <input type="text" name="Bejfelhasznalonev" class="form-control " placeholder="Felhasználónév" aria-label="Recept">
            </div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
        </div>
        <div class="row my-5 mx-2">
            <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12">
                <!-- JELSZÓ -->
                <input type="password" name="Bejjelszo" class="form-control " placeholder="Jelszó" aria-label="Recept">
            </div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
        </div>
        <div class="row my-5 mx-2">
            <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12">
                <input type="submit" value="Bejelentkezés" name="bejelentkezes" type="button" class="btn btn-outline-primary btn-md w-100 " />
            </div>
            <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
        </div>
        </form>
    
<!--END FELHASZNÁLÓNÉV ÉS JELSZÓ MEZŐK-->

    <!--START FELUGRÓ ABLAK GOMBJA-->
    <div class="row my-5 mx-2">
        <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
        <div class="col-12 col-lg-4 col-md-12 col-sm-12">
            <button type="button" class="btn btn-outline-primary btn-md w-100" data-bs-toggle="modal" data-bs-target="#felugro">Regisztráció</button>
        </div>
        <div class="col-12 col-lg-4 col-md-12 col-sm-12"></div>
    </div>
        
    <!--END FELUGRÓ ABLAK GOMBJA-->

<!-- START BEJELENTKEZÉS -->
    <div>
        <?php 
            if(isset($_POST["bejelentkezes"])){
                $felhasznalonev = $_POST["Bejfelhasznalonev"];
                $jelszo = $_POST["Bejjelszo"];
                if(!empty($felhasznalonev) && !empty($jelszo)){
                    try {
                        $muvelet = "SELECT 
                                        `felhasznalok`.`id`, 
                                        `felhasznalok`.`felhnev`, 
                                        `felhasznalok`.`jelszo`, 
                                        `felhasznalojog`.`jognev`,
                                        `felhasznalok`.`profilkep` 
                                    FROM 
                                        `felhasznalok`
                                    INNER JOIN 
                                        `felhasznalojog` 
                                        ON `felhasznalok`.`joga_id` = `felhasznalojog`.`id`
                                    WHERE 
                                        `felhasznalok`.`felhnev` = '". $felhasznalonev ."';";
                        
                        $lekerdez = adatokLekerdezese($muvelet);

                        if(is_array($lekerdez)){
                            $lekertJelszo = $lekerdez[0]["jelszo"];
                            if(password_verify($jelszo, $lekertJelszo)){
                                
                                $felhasznaloId_value = $lekerdez[0]["id"];
                                $_SESSION["bejelentkezetFelhasznaloId"] = $felhasznaloId_value;
                                
                                $felhasznalonev_value = $lekerdez[0]["felhnev"];
                                $_SESSION["felhasznalonev"] = $felhasznalonev_value;

                                
                                $felhasznalojoga_value = $lekerdez[0]["jognev"];
                                $_SESSION["jogosultsagNev"] = $felhasznalojoga_value;
                                
                                
                                $profilkep_value = $lekerdez[0]["profilkep"];
                                if(empty($profilkep_value)){
                                    $profilkep_value = "";
                                }
                                $_SESSION["profilkep"] = $profilkep_value;


                            }
                            else{
                                bejelentHiba("Sikertelen bejelentkezés!");     

                            }
                        }
                        else{
                            bejelentHiba("Sikertelen bejelentkezés!");     
                        }
                        
                    }
                    catch(Exception $e) {
                        echo 'Message: ' .$e->getMessage();
                    }
                }
                else{
                    bejelentHiba("Kérem minden adatot adjon meg!");     
                }
            }
            ?>
    </div>
    <!-- END BEJELENTKEZÉS -->

    </fieldset>
    </div>




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
        
    <!--START BEJENTKEZÉS ALERT--> 
    <?php
        function bejelentHiba($uzenet){
            if(!empty($uzenet)){
            echo "
                <div class='alert alert-danger text-center w-50 mx-auto' role='alert'>
                    $uzenet
                </div>
                ";
            }
        }
    ?>
    <!--END BEJENTKEZÉS ALERT--> 
    

    <!--START JS MEGHÍVÁSOK-->

    <script src="./regisztracio.js"></script>
    <script src="./bejeletkezesVizsgalasa/bejelentkezesVizsgalat.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>



     <!--END JS MEGHÍVÁSOK-->
</body>
</html>

