var profilkep;
var felhasznaloId;
let alapEmail

//már van profilkép és azt tölti be
function alapProfilkep(kep){

    const profilePicture = document.getElementById('profilePicture');
  
    profilePicture.innerHTML = `<img src="${kep}" alt="Profilkép">`;

}

//uj profilkép feltöltése
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

//lekeri a megjelenítendő adatokat
async function adatokLeker() { 
    try {
        let lekeres = await fetch("../adatbazisInterakciok/LekerAlapAdat",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({"felhasznaloId" : felhasznaloId})
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


//megjelenití a felhasználó adatait
async function adatokMegjelenitese(adatok){

    console.log(profilkep)
    if(profilkep != ""){
        alapProfilkep(profilkep)
    }
    let regdatum = document.getElementById("regisztracioDatuma")
    let felhasznaloNev = document.getElementById("felhasznalonev")
    let emailCim = document.getElementById("email")
    alapEmail = emailCim
    console.log(adatok[0])
    regdatum.value = adatok[0]["letrehozas"]
    felhasznaloNev.value = adatok[0]["felhnev"]
    emailCim.value = adatok[0]["email"]
}

//feloldja a modosítható mezőket
function modositasFelold(){
    let emailCimMod = document.getElementById("email")
    let jelszoMod = document.getElementById("jelszo")
    
    emailCimMod.removeAttribute("disabled")
    jelszoMod.removeAttribute("disabled")
    jelszoMod.value = ""

    gombokValtoztat(true)
}

//alaphelyzete az oldal mezőinek
function modositasAlap(){
   
    let emailCim = document.getElementById("email")
    let jelszo = document.getElementById("jelszo")
   
    emailCim.setAttribute("disabled", "true");
    jelszo.setAttribute("disabled", "true");
    jelszo.value = "placeholder"
    gombokValtoztat(false)
    adatokLeker()
}

//adatok modosítás gombjai
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

//mentés vagy mégsem lett megnyomva
function gombNyomas(melyikGomb){
    
    if(melyikGomb == "megse"){
        modositasAlap()
    }
    else if(melyikGomb == "mentes"){
        modositAlapinf()
    }
}

// adatok modosítása
async function modositAlapinf() {
    let emailCim = document.getElementById("email").value
    let jelszo = document.getElementById("jelszo").value

    const stringUrese  = str => !str.replace(/\s/g, '').length

   
    if(stringUrese(emailCim) == true && stringUrese(jelszo) == true){
        alert("Kérem változtason meg adatot!")
        return
    }

    let sqlOszlop
    let sqlOszlopAdat
    let mindkett = []
    if(stringUrese(emailCim) == false && stringUrese(jelszo) == true && emailCim != alapEmail){
        sqlOszlop = "email"
        sqlOszlopAdat = emailCim
    }
    else if(stringUrese(emailCim) == true && stringUrese(jelszo) == false){
        sqlOszlop  = "jelszo"
        sqlOszlopAdat = jelszo
    }
    else if(stringUrese(jelszo) == false){
        sqlOszlop = "mindketto"
        mindkett[0] = emailCim
        mindkett[1] = jelszo
    }
    else{
        return;
    }

    let sqlOszlopAdatElkuld
    if(mindkett.length != 0){
        sqlOszlopAdatElkuld = mindkett
    }
    else{
        sqlOszlopAdatElkuld = sqlOszlopAdat
    }

    try {
        
        let lekeres = await fetch("./adatbazisInterakciok/modositAlapadatok",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                "melyikMezo" : sqlOszlop,
                "mezoAdat" : sqlOszlopAdatElkuld,
                "felhasznaloId" : felhasznaloId
                
             })
        });
        console.log(await lekeres)
        if(lekeres.ok){
            // oldal újratölt
            location.reload(true)
        }
        else{
            let valasz = await lekeres.json();
            console.log(valasz["valasz"])
        }
    } catch (error) {
        console.log(error)
    }
}

// lekéri a session-ből a kellő adatokat
async function fontosAdatokleker(){
    await fetch('../adatbazisInterakciok/sessionLekerFelhasznaloId')  // Fetch the PHP script
    .then(response => response.text())  // Get the response as text
    .then(id => {
    if (id) {
        felhasznaloId = id;
    } 
    })
    .catch(error => console.error('Error fetching session data:', error));

   
    await fetch('../adatbazisInterakciok/sessionProfilkepValtozot')  // Fetch the PHP script
                    .then(response => response.text())  // Get the response as text
                    .then(userPicturePath => {
                    if (userPicturePath) {
                        profilkep = userPicturePath;
                    } else {
                        profilkep = ""; // Default image if no picture is set
                    }
    })
    .catch(error => console.error('Error fetching session data:', error));

    adatokLeker()
}

window.addEventListener("load", fontosAdatokleker)


document.getElementById('fileInput').addEventListener("change", ujprofilKep)