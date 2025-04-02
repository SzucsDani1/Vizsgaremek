import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
import {jogosultsagLeker} from "../javascriptFuggvenyek/adminFelulet.js";

let kategoriaSzamlalo = 0;
let etelfajtak = new Set();
let etrendek = new Set();

let konyhak = new Set();
let alapanyagok = new Set();

const kivalasztottEtrendek = new Set();


let felhasznaloId;

function receptFeltolto(hozzavaloNeve, hozzavaloMertekegyseg, hozzavaloMennyiseg, divTablazat, kategoriaInput) {
    document.getElementById("figyelmezteto_uzenet").hidden = true;
    
    if (hozzavaloMennyiseg.value === "" || hozzavaloMertekegyseg.value === "" || hozzavaloNeve.value === "") {
        document.getElementById("figyelmezteto_uzenet").innerHTML = "Kérem töltsön ki minden mezőt!";
        document.getElementById("figyelmezteto_uzenet").hidden = false;
        return;
    }
    
    let table, tbody, sorSzamlal;
    
    if (divTablazat) {
        table = divTablazat.querySelector("table");
        if (!table) {
            table = document.createElement("table");
            table.classList = "table table";
            
            // Táblázat fejlécének összeállítása
            const thead = document.createElement("thead");
            const trThead = document.createElement("tr");
            const headerTexts = ["#", "Név", "Mennyiség", "Mértékegység", "Kategória" , ""];
            for (const text of headerTexts) {
                const th = document.createElement("th");
                th.scope = "col";
                th.innerHTML = text;
                trThead.appendChild(th);
            }
            thead.appendChild(trThead);
            table.appendChild(thead);
            
            tbody = document.createElement("tbody");
            table.appendChild(tbody);
            
            table.dataset.sorSzamlal = "1";
            divTablazat.appendChild(table);
        } else {
            tbody = table.querySelector("tbody");
        }
        sorSzamlal = parseInt(table.dataset.sorSzamlal, 10);
    } else {
        table = document.getElementById("table_hozzavalok");
        tbody = document.getElementById("tbody_hozzavalok");
        table.hidden = false;

        if (!table.dataset.sorSzamlal) {
            table.dataset.sorSzamlal = "1";
        }
        sorSzamlal = parseInt(table.dataset.sorSzamlal, 10);
    }
    
    // Új sor létrehozása a táblázathoz
    const trTbody = document.createElement("tr");
    
    const tdSzamlalo = document.createElement("td");
    tdSzamlalo.classList.add("szamlalo");
    tdSzamlalo.innerHTML = sorSzamlal;
    
    const tdHozzvaloNeve = document.createElement("td");
    tdHozzvaloNeve.innerHTML = hozzavaloNeve.value;
    
    const tdHozzvaloMennyiseg = document.createElement("td");
    tdHozzvaloMennyiseg.innerHTML = hozzavaloMennyiseg.value;
    
    const tdHozzvaloMertekegyseg = document.createElement("td");
    tdHozzvaloMertekegyseg.innerHTML = hozzavaloMertekegyseg.value;
    
    const tdKategoriaNev = document.createElement("td");
    tdKategoriaNev.innerHTML = kategoriaInput;
    
    // Törlés gomb
    const tdTorles = document.createElement("td");
    const tdTorlesGomb = document.createElement("button");
    tdTorlesGomb.type = "button";
    tdTorlesGomb.classList = "btn btn-danger btn-sm";
    tdTorlesGomb.innerHTML = "Törlés";

    tdTorlesGomb.addEventListener("click", function () {
        trTbody.remove();
        cellaUjraSzamlal(table);
        if (tbody.children.length === 0) {
            table.hidden = true;
        }
    });

    tdTorles.appendChild(tdTorlesGomb);
    
    trTbody.appendChild(tdSzamlalo);
    trTbody.appendChild(tdHozzvaloNeve);
    trTbody.appendChild(tdHozzvaloMennyiseg);
    trTbody.appendChild(tdHozzvaloMertekegyseg);
    trTbody.appendChild(tdKategoriaNev);
    trTbody.appendChild(tdTorles);
    
    tbody.appendChild(trTbody);
    
    sorSzamlal++;
    table.dataset.sorSzamlal = sorSzamlal;
    
    hozzavaloNeve.value = "";
    hozzavaloMennyiseg.value = "";
    hozzavaloMertekegyseg.value = "";
}

function cellaUjraSzamlal(table) {
    const tbody = table.querySelector("tbody");
    let index = 1;
    for (const row of tbody.children) {
        const cell = row.querySelector(".szamlalo");
        cell.innerHTML = index;
        index++;
    }
    table.dataset.sorSzamlal = index;
}

function kategoriaHozzaadasa() {
    const kategoriakKiir = document.getElementById("hozzavaloKategoriak");
    const divTablazat = document.createElement("div"); 

    // Figyelmeztető elem
    const divFigyelmeztet = document.createElement("div");
    divFigyelmeztet.classList = "alert alert-danger";
    divFigyelmeztet.role = "alert";
    divFigyelmeztet.innerHTML = "Kérem adjon nevet a Kategóriának!";
    divFigyelmeztet.hidden = true;
    divFigyelmeztet.id = "kategoriaFigyelmeztet" + kategoriaSzamlalo;

    // Filterbox létrehozása
    const divFilterBox = document.createElement("div");
    divFilterBox.classList = "filter-box border p-3 bg-light rounded my-3";

    // Törlés gomb
    const btnTorlesKategoria = document.createElement("button");
    btnTorlesKategoria.type = "button";
    btnTorlesKategoria.classList = "btn btn-danger btn-sm mb-3";
    btnTorlesKategoria.innerHTML = "X";
    btnTorlesKategoria.addEventListener("click", function () {
        divFilterBox.remove();
        divFigyelmeztet.remove();
    });

    // Cím
    const h4 = document.createElement("h4");
    h4.classList = "display-6 text-start";
    h4.innerHTML = "Kategória";

    const divRow = document.createElement("div");
    divRow.classList = "row";
    
    const divCols = document.createElement("div");
    divCols.classList = "col-12 col-lg-12 col-md-12 col-sm-12 mb-3";

    const form = document.createElement("form");
    form.classList = "form-floating";

    const input = document.createElement("input");
    input.type = "text";
    input.classList = "form-control";
    input.id = "hozzavalokKategoriaInput" + kategoriaSzamlalo;
    input.placeholder = "Kategória neve";

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.innerHTML = "Kategória neve";

    const btn_hozzaad = document.createElement("button");
    btn_hozzaad.type = "button";
    btn_hozzaad.classList = "btn btn-primary w-50 mx-auto";
    btn_hozzaad.innerHTML = "Hozzáad";
    
    // Az új kategória elejére tesszük a lista elemeit
    kategoriakKiir.prepend(divTablazat);
    kategoriakKiir.prepend(divFigyelmeztet);
    kategoriakKiir.prepend(divFilterBox);

    divFilterBox.appendChild(btnTorlesKategoria);
    divFilterBox.appendChild(h4);
    divFilterBox.appendChild(divRow);
    divRow.appendChild(divCols);
    divRow.appendChild(btn_hozzaad);
    divCols.appendChild(form);
    form.appendChild(input);
    form.appendChild(label);

    kategoriaSzamlalo++;

    btn_hozzaad.addEventListener("click", function () {
        hozzavaloHozzaadasa(divFilterBox, input.value, divFigyelmeztet, divTablazat);
    });
}

function hozzavaloHozzaadasa(divFilterBox, kategoriaInput, divFigyelmeztet, divTablazat) {
    if (kategoriaInput == "") {
        divFigyelmeztet.hidden = false;
        return;
    }
    divFigyelmeztet.hidden = true;
    divFilterBox.innerHTML = "";

    const btnTorlesHozzavalo = document.createElement("button");
    btnTorlesHozzavalo.type = "button";
    btnTorlesHozzavalo.classList = "btn btn-danger btn-sm mb-3";
    btnTorlesHozzavalo.innerHTML = "X";
    btnTorlesHozzavalo.addEventListener("click", function () {
        divFilterBox.remove();
        divTablazat.remove();
    });
    divFilterBox.appendChild(btnTorlesHozzavalo);

    const h4 = document.createElement("h4");
    h4.classList = "display-6 text-start";
    h4.innerHTML = kategoriaInput + " hozzávaló(i)";

    const divRow = document.createElement("div");
    divRow.classList = "row";

    const divColNev = document.createElement("div");
    divColNev.classList = "col-12 col-lg-4 col-md-12 col-sm-12 mb-3";

    const formNev = document.createElement("form");
    formNev.classList = "form-floating";
    
    const hozzavaloNeve = document.createElement("input");
    hozzavaloNeve.type = "text";
    hozzavaloNeve.classList = "form-control";
    hozzavaloNeve.placeholder = "Hozzávaló";
    const labelNev = document.createElement("label");
    labelNev.innerHTML = "Hozzávaló neve";

    const divColMennyiseg = document.createElement("div");
    divColMennyiseg.classList = "col-12 col-lg-4 col-md-12 col-sm-12 mb-3";

    const formMennyiseg = document.createElement("form");
    formMennyiseg.classList = "form-floating";

    const hozzavaloMennyiseg = document.createElement("input");
    hozzavaloMennyiseg.type = "text";
    hozzavaloMennyiseg.classList = "form-control";
    hozzavaloMennyiseg.placeholder = "Hozzávaló mennyiség";

    const labelMennyiseg = document.createElement("label");
    labelMennyiseg.innerHTML = "Hozzávaló mennyiség";

    const divColMertekegyseg = document.createElement("div");
    divColMertekegyseg.classList = "col-12 col-lg-4 col-md-12 col-sm-12 mb-3";

    const formMertekegyseg = document.createElement("form");
    formMertekegyseg.classList = "form-floating";

    const hozzavaloMertekegyseg = document.createElement("input");
    hozzavaloMertekegyseg.type = "text";
    hozzavaloMertekegyseg.classList = "form-control";
    hozzavaloMertekegyseg.placeholder = "Hozzávaló mértékegység";

    const labelMertekegyseg = document.createElement("label");
    labelMertekegyseg.innerHTML = "Hozzávaló mértékegysége";

    const btnHozzaad = document.createElement("button");
    btnHozzaad.type = "button";
    btnHozzaad.classList = "btn btn-success w-50 mx-auto";
    btnHozzaad.innerHTML = "Hozzáad";

    divFilterBox.appendChild(h4);
    divFilterBox.appendChild(divRow);

    divRow.appendChild(divColNev);
    divColNev.appendChild(formNev);
    formNev.appendChild(hozzavaloNeve);
    formNev.appendChild(labelNev);

    divRow.appendChild(divColMennyiseg);
    divColMennyiseg.appendChild(formMennyiseg);
    formMennyiseg.appendChild(hozzavaloMennyiseg);
    formMennyiseg.appendChild(labelMennyiseg);

    divRow.appendChild(divColMertekegyseg);
    divColMertekegyseg.appendChild(formMertekegyseg);
    formMertekegyseg.appendChild(hozzavaloMertekegyseg);
    formMertekegyseg.appendChild(labelMertekegyseg);

    divRow.appendChild(btnHozzaad);

    btnHozzaad.addEventListener("click", function () {
        receptFeltolto(hozzavaloNeve, hozzavaloMertekegyseg, hozzavaloMennyiseg, divTablazat, kategoriaInput);
    });
}

async function etelfajtakLista(){
    try{
        let eredmeny = await fetch("./adatbazisInterakciok/etelfajta");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            for(const etelfajta of lista){
                etelfajtak.add(etelfajta);
            }
            let select = document.getElementById("etelfajtaSearch");
            optionGeneral(etelfajtak, select);
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}

async function etrendLista(){
    try{
        let eredmeny = await fetch("./adatbazisInterakciok/etrend");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            for(const etrend of lista){
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

async function konyhaLista(){
    try{
        let eredmeny = await fetch("./adatbazisInterakciok/konyha");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            for(const konyha of lista){
                konyhak.add(konyha);
            }
            let select = document.getElementById("konyhaSearch");
            optionGeneral(konyhak, select);
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}

async function alapanyagLista(){
    try{
        let eredmeny = await fetch("./adatbazisInterakciok/alapanyag");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            for(const alapanyag of lista){
                alapanyagok.add(alapanyag.hozzavalo);
            }
            console.log(alapanyagok);
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}


function etrendListajanakGeneralasa() {
    let listaElem = document.getElementById("etrendLista");
    listaElem.innerHTML = "";
    for (let etrend of etrendek) {
        let elem = letrehozEtrendListaElemet(etrend);
        listaElem.appendChild(elem);
    }
}


function beallitEtrendet(){
    keresesMukodtetSzurobenEtrend();
    elrejtAdatotKeresesiTalalatokKattintasra();
}


function letrehozEtrendListaElemet(szuroAdatok) {
    let div = document.createElement("div");
    div.classList.add("dropdown-item");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("btn-check");
    checkbox.id = "checkbox-" + szuroAdatok;
    
    let label = document.createElement("label");
    label.classList.add("btn", "btn-outline-danger");
    label.setAttribute("for", "checkbox-" + szuroAdatok);
    label.textContent = szuroAdatok;
    
    div.appendChild(checkbox);
    div.appendChild(label);
    
    if (document.getElementById("kivalasztott-" + szuroAdatok)) {
        checkbox.checked = true;
    }
    
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            kivalasztottEtrendek.add(szuroAdatok);
            
            hozzaadKivalasztottEtrendet(szuroAdatok);
        } else {
            kivalasztottEtrendek.delete(szuroAdatok);
            eltavolitKivalasztottAdatot(szuroAdatok);
        }
    });
    
    return div;
}


function keresesMukodtetSzurobenEtrend() {
    let keresomezo = document.getElementById("etrendSearch");
    keresomezo.addEventListener("input", function() {
        inditsKeresestSzurobenEtrend(keresomezo);
    });
    keresomezo.addEventListener("focus", function() {
        inditsKeresestSzurobenEtrend(keresomezo);
    });
}



function inditsKeresestSzurobenEtrend(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("etrendLista");

    if (keresesiKifejezes) {
        etrendListajanakGeneralasa();
        szuresiFunkcioEtrendek(keresesiKifejezes);
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}




function szuresiFunkcioEtrendek(keresesiKifejezes) {
    let listaElemei = document.querySelectorAll("#etrendLista .dropdown-item");
    let talalatVan = false;

    for (let elem of listaElemei) {
        let etrendSzoveg = elem.textContent.toLowerCase();
        if (etrendSzoveg.includes(keresesiKifejezes)) {
            elem.style.display = "block";
            talalatVan = true;
        } else {
            elem.style.display = "none";
        }
    }

    let dropdownMenu = document.getElementById("etrendLista");
    let nincsTalalatElem = document.getElementById("nincsTalalatEtrend");

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalatEtrend";
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



function hozzaadKivalasztottEtrendet(szuroAdatok) {
    if (!document.getElementById("kivalasztott-" + szuroAdatok)) {
        let kivalasztottContainerEtrend = document.getElementById("kivalasztottEtrend");

        let tag = document.createElement("div");
        tag.classList.add("kivalasztott-tag", "badge", "bg-danger", "me-2", "mb-2");
        tag.id = "kivalasztott-" + szuroAdatok;
        tag.textContent = szuroAdatok;

        let removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("btn-close", "btn-close-white", "ms-2");
        removeBtn.setAttribute("aria-label", "Törlés");
        removeBtn.addEventListener("click", function () {
            eltavolitKivalasztottAdatot(szuroAdatok);
            kivalasztottEtrendek.delete(szuroAdatok);
            document.getElementById("checkbox-" + szuroAdatok).checked = false;
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerEtrend.appendChild(tag);
    }
}



function elrejtAdatotKeresesiTalalatokKattintasra() {
    let etrendKeresomezo = document.getElementById("etrendSearch");
    let etrendDropdown = document.getElementById("etrendLista");


    document.addEventListener("click", function(event) {
        if (!etrendKeresomezo.contains(event.target) && !etrendDropdown.contains(event.target)) {
            etrendDropdown.style.display = "none";
        }
    });
}

function eltavolitKivalasztottAdatot(szuroAdatok) {
    let tag = document.getElementById("kivalasztott-" + szuroAdatok);
    if (tag) {
        tag.remove();
    }
}


function optionGeneral(lista, select){
    for(let elem of lista){
        let option = document.createElement("option");
        option.innerHTML = elem.neve;
        option.dataset.tokens = elem.neve;
        option.value = elem.id;

        select.appendChild(option);
    }
}

function arFigyel() {
    const range = document.getElementById("arInput");
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
            arKiir.innerHTML = "OLCSÓ";
        } else if (range.value == 1) {
            arKiir.innerHTML = "ÁTLAGOS";
        }
         else {
            arKiir.innerHTML = "DRÁGA";
        }
    }
}


function nehezsegFigyel() {
    const range = document.getElementById("nehezsegInput");
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
            nehezsegKiir.innerHTML = "KÖNNYÜ";
        }else if (range.value == 1) {
            nehezsegKiir.innerHTML = "KÖZEPES";
        } else {
            nehezsegKiir.innerHTML = "NEHÉZ";
        }
    }
}


function idoFigyel() {
    const range = document.getElementById("idoInput");
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


function adagFigyel() {
    const range = document.getElementById("adagInput");
    let adagKiir = document.getElementById("adagKiir");

    range.addEventListener("input", frissitAdag);
    range.addEventListener("mousedown", function() { 
        frissitAdag(); 
        range.addEventListener("mousemove", frissitAdag); 
    });
    range.addEventListener("mouseup", function() { 
        range.removeEventListener("mousemove", frissitAdag); 
    });

    function frissitAdag() {
        if (range.value == 1) {
            adagKiir.innerHTML = "1 adag";
        } else if (range.value == 2) {
            adagKiir.innerHTML = "2 adag";
        }else if (range.value == 3) {
            adagKiir.innerHTML = "3 adag";
        } else if (range.value == 4) {
            adagKiir.innerHTML = "4 adag";
        }
        else if (range.value == 5) {
            adagKiir.innerHTML = "5 adag";
        }
        else if (range.value == 6) {
            adagKiir.innerHTML = "6 adag";
        }else if (range.value == 7) {
            adagKiir.innerHTML = "7 adag";
        }
        else if (range.value == 8) {
            adagKiir.innerHTML = "8 adag";
        }
        else if (range.value == 9) {
            adagKiir.innerHTML = "9 adag";
        }
        else {
            adagKiir.innerHTML = "10 adag";
        }
    }
}


function mindenKiVanEToltve() {
 
    let hibaUzenetKiir = document.getElementById("hibaUzenet");
    hibaUzenetKiir.innerHTML = "";

    let divFigyelmeztet = document.createElement("div");
    divFigyelmeztet.classList = "alert alert-danger";
    divFigyelmeztet.role = "alert";
    divFigyelmeztet.id = "kategoriaFigyelmeztet" + kategoriaSzamlalo;


    


    // Recept név ellenőrzése
    let receptNev = document.getElementById("receptNev").value;

    hibaUzenetKiir.appendChild(divFigyelmeztet);
    if (!receptNev || receptNev.trim() === "") {
        divFigyelmeztet.innerHTML ="Kérem adja meg a recept nevét!";
        return ;
    }
    
    // Gyereknek megfelelő e
    let gyerekek = document.getElementById("gyerekmenuE").checked
    
    //Hozzávalók ellenőrzése
    let table_hozzavalok = document.getElementById("table_hozzavalok");
    let hozzavaloKategoriak = document.getElementById("hozzavaloKategoriak");
    let vanHozzavalo = false;
   
    if (table_hozzavalok && table_hozzavalok.hidden === false && table_hozzavalok.querySelector("tbody") && table_hozzavalok.querySelector("tbody").children.length > 0) {
        vanHozzavalo = true;
    }
    
    let tables = hozzavaloKategoriak.querySelectorAll("table");

    if (hozzavaloKategoriak) {
       
        for (let table of tables) {
            
            if (table && table.querySelector("tbody") && table.querySelector("tbody").children.length > 0) {
                vanHozzavalo = true;
                break;
            }
        }
    }
    
   

    if (!vanHozzavalo) {
        divFigyelmeztet.innerHTML ="Kérem, adjon hozzá legalább egy hozzávalót!";
        return ;
    }

    //hozzavalok kivalogat 
    let kuldHozzavalok = []
    
    for (const table of tables) {

        let sorok = table.querySelector("tbody").querySelectorAll("tr")
        
        for (const adatok of sorok) {
            let soradatok = []
            const cellak = adatok.querySelectorAll("td")
            for (const cellakAdat of cellak) {
                if(cellakAdat != "th"){
                    soradatok.push(cellakAdat.textContent.trim())
                }
            }
            let feltotendo = {
                kategoria: soradatok[4] || "", 
                hozzavNev: soradatok[1] || "",
                hozzavMenny: soradatok[2] || "",
                hozzavMertek: soradatok[3] || ""
            };            
            
            kuldHozzavalok.push(feltotendo)
        }
        
      
        
    }
    

    //etelfajta
    let etelfajtaKereso = document.getElementById("etelfajtaSearch").value;
    
    //napszak
    let napszak = document.getElementById("napszak").value;
    
    console.log(kivalasztottEtrendek)

    //etrend
    if (kivalasztottEtrendek.size === 0) {
        divFigyelmeztet.innerHTML ="Kérem, válasszon ki legalább egy étrendet!";
        return ;
    }
    
   
    //konyha
    let konyhaKereso = document.getElementById("konyhaSearch").value;
   
    //nehezseg
    let nehezseg = document.getElementById("nehezsegKiir").innerHTML;
    

    //ar
    let ar = document.getElementById("arKiir").innerHTML;

    //adag
    let adag = document.getElementById("adagInput").value;

    //ido
    let ido = document.getElementById("idoInput").value;

    
    let kaloriaInput = document.getElementById("kaloriaInput");
    if (kaloriaInput.value == "") {
        divFigyelmeztet.innerHTML ="Kérem, válasszon kalóriát!";
        return ;
    }
    
    
    let receptLeiras = document.getElementById("receptLeiras");
    if (!receptLeiras.value || receptLeiras.value.trim() === "") {
        divFigyelmeztet.innerHTML ="Kérem, írja le a recept leírását!";
        return ;
    }

    console.log(Array.from(kivalasztottEtrendek))
    
    //kep
    
    let  kepInput = document.getElementById("fileInput")
    if (!kepInput.files.length) {
        divFigyelmeztet.innerHTML ="Kérem, adjon meg képet a recepthez!";
        return;
    }
    let file = kepInput.files[0]
    let adatForm = new FormData()

    adatForm.append("image", file)
    receptFeltoltes(receptNev, gyerekek,kuldHozzavalok,etelfajtaKereso, napszak, Array.from(kivalasztottEtrendek), konyhaKereso, nehezseg, ar, adag, ido, kaloriaInput.value,receptLeiras.value, adatForm);
}




function ujReceptKep(){
    const fileInput = document.getElementById('fileInput');
    const receptKep = document.getElementById('receptPicture');
    const removeButton = document.getElementById('removeButton');
    
    
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            receptKep.innerHTML = `<img src="${e.target.result}" alt="Kép">`;
        }
        reader.readAsDataURL(file);
        removeButton.style.display = 'block';
       
    }
   
    
    removeButton.addEventListener('click', function() {
        if(receptKep != ""){
            receptKep.innerHTML = `<img src="${receptKep}" alt="Profilkép">`
        }
        else{
            receptKep.innerHTML = 'Nincs profilkép';
        }    
        fileInput.value = "";
        removeButton.style.display = 'none';
    });
    
}






async function modositasiJavaslat(){
    try {
        let divAccordion = document.getElementById("modositasiJavaslatAccordion");
        let modositasiJavaslatLeker = await fetch("./adatbazisInterakciok/modositasijavaslatleker",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "felhasznalo_id" : felhasznaloId
            })
        })
        let modositasiJavaslatValasz = await modositasiJavaslatLeker.json();
        if(modositasiJavaslatValasz.valasz == "Nincs találat!"){
            return;
        }
        else if(modositasiJavaslatLeker.ok){
            divAccordion.hidden = false;
            accordionGeneral(divAccordion, modositasiJavaslatValasz);
        }
    } catch (error) {
        
    }
}


function accordionGeneral(divAccordion, receptek) {
    divAccordion.innerHTML = "";
    for (let recept of receptek) {
        let divAccordionItem = document.createElement("div");
        divAccordionItem.classList = "accordion-item";
        
        // Törlés gomb létrehozása
        let btnTorles = document.createElement("button");
        btnTorles.type = "accordion-button";
        btnTorles.classList.add("btn", "btn-danger", "mt-3", "btn-sm","w-100");
        btnTorles.innerHTML = "Törlés";
        btnTorles.addEventListener("click", function() {
            divAccordionItem.remove();
        });

        let h2AccordionHeader = document.createElement("h2");
        h2AccordionHeader.classList = "accordion-header";
        h2AccordionHeader.id = "panelLenyitvaHeading-"+recept.neve+"-"+recept.id;
        h2AccordionHeader.style.display = "flex";
        h2AccordionHeader.style.alignItems = "center";

        let btnLenyit = document.createElement("button");
        btnLenyit.classList = "accordion-button";
        btnLenyit.style.flexGrow = "1";
        btnLenyit.type = "button";
        btnLenyit.setAttribute("data-bs-toggle", "collapse");
        btnLenyit.setAttribute("data-bs-target", "#panelLenyitva-"+recept.neve+"-"+recept.id);
        btnLenyit.setAttribute("aria-expanded", "true");
        btnLenyit.setAttribute("aria-controls", "panelLenyitva-"+recept.neve+"-"+recept.id);
        btnLenyit.innerHTML = "Módosítási javaslat: "+" "+recept.neve;

        let divPanelLenyitva = document.createElement("div");
        divPanelLenyitva.id = "panelLenyitva-"+recept.neve+"-"+recept.id;
        divPanelLenyitva.classList = "accordion-collapse collapse show";
        divPanelLenyitva.setAttribute("aria-labelledby", "panelLenyitvaHeading-"+recept.neve+"-"+recept.id);

        let divAccordionBody = document.createElement("div");
        divAccordionBody.classList = "accordion-body";

        let divModositJavaslat = document.createElement("div");
        divModositJavaslat.innerHTML = "<b>Módosítási javaslat:</b> "+recept.modositas_jav;

        // Elemek összeépítése
        h2AccordionHeader.appendChild(btnLenyit);
        
        divAccordionItem.appendChild(h2AccordionHeader);
        divAccordionItem.appendChild(divPanelLenyitva);
        divPanelLenyitva.appendChild(divAccordionBody);
        divAccordionBody.appendChild(divModositJavaslat);
        divAccordionBody.appendChild(btnTorles);

        divAccordion.appendChild(divAccordionItem);
    }
}




  

document.getElementById("hozzaadKategoriaGomb").addEventListener("click", kategoriaHozzaadasa);

document.getElementById("btnReceptFeltoltes").addEventListener("click", mindenKiVanEToltve);

document.getElementById('fileInput').addEventListener("change", ujReceptKep)

document.addEventListener("DOMContentLoaded",function(){
    beallitEtrendet();
})









async function receptFeltoltes(receptNev, gyereke,hozzavalok,etelfajta, napszak, etrendek, konyha, nehezseg, ar, adag, ido, kaloria,leiras, kep)
{
    let eredmeny = await fetch("./adatbazisInterakciok/feltoltRecept", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "receptNev" : receptNev,
            "gyereke" : gyereke,
            "hozzavalok" : hozzavalok,
            "etelfajta" : etelfajta,
            "napszak" : napszak,
            "etrendek" : etrendek,
            "konyha" : konyha,
            "nehezseg" : nehezseg,
            "ar" : ar,
            "adag" : adag,
            "ido" : ido,
            "kaloria" : kaloria,
            "leiras" : leiras,
            "felhasznaloId" : felhasznaloId
           
        })
    });

   
    if(eredmeny.ok){
        let data = await eredmeny.json();
        console.log(data)
        console.log(data.id)
        kep.append("ujReceptID", data.id)
        console.log(kep)
        // sikeres feltöltés esetén
        let kepFeltolt = await fetch("./adatbazisInterakciok/kepfeltolt",{
            method : "POST",
            body : kep
        })
        location.reload(true);
    }
}

async function felhasznaloIdLeker() {
    await fetch('../adatbazisInterakciok/sessionLekerFelhasznaloId')  // Fetch the PHP script
    .then(response => response.text())  // Get the response as text
    .then(id => {
    if (id) {
        felhasznaloId = id;
    } 
    })
    .catch(error => console.error('Error fetching session data:', error));

   
     
}

async function kijelentkezesLeker(){
    console.log("asd")
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
   
    await jogosultsagLeker(felhasznaloId, document.getElementById("navbarUl"));

    etelfajtakLista();
    etrendLista();
    konyhaLista();
    alapanyagLista();
    nehezsegFigyel();
    arFigyel();
    adagFigyel();
    modositasiJavaslat();
})

document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);