<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profilszerkesztő</title>
    <link rel="stylesheet" href="profilszerkeszto.css">
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

      <!--Regisztráció dátuma-->

      
          
      
    
    <div class="container mt-4">
        <div class="row">
          <div class="col-12 col-lg-6 order-lg-1 text-center">
                <div class="profile-container">
                    <div id="profilePicture" class="profile-picture">Nincs profilkép</div>
                    <input type="file" id="fileInput" class="form-control mt-2" accept="image/*">
                    <button id="removeButton" class="btn btn-danger" hidden>Mégsem</button>
                </div>
            </div>
            <div class="col-12 col-lg-6 order-lg-2 form-section">
                <div class="filter-box border p-3 bg-light rounded">
                    <label class="mb-1">Regisztráció dátuma</label>
                    <form class="form-floating">
                        <input type="text" class="form-control" id="regisztracioDatuma" disabled>
                        <label for="regisztracioDatuma" class="form-label">Dátum</label>
                    </form>
                </div>
                <div class="filter-box border p-3 bg-light rounded">
                    <label class="mb-1">Felhasználónév</label>
                    <form class="form-floating">
                        <input type="text" class="form-control" id="felhasznalonev" disabled>
                        <label for="felhasznalonev" class="form-label">Felhasználónév</label>
                    </form>
                </div>
                <div class="filter-box border p-3 bg-light rounded">
                    <label class="mb-1">Jelszó</label>
                    <form class="form-floating">
                        <input value="placeholder" type="password" class="form-control" id="jelszo"  disabled>
                        <label for="jelszo" class="form-label">Jelszó</label>
                    </form>
                </div>
                <div class="filter-box border p-3 bg-light rounded">
                    <label class="mb-1">E-mail cím</label>
                    <form class="form-floating">
                        <input type="email" class="form-control" id="email" disabled>
                        <label for="email" class="form-label">E-mail cím</label>
                    </form>
                </div>
                <div  id="gombokHelye">
                    <button id="modositas"  type="button" class="btn btn-primary w-100 " onclick="modositasFelold()">Módosítás</button>
                </div>
            </div>
        </div>

      
    </div>
      
    <script src="profilszerkeszto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>