
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
  let leker = await fetch("./hozzaszolasLeker", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      "receptek_id" : 1
    })
  });

  if(leker.ok){

    let hozzaszolasok = await leker.json();
    let ul = document.getElementById("hozzaszolasok");

    for(let hozzaszolas of hozzaszolasok){
      if(hozzaszolas.receptek_id == 1){
        let li  = document.createElement("li");
        li.innerHTML = hozzaszolas.hozzaszolas;
        if(hozzaszolas.felhasznalo_id == 4){
          li.classList = "list-group-item list-group-item-primary";
        }
        else{
          li.classList = "list-group-item";
        }
        ul.appendChild(li)
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


