let szamlalo = 1;

function receptFeltolto() {
    let hozzavaloNeve = document.getElementById("hozzavalo_neve");
    let hozzavaloMennyiseg = document.getElementById("hozzavalo_mennyiseg");
    let hozzavaloMertekegyseg = document.getElementById("hozzavalo_mertekegyseg");
    let tbody = document.getElementById("tbody_hozzavalok");

    let tr = document.createElement("tr");
    
    let tdSzamlalo = document.createElement("td");
    let tdHozzvaloNeve = document.createElement("td"); 
    let tdHozzvaloMennyiseg = document.createElement("td"); 
    let tdHozzvaloMertekegyseg = document.createElement("td"); 

    console.log(hozzavaloMennyiseg.value)

    tdSzamlalo.innerHTML = szamlalo;
    tdHozzvaloNeve.innerHTML = hozzavaloNeve.value;
    tdHozzvaloMennyiseg.innerHTML = hozzavaloMennyiseg.value;
    tdHozzvaloMertekegyseg.innerHTML = hozzavaloMertekegyseg.value;

    tr.appendChild(tdSzamlalo);
    tr.appendChild(tdHozzvaloNeve);
    tr.appendChild(tdHozzvaloMennyiseg);
    tr.appendChild(tdHozzvaloMertekegyseg);

    tbody.appendChild(tr);

    szamlalo++;
    vanTablazat();
}

function vanTablazat() {
    let tbody = document.getElementById("tbody_hozzavalok");
    if (tbody.children.length > 0) {
        document.getElementById("table_hozzavalok").hidden = false;
    } else {
        document.getElementById("table_hozzavalok").hidden = true;
    }
}

document.getElementById("btn_hozzaad").addEventListener("click", receptFeltolto);
window.addEventListener("load", vanTablazat);