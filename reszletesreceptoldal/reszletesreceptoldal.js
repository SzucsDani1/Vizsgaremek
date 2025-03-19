let kivalasztottCsillag = 0;
let kategoriak = [];
let adag = 1;
let receptek = [];
let hozzavalok = [];
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

    let kuldes = await fetch("./adatbazisInterakciok/hozzaszolasfeltoltes", {
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
    let lekerHozzaszolas = await fetch("./adatbazisInterakciok/hozzaszolasleker", {
        method : "POST",
        headers : {
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({
        "receptek_id" : 1
        })
    });

    let lekerNev = await fetch("./adatbazisInterakciok/nevleker", {
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
        let leker = await fetch("./adatbazisInterakciok/receptleker",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : receptId
            })
        });
        
        if(leker.ok){
            let receptekLista = await leker.json();
            for(let recept of receptekLista){
              receptek.push(recept);
            }
            console.log(receptek);
            receptMegjelenit();
            receptInfoList();
        }
        else{
            let receptekLista = await leker.json();
            console.log(receptekLista.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}

async function ertekelesLeker(){
    try {
        let receptId = 1;
        let leker = await fetch("./adatbazisInterakciok/ertekeles",{
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
            let receptekLista = await leker.json();
            console.log(receptekLista.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}

async function ertekeltE(){
    try {
        let receptId = 1;
        let felhasznalo_id = 5;
        let leker = await fetch("./adatbazisInterakciok/ertekelt",{
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
        if(valasz == "Nincs találat!"){
          //Módosíthat
          frissitCsillagok(0, csillagok, true);
          return true;
        }
        else{
          //Nem módosíthat
          ertekelesLeker();
          document.getElementById("btnErtekelesKuld").hidden = true;
          document.getElementById("ertekeltSzoveg").innerHTML = "Megadott értékelés:";
          document.getElementById("ertekeltSzoveg").classList = "d-flex justify-content-center text-body-secondary";
          document.getElementById("divErtekelFelhasznalo").classList = "filter-box border p-3 bg-light rounded my-3 mx-auto";
          
          frissitCsillagok(valasz[0].ertek, csillagok, false);

          
          for (const csillag of csillagok) {
            csillag.setAttribute('disabled', 'true');
            csillag.style.pointerEvents = 'none';
          }
          return false;
        }
    } catch (error) {
        console.log(error);
    }
}

async function hozzavalokLeker(){
  try {
    let receptId = 1;
    let leker = await fetch("./adatbazisInterakciok/hozzavalokleker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : receptId
        })
    });
    
    let hozzavalokLista = await leker.json();

    if(leker.ok){
      console.log(hozzavalok);
      for(let hozzavalo of hozzavalokLista){
        hozzavalok.push(hozzavalo);
      }
      hozzavalokTablazatGeneral();
    }
    else{
        console.log(hozzavalokLista.valasz);
    }
} catch (error) {
    console.log(error);
}
}

async function hozzavalokKategoriaLeker(){
  try {
    let receptId = 1;
    let leker = await fetch("./adatbazisInterakciok/kategorialeker",{
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

    let kuldes = await fetch("./adatbazisInterakciok/ertekeleselkuld",{
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
    let ertekelesAlert = document.getElementById("ertekelesAlert");
    let ertekelesProgressBar = document.getElementById("ertekelesProgressBar");

    if(kuldes.ok){
      
      alertMegjelenit(valasz.valasz, false, ertekelesAlert, ertekelesProgressBar);
      ertekeltE();
    } else {
      alertMegjelenit(valasz.valasz, true, ertekelesAlert, ertekelesProgressBar);
    }

  } catch (error) {
    console.error("Hálózati vagy szerverhiba történt:", error);
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



function hozzavalokTablazatGeneral(){
  let hozzavalokKiir = document.getElementById("hozzavalokMegjelenit");
  hozzavalokKiir.innerHTML = "";
  for(let kategoria of kategoriak){
    let szamlalo = 1;
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

    thSorszam.innerHTML = "#";
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
        btnBevasarlo.id = hozzavalo.id;
        btnBevasarlo.addEventListener("click", function() {
          bevasarloListaHozzaad(hozzavalo.id);
      });

        tdSorszam.innerHTML = szamlalo;
        tdHozzavaloNev.innerHTML = hozzavalo.hozzavalo;
        tdMennyiseg.innerHTML = hozzavalo.mennyiseg * adag + " " + hozzavalo.mertek_egyseg;

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

async function bevasarloListaHozzaad(hozzavalo_id){
  try {
    let felhasznalo_id = 5;
    let feltolt = await fetch("./adatbazisInterakciok/bevasarlolistahozzaad",{
      method : "POST",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          "hozzavalo_id" : hozzavalo_id,
          "felhasznalo_id" : felhasznalo_id
      })
  })

  let valasz = await feltolt.json();
  let hozzavalokAlert = document.getElementById("hozzavalokAlert");
  let hozzavalokProgressBar = document.getElementById("hozzavalokProgressBar");
  if(feltolt.ok){
    console.log(valasz.valasz);
    alertMegjelenit(valasz.valasz, false, hozzavalokAlert, hozzavalokProgressBar);
  }
  else{
    alertMegjelenit(valasz.valasz, true, hozzavalokAlert, hozzavalokProgressBar);

  }
  } catch (error) {
    console.log(error);
  }
}

function receptInfoList(){
  let ulReceptInfo = document.getElementById("receptInfo");
  ulReceptInfo.innerHTML = "";
  for(let recept of receptek){
    let liEtrend= document.createElement("li");
    liEtrend.classList = "list-group-item";
    liEtrend.innerHTML = "<b>Étrend </b>- "+recept.etrend_neve;

    let liKaloria= document.createElement("li");
    liKaloria.classList = "list-group-item";
    liKaloria.innerHTML = "<b>Kalória </b>- "+recept.kaloria * adag+" kcal";

    let liKonyha= document.createElement("li");
    liKonyha.classList = "list-group-item";
    liKonyha.innerHTML = "<b>Konyha </b>- "+recept.konyha_nev;

    let liNapszak= document.createElement("li");
    liNapszak.classList = "list-group-item";
    liNapszak.innerHTML = "<b>Napszak </b>- "+recept.napszak;

    ulReceptInfo.appendChild(liEtrend);
    ulReceptInfo.appendChild(liKaloria);
    ulReceptInfo.appendChild(liKonyha);
    ulReceptInfo.appendChild(liNapszak);
  }
}

function receptMegjelenit(){
    document.getElementById("etelfajtaKiir").innerHTML = receptek[0].etelfajta_nev;
    document.getElementById("receptNeve").innerHTML = receptek[0].neve;

    document.getElementById("receptIdeje").innerHTML = receptek[0].ido +" perc";
    document.getElementById("receptKoltseg").innerHTML = receptek[0].ar;
    document.getElementById("receptNehezseg").innerHTML = receptek[0].nehezseg;

    document.getElementById("receptLeiras").innerHTML = receptek[0].elkeszites;
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
              let li = document.createElement("li");
              let divFejlec = document.createElement("div");
              let divTartalom = document.createElement("div");
              let img = document.createElement("img");
              let spanFelh = document.createElement("span");
              let spanIdo = document.createElement("span");
              
              img.src = "./kepek/profile.jpg";
              img.alt = "Profil";
              img.classList = "rounded-circle me-2";
              img.style.width = "40px";
              img.style.height = "40px";
              spanFelh.innerHTML = "" + nev.felhnev + "";
              spanIdo.innerHTML = hozzaszolas.feltoltes_ideje;
              spanIdo.classList = "text-body-secondary ms-4";
              
              if(hozzaszolas.felhasznalo_id == felhasznalo_id){
                  li.classList = "list-group-item list-group-item-primary my-2";
              }
              else{
                  li.classList = "list-group-item my-2";
              }
              
              divFejlec.classList = "mb-2 text-secondary";
              
              // Sortörések kezelése
              divTartalom.innerHTML = hozzaszolas.hozzaszolas.replace(/\n/g, '<br>');
              
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


function frissitCsillagok(ertekelesSzama, csillagok, felhasznaloModosit) {
    if(felhasznaloModosit == true){

        ertekelesSzama = csillagLekerFelhasznalotol(csillagok);

    }
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

function adagFigyel(){
  document.getElementById("adagKiir").innerHTML = "Adag: "+adag;
  document.getElementById("adagKivon").addEventListener("click", function(){
    if(adag > 1){
      adag = adag - 1;
      document.getElementById("adagKiir").innerHTML = "Adag: "+adag;
      hozzavalokTablazatGeneral();
      receptInfoList();
    }
  })

  document.getElementById("adagHozzaad").addEventListener("click", function(){
    if(adag < 10){
      adag = adag + 1;
      document.getElementById("adagKiir").innerHTML = "Adag: "+adag;
      hozzavalokTablazatGeneral();
      receptInfoList();
    }
  })
}

function alertMegjelenit(uzenet, hibae, alertBox, progress){

    let duration = 5000; // 5 seconds
    let step = 5; // update every 100ms
    let width = 100;
    progress.hidden = false;
    alertBox.hidden = false;
    if(hibae == true){
      progress.style.background = "red";
      alertBox.classList = "alert alert-danger text-center";
    }
    else{
      progress.style.background = "green";
      alertBox.classList = "alert alert-success text-center";
    }
    alertBox.innerHTML = uzenet;
    let interval = setInterval(() => {
        width -= (100 / (duration / step));
        progress.style.width = width + '%';
        if (width <= 0) {
            clearInterval(interval);
            alertBox.hidden = true;
            progress.hidden = true;
        }
    }, step);
  
}



window.addEventListener("load",  hozzavalokFuggvenyHivas);



  //document.addEventListener('DOMContentLoaded', csillagErtekeloFelhasznalotol);
window.addEventListener("load", ertekeltE)
  document.getElementById("btnHozzaszolasKuldes").addEventListener("click", hozzaszolasElkuld);
  window.addEventListener("load", function(){
    hozzaszolasLeker();
    receptLeker();
    ertekelesLeker();
    ertekeltE();
    adagFigyel();
  });
  document.getElementById("btnErtekelesKuld").addEventListener("click", ertekelesElkuld);


