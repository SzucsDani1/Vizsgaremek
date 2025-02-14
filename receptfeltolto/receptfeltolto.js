let kategoriaSzamlalo = 0;
let etelfajtak = new Set();
let etrendek = new Set();
let konyhak = new Set();
let alapanyagok = new Set();

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

        // Ha még nincs számláló érték beállítva
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


    // Figyelmeztető elem létrehozása
    const divFigyelmeztet = document.createElement("div");
    divFigyelmeztet.classList = "alert alert-danger";
    divFigyelmeztet.role = "alert";
    divFigyelmeztet.innerHTML = "Kérem adjon nevet a Kategóriának!";
    divFigyelmeztet.hidden = true;
    divFigyelmeztet.id = "kategoriaFigyelmeztet" + kategoriaSzamlalo;

    // Filterbox elem létrehozása
    const divFilterBox = document.createElement("div");
    divFilterBox.classList = "filter-box border p-3 bg-light rounded my-3";

    // Törlés gomb létrehozása
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
    
    // Az alábbi három sor módosítása: az új kategóriát a lista elejére tesszük
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
    h4.innerHTML = kategoriaInput+" hozzávaló(i)";

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
                etelfajtak.add(etelfajta.neve)
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
                konyhak.add(konyha.neve)
            }
            console.log(konyhak);
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
                alapanyagok.add(alapanyag.hozzavalo)
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


function etelfajtaListajanakGeneralasa() {
    let listaElem = document.getElementById("etelfajtaLista");
    listaElem.innerHTML = "";
    for (let etelfajta of etelfajtak) {
        let elem = letrehozEtelfajtaListaElemet(etelfajta);
        listaElem.appendChild(elem);
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

function konyhaListajanakGeneralasa() {
    let listaElem = document.getElementById("konyhaLista");
    listaElem.innerHTML = "";
    for (let konyha of konyhak) {
        let elem = letrehozKonyhaListaElemet(konyha);
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

function inicializalasEtelfajta(){
    keresesMukodtetSzurobenEtelfajta();
    elrejtAdatotKeresesiTalalatokKattintasra();
}

function inicializalasEtrendet(){
    keresesMukodtetSzurobenEtrend();
    elrejtAdatotKeresesiTalalatokKattintasra();
}

function inicializalasKonyhat(){
    keresesMukodtetSzurobenKonyha();
    elrejtAdatotKeresesiTalalatokKattintasra();
}

function inicializalasAlapanyagot(){
    keresesMukodtetSzurobenAlapanyag();
    elrejtAdatotKeresesiTalalatokKattintasra();
}

function letrehozEtelfajtaListaElemet(szuroAdatok) {
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
            hozzaadKivalasztottEtelfajta(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatot(szuroAdatok);
        }
    });
    
    return div;
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
            hozzaadKivalasztottEtrendet(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatot(szuroAdatok);
        }
    });
    
    return div;
}

function letrehozKonyhaListaElemet(szuroAdatok) {
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
            hozzaadKivalasztottKonyhat(szuroAdatok);
        } else {
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
            hozzaadKivalasztottAlapanyagot(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatot(szuroAdatok);
        }
    });
    
    return div;
}


function keresesMukodtetSzurobenEtelfajta() {
    let keresomezo = document.getElementById("etelfajtaSearch");
    keresomezo.addEventListener("input", function() {
        inditsKeresestSzurobenEtelfajta(keresomezo);
    });
    keresomezo.addEventListener("focus", function() {
        inditsKeresestSzurobenEtelfajta(keresomezo);
    });
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

function keresesMukodtetSzurobenKonyha() {
    let keresomezo = document.getElementById("konyhaSearch");
    keresomezo.addEventListener("input", function() {
        inditsKeresestSzurobenKonyha(keresomezo);
    });
    keresomezo.addEventListener("focus", function() {
        inditsKeresestSzurobenKonyha(keresomezo);
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



function inditsKeresestSzurobenEtelfajta(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("etelfajtaLista");

    if (keresesiKifejezes) {
        etelfajtaListajanakGeneralasa();
        szuresiFunkcioEtelfajta(keresesiKifejezes);
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
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

function inditsKeresestSzurobenKonyha(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("konyhaLista");

    if (keresesiKifejezes) {
        konyhaListajanakGeneralasa(etrendek);
        szuresiFunkcioKonyhak(keresesiKifejezes);
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}

function inditsKeresestSzurobenAlapanyag(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("alapanyagLista");

    if (keresesiKifejezes) {
        alapanyagListajanakGeneralasa(alapanyagok);
        szuresiFunkcioAlapanyagok(keresesiKifejezes);
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}

function szuresiFunkcioEtelfajta(keresesiKifejezes) {
    let listaElemei = document.querySelectorAll("#etelfajtaLista .dropdown-item");
    let talalatVan = false;

    for (let elem of listaElemei) {
        let etelfajtaSzoveg = elem.textContent.toLowerCase();
        if (etelfajtaSzoveg.includes(keresesiKifejezes)) {
            elem.style.display = "block";
            talalatVan = true;
        } else {
            elem.style.display = "none";
        }
    }

    let dropdownMenu = document.getElementById("etelfajtaLista");
    let nincsTalalatElem = document.getElementById("nincsTalalatEtelfajta");

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalatEtelfajta";
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

function szuresiFunkcioKonyhak(keresesiKifejezes) {
    let listaElemei = document.querySelectorAll("#konyhaLista .dropdown-item");
    let talalatVan = false;

    for (let elem of listaElemei) {
        let konyhaSzoveg = elem.textContent.toLowerCase();
        if (konyhaSzoveg.includes(keresesiKifejezes)) {
            elem.style.display = "block";
            talalatVan = true;
        } else {
            elem.style.display = "none";
        }
    }

    let dropdownMenu = document.getElementById("konyhaLista");
    let nincsTalalatElem = document.getElementById("nincsTalalatKonyha");

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalatKonyha";
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



function hozzaadKivalasztottEtelfajta(szuroAdatok) {
    if (!document.getElementById("kivalasztott-" + szuroAdatok)) {
        let kivalasztottContainerEtelfajta = document.getElementById("kivalasztottEtelfajta");

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
            document.getElementById("checkbox-" + szuroAdatok).checked = false;
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerEtelfajta.appendChild(tag);
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
            document.getElementById("checkbox-" + szuroAdatok).checked = false;
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerEtrend.appendChild(tag);
    }
}

function hozzaadKivalasztottKonyhat(szuroAdatok) {
    if (!document.getElementById("kivalasztott-" + szuroAdatok)) {
        let kivalasztottContainerKonyha = document.getElementById("kivalasztottKonyha");

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
            document.getElementById("checkbox-" + szuroAdatok).checked = false;
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerKonyha.appendChild(tag);
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
            document.getElementById("checkbox-" + szuroAdatok).checked = false;
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerAlapanyag.appendChild(tag);
    }
}


function elrejtAdatotKeresesiTalalatokKattintasra() {
    let etelfajtaKeresomezo = document.getElementById("etelfajtaSearch");
    let etrendKeresomezo = document.getElementById("etrendSearch");
    let konyhaKeresomezo = document.getElementById("konyhaSearch");
    let alapanyagKeresomezo = document.getElementById("alapanyagSearch");

    let etelfajtaDropdown = document.getElementById("etelfajtaLista");
    let etrendDropdown = document.getElementById("etrendLista");
    let konyhaDropdown = document.getElementById("konyhaLista");
    let alapanyagDropdown = document.getElementById("alapanyagLista");

    document.addEventListener("click", function(event) {
        if (!etelfajtaKeresomezo.contains(event.target) && !etelfajtaDropdown.contains(event.target)) {
            etelfajtaDropdown.style.display = "none";
        }
    });

    document.addEventListener("click", function(event) {
        if (!etrendKeresomezo.contains(event.target) && !etrendDropdown.contains(event.target)) {
            etrendDropdown.style.display = "none";
        }
    });

    document.addEventListener("click", function(event) {
        if (!konyhaKeresomezo.contains(event.target) && !konyhaDropdown.contains(event.target)) {
            konyhaDropdown.style.display = "none";
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

function nehezsegFigyel() {
    const range = document.getElementById("nehezsegInput");
    let nehezsegKiir = document.getElementById("nehezsegKiir");

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



document.getElementById("btn_hozzaad").addEventListener("click", function () {
    const inputNev = document.getElementById("hozzavalo_neve");
    const inputMennyiseg = document.getElementById("hozzavalo_mennyiseg");
    const inputMertekegyseg = document.getElementById("hozzavalo_mertekegyseg");
    receptFeltolto(inputNev, inputMertekegyseg, inputMennyiseg);
});

document.getElementById("hozzaadKategoriaGomb").addEventListener("click", kategoriaHozzaadasa);
document.addEventListener("DOMContentLoaded", inicializalasEtelfajta);
window.addEventListener("load", etelfajtakLista)
document.addEventListener("DOMContentLoaded", inicializalasEtrendet);
window.addEventListener("load", etrendLista);
document.addEventListener("DOMContentLoaded", inicializalasKonyhat);
window.addEventListener("load", konyhaLista);
document.addEventListener("DOMContentLoaded", inicializalasAlapanyagot);
window.addEventListener("load", alapanyagLista);

window.addEventListener("load", nehezsegFigyel);