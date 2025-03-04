let felhasznalo_id;

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


async function hozzaszolasElkuld(){
  try {
    const hozzaszolas = document.getElementById("hozzaszolas").value;
    let uzenet = document.getElementById("hozzaszolasUzenet");
    uzenet.innerHTML = "";

    if(hozzaszolas == ""){
      uzenet.innerHTML = "Kérem írjon hozzászólást!";
      uzenet.classList = "alert alert-danger my-3 text-center w-80";
    }

    let kuldes = await fetch("./hozzaszolasfeltoltes", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "felhasznalo_id" : 4,
        "hozzaszolas" : hozzaszolas,
        "receptek_id" : 1
      })
    })

    let valasz = await kuldes.json();

    if(kuldes.ok){
      uzenet.innerHTML = valasz.valasz;
      uzenet.classList = "alert alert-primary my-3 text-center w-80";
    }

    else{
      uzenet.innerHTML = valasz.valasz;
      uzenet.classList = "alert alert-danger my-3 text-center w-80";
    }

  } catch (error) {
    console.log(error)
  }
}

async function hozzaszolasLeker(){
  let lekerHozzaszolas = await fetch("./hozzaszolasLeker", {
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

function hozzaszolasGeneral(hozzaszolasok, nevek){
  let ul = document.getElementById("hozzaszolasok");

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

        spanFelh.innerHTML = nev.felhnev;

        spanIdo.innerHTML = hozzaszolas.ido;
        spanIdo.classList = "text-body-secondary ms-4";


        if(hozzaszolas.felhasznalo_id == 4){
          li.classList = "list-group-item list-group-item-primary my-2";
        }
        else{
          li.classList = "list-group-item my-2";
        }


        divFejlec.classList = "mb-2";

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

// Frissíti a csillagok megjelenítését az adott értékelés alapján
function ertekelesMegjelenit() {
  const csillagok = document.querySelectorAll('#csillagMegjelen');
  let ertekelesSzama = 2;
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
  
  
// Inicializálás az oldal betöltésekor
window.addEventListener('load', ertekelesMegjelenit);


function csillagErtekeloFelhasznalotol() {
    const csillagok = document.querySelectorAll('#csillagErtekel');
    const ertekelesEredmeny = document.getElementById('ertekeles-eredmeny');
    let ertekelesSzama = 0;
  
    // Frissíti a csillagok megjelenítését az adott értékelés alapján
    function frissitCsillagok1(ertekelesSzama) {
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
      // Kattintáskor rögzítjük az értékelést
      csillag.addEventListener('click', function() {
        ertekelesSzama = csillag.getAttribute('data-value');
        frissitCsillagok1(ertekelesSzama);
        ertekelesEredmeny.textContent = "Értékelés: " + ertekelesSzama + " csillag";
      });
  
    }
  }



  
  // Inicializálás az oldal betöltésekor
  document.addEventListener('DOMContentLoaded', csillagErtekeloFelhasznalotol);
  document.getElementById("btnHozzaszolasKuldes").addEventListener("click", hozzaszolasElkuld);
  window.addEventListener("load", hozzaszolasLeker);


