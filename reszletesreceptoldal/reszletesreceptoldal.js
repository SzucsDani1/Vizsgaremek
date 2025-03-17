let kivalasztottCsillag = 0;

async function hozzaszolasElkuld(){
  try {
    let hozzaszolas = document.getElementById("hozzaszolas").value;
    let uzenet = document.getElementById("hozzaszolasUzenet");
    uzenet.innerHTML = "";

    if(hozzaszolas == ""){
      uzenet.innerHTML = "Kérem írjon hozzászólást!";
      uzenet.classList = "alert alert-danger my-3 text-center w-80";
      return;
    }

    let kuldes = await fetch("./hozzaszolasfeltoltes", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "felhasznalo_id" : 5,
        "hozzaszolas" : hozzaszolas,
        "receptek_id" : 1
      })
    })

    let valasz = await kuldes.json();
    console.log(valasz)
    if(kuldes.ok){
        uzenet.innerHTML = valasz.valasz;
        uzenet.classList = "alert alert-primary my-3 text-center w-80";

        document.getElementById("hozzaszolas").value = "";
        hozzaszolasLeker();
    }

    else{
        uzenet.innerHTML = valasz.valasz;
        uzenet.classList = "alert alert-danger my-3 text-center w-80";

        let btnBezar = document.createElement("input");
        btnBezar.type = "button";
        btnBezar.classList = "btn-close position-absolute top-50 end-0 translate-middle-y me-3";
        btnBezar.setAttribute("data-bs-dismiss", "alert");
        btnBezar.setAttribute("aria-label", "Close");

    }

  } catch (error) {
        console.log(error)
  }
}

async function hozzaszolasLeker(){
    let lekerHozzaszolas = await fetch("./hozzaszolasleker", {
        method : "POST",
        headers : {
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({
        "receptek_id" : 1
        })
    });

    let lekerNev = await fetch("./nevleker", {
        method : "POST",
        headers : {
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({
        "felhasznalo_id" : 5
        })
    });


    if(lekerHozzaszolas.ok && lekerNev.ok){
        let hozzaszolasok = await lekerHozzaszolas.json();
        let nevek = await lekerNev.json();
        hozzaszolasGeneral(hozzaszolasok, nevek)
    }
}


async function receptLeker(){
    try {
        let receptId = 1;
        let leker = await fetch("./receptleker",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : receptId
            })
        });
        
        if(leker.ok){
            let receptek = await leker.json();
            console.log(receptek);
            receptMegjelenit(receptek);
        }
        else{
            let receptek = await leker.json();
            console.log(receptek.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}

async function ertekelesLeker(){
    try {
        let receptId = 1;
        let leker = await fetch("./ertekeles",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "receptek_id" : receptId
            })
        });
        if(leker.ok){
            let ertekeles = await leker.json();
            const csillagok = document.querySelectorAll('#csillagMegjelen');
            frissitCsillagok(ertekeles[0].ertekeles, csillagok, false);
        }
        else{
            let receptek = await leker.json();
            console.log(receptek.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}

async function ertekelesFelhasznaloLeker(){
    try {
        let receptId = 1;
        let felhasznalo_id = 14;
        let leker = await fetch("./ertekelesfelhasznaloleker",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : receptId,
                "felhasznalo_id" : felhasznalo_id

            })
        });

        let valasz = await leker.json();
        if(valasz.valasz == "Nincs találat!"){
            return;
        }
        else{
            
        }
    } catch (error) {
        console.log(error);
    }
}

async function ertekelesElkuld(){
    try {
      const csillagok = document.querySelectorAll('#csillagErtekel');
      csillagLekerFelhasznalotol(csillagok)
      
      console.log(kivalasztottErtek)
      let receptId = 1; 
      let felhasznalo_id = 14; 
  
      let kuldes = await fetch("./ertekeleselkuld",{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "recept_id" : receptId,
          "felhasznalo_id" : felhasznalo_id,
          "ertekeles" : kivalasztottCsillag
        })
      });
  
      let valasz = await kuldes.json();
  
      if(kuldes.ok){
        console.log("Értékelés sikeresen elküldve:", valasz);
        // Itt frissítheted a felületet, például kiírhatod az üzenetet
      } else {
        console.error("Hiba történt:", valasz);
        // Hibakezelés, például hibaüzenet kiírása
      }
  
    } catch (error) {
      console.error("Hálózati vagy szerverhiba történt:", error);
    }
  }
  

function receptMegjelenit(receptek){
    document.getElementById("etelfajtaKiir").innerHTML = receptek[0].etelfajta_nev;
    document.getElementById("receptNeve").innerHTML = receptek[0].neve;

    document.getElementById("receptIdeje").innerHTML = receptek[0].ido +" perc";
    document.getElementById("receptKoltseg").innerHTML = receptek[0].ar;
    document.getElementById("receptNehezseg").innerHTML = receptek[0].nehezseg;


}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}



function hozzaszolasGeneral(hozzaszolasok, nevek){
    let ul = document.getElementById("hozzaszolasok");
    let felhasznalo_id = 1;
    //let felhasznalo_id = getCookie("bejelentkezettFelhasznaloId");
    ul.innerHTML = "";

    for(let hozzaszolas of hozzaszolasok){
        for(let nev of nevek){
        if(hozzaszolas.receptek_id == 1){
            let li  = document.createElement("li");
            let divFejlec = document.createElement("div");
            let divTartalom = document.createElement("div");
            let img = document.createElement("img");
            let spanFelh  = document.createElement("span");
            let spanIdo = document.createElement("span");

            img.src = "./kepek/profile.jpg";
            img.alt = "Profil";
            img.classList = "rounded-circle me-2"; 
            img.style.width = "40px";
            img.style.height = "40px";

            spanFelh.innerHTML = "<b>" + nev.felhnev + "</b>";

            spanIdo.innerHTML = hozzaszolas.feltoltes_ideje;
            spanIdo.classList = "text-body-secondary ms-4";


            if(hozzaszolas.felhasznalo_id == felhasznalo_id){
            li.classList = "list-group-item list-group-item-primary my-2";
            }
            else{
            li.classList = "list-group-item my-2";
            }
            divFejlec.classList = "mb-2 text-secondary";
            divTartalom.innerHTML = hozzaszolas.hozzaszolas;

            ul.appendChild(li);
            li.appendChild(divFejlec);
            divFejlec.appendChild(img);
            divFejlec.appendChild(spanFelh);
            divFejlec.appendChild(spanIdo);
            li.appendChild(divTartalom);
        }
        }
    }
}
/*
// Frissíti a csillagok megjelenítését az adott értékelés alapján
function ertekelesMegjelenit(ertekeles) {
    const csillagok = document.querySelectorAll('#csillagMegjelen');
    for (const csillag of csillagok) {
        if (csillag.getAttribute('data-value') <= ertekeles) {
        csillag.classList.add('filled');
        csillag.innerHTML = '&#9733;'; // kitöltött csillag
        } else {
        csillag.classList.remove('filled');
        csillag.innerHTML = '&#9734;'; // üres csillag
        }
    }
}
  
  
// Inicializálás az oldal betöltésekor



function csillagErtekeloFelhasznalotol() {
    const csillagok = document.querySelectorAll('#csillagErtekel');
  
    // Frissíti a csillagok megjelenítését az adott értékelés alapján
    function frissitCsillagok(ertekelesSzama) {
      for (const csillag of csillagok) {
        if (csillag.getAttribute('data-value') <= ertekelesSzama) {
          csillag.classList.add('filled');
          csillag.innerHTML = '&#9733;'; // kitöltött csillag
        } else {
          csillag.classList.remove('filled');
          csillag.innerHTML = '&#9734;'; // üres csillag
        }
      }
    }
  
    for (const csillag of csillagok) {
        csillag.addEventListener('click', function() {
        ertekelesSzama = csillag.getAttribute('data-value');
        frissitCsillagok(ertekelesSzama);
        console.log(ertekelesSzama);
        
    });
      
    }
}
*/
function frissitCsillagok(ertekelesSzama, csillagok, felhasznaloModosit) {
    if(felhasznaloModosit == true){
        ertekelesSzama = csillagLekerFelhasznalotol(csillagok);
    }
    console.log(ertekelesSzama)
    for (const csillag of csillagok) {
      if (csillag.getAttribute('data-value') <= ertekelesSzama) {
        csillag.classList.add('filled');
        csillag.innerHTML = '&#9733;'; 
      } else {
        csillag.classList.remove('filled');
        csillag.innerHTML = '&#9734;';
      }
    }
  }

function csillagLekerFelhasznalotol(csillagok){
    for (const csillag of csillagok) {
        csillag.addEventListener('click', function() {
        ertekelesSzama = csillag.getAttribute('data-value');
        frissitCsillagok(ertekelesSzama, csillagok, false);
        kivalasztottCsillag = ertekelesSzama;
    });
    }
}

  //document.addEventListener('DOMContentLoaded', csillagErtekeloFelhasznalotol);
document.addEventListener("DOMContentLoaded", function(){
    const csillagok = document.querySelectorAll('#csillagErtekel');
    frissitCsillagok(0, csillagok, true);
})
  document.getElementById("btnHozzaszolasKuldes").addEventListener("click", hozzaszolasElkuld);
  window.addEventListener("load", function(){
    hozzaszolasLeker();
    receptLeker();
    ertekelesLeker();
    //ertekelesMegjelenit();
    ertekelesFelhasznaloLeker();
  });
  document.getElementById("btnErtekelesKuld").addEventListener("click", ertekelesElkuld);


