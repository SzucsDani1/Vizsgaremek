let kategoriak = new Set();
let alapanyagok = new Set();
let konyhak = new Set();
let etrendek = new Set();

receptek = [{
    "nev" : "Palacsinta",
    "kaloria" : 100,
    "nehezseg" : "könnyű",
    "ido" : 55,
    "adag" : 1,
    "felh_nev" : "Kiss Pista",
    "kep" : "./kepek/palacsinta.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
},
{
    "nev" : "Gulyás leves",
    "kaloria" : 300,
    "nehezseg" : "közepes",
    "ido" : 90,
    "adag" : 4,
    "felh_nev" : "Lakatos Imre",
    "kep" : "./kepek/guylas_leves.jpg",
    "leiras" : "Ide jön a leírás"
}

]

async function etelfajtaBetoltes(){
    try{
        let eredmeny = await fetch("./etelfajta");
        if(eredmeny.ok){
            let etelfajta = await eredmeny.json();
            etelfajtaGeneralas(etelfajta);
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
    }
}



function etelfajtaGeneralas(etelfajtak){
    let ul = document.getElementById("etelfajta");
    for(let etelfajta of etelfajtak){
        //A szűrésnél az ételfajták betöltése
        let li = document.createElement("li");

        let div = document.createElement("div");
        div.classList = "form-check";

        let input = document.createElement("input");
        input.classList = "form-check-input";
        input.type = "checkbox";
        input.id = etelfajta.neve;

        let label = document.createElement("label");
        label.classList = "form-check-label";
        label.innerHTML = etelfajta.neve;
        label.htmlFor = etelfajta.neve

        ul.appendChild(li);
        li.appendChild(div);

        div.appendChild(input);
        div.appendChild(label);
    }
}



async function nehezsegLekeres(){
    try{
        let eredmeny = await fetch("./nehezseg");
        if(eredmeny.ok){
            let nehezseg = await eredmeny.json;
        }
    }
    catch(error){
        console.log(error);
    }
}


function nehezsegFigyel(){
    let range = document.getElementById("nehezsegInput").value;
    let kiir = document.getElementById("nehezsegKiir");
    if(range == 0){
        kiir.innerHTML = "Könnyű";
    }
    if(range == 1){
        kiir.innerHTML = "Közepes";
    }
    if(range == 2){
        kiir.innerHTML = "Nehéz";
    }
}



function etelfajtaGeneralas(etelfajtak){
    let ul = document.getElementById("etelfajta");
    for(let etelfajta of etelfajtak){
        //A szűrésnél az ételfajták betöltése
        let li = document.createElement("li");

        let div = document.createElement("div");
        div.classList = "form-check";

        let input = document.createElement("input");
        input.classList = "form-check-input";
        input.type = "checkbox";
        input.id = etelfajta.neve;

        let label = document.createElement("label");
        label.classList = "form-check-label";
        label.innerHTML = etelfajta.neve;
        label.htmlFor = etelfajta.neve

        ul.appendChild(li);
        li.appendChild(div);

        div.appendChild(input);
        div.appendChild(label);
    }
}


function kartyaBetoltes(receptek){
    let divContainer = document.getElementById("kartyak");
    divContainer.innerHTML = "";  
    let szamlalo = 0

    let divRow = document.createElement("div");
    divRow.classList = "row";
    
    divContainer.innerHTML = "";

    divContainer.appendChild(divRow);


    if (receptek.length === 0) {
        divContainer.innerHTML = "<p class='text-center text-muted'>Nincs találat.</p>";
        let p = document.createElement("p");
        p.classList = "text-center text-muted";
        p.innerHTML = "Nincs találat";
        return;
    }


    for(let recept of receptek){
        //Kártya generálás
        let divCard = document.createElement("div");
        divCard.classList = "card col-12 col-lg-3 col-md-6 col-sm-12 p-2 mx-auto my-3"; 
        divCard.style = "width: 18rem;";
        divCard.id = recept.nev;

        //Kép generálása
        let img = document.createElement("img");
        img.src = recept.kep;
        img.classList = "card-img-top";
        img.alt = recept.nev;
        img.width = 250
        img.height = 200

        //Body rész generálása
        let divCardBody = document.createElement("div");
        divCardBody.classList = "card-body";

        let h5 = document.createElement("h5");
        h5.classList = "card-title";
        h5.innerHTML = recept.nev;

        let pJellemzok = document.createElement("p");
        pJellemzok.classList = "text-body-secondary fw-light";
        pJellemzok.innerHTML = recept.kaloria+" kcal | "+ recept.nehezseg + " | " + recept.ido + " perc | " + recept.adag;

        let pCardText = document.createElement("card-text");
        pCardText.innerHTML = recept.leiras;

        let br = document.createElement("br");

        //Gomb generálása
        let inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.classList = "btn btn-danger";
        inputButton.value = "Részletek";

        divRow.appendChild(divCard);

        divCard.appendChild(img);
        divCard.appendChild(divCardBody);

        divCardBody.appendChild(pJellemzok);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(pCardText);
        divCardBody.appendChild(br);
        divCardBody.appendChild(inputButton);

        szamlalo++;
    }

}

function arFigyel() {
    const range = document.getElementById("arInput");
    let arKiir = document.getElementById("arKiir");

    range.addEventListener('input', frissitAr); // Csúszka mozgatására
    range.addEventListener('mousedown', function() { // Egér lenyomásakor
        frissitAr(); // Azonnal frissít
        range.addEventListener('mousemove', frissitAr); // Egér mozgatására, amíg lenyomva van
    });
    range.addEventListener('mouseup', function() { // Egér felengedésekor
        range.removeEventListener('mousemove', frissitAr); // Eltávolítja a felesleges figyelőt
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
        }else if (range.value == 2) {
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
        }else if (range.value == 2) {
            adagKiir.innerHTML = "3 adag";
        } else if (range.value == 3) {
            adagKiir.innerHTML = "4 adag";
        }
        else if (range.value == 4) {
            adagKiir.innerHTML = "5 adag";
        }
        else if (range.value == 5) {
            adagKiir.innerHTML = "6 adag";
        }else if (range.value == 6) {
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


function kereses(){
    let keresesiSzoveg = document.getElementById("text_kereses").value.trim().toLowerCase(); 
    let szurtReceptek = receptek.filter(recept => recept.nev.toLowerCase().includes(keresesiSzoveg));
    
    kartyaBetoltes(szurtReceptek); 
}


async function kategoriakLista(){
    try{
        let eredmeny = await fetch("./etelfajta");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            for(const kategoria of lista){
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


function kategoriakListajanakGeneralasa() {
    let listaElem = document.getElementById("kategoriakLista");
    listaElem.innerHTML = "";
    for (let kategoria of kategoriak) {
        let elem = letrehozKategoriaListaElemet(kategoria);
        listaElem.appendChild(elem);
    }
}

function alapanyagListajanakGeneralasa() {
    let listaElem = document.getElementById("alapanyagLista");
    listaElem.innerHTML = "";
    for (let alapanyag of alapanyagok) {
        let elem = letrehozAlapanyagListaElemet(alapanyag);
        if (elem) {
            listaElem.appendChild(elem);
        }
    }
}

function alapanyagNelkulListajanakGeneralasa() {
    let listaElem = document.getElementById("alapanyagNelkulLista");
    listaElem.innerHTML = "";
    for (let alapanyag of alapanyagok) {
        let elem = letrehozAlapanyagNelkulListaElemet(alapanyag);
        if (elem) {
            listaElem.appendChild(elem);
        }
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

function inicializalasKategoriat(){
    keresesMukodtetSzurobenKategora();
    elrejtAdatotKeresesiTalalatokKattintasra();
}

function inicializalasAlapanyagot(){
    keresesMukodtetSzurobenAlapanyag();
    elrejtAdatotKeresesiTalalatokKattintasra();
}

function inicializalasAlapanyagNelkul(){
    keresesMukodtetSzurobenAlapanyagNelkul();
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


function letrehozKategoriaListaElemet(szuroAdatok) {
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
    
    // Elindítja az adott függvényt a checkbox változtatásakor
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            hozzaadKivalasztottKategoriat(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatot(szuroAdatok);
        }
    });
    
    return div;
}


function letrehozAlapanyagListaElemet(szuroAdatok) {
    // Ha az elem már kiválasztásra került az "alapanyag nélküli" oldalon, akkor ne hozza létre
    if (document.getElementById("kivalasztott-alapanyagNelkul-" + szuroAdatok)) {
        return null;
    }
    let div = document.createElement("div");
    div.classList.add("dropdown-item");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("btn-check");
    // Egyedi azonosító az alapanyag listához
    checkbox.id = "checkbox-alapanyag-" + szuroAdatok;

    let label = document.createElement("label");
    label.classList.add("btn", "btn-outline-danger");
    label.setAttribute("for", "checkbox-alapanyag-" + szuroAdatok);
    label.textContent = szuroAdatok;

    div.appendChild(checkbox);
    div.appendChild(label);

    // Ha már kiválasztották az adott elemet az alapanyagok között, a checkbox checked legyen
    if (document.getElementById("kivalasztott-alapanyag-" + szuroAdatok)) {
        checkbox.checked = true;
    }
    
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            hozzaadKivalasztottAlapanyagot(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatotAlapanyag(szuroAdatok);
        }
    });

    return div;
}

function letrehozAlapanyagNelkulListaElemet(szuroAdatok) {
    // Ha az elem már kiválasztásra került az "alapanyag" oldalon, akkor ne hozza létre
    if (document.getElementById("kivalasztott-alapanyag-" + szuroAdatok)) {
        return null;
    }
    let div = document.createElement("div");
    div.classList.add("dropdown-item");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("btn-check");
    // Egyedi azonosító az alapanyag nélküli listához
    checkbox.id = "checkbox-alapanyagNelkul-" + szuroAdatok;

    let label = document.createElement("label");
    label.classList.add("btn", "btn-outline-danger");
    label.setAttribute("for", "checkbox-alapanyagNelkul-" + szuroAdatok);
    label.textContent = szuroAdatok;

    div.appendChild(checkbox);
    div.appendChild(label);

    if (document.getElementById("kivalasztott-alapanyagNelkul-" + szuroAdatok)) {
        checkbox.checked = true;
    }
    
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            hozzaadKivalasztottAlapanyagNelkul(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatotAlapanyagNelkul(szuroAdatok);
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
    
    // Elindítja az adott függvényt a checkbox változtatásakor
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
    
    // Elindítja az adott függvényt a checkbox változtatásakor
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            hozzaadKivalasztottKonyhat(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatot(szuroAdatok);
        }
    });
    
    return div;
}


function keresesMukodtetSzurobenKategora() {
    let keresomezo = document.getElementById("kategoriakSearch");
    keresomezo.addEventListener("input", function() {
        inditsKeresestSzurobenKategoriak(keresomezo);
    });
    keresomezo.addEventListener("focus", function() {
        inditsKeresestSzurobenKategoriak(keresomezo);
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

function keresesMukodtetSzurobenAlapanyagNelkul() {
    let keresomezo = document.getElementById("alapanyagNelkulSearch");
    keresomezo.addEventListener("input", function() {
        inditsKeresestSzurobenAlapanyagNelkul(keresomezo);
    });
    keresomezo.addEventListener("focus", function() {
        inditsKeresestSzurobenAlapanyagNelkul(keresomezo);
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

function inditsKeresestSzurobenKategoriak(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("kategoriakLista");

    if (keresesiKifejezes) {
        kategoriakListajanakGeneralasa(kategoriak);
        szuresiFunkcioKategoriak(keresesiKifejezes);
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


function inditsKeresestSzurobenAlapanyagNelkul(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("alapanyagNelkulLista");

    if (keresesiKifejezes) {
        alapanyagNelkulListajanakGeneralasa();
        szuresiFunkcioAlapanyagNelkul(keresesiKifejezes);
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}



function inditsKeresestSzurobenEtrend(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("etrendLista");

    if (keresesiKifejezes) {
        etrendListajanakGeneralasa(etrendek);
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

function szuresiFunkcioKategoriak(keresesiKifejezes) {
    let listaElemei = document.querySelectorAll("#kategoriakLista .dropdown-item");
    let talalatVan = false;

    for (let elem of listaElemei) {
        let kategoriaSzoveg = elem.textContent.toLowerCase();
        if (kategoriaSzoveg.includes(keresesiKifejezes)) {
            elem.style.display = "block";
            talalatVan = true;
        } else {
            elem.style.display = "none";
        }
    }

    let dropdownMenu = document.getElementById("kategoriakLista");
    let nincsTalalatElem = document.getElementById("nincsTalalatKategoria");

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalatKategoria";
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


function szuresiFunkcioAlapanyagNelkul(keresesiKifejezes) {
    let listaElemei = document.querySelectorAll("#alapanyagNelkulLista .dropdown-item");
    let talalatVan = false;

    for (let elem of listaElemei) {
        let alapanyagNelkulSzoveg = elem.textContent.toLowerCase();
        if (alapanyagNelkulSzoveg.includes(keresesiKifejezes)) {
            elem.style.display = "block";
            talalatVan = true;
        } else {
            elem.style.display = "none";
        }
    }

    let dropdownMenu = document.getElementById("alapanyagNelkulLista");
    let nincsTalalatElem = document.getElementById("nincsTalalatAlapanyagNelkul");

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalatAlapanyagNelkul";
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



function hozzaadKivalasztottKategoriat(szuroAdatok) {
    if (!document.getElementById("kivalasztott-" + szuroAdatok)) {
        let kivalasztottContainerKategoria = document.getElementById("kivalasztottKategoriak");

        // div létrehozása
        let tag = document.createElement("div");
        tag.classList.add("kivalasztott-tag", "badge", "bg-danger", "me-2", "mb-2");
        tag.id = "kivalasztott-" + szuroAdatok;
        tag.textContent = szuroAdatok;

        // x törlés gomb hozzáadása
        let removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("btn-close", "btn-close-white", "ms-2");
        removeBtn.setAttribute("aria-label", "Törlés");
        removeBtn.addEventListener("click", function () {
            eltavolitKivalasztottAdatot(szuroAdatok);
            document.getElementById("checkbox-" + szuroAdatok).checked = false;
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerKategoria.appendChild(tag);
    }
}

function hozzaadKivalasztottAlapanyagot(szuroAdatok) {
    if (!document.getElementById("kivalasztott-alapanyag-" + szuroAdatok)) {
        let kivalasztottContainerAlapanyag = document.getElementById("kivalasztottAlapanyagok");

        let tag = document.createElement("div");
        tag.classList.add("kivalasztott-tag", "badge", "bg-danger", "me-2", "mb-2");
        tag.id = "kivalasztott-alapanyag-" + szuroAdatok;
        tag.textContent = szuroAdatok;

        let removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("btn-close", "btn-close-white", "ms-2");
        removeBtn.setAttribute("aria-label", "Törlés");
        removeBtn.addEventListener("click", function () {
            eltavolitKivalasztottAdatotAlapanyag(szuroAdatok);
            let checkbox = document.getElementById("checkbox-alapanyag-" + szuroAdatok);
            if (checkbox) checkbox.checked = false;
            AlapanyagNelkulListaUjratoltese();
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerAlapanyag.appendChild(tag);
        AlapanyagNelkulListaUjratoltese();
    }
}

function hozzaadKivalasztottAlapanyagNelkul(szuroAdatok) {
    if (!document.getElementById("kivalasztott-alapanyagNelkul-" + szuroAdatok)) {
        let kivalasztottContainerAlapanyagNelkul = document.getElementById("kivalasztottAlapanyagNelkul");

        let tag = document.createElement("div");
        tag.classList.add("kivalasztott-tag", "badge", "bg-danger", "me-2", "mb-2");
        tag.id = "kivalasztott-alapanyagNelkul-" + szuroAdatok;
        tag.textContent = szuroAdatok;

        let removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("btn-close", "btn-close-white", "ms-2");
        removeBtn.setAttribute("aria-label", "Törlés");
        removeBtn.addEventListener("click", function () {
            eltavolitKivalasztottAdatotAlapanyagNelkul(szuroAdatok);
            let checkbox = document.getElementById("checkbox-alapanyagNelkul-" + szuroAdatok);
            if (checkbox) checkbox.checked = false;
            AlapanyagListaUjratoltese();
        });

        tag.appendChild(removeBtn);
        kivalasztottContainerAlapanyagNelkul.appendChild(tag);
        AlapanyagListaUjratoltese();
    }
}

function hozzaadKivalasztottEtrendet(szuroAdatok) {
    if (!document.getElementById("kivalasztott-" + szuroAdatok)) {
        let kivalasztottContainerEtrend = document.getElementById("kivalasztottEtrend");

        // div létrehozása
        let tag = document.createElement("div");
        tag.classList.add("kivalasztott-tag", "badge", "bg-danger", "me-2", "mb-2");
        tag.id = "kivalasztott-" + szuroAdatok;
        tag.textContent = szuroAdatok;

        // x törlés gomb hozzáadása
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

        // div létrehozása
        let tag = document.createElement("div");
        tag.classList.add("kivalasztott-tag", "badge", "bg-danger", "me-2", "mb-2");
        tag.id = "kivalasztott-" + szuroAdatok;
        tag.textContent = szuroAdatok;

        // x törlés gomb hozzáadása
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


function elrejtAdatotKeresesiTalalatokKattintasra() {
    let kategoriaKeresomezo = document.getElementById("kategoriakSearch");
    let alapanyagKeresomezo = document.getElementById("alapanyagSearch");
    let alapanyagNelkulKeresomezo = document.getElementById("alapanyagNelkulSearch");
    let etrendKeresomezo = document.getElementById("etrendSearch");
    let konyhaKeresomezo = document.getElementById("konyhaSearch");

    let kategoriakDropdown = document.getElementById("kategoriakLista");
    let alapanyagDropdown = document.getElementById("alapanyagLista");
    let alapanyagNelkulDropdown = document.getElementById("alapanyagNelkulLista");
    let etrendDropdown = document.getElementById("etrendLista");
    let konyhaDropdown = document.getElementById("konyhaLista");

    document.addEventListener("click", function(event) {
        if (!alapanyagKeresomezo.contains(event.target) && !alapanyagDropdown.contains(event.target)) {
            alapanyagDropdown.style.display = "none";
        }
    });
    document.addEventListener("click", function(event) {
        if (!alapanyagNelkulKeresomezo.contains(event.target) && !alapanyagNelkulDropdown.contains(event.target)) {
            alapanyagNelkulDropdown.style.display = "none";
        }
    });

    document.addEventListener("click", function(event) {
        if (!kategoriaKeresomezo.contains(event.target) && !kategoriakDropdown.contains(event.target)) {
            kategoriakDropdown.style.display = "none";
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
}

function eltavolitKivalasztottAdatot(szuroAdatok) {
    let tag = document.getElementById("kivalasztott-" + szuroAdatok);
    if (tag) {
        tag.remove();
    }
}


function eltavolitKivalasztottAdatotAlapanyag(szuroAdatok) {
    let tag = document.getElementById("kivalasztott-alapanyag-" + szuroAdatok);
    if (tag) {
        tag.remove();
    }
    AlapanyagNelkulListaUjratoltese();
}

function eltavolitKivalasztottAdatotAlapanyagNelkul(szuroAdatok) {
    let tag = document.getElementById("kivalasztott-alapanyagNelkul-" + szuroAdatok);
    if (tag) {
        tag.remove();
    }
    AlapanyagListaUjratoltese();
}

function AlapanyagListaUjratoltese() {
    alapanyagListajanakGeneralasa();
}

function AlapanyagNelkulListaUjratoltese() {
    alapanyagNelkulListajanakGeneralasa();
}




//Ha a HTML dokumentum teljesen betöltődik az inicializalas függvény
document.addEventListener("DOMContentLoaded", inicializalasKategoriat);
document.addEventListener("DOMContentLoaded", inicializalasEtrendet);
document.addEventListener("DOMContentLoaded", inicializalasKonyhat);
document.addEventListener("DOMContentLoaded", inicializalasAlapanyagot);
document.addEventListener("DOMContentLoaded", inicializalasAlapanyagNelkul);
window.addEventListener("load", nehezsegFigyel)
document.getElementById("nehezsegInput").addEventListener("change", nehezsegFigyel)
window.addEventListener("load", kategoriakLista)
//window.addEventListener("load", alapanyagLista);
document.getElementById("button_kereses").addEventListener("click", kereses)
window.addEventListener("load", function() {
    kartyaBetoltes(receptek); // Alapértelmezett kártyák betöltése az oldal betöltésekor
});

window.addEventListener("load", arFigyel);
window.addEventListener("load", kaloriaFigyel);
window.addEventListener("load", adagFigyel);
window.addEventListener("load", etrendLista);
window.addEventListener("load", konyhaLista);
window.addEventListener("load", alapanyagLista);
//document.getElementById('nehezsegInput').addEventListener("input", arFigyel);
