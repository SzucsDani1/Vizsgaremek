import {alertMegjelenit} from "../javascriptFuggvenyek/alertmegjelenit.js";
import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
import {jogosultsagLeker} from "../javascriptFuggvenyek/adminFelulet.js";


let kivalasztottCsillag = 0;
let kategoriak = [];
let adag = 1;
let receptek = [];
let hozzavalok = [];
let felhasznalo_id;
let bevasarloLista = [];

const URL = new URLSearchParams(window.location.search);
const receptek_id = URL.get('receptek_id');

async function felhasznaloIdLeker() {
  try {
    const leker = await fetch('../bejelentkezes/backendBejelentkezes/sessionGetFelhasznaloId.php');
    if (leker.ok) {
      felhasznalo_id = await leker.text();
      console.log('Bejelentkezett felhasználó ID:', felhasznalo_id);
      console.log("recept id: "+ receptek_id);
    } else {
      console.error('Hiba a felhasználó ID lekérése során');
    }
  } catch (error) {
    console.error('Hiba történt:', error);
  }
}


async function kijelentkezesLeker(){
    try {
        let leker = await fetch("../adatbazisInterakciok/kijelentkezes");
        if(leker.ok){
            kijelentkezes();
        }
    } catch (error) {
        console.log(error);
    }
}



async function hozzaszolasElkuld(){
  try {
    let hozzaszolas = document.getElementById("hozzaszolas").value;
    let uzenet = document.getElementById("hozzaszolasAlert");
    let progressBar = document.getElementById("hozzaszolasProgressBar");
    uzenet.innerHTML = "";

    if(hozzaszolas == ""){
      alertMegjelenit("Kérem, ne hagyja üresen a mezőt!", true, uzenet, progressBar);
      return;
    }

    let kuldes = await fetch("../adatbazisInterakciok/hozzaszolasfeltoltes", {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "felhasznalo_id" : felhasznalo_id,
        "hozzaszolas" : hozzaszolas,
        "receptek_id" : receptek_id
      })
    })

    let valasz = await kuldes.json();
    console.log(valasz)
    if(kuldes.ok){
        alertMegjelenit(valasz.valasz, false, uzenet, progressBar);
        document.getElementById("hozzaszolas").value = "";
        hozzaszolasLeker();
    }

    else{
      alertMegjelenit(valasz.valasz, false, uzenet, progressBar);

    }

  } catch (error) {
        console.log(error)
  }
}

async function hozzaszolasLeker(){
  let hozzaszolasKiir = document.getElementById("hozzaszolasok");  
  hozzaszolasKiir.innerHTML = "";
  hozzaszolasKiir.classList = "";
  hozzaszolasKiir.role = "";
    let lekerHozzaszolas = await fetch("../adatbazisInterakciok/hozzaszolasleker", {
        method : "POST",
        headers : {
        "Content-Type" : "application/json"
        },
        body : JSON.stringify({
        "receptek_id" : receptek_id
        })
    });

    let hozzaszolasok = await lekerHozzaszolas.json();
    if(lekerHozzaszolas.ok){
        
        hozzaszolasGeneral(hozzaszolasok)
    }
    else{
      hozzaszolasKiir.innerHTML = hozzaszolasok.valasz;
      hozzaszolasKiir.classList = "alert alert-warning text-center mx-auto my-1";
      hozzaszolasKiir.role = "alert";
      hozzaszolasKiir.style.width = "80%";
    }
}


async function receptLeker(){
    try {
        let leker = await fetch("../adatbazisInterakciok/receptleker",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : receptek_id
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
        let leker = await fetch("../adatbazisInterakciok/ertekeles",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "receptek_id" : receptek_id
            })
        });
        if(leker.ok){
            let ertekeles = await leker.json();
            const csillagok = document.querySelectorAll('#csillagMegjelen');
            frissitCsillagok(ertekeles[0].ertekeles, csillagok, false);

            //Csillagok föléhúzásnál ne módosuljon a kurzor a föléhúzós ikonra
            for (const csillag of csillagok) {
              csillag.setAttribute('disabled', 'true');
              csillag.style.pointerEvents = 'none';
            }
            return false;
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
        let leker = await fetch("../adatbazisInterakciok/ertekelt",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : receptek_id,
                "felhasznalo_id" : felhasznalo_id
            })
        });

        let valasz = await leker.json();
        const csillagok = document.querySelectorAll('#csillagErtekel');
        document.getElementById("btnErtekelesKuld").hidden = false;
        console.log("Értékelt: "+valasz.valasz)
        if(valasz.valasz == "Nincs találat!"){
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

          //Csillagok föléhúzásnál ne módosuljon a kurzor a föléhúzós ikonra
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
    bevasarloLista = [];
    hozzavalok = [];
    let hozzavalokLeker = await fetch("../adatbazisInterakciok/hozzavalokleker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : receptek_id
        })
    });

    let lekerBevasarlolista = await fetch("../adatbazisInterakciok/bevasarlolistaleker",{
      method : "POST",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          "felhasznalo_id" : felhasznalo_id
      })
    })
    
    let hozzavalokLista = await hozzavalokLeker.json();
    let bevasarloListaLekert = await lekerBevasarlolista.json();

    if(hozzavalokLeker.ok){

      for(let hozzavalo of hozzavalokLista){
        hozzavalok.push(hozzavalo);
      }

      if(bevasarloListaLekert.valasz != "Nincs találat!"){
        for(let item of bevasarloListaLekert){
          bevasarloLista.push(item);
        }
      }
      
      
      hozzavalokTablazatGeneral();
    }
    else{
        console.log(hozzavalokLista);
    }
} catch (error) {
    console.log(error);
}
}

async function hozzavalokKategoriaLeker(){
  try {
    let leker = await fetch("../adatbazisInterakciok/kategorialeker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : receptek_id
        })
    });
    
    let eredmeny = await leker.json();

    if(leker.ok){
      for(let elem of eredmeny){
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
    

    let kuldes = await fetch("../adatbazisInterakciok/ertekeleselkuld",{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "recept_id" : receptek_id,
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
  

async function kedvencRecept(){
  try {
    let checkbox = document.getElementById("kedvencRecept");
    let label = document.getElementById("kedvencReceptFelirat");
    if(checkbox.checked == false){
      //Hozzáad
      let hozzaad = await fetch("../adatbazisInterakciok/kedvencrecepthozzaad",{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "receptek_id" : receptek_id,
            "felhasznalo_id" :felhasznalo_id
        })
      })
      let valasz = await hozzaad.json();
      if(hozzaad.ok){
        //Feltöltve
        console.log(valasz.valasz);
        label.innerHTML = "Törlés kedvenc receptekből";
      }
      else{
        alert(valasz.valasz);
      }

    }
    else{
      //Töröl
      let torol = await fetch("../adatbazisInterakciok/kedvencrecepttorol",{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "receptek_id" : receptek_id,
            "felhasznalo_id" :felhasznalo_id
        })
      })
      
      if(torol.ok){
        console.log("Sikeres törlés!");
        label.innerHTML = "Hozzáadás kedvencekhez";
      }
      else{
        alert(valasz.valasz);
      }
    }
  } catch (error) {
    console.log(error);
  }
}


async function kedvencReceptLeker(){
  try {
    let checkbox = document.getElementById("kedvencRecept");
    let label = document.getElementById("kedvencReceptFelirat");
    let leker = await fetch("../adatbazisInterakciok/kedvencreceptlekerreceptnel",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "receptek_id" : receptek_id,
            "felhasznalo_id" : felhasznalo_id
        })
    });
    
    let eredmeny = await leker.json();
    if(eredmeny.valasz == "Nincs találat!"){
      //Még nincs bejelölve a kedvenc receptekhez
      checkbox.checked = true;
      label.innerHTML = "Hozzáadás kedvencekhez";
    }
    else{
      //Már be van jelölve a kedvenc receptekhez
      checkbox.checked = false;
      label.innerHTML = "Törlés kedvenc receptekből";
      
    }
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

    let divResponsive = document.createElement("div");
    divResponsive.classList = "table-responsive";

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
    div.appendChild(divResponsive);
    divResponsive.appendChild(table);
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

        let label = document.createElement("label");
        label.classList = "btn btn-outline-warning";
        label.htmlFor = "btn"+hozzavalo.hozzavalo;
        label.innerHTML = "Hozzáadás kosárhoz";
        label.id = "label"+hozzavalo.hozzavalo;

        let btnBevasarlo = document.createElement("input");
        btnBevasarlo.type = "checkbox";
        btnBevasarlo.classList = "btn-check";
        btnBevasarlo.id = "btn"+hozzavalo.hozzavalo;
        btnBevasarlo.checked = true;

        //Hozzá van-e adva a bevásárlólistához
        for(let item of bevasarloLista){
          if(item.hozzavalok_id == hozzavalo.id){
            btnBevasarlo.checked = false;
            label.innerHTML = "Törlés a korsárból";
            break;
          }
        }

        btnBevasarlo.addEventListener("change", function() {
          bevasaloListaTorlesHozzaadas(hozzavalo.id, label, btnBevasarlo);
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
        tdBevasarloGomb.appendChild(label);

        szamlalo++;
      }
    }

  }
}




async function bevasaloListaTorlesHozzaadas(hozzavalo_id, label, btnBevasarlo){
  try {
    if(btnBevasarlo.checked == false){
      //Hozzáad
      let hozzaad = await fetch("../adatbazisInterakciok/bevasarlolistahozzaad",{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "hozzavalo_id" : hozzavalo_id,
          "felhasznalo_id" : felhasznalo_id,
          "adag" : adag
        })
      })
      let valasz = await hozzaad.json();
      if(hozzaad.ok){
        //Feltöltve
        console.log(valasz.valasz);
        label.innerHTML = "Törlés a korsárból";
      }
      else{
        alert(valasz.valasz);
      }

    }
    else{
      //Töröl
      let torol = await fetch("../adatbazisInterakciok/bevasarlolistatorol",{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "hozzavalok_id" : hozzavalo_id,
          "felhasznalo_id" : felhasznalo_id,
        })
      })
      
      if(torol.ok){
        console.log("Sikeres törlés!");
        label.innerHTML = "Hozzáadás kosárhoz";
      }
      else{
        alert(valasz.valasz);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function receptInfoList(){
  let ulReceptInfo = document.getElementById("receptInfo");
  ulReceptInfo.innerHTML = "";
  let etrendek = [];
  for(let recept of receptek){
    etrendek.push(recept.etrend_neve);
  }
  
  let liEtrend= document.createElement("li");
  liEtrend.classList = "list-group-item";
  liEtrend.innerHTML = "<b>Étrend: </b> " + etrendek.join(", ");

  let liKaloria= document.createElement("li");
  liKaloria.classList = "list-group-item";
  liKaloria.innerHTML = "<b>Kalória </b>- "+receptek[0].kaloria * adag+" kcal";

  let liKonyha= document.createElement("li");
  liKonyha.classList = "list-group-item";
  liKonyha.innerHTML = "<b>Konyha </b>- "+receptek[0].konyha_nev;

  let liNapszak= document.createElement("li");
  liNapszak.classList = "list-group-item";
  liNapszak.innerHTML = "<b>Napszak </b>- "+receptek[0].napszak;

  ulReceptInfo.appendChild(liEtrend);
  ulReceptInfo.appendChild(liKaloria);
  ulReceptInfo.appendChild(liKonyha);
  ulReceptInfo.appendChild(liNapszak);
  
}

function receptMegjelenit(){
    document.getElementById("etelfajtaKiir").innerHTML = "";
    document.getElementById("receptNeve").innerHTML = "";

    document.getElementById("receptIdeje").innerHTML = "";
    document.getElementById("receptKoltseg").innerHTML = "";
    document.getElementById("receptNehezseg").innerHTML = "";

    document.getElementById("receptLeiras").innerHTML = "";


    document.getElementById("etelfajtaKiir").innerHTML = receptek[0].etelfajta_nev;
    document.getElementById("receptNeve").innerHTML = receptek[0].neve;

    document.getElementById("receptIdeje").innerHTML = receptek[0].ido +" perc";
    document.getElementById("receptKoltseg").innerHTML = receptek[0].ar;
    document.getElementById("receptNehezseg").innerHTML = receptek[0].nehezseg;

    document.getElementById("receptLeiras").innerHTML = receptek[0].elkeszites;
    
    document.getElementById("receptKep").src = "../receptfeltolto/adatbazisInterakciok/"+receptek[0].kepek;
    document.getElementById("receptKep").alt = receptek[0].neve;

    document.title = receptek[0].neve;
}



function hozzaszolasGeneral(hozzaszolasok){
  let ul = document.getElementById("hozzaszolasok");
  ul.innerHTML = "";
  
  for(let hozzaszolas of hozzaszolasok){
    if(hozzaszolas.receptek_id == receptek_id){
      let li = document.createElement("li");
      let divFejlec = document.createElement("div");
      let divTartalom = document.createElement("div");
      let img = document.createElement("img");
      let spanFelh = document.createElement("span");
      console.log(hozzaszolas.profilkep);
      let spanIdo = document.createElement("span");

      if(hozzaszolas.profilkep != null){
        img.src = "../profilszerkeszto/"+hozzaszolas.profilkep;
      }
      else{
        img.src = "../profilszerkeszto/feltoltotKepek/default/profile_picture.jpg";
      }
      img.alt = "Profil";
      img.classList = "rounded-circle me-2";
      img.style.width = "40px";
      img.style.height = "40px";
      spanFelh.innerHTML = "" + hozzaszolas.felhasznalonev + "";
      spanIdo.innerHTML = hozzaszolas.feltoltes_ideje;
      spanIdo.classList = "text-body-secondary ms-4";
      
      if(hozzaszolas.felhasznalo_id == felhasznalo_id){
          li.classList = "list-group-item list-group-item-primary my-2 p-2 w-100";
      }
      else{
          li.classList = "list-group-item my-2 p-2";
      }
      
      divFejlec.classList = "mb-2 text-secondary";
      
      // Sortörés
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
          let ertekelesSzama = csillag.getAttribute('data-value');
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
      hozzavalokLeker();
      receptInfoList();
    }
  })

  document.getElementById("adagHozzaad").addEventListener("click", function(){
    if(adag < 10){
      adag = adag + 1;
      document.getElementById("adagKiir").innerHTML = "Adag: "+adag;
      hozzavalokLeker();
      receptInfoList();
    }
  })
}



async function hozzavalokFuggvenyHivas() {
  try {
      await hozzavalokKategoriaLeker();
      await hozzavalokLeker();
  } catch (error) {
      console.log(error);
  }
}


document.getElementById("btnHozzaszolasKuldes").addEventListener("click", hozzaszolasElkuld);
document.getElementById("kedvencRecept").addEventListener("change", kedvencRecept);
async function segedFuggvenyInditashoz() {

    await felhasznaloIdLeker();
    await hozzaszolasLeker();
    await kedvencReceptLeker();
    await receptLeker();
    await ertekelesLeker();
    await ertekeltE();
    adagFigyel(); 
    await hozzavalokFuggvenyHivas(); 
    await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
}

window.addEventListener("load", segedFuggvenyInditashoz);

document.getElementById("btnErtekelesKuld").addEventListener("click", ertekelesElkuld);
document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);
 
