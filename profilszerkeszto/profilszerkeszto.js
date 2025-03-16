let profilkep;


function alapProfilkep(kep){

    const profilePicture = document.getElementById('profilePicture');
       
      
    profilePicture.innerHTML = `<img src="${kep}" alt="Profilkép">`;

}

function ujprofilKep(){
    const fileInput = document.getElementById('fileInput');
    const profilePicture = document.getElementById('profilePicture');
    const removeButton = document.getElementById('removeButton');
    const mentesButton = document.getElementById("profilkepMentesButton")
    
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicture.innerHTML = `<img src="${e.target.result}" alt="Profilkép">`;
            
        }
        reader.readAsDataURL(file);
        mentesButton.style.display = 'block';
        removeButton.style.display = 'block';
    }
   
    
    removeButton.addEventListener('click', function() {
        if(profilkep != ""){
            profilePicture.innerHTML = `<img src="${profilkep}" alt="Profilkép">`
        }
        else{
            profilePicture.innerHTML = 'Nincs profilkép';
        }    
        fileInput.value = "";
        removeButton.style.display = 'none';
        mentesButton.style.display = 'none';
        
    });


    
}

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

async function adatokMegjelenitese(adatok){

    await fetch('./adatbazisInterakciok/sessionProfilkepValtozot.php')  // Fetch the PHP script
                    .then(response => response.text())  // Get the response as text
                    .then(userPicturePath => {
                    if (userPicturePath) {
                        profilkep = userPicturePath;
                    } else {
                        profilkep = ""; // Default image if no picture is set
                    }
    })
    .catch(error => console.error('Error fetching session data:', error));

    console.log(profilkep)
    if(profilkep != ""){
        alapProfilkep(profilkep)
    }
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

    gombokValtoztat(true)
}

function modositasAlap(){
   
    let emailCim = document.getElementById("email")
    let jelszo = document.getElementById("jelszo")
   
    emailCim.setAttribute("disabled", "true");
    jelszo.setAttribute("disabled", "true");
    jelszo.value = "placeholder"
    gombokValtoztat(false)
    adatokLeker()
}

function gombokValtoztat(alapot){
    let gombokHelye =   document.getElementById("gombokHelye")
    gombokHelye.innerHTML = ""
    if(alapot == true){ 
        let mentesButton = document.createElement("input")
        let megseButton =document.createElement("input")
        
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
    else if(alapot == false){
        let modositButton = document.createElement("button")
        modositButton.id =  "modositas"
        modositButton.innerHTML = "Módosítás"
        modositButton.type = "button"
        modositButton.classList.add("btn" , "btn-primary", "w-100")
        modositButton.onclick = modositasFelold
        gombokHelye.appendChild(modositButton)
    }
}

function gombNyomas(melyikGomb){
    
    if(melyikGomb == "megse"){
        modositasAlap()
    }
    else if(melyikGomb == "mentes"){
        modositAlapinf()
    }
}

async function modositAlapinf() {
    let emailCim = document.getElementById("email").value
    let jelszo = document.getElementById("jelszo").value
    
    if(empty(jelszo) && empty(emailCim)){
        alert("Kérem változtason meg adatot!")
        return
    }
    
    try {
        
        let lekeres = await fetch("./adatbazisInterakciok/adatbazisFeltolt.php",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(sqlKod)
        });

        if(lekeres.ok){
            // oldal újratölt
        }
        else{
            console.log("Nem érkeztek adatok!")
        }
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener("load", adatokLeker)

document.getElementById('fileInput').addEventListener("change", ujprofilKep)