import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
import {jogosultsagLeker} from "../javascriptFuggvenyek/adminFelulet.js";


const napok = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
const napszakok = ["reggeli","tízórai","ebéd", "uzsonna", "vacsora"];

let felhasznalo_id;

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



async function receptek(){
    try {
        let leker = await fetch("../adatbazisInterakciok/hetimenuleker");
        if(leker.ok){
            let receptek = await leker.json();
            let kiiratasok = document.getElementsByName("hetNapjai");
            for (let kiirat of kiiratasok) {
                kiirat.addEventListener("change", function() {
                    receptekBetoltes(receptek);
                });
            }
            receptekBetoltes(receptek);
            
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
    
}

async function hetNapjaLeker(){
    try {
        let leker = await fetch("../adatbazisInterakciok/hetnapja");
        let nap = await leker.json();
        if(leker.ok){
            console.log(nap.valasz)
            document.getElementById("btn"+nap.valasz).checked = true;
        }
        else{
            console.log(nap.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}



  function receptekBetoltes(receptek) {
    const kivalasztottNap = document.querySelector('input[name="hetNapjai"]:checked')?.value;
    
    const napszakok = ["reggeli", "tízórai", "ebéd", "uzsonna", "vacsora"];
    
    for (let napszak of napszakok) {
        let receptMegjelenit = document.getElementById(napszak + "Megjelenites");
        if (receptMegjelenit) {
            receptMegjelenit.innerHTML = "";
        }
    }
    
    let receptekNapszakja = {};
    for (let napszak of napszakok) {
        receptekNapszakja[napszak.toUpperCase()] = [];
    }
    
    for (let recept of receptek) {
        if (receptekNapszakja.hasOwnProperty(recept.napszak)) {
            receptekNapszakja[recept.napszak].push(recept);
        }
    }
    
    for (let napszak of napszakok) {
        let kivalasztottReceptek = receptekNapszakja[napszak.toUpperCase()];
        if (kivalasztottReceptek.length > kivalasztottNap) {
            let kivalasztottRecept = kivalasztottReceptek[kivalasztottNap];
            let receptMegjelenit = document.getElementById(napszak + "Megjelenites");
            
            let divCard = document.createElement("div");
            divCard.classList = "card col-12 col-lg-3 p-2 col-md-6 col-sm-12 mx-auto my-3";
            divCard.style = "width: 18rem;";
            divCard.id = kivalasztottRecept.neve;
            
            let img = document.createElement("img");
            img.src = kivalasztottRecept.kepek || "";
            img.classList = "card-img-top";
            img.alt = kivalasztottRecept.neve;
            img.width = 250;
            img.height = 200;
            
            let divCardBody = document.createElement("div");
            divCardBody.classList = "card-body text-center";
            
            let h5 = document.createElement("h5");
            h5.classList = "card-title";
            h5.innerHTML = kivalasztottRecept.neve;
            
            let pJellemzok = document.createElement("p");
            pJellemzok.classList = "text-body-secondary fw-light";
            pJellemzok.innerHTML = kivalasztottRecept.kaloria + " kcal | " + kivalasztottRecept.nehezseg + " | " + kivalasztottRecept.ido + " perc";
            
            let br = document.createElement("br");
            
            let inputButton = document.createElement("input");
            inputButton.type = "button";
            inputButton.classList = "btn btn-warning";
            inputButton.value = "Részletek";

            inputButton.addEventListener("click", function(){
                window.location.href = "../reszletesreceptoldal/reszletesreceptoldal.php?receptek_id=" + kivalasztottRecept.id;
            })
            
            let pFeltolto = document.createElement("p");
            pFeltolto.classList = "text-body-secondary fw-light mt-2";
            pFeltolto.innerHTML = kivalasztottRecept.felhnev + "\t|\t" + kivalasztottRecept.mikor_feltolt;
            
            divCardBody.appendChild(h5);
            divCardBody.appendChild(pJellemzok);
            divCardBody.appendChild(br);
            divCardBody.appendChild(inputButton);
            divCardBody.appendChild(pFeltolto);
            
            divCard.appendChild(img);
            divCard.appendChild(divCardBody);
            
            receptMegjelenit.appendChild(divCard);
        }
    }
}


async function inditas(){
    await felhasznaloIdLeker();
    await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
    await hetNapjaLeker();
    receptek();
}

window.addEventListener("load", inditas());

document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);
