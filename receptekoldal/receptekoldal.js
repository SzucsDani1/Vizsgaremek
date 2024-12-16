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
    let kiir = document.getElementById("nehezsegFigyel");
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


function specialisIgenyekBetoltes(){

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





document.addEventListener("DOMContentLoaded", inicializalas);

function inicializalas() {
    var kategoriak = inicializalKategoriakat();
    inicializalKeresest();
    elrejtKategoriaListatKikattintasra();
}

function inicializalKategoriakat() {
    return ["Levesek", "Főételek", "Desszertek", "Vegetáriánus ételek", "Péksütemények", "Saláták", "Kenyérfélék", "Tésztafélék"];
}

function kategoriakListajanakGeneralasa(kategoriak) {
    var listaElem = document.getElementById("kategoriakLista");
    listaElem.innerHTML = "";
    kategoriak.forEach(function(kategoria) {
        var li = letrehozListaElemet(kategoria);
        listaElem.appendChild(li);
    });
}

function letrehozListaElemet(kategoria) {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("btn-check");
    checkbox.id = "checkbox-" + kategoria;
    
    var label = document.createElement("label");
    label.classList.add("btn", "btn-outline-primary");
    label.setAttribute("for", "checkbox-" + kategoria);
    label.textContent = kategoria;
    
    li.appendChild(checkbox);
    li.appendChild(label);
    
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            hozzaadKivalasztottKategoriat(kategoria);
        } else {
            eltavolitKivalasztottKategoriat(kategoria);
        }
    });
    
    return li;
}

function inicializalKeresest() {
    var keresomezo = document.getElementById("kategoriakSearch");
    keresomezo.addEventListener("input", function() {
        var keresesiKifejezes = keresomezo.value.toLowerCase();
        if (keresesiKifejezes) {
            var kategoriak = inicializalKategoriakat();
            kategoriakListajanakGeneralasa(kategoriak);
            szuresiFunkcio(keresesiKifejezes);
        } else {
            document.getElementById("kategoriakLista").innerHTML = "";
        }
    });

    keresomezo.addEventListener("focus", function() {
        var keresesiKifejezes = keresomezo.value.toLowerCase();
        if (keresesiKifejezes) {
            var kategoriak = inicializalKategoriakat();
            kategoriakListajanakGeneralasa(kategoriak);
            szuresiFunkcio(keresesiKifejezes);
        }
    });
}

function szuresiFunkcio(keresesiKifejezes) {
    var listaElemei = document.querySelectorAll("#kategoriakLista li");
    listaElemei.forEach(function(elem) {
        megjelenitVagyElrejtElemet(elem, keresesiKifejezes);
    });
}

function megjelenitVagyElrejtElemet(elem, keresesiKifejezes) {
    var kategoriaSzoveg = elem.textContent.toLowerCase();
    elem.style.display = kategoriaSzoveg.includes(keresesiKifejezes) ? "block" : "none";
}

function hozzaadKivalasztottKategoriat(kategoria) {
    var kivalasztottContainer = document.getElementById("kivalasztottKategoriak");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("btn-check");
    checkbox.id = "kivalasztott-" + kategoria;
    checkbox.checked = true;
    checkbox.addEventListener("change", function() {
        if (!checkbox.checked) {
            eltavolitKivalasztottKategoriat(kategoria);
            document.getElementById("checkbox-" + kategoria).checked = false;
        }
    });
    
    var label = document.createElement("label");
    label.classList.add("btn", "btn-outline-primary");
    label.setAttribute("for", "kivalasztott-" + kategoria);
    label.textContent = kategoria;
    
    kivalasztottContainer.appendChild(checkbox);
    kivalasztottContainer.appendChild(label);
}

function eltavolitKivalasztottKategoriat(kategoria) {
    var checkbox = document.getElementById("kivalasztott-" + kategoria);
    var label = checkbox ? checkbox.nextSibling : null;
    if (checkbox && label) {
        checkbox.remove();
        label.remove();
    }
}

function elrejtKategoriaListatKikattintasra() {
    document.addEventListener("click", function(e) {
        var keresomezo = document.getElementById("kategoriakSearch");
        var kategoriakLista = document.getElementById("kategoriakLista");
        if (!keresomezo.contains(e.target) && !kategoriakLista.contains(e.target)) {
            kategoriakLista.innerHTML = "";
        }
    });
}





document.getElementById("button_kereses").addEventListener("click", kereses)
window.addEventListener("load", function() {
    kartyaBetoltes(receptek); // Alapértelmezett kártyák betöltése az oldal betöltésekor
});
window.addEventListener("load", etelfajtaBetoltes)

document.getElementById("nehezsegInput").addEventListener("change", nehezsegFigyel)
window.addEventListener("load", nehezsegFigyel)