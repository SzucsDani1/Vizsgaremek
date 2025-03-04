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

function modositasFelold(){
    let emailCimMod = document.getElementById("email")
    let jelszoMod = document.getElementById("jelszo")
    
    emailCimMod.removeAttribute("disabled")
    jelszoMod.removeAttribute("disabled")
    jelszoMod.value = ""

    gombokValtoztat()
}

function modositasAlap(){
    let emailCim = document.getElementById("email")
    let jelszo = document.getElementById("jelszo")
    let alapEmail = lekerCookie("")
    emailCimMod.setAttribute("disabled", "true");
    jelszoMod.setAttribute("disabled", "true");
    jelszoMod.value = "placeholder"
    adatokLeker()
}

function gombokValtoztat(){
    let gombokHelye =   document.getElementById("gombokHelye")
    let mentesButton = document.createElement("input")
    let megseButton =document.createElement("input")
     
    gombokHelye.innerHTML = ""
    megseButton.type = "button"
    mentesButton.type = "button"

    mentesButton.classList.add("btn", "btn-success", "w-50")
    megseButton.classList.add("btn", "btn-secondary", "w-50")

    megseButton.value ="Mégse"
    mentesButton.value ="Mentés"

    
    megseButton.onclick = (event) => gombNyomas("megse");
    mentesButton.onclick = (event) => gombNyomas("mentes");

    gombokHelye.appendChild(mentesButton)
    gombokHelye.appendChild(megseButton)
}

function gombNyomas(melyikGomb){
    console.log(melyikGomb)
    if(melyikGomb == "megse"){
        modositasAlap()
    }
    else if(melyikGomb == "mentes"){

    }
}

window.addEventListener("load", adatokLeker)

document.getElementById("modositas").addEventListener("click", modositasFelold)