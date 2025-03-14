let kategoriak = new Set();
let alapanyagok = new Set();
let konyhak = new Set();
let etrendek = new Set();
let osszesReceptek = new Set();


async function filterReceptek() {
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

        const kategoriak = checkboxLekerdezes("kivalasztottKategoriak");
        const alapanyagok = checkboxLekerdezes("kivalasztottAlapanyagok");
        const alapanyagok_nelkul = checkboxLekerdezes("kivalasztottAlapanyagNelkul");
        const etrend = checkboxLekerdezes("kivalasztottEtrend");
        const konyha = checkboxLekerdezes("kivalasztottKonyha");

        const kereses = document.getElementById("text_kereses")?.value.trim() || "";
        

        // Napszak
        const NapszakCheckbox = document.querySelectorAll(".btn-check");
        const napszak = [];

        for (const checkbox of NapszakCheckbox) {
            if (checkbox.checked) {
                napszak.push(checkbox.value);
            }
        }
        
        // Ár
        const arInput = document.getElementById("arInput");
        let ar = null;
        if (arInput) {
            const arValue = parseInt(arInput.value);
            if (arValue === 1) ar = "Olcsó";
            else if (arValue === 2) ar = "Átlagos";
            else if (arValue === 3) ar = "Drága";
        }

        // Idő
        const idoInput = document.getElementById("idoInput");
        let ido = null;
        if (idoInput) {
            const idoValue = parseInt(idoInput.value);
            if (idoValue === 1) ido = 30;
            else if (idoValue === 2) ido = 60;
            else if (idoValue === 3) ido = 120;
        }
        
        // Kalória
        const kaloriaInput = document.getElementById("kaloriaInput");
        let kaloria = null;
        if (kaloriaInput) {
            const kaloriaValue = parseInt(kaloriaInput.value);
            if (kaloriaValue === 1) kaloria = 200;
            else if (kaloriaValue === 2) kaloria = 400;
            else if (kaloriaValue === 3) kaloria = 600;
            else if (kaloriaValue === 4) kaloria = 601;
        }
        
        // Adag
        const adagInput = document.getElementById("adagInput");
        const adag = adagInput && adagInput.value !== "0" ? parseInt(adagInput.value) : null;
        
        // Get difficulty level
        const nehezsegInput = document.getElementById("nehezsegInput");
        let nehezseg = null;
        if (nehezsegInput) {
            const nehezsegValue = parseInt(nehezsegInput.value);
            if (nehezsegValue === 1) nehezseg = "Könnyű";
            else if (nehezsegValue === 2) nehezseg = "Közepes";
            else if (nehezsegValue === 3) nehezseg = "Nehéz";
        }
        
        const body = {
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


        for (const index in body) {
            if (body[index] === null || (Array.isArray(body[index]) && !body[index].length)) {
                delete body[index];
            }
        }
        
        const response = await fetch("./szuresreceptek", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        
        if (response.ok) {
            const receptek = await response.json();
            kartyaBetoltes(receptek);
        } else {
            nincsTalalatKeresesre();
        }
    } catch (error) {
        console.log(error);
        nincsTalalatKeresesre(error)
    }
}

async function osszesRecept(){
    try{
        let eredmeny = await fetch("./osszesrecept");
        if(eredmeny.ok){
            const lista = await eredmeny.json();        
            kartyaBetoltes(lista);      
        }
        else{
            const lista = await eredmeny.json();      
            console.log(lista);
            console.log(eredmeny.status);
        }
    }
    catch(error){
        console.log(error);
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
    const recept = document.getElementById(kivalasztottRecept);
    if (!recept) return [];
    
    const kivalasztottCheckboxok = [];
    const checkboxok = recept.querySelectorAll(".kivalasztott-div");
    
    for (const checkbox of checkboxok) {
        const checkboxSzoveg = checkbox.textContent.trim().replace("×", "").trim();
        kivalasztottCheckboxok.push(checkboxSzoveg);
    }
    
    return kivalasztottCheckboxok;
}



function nincsTalalatKeresesre(error)
{
    document.getElementById("kartyak").innerHTML = "";
    let div = document.createElement("div");
    if(error.length != null){
        div.classList = "alert alert-warning text-center mx-auto my-3";
        div.role = "alert";
        div.innerHTML = error;
    }
    else{
        div.classList = "alert alert-warning text-center mx-auto my-3";
        div.role = "alert";
        div.innerHTML = "Nincs találat";
    }
    
    let btnBezar = document.createElement("input");
    btnBezar.type = "button";
    btnBezar.classList = "btn-close position-absolute top-50 end-0 translate-middle-y me-3";
    btnBezar.setAttribute("data-bs-dismiss", "alert");
    btnBezar.setAttribute("aria-label", "Close");

    document.getElementById("kartyak").appendChild(div);
    div.appendChild(btnBezar)
}


function kartyaBetoltes(receptek){
    let divContainer = document.getElementById("kartyak");
    divContainer.innerHTML = "";  

    let fieldset = document.createElement("fieldset");
    fieldset.classList = "mx-auto filter-box border p-3 bg-light rounded my-3";

    


    let divRow = document.createElement("div");
    divRow.classList = "row";
    
    divContainer.innerHTML = "";

    divContainer.appendChild(divRow);
    divContainer.appendChild(fieldset)

    if (receptek.length === 0) {
        divContainer.innerHTML = "<p class='text-center text-muted'>Nincs találat.</p>";
        let p = document.createElement("p");
        p.classList = "text-center text-muted";
        p.innerHTML = "Nincs találat";
        return;
    }

    for(let recept of receptek){
        let divCard = document.createElement("div");
        divCard.classList = "card col-12 col-lg-3 col-md-6 col-sm-12 p-2 mx-auto my-3"; 
        divCard.style = "width: 18rem;";
        divCard.id = recept.neve;

        let img = document.createElement("img");
        img.src = recept.kepek;
        img.classList = "card-img-top";
        img.alt = recept.neve;
        img.width = 250;
        img.height = 200;

        let divCardBody = document.createElement("div");
        divCardBody.classList = "card-body";

        let h5 = document.createElement("h5");
        h5.classList = "card-title";
        h5.innerHTML = recept.neve;

        let pJellemzok = document.createElement("p");
        pJellemzok.classList = "text-body-secondary fw-light";
        pJellemzok.innerHTML = recept.kaloria+" kcal | "+ recept.nehezseg + " | " + recept.ido + " perc | " + recept.adag + " adag";

        let br = document.createElement("br");

        let inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.classList = "btn btn-danger";
        inputButton.value = "Részletek";

        let pFeltolto = document.createElement("p");
        pFeltolto.classList = "text-body-secondary fw-light mt-2";
        pFeltolto.innerHTML = recept.felhnev + "\t|\t"+ recept.mikor_feltolt;

        fieldset.appendChild(divCard);

        divCard.appendChild(img);
        divCard.appendChild(divCardBody);

        divCardBody.appendChild(pJellemzok);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(br);
        divCardBody.appendChild(inputButton);
        divCardBody.appendChild(pFeltolto);

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
    label.classList.add("btn", "btn-outline-danger");
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
        div.classList.add("kivalasztott-div", "badge", "bg-danger", "me-2", "mb-2");
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
    const KeresesButton = document.getElementById("button_kereses");
    if (KeresesButton) {
        KeresesButton.addEventListener("click", filterReceptek);
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
    for (const checkbox of checkboxes) {
        checkbox.checked = false;
    }
    
    document.getElementById("arInput").value = 0;
    document.getElementById("arKiir").innerHTML = "Mind";

    document.getElementById("idoInput").value = 0;
    document.getElementById("idoKiir").innerHTML = "Mind";

    document.getElementById("kaloriaInput").value = 0;
    document.getElementById("kaloriaKiir").innerHTML = "Mind";

    document.getElementById("adagInput").value = 0;
    document.getElementById("adagKiir").innerHTML = "1 adag";

    document.getElementById("nehezsegInput").value = 0;
    document.getElementById("nehezsegKiir").innerHTML = "Mind";
    
    
    document.getElementById("kategoriakKereses").value = "";
    document.getElementById("alapanyagKereses").value = "";
    document.getElementById("alapanyagNelkulKereses").value = "";
    document.getElementById("etrendKereses").value = "";
    document.getElementById("konyhaKereses").value = "";
    
    filterReceptek();
}



document.addEventListener("DOMContentLoaded", function() {
    receptKereses();
    inicializalSzurok();
});

window.addEventListener("load", function() {
    arFigyel();
    idoFigyel();
    kaloriaFigyel();
    adagFigyel();
    nehezsegFigyel();
    etrendListaLeker();
    konyhaListaLeker();
    alapanyagListaLeker();
    kategoriakListaLeker();
    osszesRecept();
});
document.getElementById("btnSzures").addEventListener("click", filterReceptek);
document.getElementById("btnNullazas").addEventListener("click", szurokLenullazasa);
