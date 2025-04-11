import { alertMegjelenit } from "./alertmegjelenit.js";
import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
import {jogosultsagLeker} from "../javascriptFuggvenyek/adminFelulet.js";

let kategoriak = [];
let adag = 1;
let receptek = [];
let hozzavalok = [];
let felhasznalo_id = 5;
const urlErtekek = new URLSearchParams(window.location.search);
let recept_id = urlErtekek.get("recept_id");




async function felhasznaloIdLeker() {
  try {
    const response = await fetch('../bejelentkezes/backendBejelentkezes/sessionGetFelhasznaloId.php');
    if (response.ok) {
      felhasznalo_id = await response.text();
      console.log('Bejelentkezett felhasználó ID:', felhasznalo_id);
    } else {
      console.error('Hiba a felhasználó ID lekérése során');
    }
  } catch (error) {
    console.error('Hiba történt:', error);
  }
}





async function receptLeker(){
    try {
        console.log(recept_id)
        let leker = await fetch("../adatbazisInterakciok/receptleker",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : recept_id
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


async function hozzavalokKategoriaLeker(){
  try {
    let leker = await fetch("../adatbazisInterakciok/kategorialeker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : recept_id
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

async function receptElfogad(){
  try {
    let leker = await fetch("../adatbazisInterakciok/receptElfogad",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : recept_id
        })
    });
    

    let eredmeny = await leker.json()
    if(leker.ok){
      visszalep()


    }
    else{
        console.log(eredmeny.valasz);
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



    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for(let hozzavalo of hozzavalok){
      if(hozzavalo.kategoria == kategoria){
        let tbodyTR = document.createElement("tr");

        let tdSorszam = document.createElement("td");
        let tdHozzavaloNev = document.createElement("td");
        let tdMennyiseg = document.createElement("td");
        

        let label = document.createElement("label");
        label.classList = "btn btn-outline-warning";
        label.htmlFor = "btn"+hozzavalo.hozzavalo;
        label.innerHTML = "Hozzáadás kosárhoz";

        


        tdSorszam.innerHTML = szamlalo;
        tdHozzavaloNev.innerHTML = hozzavalo.hozzavalo;
        tdMennyiseg.innerHTML = Math.round(hozzavalo.mennyiseg * adag) + " " + hozzavalo.mertek_egyseg;

        tbody.appendChild(tbodyTR);
        tbodyTR.appendChild(tdSorszam);
        tbodyTR.appendChild(tdHozzavaloNev);
        tbodyTR.appendChild(tdMennyiseg);
        

        szamlalo++;
      }
    }

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
  liKaloria.innerHTML = "<b>Kalória </b>- "+Math.round(receptek[0].kaloria * adag)+" kcal";

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
    document.getElementById("etelfajtaKiir").innerHTML = receptek[0].etelfajta_nev;
    document.getElementById("receptNeve").innerHTML = receptek[0].neve;

    document.getElementById("receptIdeje").innerHTML = receptek[0].ido +" perc";
    document.getElementById("receptKoltseg").innerHTML = receptek[0].ar;
    document.getElementById("receptNehezseg").innerHTML = receptek[0].nehezseg;

    document.getElementById("receptLeiras").innerHTML = receptek[0].elkeszites;

    document.getElementById("receptKep").src = "../receptfeltolto/adatbazisInterakciok/"+receptek[0].kepek;
    document.getElementById("receptKep").alt = receptek[0].neve;
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

async function hozzavalokLeker(){
    try {
     
      hozzavalok = [];
      let leker = await fetch("../adatbazisInterakciok/hozzavalokleker",{
          method : "POST",
          headers : {
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({
              "recept_id" : recept_id
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

async function javaslatKuldes(){
    let szoveg = document.getElementById("javaslat").value
    if(szoveg != ""){
      try {
      
        let leker = await fetch("../adatbazisInterakciok/javaslatFeltolt",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : recept_id,
                "javaslat" : szoveg
            })
        });
  
    
        if(leker.ok){
          visszalep()
        }
        else{
            console.log(leker);
        }
      } catch (error) {
          console.log(error);
      }

    }
    else{
      let alertBox = document.getElementById("javaslatAlert")
      
      alertMegjelenit("Kérem adjon meg javaslatot!", true, alertBox);
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


async function segedFuggvenyInditashoz() {

    receptLeker();
    adagFigyel(); 
    await hozzavalokFuggvenyHivas(); 
}




function modositasJavas(){
    document.getElementById("opciokDiv").style.visibility = "hidden";
    document.getElementById("javaslatHelye").style.visibility = "";
   
}

function modositasJavasMegse(){
    document.getElementById("javaslat").value = ""
    document.getElementById("opciokDiv").style.visibility = "";
    document.getElementById("javaslatHelye").style.visibility = "hidden";
   
}

function visszalep(){
     window.location.href = "adminElfogad.php"
}



document.getElementById("modositasJavButton").addEventListener("click", modositasJavas)
document.getElementById("javaslatMegse").addEventListener("click", modositasJavasMegse)
document.getElementById("elfogadRec").addEventListener("click", receptElfogad)
document.getElementById("opcioMegse").addEventListener("click", visszalep)
document.getElementById("javaslatKuld").addEventListener("click", javaslatKuldes)


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

window.addEventListener("load", async function(){
  await felhasznaloIdLeker();
  await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
  await segedFuggvenyInditashoz();

})

document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);
