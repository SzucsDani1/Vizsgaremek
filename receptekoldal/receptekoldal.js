import {receptekBetoltes} from "../javascriptFuggvenyek/kartyageneralas.js"
import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
import {jogosultsagLeker} from "../javascriptFuggvenyek/adminFelulet.js";


let kategoriak = new Set();
let alapanyagok = new Set();
let konyhak = new Set();
let etrendek = new Set();


let felhasznalo_id;

async function felhasznaloIdLeker() {
  try {
    let response = await fetch('../bejelentkezes/backendBejelentkezes/sessionGetFelhasznaloId.php');
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
        console.log("aaaa")
        let leker = await fetch("../adatbazisInterakciok/kijelentkezes");
        if(leker.ok){
            kijelentkezes();
        }
    } catch (error) {
        console.log(error);
    }
}



async function receptekSzuro() {
    try {
        let kategoriaKeresomezo = document.getElementById("kategoriakKereses");
        let alapanyagKeresomezo = document.getElementById("alapanyagKereses");
        let alapanyagNelkulKeresomezo = document.getElementById("alapanyagNelkulKereses");
        let etrendKeresomezo = document.getElementById("etrendKereses");
        let konyhaKeresomezo = document.getElementById("konyhaKereses");

        kategoriaKeresomezo.value = "";
        alapanyagKeresomezo.value = "";
        alapanyagNelkulKeresomezo.value = "";
        etrendKeresomezo.value = "";
        konyhaKeresomezo.value = "";

        let kategoriak = checkboxLekerdezes("kivalasztottKategoriak");
        let alapanyagok = checkboxLekerdezes("kivalasztottAlapanyagok");
        let alapanyagok_nelkul = checkboxLekerdezes("kivalasztottAlapanyagNelkul");
        let etrend = checkboxLekerdezes("kivalasztottEtrend");
        let konyha = checkboxLekerdezes("kivalasztottKonyha");

        let kereses = document.getElementById("text_kereses")?.value.trim() || "";
        

        // Napszak
        let NapszakCheckbox = document.querySelectorAll(".btn-check");
        let napszak = [];

        for (let checkbox of NapszakCheckbox) {
            if (checkbox.checked) {
                napszak.push(checkbox.value);
            }
        }
        
        // Ár
        let arInput = document.getElementById("arInput");
        let ar = null;
        if (arInput) {
            let arValue = parseInt(arInput.value);
            if (arValue === 1) ar = "Olcsó";
            else if (arValue === 2) ar = "Átlagos";
            else if (arValue === 3) ar = "Drága";
        }

        // Idő
        let idoInput = document.getElementById("idoInput");
        let ido = null;
        if (idoInput) {
            let idoValue = parseInt(idoInput.value);
            if (idoValue === 1) ido = 30;
            else if (idoValue === 2) ido = 60;
            else if (idoValue === 3) ido = 120;
        }
        
        // Kalória
        let kaloriaInput = document.getElementById("kaloriaInput");
        let kaloria = null;
        if (kaloriaInput) {
            let kaloriaValue = parseInt(kaloriaInput.value);
            if (kaloriaValue === 1) kaloria = 200;
            else if (kaloriaValue === 2) kaloria = 400;
            else if (kaloriaValue === 3) kaloria = 600;
            else if (kaloriaValue === 4) kaloria = 601;
        }
        
        
        let nehezsegInput = document.getElementById("nehezsegInput");
        let nehezseg = null;
        if (nehezsegInput) {
            let nehezsegValue = parseInt(nehezsegInput.value);
            if (nehezsegValue === 1) nehezseg = "Könnyű";
            else if (nehezsegValue === 2) nehezseg = "Közepes";
            else if (nehezsegValue === 3) nehezseg = "Nehéz";
        }
        
        let body = {
            kereses, 
            kategoriak,
            alapanyagok,
            alapanyagok_nelkul,
            etrend,
            konyha,
            ido,
            napszak,
            ar,
            kaloria,
            nehezseg
        };


        for (let index in body) {
            if (body[index] === null || (Array.isArray(body[index]) && !body[index].length)) {
                delete body[index];
            }
        }
        
        let lekerReceptek = await fetch("../adatbazisInterakciok/szuresreceptek", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        
        
        if (!lekerReceptek.ok) {
            nincsTalalatKeresesre("Nincs találat!");
        }
        else if (lekerReceptek.ok) {
            let receptek = await lekerReceptek.json();
            let divContainer = document.getElementById("kartyak");
            receptekBetoltes(receptek, divContainer);
        } 
    } catch (error) {
        console.log(error);
    }
}

async function konyhaListaLeker(){
    try{
        let eredmeny = await fetch("../adatbazisInterakciok/konyha");
        if(eredmeny.ok){
            let lista = await eredmeny.json();        
            for(let konyha of lista){
                konyhak.add(konyha.neve)
            }
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}


async function etrendListaLeker(){
    try{
        let eredmeny = await fetch("../adatbazisInterakciok/etrend");
        if(eredmeny.ok){
            let lista = await eredmeny.json();        
            for(let etrend of lista){
                etrendek.add(etrend.neve);
            }            
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}

async function kategoriakListaLeker(){
    try{
        let eredmeny = await fetch("../adatbazisInterakciok/etelfajta");
        if(eredmeny.ok){
            let lista = await eredmeny.json();        
            for(let kategoria of lista){
                kategoriak.add(kategoria.neve)
            }            
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}

async function alapanyagListaLeker(){
    try{
        let eredmeny = await fetch("../adatbazisInterakciok/alapanyag");
        if(eredmeny.ok){
            let lista = await eredmeny.json();        
            for(let alapanyag of lista){
                alapanyagok.add(alapanyag.hozzavalo)
            }
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}


function checkboxLekerdezes(kivalasztottRecept) {
    let recept = document.getElementById(kivalasztottRecept);
    if (!recept){
        return [];
    } 
    
    let kivalasztottCheckboxok = [];
    let checkboxok = recept.querySelectorAll(".kivalasztott-div");
    
    for (let checkbox of checkboxok) {
        let checkboxSzoveg = checkbox.textContent.trim().replace("×", "").trim();
        kivalasztottCheckboxok.push(checkboxSzoveg);
    }
    
    return kivalasztottCheckboxok;
}



function nincsTalalatKeresesre(error)
{
    document.getElementById("kartyak").innerHTML = "";
    let div = document.createElement("div");

    div.classList = "alert alert-warning text-center mx-auto mt-3";
    div.role = "alert";
    div.innerHTML = error;

    document.getElementById("kartyak").appendChild(div);
}



function arFigyel() {
    let range = document.getElementById("arInput");
    let arKiir = document.getElementById("arKiir");

    range.addEventListener("input", frissitAr); 
    range.addEventListener("mousedown", function() { 
        frissitAr(); 
        range.addEventListener("mousemove", frissitAr); 
    });
    range.addEventListener("mouseup", function() { 
        range.removeEventListener("mousemove", frissitAr); 
    });

    function frissitAr() {
        if (range.value == 0) {
            arKiir.innerHTML = "Mind";
        } else if (range.value == 1) {
            arKiir.innerHTML = "Olcsó";
        } else if (range.value == 2) {
            arKiir.innerHTML = "Átlagos";
        }
         else {
            arKiir.innerHTML = "Drága";
        }
    }
}


function kaloriaFigyel() {
    let range = document.getElementById("kaloriaInput");
    let kaloriaKiir = document.getElementById("kaloriaKiir");

    range.addEventListener("input", frissitKaloria);
    range.addEventListener("mousedown", function() { 
        frissitKaloria(); 
        range.addEventListener("mousemove", frissitKaloria); 
    });
    range.addEventListener("mouseup", function() { 
        range.removeEventListener("mousemove", frissitKaloria); 
    });

    function frissitKaloria() {
        if (range.value == 0) {
            kaloriaKiir.innerHTML = "Mind";
        } else if (range.value == 1) {
            kaloriaKiir.innerHTML = "200 kcal alatt";
        }else if (range.value == 2) {
            kaloriaKiir.innerHTML = "200-400 kcal";
        } else if (range.value == 3) {
            kaloriaKiir.innerHTML = "400-600 kcal";
        }
        else {
            kaloriaKiir.innerHTML = "600 kcal felett";
        }
    }
}

function nehezsegFigyel() {
    let range = document.getElementById("nehezsegInput");
    let nehezsegKiir = document.getElementById("nehezsegKiir");

    range.addEventListener("input", frissitNehezseg);
    range.addEventListener("mousedown", function() { 
        frissitNehezseg(); 
        range.addEventListener("mousemove", frissitNehezseg); 
    });
    range.addEventListener("mouseup", function() { 
        range.removeEventListener("mousemove", frissitNehezseg); 
    });

    function frissitNehezseg() {
        if (range.value == 0) {
            nehezsegKiir.innerHTML = "Mind";
        } else if (range.value == 1) {
            nehezsegKiir.innerHTML = "Könnyű";
        }else if (range.value == 2) {
            nehezsegKiir.innerHTML = "Közepes";
        } else {
            nehezsegKiir.innerHTML = "Nehéz";
        }
    }
}


function idoFigyel() {
    let range = document.getElementById("idoInput");
    let idoKiir = document.getElementById("idoKiir");

    range.addEventListener("input", frissitIdo);
    range.addEventListener("mousedown", function() { 
        frissitIdo(); 
        range.addEventListener("mousemove", frissitIdo); 
    });
    range.addEventListener("mouseup", function() { 
        range.removeEventListener("mousemove", frissitIdo); 
    });

    function frissitIdo() {
        if (range.value == 0) {
            idoKiir.innerHTML = "Mind";
        } else if (range.value == 1) {
            idoKiir.innerHTML = "Gyorsan";
        }else if (range.value == 2) {
            idoKiir.innerHTML = "Átlagosan";
        } else {
            idoKiir.innerHTML = "Hosszan";
        }
    }
}





function kategoriakListajanakGeneralasa() {
    let kategoriakLista = document.getElementById("kategoriakLista");
    kategoriakLista.innerHTML = "";
    
    for (let kategoria of kategoriak) {
        let elem = letrehozListaElemet(kategoria, "kategoriak");
        kategoriakLista.appendChild(elem);
    }
}

function alapanyagListajanakGeneralasa() {
    let alapanyagLista = document.getElementById("alapanyagLista");
    alapanyagLista.innerHTML = "";
    
    for (let alapanyag of alapanyagok) {
        if (document.getElementById("kivalasztott-alapanyagNelkul-" + alapanyag)) {
            continue;
        }
        
        let elem = letrehozListaElemet(alapanyag, "alapanyag");
        alapanyagLista.appendChild(elem);
    }
}

function alapanyagNelkulListajanakGeneralasa() {
    let alapanyagNelkulLista = document.getElementById("alapanyagNelkulLista");
    alapanyagNelkulLista.innerHTML = "";
    
    for (let alapanyag of alapanyagok) {
        if (document.getElementById("kivalasztott-alapanyag-" + alapanyag)) {
            continue;
        }
        
        let elem = letrehozListaElemet(alapanyag, "alapanyagNelkul");
        alapanyagNelkulLista.appendChild(elem);
    }
}

function etrendListajanakGeneralasa() {
    let etrendLista = document.getElementById("etrendLista");
    etrendLista.innerHTML = "";
    
    for (let etrend of etrendek) {
        let elem = letrehozListaElemet(etrend, "etrend");
        etrendLista.appendChild(elem);
    }
}

function konyhaListajanakGeneralasa() {
    let konyhaLista = document.getElementById("konyhaLista");
    konyhaLista.innerHTML = "";
    
    for (let konyha of konyhak) {
        let elem = letrehozListaElemet(konyha, "konyha");
        konyhaLista.appendChild(elem);
    }
}

function letrehozListaElemet(szuroAdat, szuroTipus) {
    let div = document.createElement("div");
    div.classList.add("dropdown-item");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("btn-check");
    checkbox.id = "checkbox-" + szuroTipus + "-" + szuroAdat;
    
    let label = document.createElement("label");
    label.classList.add("btn", "btn-outline-primary");
    label.setAttribute("for", "checkbox-" + szuroTipus + "-" + szuroAdat);
    label.textContent = szuroAdat;
    
    div.appendChild(checkbox);
    div.appendChild(label);
    
    if (document.getElementById("kivalasztott-" + szuroTipus + "-" + szuroAdat)) {
        checkbox.checked = true;
    }
    
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            checkboxHozzaadSzureshez(szuroAdat, szuroTipus);
        } else {
            eltavolitKivalasztottSzurot(szuroAdat, szuroTipus);
        }
        
        if (szuroTipus === "alapanyag") {
            alapanyagNelkulListajanakGeneralasa();
        } else if (szuroTipus === "alapanyagNelkul") {
            alapanyagListajanakGeneralasa();
        }
    });
    
    return div;
}

function szuroBeallit(szuroTipus) {
    let keresomezo = document.getElementById(szuroTipus + "Kereses");
    let dropdownLista = document.getElementById(szuroTipus + "Lista");
    

    keresomezo.addEventListener("input", function() {
        let keresesiKifejezes = keresomezo.value.toLowerCase();
        let dropdownMenu = document.getElementById(szuroTipus + "Lista");
        
        if (keresesiKifejezes) {
            switch (szuroTipus) {
                case "kategoriak":
                    kategoriakListajanakGeneralasa();
                    break;
                case "alapanyag":
                    alapanyagListajanakGeneralasa();
                    break;
                case "alapanyagNelkul":
                    alapanyagNelkulListajanakGeneralasa();
                    break;
                case "etrend":
                    etrendListajanakGeneralasa();
                    break;
                case "konyha":
                    konyhaListajanakGeneralasa();
                    break;
            }
            
            checkboxKereses(keresesiKifejezes, szuroTipus);
            dropdownMenu.style.display = "block";
        } else {
            dropdownMenu.style.display = "none";
        }
    });
    
    // Dropdown megjelenítése
    keresomezo.addEventListener("focus", function() {
        let keresesiKifejezes = keresomezo.value.toLowerCase();
        if (keresesiKifejezes) {
            document.getElementById(szuroTipus + "Lista").style.display = "block";
        }
    });
    
    // Dropdown eltűnése
    document.addEventListener("click", function(event) {
        if (!keresomezo.contains(event.target) && !dropdownLista.contains(event.target)) {
            dropdownLista.style.display = "none";
        }
    });
}

function checkboxKereses(keresesiKifejezes, szuroTipus) {
    let listaElemei = document.querySelectorAll("#" + szuroTipus + "Lista .dropdown-item");
    let talalatVan = false;
    
    for (let elem of listaElemei) {
        let szoveg = elem.textContent.toLowerCase();
        if (szoveg.includes(keresesiKifejezes)) {
            elem.style.display = "block";
            talalatVan = true;
        } else {
            elem.style.display = "none";
        }
    }
    
    // Nincs találat
    let dropdownMenu = document.getElementById(szuroTipus + "Lista");
    let nincsTalalatElem = document.getElementById("nincsTalalt" + szuroTipus);
    
    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalt" + szuroTipus;
            nincsTalalatElem.textContent = "Nincs találat";
            nincsTalalatElem.style.color = "red";
            nincsTalalatElem.style.textAlign = "center";
            dropdownMenu.appendChild(nincsTalalatElem);
        }
        nincsTalalatElem.style.display = "block";
    } else if (nincsTalalatElem) {
        nincsTalalatElem.style.display = "none";
    }
}


function checkboxHozzaadSzureshez(szuroAdat, szuroTipus) {
    let kivalasztottId = "kivalasztott-" + szuroTipus + "-" + szuroAdat;
    
    if (!document.getElementById(kivalasztottId)) {
        let checkboxKiir;
        
        switch (szuroTipus) {
            case "kategoriak":
                checkboxKiir = document.getElementById("kivalasztottKategoriak");
                break;
            case "alapanyag":
                checkboxKiir = document.getElementById("kivalasztottAlapanyagok");
                break;
            case "alapanyagNelkul":
                checkboxKiir = document.getElementById("kivalasztottAlapanyagNelkul");
                break;
            case "etrend":
                checkboxKiir = document.getElementById("kivalasztottEtrend");
                break;
            case "konyha":
                checkboxKiir = document.getElementById("kivalasztottKonyha");
                break;
        }
        
        let div = document.createElement("div");
        div.classList.add("kivalasztott-div", "badge", "bg-primary", "me-2", "mb-2");
        div.id = kivalasztottId;
        div.textContent = szuroAdat;
        
        let btnTorles = document.createElement("button");
        btnTorles.type = "button";
        btnTorles.classList.add("btn-close", "btn-close-white", "ms-2");
        btnTorles.setAttribute("aria-label", "Törlés");
        
        btnTorles.addEventListener("click", function() {
            eltavolitKivalasztottSzurot(szuroAdat, szuroTipus);
            
            let checkbox = document.getElementById("checkbox-" + szuroTipus + "-" + szuroAdat);
            if (checkbox) {
                checkbox.checked = false;
            }
        });
        
        div.appendChild(btnTorles);
        
        if (checkboxKiir) {
            checkboxKiir.appendChild(div);
        }
    }
}

function eltavolitKivalasztottSzurot(szuroAdat, szuroTipus) {
    let div = document.getElementById("kivalasztott-" + szuroTipus + "-" + szuroAdat);
    
    if (div) {
        div.remove();
    }
    
    if (szuroTipus === "alapanyag") {
        alapanyagNelkulListajanakGeneralasa();
    } else if (szuroTipus === "alapanyagNelkul") {
        alapanyagListajanakGeneralasa();
    }
}

function inicializalSzurok() {
    szuroBeallit("kategoriak");
    szuroBeallit("alapanyag");
    szuroBeallit("alapanyagNelkul");
    szuroBeallit("etrend");
    szuroBeallit("konyha");
}

function receptKereses() {
    let KeresesButton = document.getElementById("button_kereses");
    if (KeresesButton) {
        KeresesButton.addEventListener("click", receptekSzuro);
    }
}



function szurokLenullazasa() {
    document.getElementById("text_kereses").value= "";
    
    document.getElementById("kivalasztottKategoriak").innerHTML = "";
    document.getElementById("kivalasztottAlapanyagok").innerHTML = "";
    document.getElementById("kivalasztottAlapanyagNelkul").innerHTML = "";
    document.getElementById("kivalasztottEtrend").innerHTML = "";
    document.getElementById("kivalasztottKonyha").innerHTML = "";
    
    let checkboxes = document.querySelectorAll(".btn-check");
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
    }
    
    document.getElementById("arInput").value = 0;
    document.getElementById("arKiir").innerHTML = "Mind";

    document.getElementById("idoInput").value = 0;
    document.getElementById("idoKiir").innerHTML = "Mind";

    document.getElementById("kaloriaInput").value = 0;
    document.getElementById("kaloriaKiir").innerHTML = "Mind";


    document.getElementById("nehezsegInput").value = 0;
    document.getElementById("nehezsegKiir").innerHTML = "Mind";
    
    
    document.getElementById("kategoriakKereses").value = "";
    document.getElementById("alapanyagKereses").value = "";
    document.getElementById("alapanyagNelkulKereses").value = "";
    document.getElementById("etrendKereses").value = "";
    document.getElementById("konyhaKereses").value = "";
    
    receptekSzuro();
}


async function inditas(){
    await felhasznaloIdLeker();
    await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
    arFigyel();
    idoFigyel();
    kaloriaFigyel();
    nehezsegFigyel();
    etrendListaLeker();
    konyhaListaLeker();
    alapanyagListaLeker();
    kategoriakListaLeker();
    receptekSzuro();
}


document.addEventListener("DOMContentLoaded", function() {
    receptKereses();
    inicializalSzurok();
});


window.addEventListener("load", inditas());


document.getElementById("btnSzures").addEventListener("click", receptekSzuro);
document.getElementById("btnNullazas").addEventListener("click", szurokLenullazasa);
document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);