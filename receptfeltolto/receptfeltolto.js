let kategoriaSzamlalo = 0;
let etelfajtak = new Set();
let etrendek = new Set();
let konyhak = new Set();
let alapanyagok = new Set();
let feltoltottKepek = [];

let kivalasztottEtelfajtak = new Set();
let kivalasztottEtrendek = new Set();
let kivalasztottKonyhak = new Set();
let kivalasztottAlapanyagok = new Set();

async function receptFeltoltes(){
    let eredmeny = await fetch("./receptFeltolt", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "neve" : document.getElementById("receptNev").value,

        })
    });
    if(eredmeny.ok){
        // sikeres feltöltés esetén
    }
}
document.getElementById("receptFeltoltes").addEventListener("click", receptFeltoltes);

function receptFeltolto(inputNev, inputMertekegyseg, inputMennyiseg, divTablazat) {
    document.getElementById("figyelmezteto_uzenet").hidden = true;
    
    if (inputMennyiseg.value === "" || inputMertekegyseg.value === "" || inputNev.value === "") {
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
            const headerTexts = ["#", "Név", "Mennyiség", "Mértékegység", ""];
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
    tdHozzvaloNeve.innerHTML = inputNev.value;
    
    const tdHozzvaloMennyiseg = document.createElement("td");
    tdHozzvaloMennyiseg.innerHTML = inputMennyiseg.value;
    
    const tdHozzvaloMertekegyseg = document.createElement("td");
    tdHozzvaloMertekegyseg.innerHTML = inputMertekegyseg.value;
    
    // Törlés gomb cella
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
    trTbody.appendChild(tdTorles);
    
    tbody.appendChild(trTbody);
    
    sorSzamlal++;
    table.dataset.sorSzamlal = sorSzamlal;
    
    inputNev.value = "";
    inputMennyiseg.value = "";
    inputMertekegyseg.value = "";
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
    
    const inputNev = document.createElement("input");
    inputNev.type = "text";
    inputNev.classList = "form-control";
    inputNev.placeholder = "Hozzávaló";
    const labelNev = document.createElement("label");
    labelNev.innerHTML = "Hozzávaló neve";

    const divColMennyiseg = document.createElement("div");
    divColMennyiseg.classList = "col-12 col-lg-4 col-md-12 col-sm-12 mb-3";

    const formMennyiseg = document.createElement("form");
    formMennyiseg.classList = "form-floating";

    const inputMennyiseg = document.createElement("input");
    inputMennyiseg.type = "text";
    inputMennyiseg.classList = "form-control";
    inputMennyiseg.placeholder = "Hozzávaló mennyiség";

    const labelMennyiseg = document.createElement("label");
    labelMennyiseg.innerHTML = "Hozzávaló mennyiség";

    const divColMertekegyseg = document.createElement("div");
    divColMertekegyseg.classList = "col-12 col-lg-4 col-md-12 col-sm-12 mb-3";

    const formMertekegyseg = document.createElement("form");
    formMertekegyseg.classList = "form-floating";

    const inputMertekegyseg = document.createElement("input");
    inputMertekegyseg.type = "text";
    inputMertekegyseg.classList = "form-control";
    inputMertekegyseg.placeholder = "Hozzávaló mértékegység";

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
    formNev.appendChild(inputNev);
    formNev.appendChild(labelNev);

    divRow.appendChild(divColMennyiseg);
    divColMennyiseg.appendChild(formMennyiseg);
    formMennyiseg.appendChild(inputMennyiseg);
    formMennyiseg.appendChild(labelMennyiseg);

    divRow.appendChild(divColMertekegyseg);
    divColMertekegyseg.appendChild(formMertekegyseg);
    formMertekegyseg.appendChild(inputMertekegyseg);
    formMertekegyseg.appendChild(labelMertekegyseg);

    divRow.appendChild(btnHozzaad);

    btnHozzaad.addEventListener("click", function () {
        receptFeltolto(inputNev, inputMertekegyseg, inputMennyiseg, divTablazat);
    });
}

async function etelfajtakLista(){
    try{
        let eredmeny = await fetch("./etelfajta");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            for(const etelfajta of lista){
                etelfajtak.add(etelfajta);
            }
            etelfajtaOptionGeneral()
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
        let eredmeny = await fetch("./etrend");
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
        let eredmeny = await fetch("./konyha");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            for(const konyha of lista){
                konyhak.add(konyha);
            }
            konyhaOptionGeneral()
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
        let eredmeny = await fetch("./alapanyag");
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

function alapanyagListajanakGeneralasa(){
    let listaElem = document.getElementById("alapanyagLista");
    listaElem.innerHTML = "";
    for (let alapanyag of alapanyagok) {
        let elem = letrehozAlapanyagListaElemet(alapanyag);
        listaElem.appendChild(elem);
    }
}


function inicializalasEtrendet(){
    keresesMukodtetSzurobenEtrend();
    elrejtAdatotKeresesiTalalatokKattintasra();
}



function inicializalasAlapanyagot(){
    keresesMukodtetSzurobenAlapanyag();
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


function letrehozAlapanyagListaElemet(szuroAdatok) {
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
            kivalasztottAlapanyagok.add(szuroAdatok);
            hozzaadKivalasztottAlapanyagot(szuroAdatok);
        } else {
            kivalasztottAlapanyagok.delete(szuroAdatok);
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


function keresesMukodtetSzurobenAlapanyag() {
    let keresomezo = document.getElementById("alapanyagSearch");
    keresomezo.addEventListener("input", function() {
        inditsKeresestSzurobenAlapanyag(keresomezo);
    });
    keresomezo.addEventListener("focus", function() {
        inditsKeresestSzurobenAlapanyag(keresomezo);
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



function inditsKeresestSzurobenAlapanyag(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("alapanyagLista");

    if (keresesiKifejezes) {
        alapanyagListajanakGeneralasa();
        szuresiFunkcioAlapanyagok(keresesiKifejezes);
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


function szuresiFunkcioAlapanyagok(keresesiKifejezes) {
    let listaElemei = document.querySelectorAll("#alapanyagLista .dropdown-item");
    let talalatVan = false;

    for (let elem of listaElemei) {
        let alapanyagSzoveg = elem.textContent.toLowerCase();
        if (alapanyagSzoveg.includes(keresesiKifejezes)) {
            elem.style.display = "block";
            talalatVan = true;
        } else {
            elem.style.display = "none";
        }
    }

    let dropdownMenu = document.getElementById("alapanyagLista");
    let nincsTalalatElem = document.getElementById("nincsTalalatAlapanyag");

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalatAlapanyag";
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


function hozzaadKivalasztottAlapanyagot(szuroAdatok) {
    if (!document.getElementById("kivalasztott-" + szuroAdatok)) {
        let kivalasztottContainerAlapanyag = document.getElementById("kivalasztottAlapanyagok");

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
            kivalasztottAlapanyagok.delete(szuroAdatok);
            document.getElementById("checkbox-" + szuroAdatok).checked = false;
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerAlapanyag.appendChild(tag);
    }
}

function elrejtAdatotKeresesiTalalatokKattintasra() {
    let etrendKeresomezo = document.getElementById("etrendSearch");
    let alapanyagKeresomezo = document.getElementById("alapanyagSearch");

    let etrendDropdown = document.getElementById("etrendLista");
    let alapanyagDropdown = document.getElementById("alapanyagLista");


    document.addEventListener("click", function(event) {
        if (!etrendKeresomezo.contains(event.target) && !etrendDropdown.contains(event.target)) {
            etrendDropdown.style.display = "none";
        }
    });


    document.addEventListener("click", function(event) {
        if (!alapanyagKeresomezo.contains(event.target) && !alapanyagDropdown.contains(event.target)) {
            alapanyagDropdown.style.display = "none";
        }
    });
}

function eltavolitKivalasztottAdatot(szuroAdatok) {
    let tag = document.getElementById("kivalasztott-" + szuroAdatok);
    if (tag) {
        tag.remove();
    }
}


function konyhaOptionGeneral(){
    let select = document.getElementById("konyhaSearch");
    for(let konyha of konyhak){
        let option = document.createElement("option");
        option.innerHTML = konyha.neve;
        option.dataset.tokens = konyha.neve;
        option.value = konyha.id;

        select.appendChild(option);
    }
}

function etelfajtaOptionGeneral(){
    let select = document.getElementById("etelfajtaSearch");
    for(let etelfajta of etelfajtak){
        let option = document.createElement("option");
        option.innerHTML = etelfajta.neve;
        option.dataset.tokens = etelfajta.neve;
        option.value = etelfajta.id;

        select.appendChild(option);
    }
}

function nehezsegFigyel() {
    const range = document.getElementById("nehezsegInput");
    let nehezsegKiir = document.getElementById("nehezsegKiir");

    window.addEventListener("load", frissitNehezseg);

    range.addEventListener('input', frissitNehezseg);
    range.addEventListener('mousedown', function() { 
        frissitNehezseg();
        range.addEventListener('mousemove', frissitNehezseg); 
    });
    range.addEventListener('mouseup', function() {
        range.removeEventListener('mousemove', frissitNehezseg); 
    });

    function frissitNehezseg() {
        if (range.value == 0) {
            nehezsegKiir.innerHTML = "Mind";
        } else if (range.value == 1) {
            nehezsegKiir.innerHTML = "Könnyű";
        } else if (range.value == 2) {
            nehezsegKiir.innerHTML = "Átlagos";
        }
         else {
            nehezsegKiir.innerHTML = "Nehéz";
        }
    }
}

function arFigyel() {
    const range = document.getElementById("arInput");
    let arKiir = document.getElementById("arKiir");

    range.addEventListener('input', frissitAr); 
    range.addEventListener('mousedown', function() { 
        frissitAr(); 
        range.addEventListener('mousemove', frissitAr); 
    });
    range.addEventListener('mouseup', function() {
        range.removeEventListener('mousemove', frissitAr);
    });
    window.addEventListener("load", frissitAr);

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
    const range = document.getElementById("kaloriaInput");
    let kaloriaKiir = document.getElementById("kaloriaKiir");

    range.addEventListener('input', frissitKaloria);
    range.addEventListener('mousedown', function() { 
        frissitKaloria(); 
        range.addEventListener('mousemove', frissitKaloria); 
    });
    range.addEventListener('mouseup', function() { 
        range.removeEventListener('mousemove', frissitKaloria); 
    });

    function frissitKaloria() {
        if (range.value == 0) {
            kaloriaKiir.innerHTML = "Mind";
        } else if (range.value == 1) {
            kaloriaKiir.innerHTML = "200 kcal";
        } else if (range.value == 2) {
            kaloriaKiir.innerHTML = "400 kcal";
        } else if (range.value == 3) {
            kaloriaKiir.innerHTML = "600 kcal";
        }
        else {
            kaloriaKiir.innerHTML = "600 kcal felett";
        }
    }
}

function adagFigyel() {
    const range = document.getElementById("adagInput");
    let adagKiir = document.getElementById("adagKiir");

    range.addEventListener('input', frissitAdag);
    range.addEventListener('mousedown', function() { 
        frissitAdag(); 
        range.addEventListener('mousemove', frissitAdag); 
    });
    range.addEventListener('mouseup', function() { 
        range.removeEventListener('mousemove', frissitAdag); 
    });

    function frissitAdag() {
        if (range.value == 0) {
            adagKiir.innerHTML = "1 adag";
        } else if (range.value == 1) {
            adagKiir.innerHTML = "2 adag";
        } else if (range.value == 2) {
            adagKiir.innerHTML = "3 adag";
        } else if (range.value == 3) {
            adagKiir.innerHTML = "4 adag";
        }
        else if (range.value == 4) {
            adagKiir.innerHTML = "5 adag";
        }
        else if (range.value == 5) {
            adagKiir.innerHTML = "6 adag";
        } else if (range.value == 6) {
            adagKiir.innerHTML = "7 adag";
        }
        else if (range.value == 7) {
            adagKiir.innerHTML = "8 adag";
        }
        else if (range.value == 8) {
            adagKiir.innerHTML = "9 adag";
        }
        else {
            adagKiir.innerHTML = "10 adag";
        }
    }
}

function kepfeltolto() {
    const kepMegjelenit = document.getElementById('kepMegjelenit');
    const faljok = event.target.files;
  
    for (let i = 0; i < faljok.length; i++) {
      const falj = faljok[i];
      if (falj && falj.type.startsWith('image/')) {
        const faljBeolvas = new FileReader();
        faljBeolvas.onload = function(e) {
            const kepNev = falj.name; 
            feltoltottKepek.push(kepNev);

          
          const colDiv = document.createElement('div');
          colDiv.className = 'col-12 col-lg-3 col-md-6 col-sm-6 position-relative my-3';
  
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'img-thumbnail img-preview';
            img.style.height = '300px';
            img.style.width = "auto";

          const btnTorles = document.createElement('button');
          btnTorles.className = 'btn btn-danger btn-sm position-absolute top-0 start-0 ';
          btnTorles.innerHTML = '&times;';
          btnTorles.addEventListener('click', function() {
            colDiv.remove();
            feltoltottKepek = feltoltottKepek.filter(nev => nev !== kepNev);
          });
  
            colDiv.appendChild(img);
            colDiv.appendChild(btnTorles);
            kepMegjelenit.appendChild(colDiv);
        };
        faljBeolvas.readAsDataURL(falj);
      }
    }
    event.target.value = "";
}
  
document.getElementById("btn_hozzaad").addEventListener("click", function () {
    const inputNev = document.getElementById("hozzavalo_neve");
    const inputMennyiseg = document.getElementById("hozzavalo_mennyiseg");
    const inputMertekegyseg = document.getElementById("hozzavalo_mertekegyseg");
    receptFeltolto(inputNev, inputMertekegyseg, inputMennyiseg);
});

document.getElementById("hozzaadKategoriaGomb").addEventListener("click", kategoriaHozzaadasa);
window.addEventListener("load", etelfajtakLista);
document.addEventListener("DOMContentLoaded", inicializalasEtrendet);
window.addEventListener("load", etrendLista);
window.addEventListener("load", konyhaLista);
document.addEventListener("DOMContentLoaded", inicializalasAlapanyagot);
window.addEventListener("load", alapanyagLista);

window.addEventListener("load", nehezsegFigyel);
window.addEventListener("load", arFigyel);
window.addEventListener("load", kaloriaFigyel);
window.addEventListener("load", adagFigyel);
document.getElementById('kepFeltoltInput').addEventListener('change', kepfeltolto);
