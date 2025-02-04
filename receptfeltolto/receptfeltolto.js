let szamlalo = 1;

function receptFeltolto() {
    const hozzavaloNeve = document.getElementById("hozzavalo_neve");
    const hozzavaloMennyiseg = document.getElementById("hozzavalo_mennyiseg");
    const hozzavaloMertekegyseg = document.getElementById("hozzavalo_mertekegyseg");
    const tbody = document.getElementById("tbody_hozzavalok");

    const tr = document.createElement("tr");
    
    const tdSzamlalo = document.createElement("td");
    const tdHozzvaloNeve = document.createElement("td"); 
    const tdHozzvaloMennyiseg = document.createElement("td"); 
    const tdHozzvaloMertekegyseg = document.createElement("td"); 

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