let kategoriak = new Set();
let alapanyagok = new Set();

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
            console.log(etelfajta);
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


async function sepicalisIgenyekLekeres(){
    try{
        let eredmeny = await fetch("./specialisIgenyek");
        if(eredmeny.ok){
            specialisIgenyekBetoltes();
        }
        else{
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
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
        inputButton.classList = "btn btn-primary";
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



function kereses(){
    let keresesiSzoveg = document.getElementById("text_kereses").value.trim().toLowerCase(); 
    let szurtReceptek = receptek.filter(recept => recept.nev.toLowerCase().includes(keresesiSzoveg));
    
    kartyaBetoltes(szurtReceptek); 
}



function inicializalas(){
    let kategoriak = kategoriakLista();
    keresesMukodtetSzuroben();
    elrejtAdatotKeresesiTalalatokKattintasra();
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
        let elem = letrehozListaElemet(kategoria);
        listaElem.appendChild(elem);
    }
}

function letrehozListaElemet(szuroAdatok) {
    let div = document.createElement("div");
    div.classList.add("dropdown-item");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("btn-check");
    checkbox.id = "checkbox-" + szuroAdatok;
    
    let label = document.createElement("label");
    label.classList.add("btn", "btn-outline-primary");
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
            hozzaadKivalasztottAdatot(szuroAdatok);
        } else {
            eltavolitKivalasztottAdatot(szuroAdatok);
        }
    });
    
    return div;
}

function keresesMukodtetSzuroben() {
    let keresomezo = document.getElementById("kategoriakSearch");
    keresomezo.addEventListener("input", function() {
        inditsKeresestSzuroben(keresomezo);
    });
    keresomezo.addEventListener("focus", function() {
        inditsKeresestSzuroben(keresomezo);
    });
}

function inditsKeresestSzuroben(keresomezo) {
    let keresesiKifejezes = keresomezo.value.toLowerCase();
    let dropdownMenu = document.getElementById("kategoriakLista");

    if (keresesiKifejezes) {
        let kategoriak = kategoriakLista();
        kategoriakListajanakGeneralasa(kategoriak);
        szuresiFunkcio(keresesiKifejezes);
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}

function szuresiFunkcio(keresesiKifejezes) {
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
    let nincsTalalatElem = document.getElementById("nincsTalalat");

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalat";
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


function hozzaadKivalasztottAdatot(szuroAdatok) {
    if (!document.getElementById("kivalasztott-" + szuroAdatok)) {
        let kivalasztottContainer = document.getElementById("kivalasztottKategoriak");

        // div létrehozása
        let tag = document.createElement("div");
        tag.classList.add("kivalasztott-tag", "badge", "bg-primary", "me-2", "mb-2");
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
        kivalasztottContainer.appendChild(tag);
    }
}


function elrejtAdatotKeresesiTalalatokKattintasra() {
    let keresomezo = document.getElementById("kategoriakSearch");
    let kategoriakDropdown = document.getElementById("kategoriakLista");

    document.addEventListener("click", function(event) {
        if (!keresomezo.contains(event.target) && !kategoriakDropdown.contains(event.target)) {
            kategoriakDropdown.style.display = "none";
        }
    });
}

function eltavolitKivalasztottAdatot(szuroAdatok) {
    let tag = document.getElementById("kivalasztott-" + szuroAdatok);
    if (tag) {
        tag.remove();
    }
}


//Ha a HTML dokumentum teljesen betöltődik az inicializalas függvény
document.addEventListener("DOMContentLoaded", inicializalas);
window.addEventListener("load", nehezsegFigyel)
document.getElementById("nehezsegInput").addEventListener("change", nehezsegFigyel)
window.addEventListener("load", kategoriakLista)
window.addEventListener("load", alapanyagLista);
document.getElementById("button_kereses").addEventListener("click", kereses)
window.addEventListener("load", function() {
    kartyaBetoltes(receptek); // Alapértelmezett kártyák betöltése az oldal betöltésekor
});
