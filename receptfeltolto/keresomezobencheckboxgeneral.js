import { etrendListajanakGeneralasa } from './receptfeltolto.js';


export function letrehozListaElemet(szuroAdat, szuroTipus) {
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

export function beallitSzurok() {
    szuroBeallit("kategoriak");
    szuroBeallit("alapanyag");
    szuroBeallit("alapanyagNelkul");
    szuroBeallit("etrend");
    szuroBeallit("konyha");
}