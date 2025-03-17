let kivalasztottCsillag = 0;
let kategoriak = [];
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
      method : "PUT",
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

async function ertekeltE(){
    try {
        let receptId = 1;
        let felhasznalo_id = 5;
        let leker = await fetch("./ertekelt",{
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
        const csillagok = document.querySelectorAll('#csillagErtekel');
        document.getElementById("btnErtekelesKuld").hidden = false;
        if(valasz.valasz == "Nincs találat"){
          //Módosíthat
          frissitCsillagok(0, csillagok, true);
          return true;
        }
        else{
          //Nem módosíthat
          document.getElementById("btnErtekelesKuld").hidden = true;
          frissitCsillagok(valasz[0].ertek, csillagok, false);
          return false;
        }
    } catch (error) {
        console.log(error);
    }
}

async function hozzavalokLeker(){
  try {
    let receptId = 1;
    let leker = await fetch("./hozzavalokleker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : receptId
        })
    });
    
    let hozzavalok = await leker.json();

    if(leker.ok){
      console.log(hozzavalok);
        hozzavalokMegjelenit(hozzavalok);
    }
    else{
        console.log(hozzavalok.valasz);
    }
} catch (error) {
    console.log(error);
}
}

async function hozzavalokKategoriaLeker(){
  try {
    let receptId = 1;
    let leker = await fetch("./kategorialeker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : receptId
        })
    });
    
    let eredmeny = await leker.json();

    if(leker.ok){
      for(elem of eredmeny){
        kategoriak.push(elem.kategoria);
      }
    }
    else{
        console.log(eredmeny.valasz);
    }
} catch (error) {
    console.log(error);
}
}

async function ertekelesElkuld(){
    try {
      const csillagok = document.querySelectorAll('#csillagErtekel');
      csillagLekerFelhasznalotol(csillagok)
      
      let receptId = 1; 
      let felhasznalo_id = 5; 
  
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
      let uzenet = document.getElementById("csillagUzenet");
      if(kuldes.ok){
        uzenet.innerHTML = valasz.valasz;
        uzenet.classList = "col-12 col-md-12 col-sm-12 mx-auto my-3 text-center alert alert-primary";
        uzenet.role = "alert";
        ertekeltE();
      } else {
        uzenet.innerHTML = valasz.valasz;
        uzenet.classList = "col-12 col-md-12 col-sm-12 mx-auto my-3 text-center alert alert-danger";
        uzenet.role = "alert";
      }
  
    } catch (error) {
      console.error("Hálózati vagy szerverhiba történt:", error);
    }
  }
  


function hozzavalokMegjelenit(hozzavalok){
  let hozzavalokKiir = document.getElementById("hozzavalokMegjelenit");
  for(let kategoria of kategoriak){
    let szamlalo = 1;
    console.log("aaa"+kategoria);
    let div = document.createElement("div");
    div.classList = "filter-box border p-3 bg-light rounded my-3 mx-auto";

    let h1 = document.createElement("h1");
    h1.classList = "display-6";
    h1.innerHTML = kategoria;

    let table = document.createElement("table");
    table.classList = "table table-warning table-hover w-75 mx-auto mt-3 text-center";

    let thead = document.createElement("thead");

    let tr = document.createElement("tr");

    let thSorszam = document.createElement("th")
    let thHozzavaloNev = document.createElement("th")
    let thMennyiseg = document.createElement("th")
    let thBevasarloGomb = document.createElement("th")

    thSorszam.innerHTML = szamlalo;
    thHozzavaloNev.innerHTML = "Hozzávaló neve";
    thMennyiseg.innerHTML = "Mennyiség";


    hozzavalokKiir.appendChild(div);
    div.appendChild(h1);
    div.appendChild(table);
    table.appendChild(thead);
    thead.appendChild(tr);
    tr.appendChild(thSorszam);
    tr.appendChild(thHozzavaloNev);
    tr.appendChild(thMennyiseg);
    tr.appendChild(thBevasarloGomb);


    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for(let hozzavalo of hozzavalok){
      if(hozzavalo.kategoria == kategoria){
        let tbodyTR = document.createElement("tr");

        let tdSorszam = document.createElement("td");
        let tdHozzavaloNev = document.createElement("td");
        let tdMennyiseg = document.createElement("td");
        let tdBevasarloGomb = document.createElement("td");

        let btnBevasarlo = document.createElement("input");
        btnBevasarlo.type = "button";
        btnBevasarlo.classList = "btn btn-warning";
        btnBevasarlo.value = "Kosárhoz";
        btnBevasarlo.id = hozzavalo.hozzavalo;

        tdSorszam.innerHTML = szamlalo;
        tdHozzavaloNev.innerHTML = hozzavalo.hozzavalo;
        tdMennyiseg.innerHTML = hozzavalo.mennyiseg + " " + hozzavalo.mertek_egyseg;

        tbody.appendChild(tbodyTR);
        tbodyTR.appendChild(tdSorszam);
        tbodyTR.appendChild(tdHozzavaloNev);
        tbodyTR.appendChild(tdMennyiseg);
        tbodyTR.appendChild(tdBevasarloGomb);
        tdBevasarloGomb.appendChild(btnBevasarlo);


        szamlalo++;
      }
    }

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


async function hozzavalokFuggvenyHivas() {
  try {
      await hozzavalokKategoriaLeker();
      await hozzavalokLeker();
  } catch (error) {
      console.log(error);
  }
}

window.addEventListener("load",  hozzavalokFuggvenyHivas);



  //document.addEventListener('DOMContentLoaded', csillagErtekeloFelhasznalotol);
window.addEventListener("load", ertekeltE)
  document.getElementById("btnHozzaszolasKuldes").addEventListener("click", hozzaszolasElkuld);
  window.addEventListener("load", function(){
    hozzaszolasLeker();
    receptLeker();
    ertekelesLeker();
    //ertekelesMegjelenit();
    ertekeltE();
    /*hozzavalokLeker();
    hozzavalokKategoriaLeker()*/
  });
  document.getElementById("btnErtekelesKuld").addEventListener("click", ertekelesElkuld);


