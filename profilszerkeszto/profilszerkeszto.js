const fileInput = document.getElementById('fileInput');
        const profilePicture = document.getElementById('profilePicture');
        const removeButton = document.getElementById('removeButton');
        
        fileInput.addEventListener('change', function() {
            removeButton.hidden = false;
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicture.innerHTML = `<img src="${e.target.result}" alt="Profilkép">`;
                    removeButton.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
        
        removeButton.addEventListener('click', function() {
            profilePicture.innerHTML = 'Nincs profilkép';
            fileInput.value = "";
            removeButton.style.display = 'none';
        });

async function adatokLeker() {
    let felhasznaloId = lekerCookie("bejelentkezetFelhasznaloId")
    let sqlKod ={ 
        "sqlKod" :  "SELECT `felhasznalok`.`felhnev`, `felhasznalok`.`letrehozas`, `felhasznalok`.`email` FROM `felhasznalok` WHERE `felhasznalok`.`id` =" + felhasznaloId + ";"
    }

    try {
        let lekeres = await fetch("./adatbazisInterakciok/adatbazisLeker.php",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(sqlKod)
        });

        if(lekeres.ok){
            let adatok = await lekeres.json();
            adatokMegjelenitese(adatok);
        }
        else{
            console.log("Nem érkeztek adatok!")
        }
    } catch (error) {
        console.log(error)
    }
}

function lekerCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue); // Decode in case of special characters
        }
    }
    return null; // Return null if cookie is not found
}

function adatokMegjelenitese(adatok){
    let regdatum = document.getElementById("regisztracioDatuma")
    let felhasznaloNev = document.getElementById("felhasznalonev")
    let emailCim = document.getElementById("email")
    console.log(adatok[0])
    regdatum.value = adatok[0]["letrehozas"]
    felhasznaloNev.value = adatok[0]["felhnev"]
    emailCim.value = adatok[0]["email"]
}

window.addEventListener("load", adatokLeker)