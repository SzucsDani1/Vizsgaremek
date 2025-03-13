let kategoriak = new Set();
let alapanyagok = new Set();
let konyhak = new Set();
let etrendek = new Set();




async function filterReceptek() {
    try {


        let kategoriaKeresomezo = document.getElementById("kategoriakSearch");
        let alapanyagKeresomezo = document.getElementById("alapanyagSearch");
        let alapanyagNelkulKeresomezo = document.getElementById("alapanyagNelkulSearch");
        let etrendKeresomezo = document.getElementById("etrendSearch");
        let konyhaKeresomezo = document.getElementById("konyhaSearch");

        kategoriaKeresomezo.value = "";
        alapanyagKeresomezo.value = "";
        alapanyagNelkulKeresomezo.value = "";
        etrendKeresomezo.value = "";
        konyhaKeresomezo.value = "";

        const kategoriak = getSelectedCategories('kivalasztottKategoriak');
        const alapanyagok = getSelectedCategories('kivalasztottAlapanyagok');
        const alapanyagok_nelkul = getSelectedCategories('kivalasztottAlapanyagNelkul');
        const etrend = getSelectedCategories('kivalasztottEtrend');
        const konyha = getSelectedCategories('kivalasztottKonyha');

        const kereses = document.getElementById('text_kereses')?.value.trim() || '';
        

        // Napszak
        const NapszakCheckbox = document.querySelectorAll('.btn-check');
        const napszak = [];

        for (const checkbox of NapszakCheckbox) {
            if (checkbox.checked) {
                napszak.push(checkbox.value);
            }
        }
        
        // Ár
        const arInput = document.getElementById('arInput');
        let ar = null;
        if (arInput) {
            const arValue = parseInt(arInput.value);
            if (arValue === 1) ar = 'Olcsó';
            else if (arValue === 2) ar = 'Átlagos';
            else if (arValue === 3) ar = 'Drága';
        }

        // Idő
        const idoInput = document.getElementById('idoInput');
        let ido = null;
        if (idoInput) {
            const idoValue = parseInt(idoInput.value);
            if (idoValue === 1) ido = 30;
            else if (idoValue === 2) ido = 60;
            else if (idoValue === 3) ido = 120;
        }
        
        // Kalória
        const kaloriaInput = document.getElementById('kaloriaInput');
        let kaloria = null;
        if (kaloriaInput) {
            const kaloriaValue = parseInt(kaloriaInput.value);
            if (kaloriaValue === 1) kaloria = 200;
            else if (kaloriaValue === 2) kaloria = 400;
            else if (kaloriaValue === 3) kaloria = 600;
            else if (kaloriaValue === 4) kaloria = 601;
        }
        
        // Adag
        const adagInput = document.getElementById('adagInput');
        const adag = adagInput && adagInput.value !== '0' ? parseInt(adagInput.value) : null;
        
        // Get difficulty level
        const nehezsegInput = document.getElementById('nehezsegInput');
        let nehezseg = null;
        if (nehezsegInput) {
            const nehezsegValue = parseInt(nehezsegInput.value);
            if (nehezsegValue === 1) nehezseg = 'Könnyű';
            else if (nehezsegValue === 2) nehezseg = 'Közepes';
            else if (nehezsegValue === 3) nehezseg = 'Nehéz';
        }
        
        const requestBody = {
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
            adag,
            nehezseg
        };
        
        for (const key of Object.keys(requestBody)) {
            if (
                requestBody[key] === null || 
                (Array.isArray(requestBody[key]) && requestBody[key].length === 0)
            ) {
                delete requestBody[key];
            }
        }
        
        
        // Make request to server
        const response = await fetch('./szuresreceptek', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (response.ok) {
            const receptek = await response.json();
            kartyaBetoltes(receptek);
        } else {
            try {
                const errorData = await response.json();
                document.getElementById('kartyak').innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        ${errorData.valasz || 'Nincs találat a megadott feltételekkel.'}
                    </div>
                `;
            } catch (e) {
                document.getElementById('kartyak').innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        Nincs találat a megadott feltételekkel.
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Hiba a szűrés során:', error);
        document.getElementById('kartyak').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Hiba történt a szűrés során. Kérjük, próbálja újra később.
            </div>
        `;
    }
}

function getSelectedCategories(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    
    const selectedItems = [];
    const badges = container.querySelectorAll('.kivalasztott-tag');
    
    badges.forEach(badge => {
        // Extract the text content (exclude the X button)
        const text = badge.textContent.trim().replace('×', '').trim();
        selectedItems.push(text);
    });
    
    return selectedItems;
}

document.getElementById('btnSzures').addEventListener('click', filterReceptek);






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
        }else if (range.value == 2) {
            nehezsegKiir.innerHTML = "Közepes";
        } else {
            nehezsegKiir.innerHTML = "Nehéz";
        }
    }
}


function idoFigyel() {
    const range = document.getElementById("idoInput");
    let idoKiir = document.getElementById("idoKiir");

    range.addEventListener('input', frissitIdo);
    range.addEventListener('mousedown', function() { 
        frissitIdo(); 
        range.addEventListener('mousemove', frissitIdo); 
    });
    range.addEventListener('mouseup', function() { 
        range.removeEventListener('mousemove', frissitIdo); 
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




async function konyhaListaLeker(){
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


async function etrendListaLeker(){
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

async function kategoriakListaLeker(){
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

async function alapanyagListaLeker(){
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
    let kategoriakSearch = document.getElementById("kategoriakSearch");
    let kategoriakDropdown = document.getElementById("kategoriakDropdown");
    let kategoriakLista = document.getElementById("kategoriakLista");
    let kivalasztottKategoriak = document.getElementById("kivalasztottKategoriak");
    const szuroFajta = "kategoriak";
    kategoriakLista.innerHTML = "";
    for (let kategoria of kategoriak) {
        //let elem = letrehozKategoriaListaElemet(kategoriakLista);
        let elem = letrehozListaElemet(kategoria, kategoriakLista, kategoriakSearch, kategoriakDropdown, kivalasztottKategoriak, szuroFajta);
        kategoriakLista.appendChild(elem);
    }
}

function alapanyagListajanakGeneralasa() {
    let alapanyagSearch = document.getElementById("alapanyagSearch");
    let alapanyagDropdown = document.getElementById("alapanyagDropdown");
    let alapanyagLista = document.getElementById("alapanyagLista");
    let kivalasztottAlapanyagok = document.getElementById("kivalasztottAlapanyagok");
    const szuroFajta = "alapanyag"
    alapanyagLista.innerHTML = "";
    for (let alapanyag of alapanyagok) {
        //let elem = letrehozAlapanyagListaElemet(alapanyag);
        let elem = letrehozListaElemet(alapanyag, alapanyagLista,alapanyagSearch, alapanyagDropdown, kivalasztottAlapanyagok, szuroFajta);
        if (elem) {
            alapanyagLista.appendChild(elem);
        }
    }
}

function alapanyagNelkulListajanakGeneralasa() {
    let alapanyagNelkulSearch = document.getElementById("alapanyagNelkulSearch");
    let alapanyagNelkulDropdown = document.getElementById("alapanyagNelkulDropdown");
    let alapanyagNelkulLista = document.getElementById("alapanyagNelkulLista");
    let kivalasztottAlapanyagokNelkul = document.getElementById("kivalasztottAlapanyagokNelkul");
    const szuroFajta = "alapanyagNelkul";
    alapanyagNelkulLista.innerHTML = "";
    for (let alapanyag of alapanyagok) {
        //let elem = letrehozAlapanyagNelkulListaElemet(alapanyag);
        let elem = letrehozListaElemet(alapanyag, alapanyagNelkulLista,alapanyagNelkulSearch, alapanyagNelkulDropdown, kivalasztottAlapanyagokNelkul, szuroFajta);
        if (elem) {
            alapanyagNelkulLista.appendChild(elem);
        }
    }
}


function etrendListajanakGeneralasa() {
    let etrendSearch = document.getElementById("etrendSearch");
    let etrendDropdown = document.getElementById("etrendDropdown");
    let etrendLista = document.getElementById("etrendLista");
    let kivalasztottEtrend = document.getElementById("kivalasztottEtrend");
    const szuroFajta = "etrend";
    etrendLista.innerHTML = "";
    for (let etrend of etrendek) {
        //let elem = letrehozEtrendListaElemet(etrend);
        let elem = letrehozListaElemet(etrend, etrendLista,etrendSearch, etrendDropdown, kivalasztottEtrend, szuroFajta);
        etrendLista.appendChild(elem);
    }
}

function konyhaListajanakGeneralasa() {
    let konyhaSearch = document.getElementById("konyhaSearch");
    let konyhaDropdown = document.getElementById("konyhaDropdown");
    let konyhaLista = document.getElementById("konyhaLista");
    let kivalasztottKonyha = document.getElementById("kivalasztottKonyha");
    const szuroFajta = "konyha";
    konyhaLista.innerHTML = "";
    for (let konyha of konyhak) {
        //let elem = letrehozKonyhaListaElemet(konyha);
        let elem = letrehozListaElemet(konyha, konyhaLista,konyhaSearch, konyhaDropdown, kivalasztottKonyha, szuroFajta);
        konyhaLista.appendChild(elem);
    }
}
/*
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
*/



function inicializalasKategoriat(){
    let kategoriakSearch = document.getElementById("kategoriakSearch");
    let kategoriakDropdown = document.getElementById("kategoriakDropdown");
    let kategoriakLista = document.getElementById("kategoriakLista");
    let kivalasztottKategoriak = document.getElementById("kivalasztottKategoriak");
    const szuroFajta = "kategoriak";
    keresesMukodtetSzuroben(szuroFajta, kategoriakLista, kategoriakSearch, kategoriakDropdown, kivalasztottKategoriak);
    elrejtAdatotKeresesiTalalatokKattintasra(szuroFajta, kategoriakLista, kategoriakSearch, kategoriakDropdown, kivalasztottKategoriak);
}

function inicializalasAlapanyagot(){
    let alapanyagSearch = document.getElementById("alapanyagSearch");
    let alapanyagDropdown = document.getElementById("alapanyagDropdown");
    let alapanyagLista = document.getElementById("alapanyagLista");
    let kivalasztottAlapanyagok = document.getElementById("kivalasztottAlapanyagok");
    const szuroFajta = "alapanyag";
    keresesMukodtetSzuroben(szuroFajta, alapanyagLista,alapanyagSearch, alapanyagDropdown, kivalasztottAlapanyagok);
    elrejtAdatotKeresesiTalalatokKattintasra(szuroFajta, alapanyagLista,alapanyagSearch, alapanyagDropdown, kivalasztottAlapanyagok);
}

function inicializalasAlapanyagNelkul(){
    let alapanyagNelkulSearch = document.getElementById("alapanyagNelkulSearch");
    let alapanyagNelkulDropdown = document.getElementById("alapanyagNelkulDropdown");
    let alapanyagNelkulLista = document.getElementById("alapanyagNelkulLista");
    let kivalasztottAlapanyagokNelkul = document.getElementById("kivalasztottAlapanyagokNelkul");
    const szuroFajta = "alapanyagNelkul";
    keresesMukodtetSzuroben(szuroFajta, alapanyagNelkulLista,alapanyagNelkulSearch, alapanyagNelkulDropdown, kivalasztottAlapanyagokNelkul);
    elrejtAdatotKeresesiTalalatokKattintasra(szuroFajta, alapanyagNelkulLista,alapanyagNelkulSearch, alapanyagNelkulDropdown, kivalasztottAlapanyagokNelkul);
}

function inicializalasEtrendet(){
    let etrendSearch = document.getElementById("etrendSearch");
    let etrendDropdown = document.getElementById("etrendDropdown");
    let etrendLista = document.getElementById("etrendLista");
    let kivalasztottEtrend = document.getElementById("kivalasztottEtrend");
    const szuroFajta = "etrend";
    keresesMukodtetSzuroben(szuroFajta, etrendLista,etrendSearch, etrendDropdown, kivalasztottEtrend);
    elrejtAdatotKeresesiTalalatokKattintasra(szuroFajta, etrendLista,etrendSearch, etrendDropdown, kivalasztottEtrend);
}

function inicializalasKonyhat(){
    let konyhaSearch = document.getElementById("konyhaSearch");
    let konyhaDropdown = document.getElementById("konyhaDropdown");
    let konyhaLista = document.getElementById("konyhaLista");
    let kivalasztottKonyha = document.getElementById("kivalasztottKonyha");
    const szuroFajta = "konyha"
    keresesMukodtetSzuroben(szuroFajta, konyhaLista,konyhaSearch, konyhaDropdown, kivalasztottKonyha);
    elrejtAdatotKeresesiTalalatokKattintasra(szuroFajta, konyhaLista,konyhaSearch, konyhaDropdown, kivalasztottKonyha);
}


function letrehozListaElemet(szuroAdatok, szuroLista,szuroKereses, szuroDropdown, kivalasztottSzuro, szuroFajta) {
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
            hozzaadKivalasztottSzurot(szuroAdatok, kivalasztottSzuro, szuroFajta);
        } else {
            eltavolitKivalasztottAdatot(szuroAdatok, szuroLista,szuroKereses, szuroDropdown, kivalasztottSzuro);
        }
    });
    
    return div;
}


function keresesMukodtetSzuroben(szuroFajta,szuroKereses, szuroDropdown) {
    szuroKereses.addEventListener("input", function() {
        inditsKeresestSzurobenKategoriak(szuroFajta,szuroKereses, szuroDropdown);
    });
    szuroKereses.addEventListener("focus", function() {
        inditsKeresestSzurobenKategoriak(szuroFajta, szuroKereses, szuroDropdown);
    });
}


function inditsKeresestSzurobenKategoriak(szuroFajta, szuroKereses, szuroDropdown) {
    let keresesiKifejezes = szuroKereses.value.toLowerCase();
    
    if (keresesiKifejezes) {
        kategoriakListajanakGeneralasa();
        szuresiFunkcio(keresesiKifejezes, szuroFajta);
        szuroDropdown.style.display = "block";
    } else {
        szuroDropdown.style.display = "none";
    }
}

function szuresiFunkcio(keresesiKifejezes, szuroFajta) {
    let listaElemei = document.querySelectorAll("#"+szuroFajta+"Lista .dropdown-item");
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

    let dropdownMenu = document.getElementById(szuroFajta+"Lista");
    let nincsTalalatElem = document.getElementById("nincsTalalat"+szuroFajta);

    if (!talalatVan) {
        if (!nincsTalalatElem) {
            nincsTalalatElem = document.createElement("div");
            nincsTalalatElem.id = "nincsTalalat"+szuroFajta;
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



function hozzaadKivalasztottSzurot(szuroAdatok, kivalasztottSzuro, szuroFajta) {
    if (!document.getElementById("kivalasztott-"+szuroFajta + szuroAdatok)) {

        // div létrehozása
        let div = document.createElement("div");
        div.classList.add("kivalasztott-tag", "badge", "bg-danger", "me-2", "mb-2");
        div.id = "kivalasztott-" +szuroFajta+ szuroAdatok;
        div.textContent = szuroAdatok;

        // x törlés gomb hozzáadása
        let removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("btn-close", "btn-close-white", "ms-2");
        removeBtn.setAttribute("aria-label", "Törlés");
        removeBtn.addEventListener("click", function () {
            eltavolitKivalasztottAdatot(szuroAdatok);
            document.getElementById("checkbox-" + szuroFajta+szuroAdatok).checked = false;
        });

        div.appendChild(removeBtn);
        kivalasztottSzuro.appendChild(div);
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
    alapanyagNelkulListajanakGeneralasa();
}

function eltavolitKivalasztottAdatotAlapanyagNelkul(szuroAdatok) {
    let tag = document.getElementById("kivalasztott-alapanyagNelkul-" + szuroAdatok);
    if (tag) {
        tag.remove();
    }
    alapanyagListajanakGeneralasa();
}


function receptKereses(){
    const recipeSearchInput = document.getElementById('text_kereses');
    const searchButton = document.getElementById('button_kereses');
    
    if (recipeSearchInput && searchButton) {
      // Keresés gomb kattintáskor
      searchButton.addEventListener('click', filterReceptek);
    }
}

// Eseményfigyelő a keresőmezőhöz
document.addEventListener("DOMContentLoaded", receptKereses);
  



window.addEventListener("load", nehezsegFigyel)
document.getElementById("nehezsegInput").addEventListener("change", nehezsegFigyel)
//window.addEventListener("load", alapanyagLista);
window.addEventListener("load", function() {
    kartyaBetoltes(); // Alapértelmezett kártyák betöltése az oldal betöltésekor
});

window.addEventListener("load", arFigyel);
window.addEventListener("load", idoFigyel);
window.addEventListener("load", kaloriaFigyel);
window.addEventListener("load", adagFigyel);
document.addEventListener("DOMContentLoaded", inicializalasKategoriat);
document.addEventListener("DOMContentLoaded", inicializalasEtrendet);
document.addEventListener("DOMContentLoaded", inicializalasKonyhat);
document.addEventListener("DOMContentLoaded", inicializalasAlapanyagot);
document.addEventListener("DOMContentLoaded", inicializalasAlapanyagNelkul);
window.addEventListener("load", etrendListaLeker);
window.addEventListener("load", konyhaListaLeker);
window.addEventListener("load", alapanyagListaLeker);
window.addEventListener("load", kategoriakListaLeker)
//document.getElementById("button_kereses").addEventListener("click", kereses)
