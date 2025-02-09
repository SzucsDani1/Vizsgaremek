let szamlalo = 1;

function receptFeltolto() {
    document.getElementById("figyelmezteto_uzenet").hidden = true;

    const hozzavaloNeve = document.getElementById("hozzavalo_neve");
    const hozzavaloMennyiseg = document.getElementById("hozzavalo_mennyiseg");
    const hozzavaloMertekegyseg = document.getElementById("hozzavalo_mertekegyseg");
    const tbody = document.getElementById("tbody_hozzavalok");

    if (hozzavaloMennyiseg.value === "" || hozzavaloMertekegyseg.value === "" || hozzavaloNeve.value === "") {
        document.getElementById("figyelmezteto_uzenet").innerHTML = "Kérem töltsön ki minden mezőt!";
        document.getElementById("figyelmezteto_uzenet").hidden = false;
        return;
    }

    document.getElementById("table_hozzavalok").hidden = false;

    const tr = document.createElement("tr");

    const tdSzamlalo = document.createElement("td");
    const tdHozzvaloNeve = document.createElement("td");
    const tdHozzvaloMennyiseg = document.createElement("td");
    const tdHozzvaloMertekegyseg = document.createElement("td");
    const tdTorles = document.createElement("td");
    const tdTorlesGomb = document.createElement("button");

    tdSzamlalo.innerHTML = szamlalo;
    tdSzamlalo.classList.add("szamlalo");

    tdHozzvaloNeve.innerHTML = hozzavaloNeve.value;
    tdHozzvaloMennyiseg.innerHTML = hozzavaloMennyiseg.value;
    tdHozzvaloMertekegyseg.innerHTML = hozzavaloMertekegyseg.value;

    tdTorlesGomb.type = "button";
    tdTorlesGomb.classList = "btn btn-danger btn-sm";
    tdTorlesGomb.innerHTML = "Törlés";

    tdTorlesGomb.addEventListener("click", function () {
        tr.remove();
        cellaUjraSzamlal();
        if (tbody.children.length === 0) {
            document.getElementById("table_hozzavalok").hidden = true;
        }
    });

    tdTorles.appendChild(tdTorlesGomb);

    tr.appendChild(tdSzamlalo);
    tr.appendChild(tdHozzvaloNeve);
    tr.appendChild(tdHozzvaloMennyiseg);
    tr.appendChild(tdHozzvaloMertekegyseg);
    tr.appendChild(tdTorles);

    tbody.appendChild(tr);

    szamlalo++;
    hozzavaloNeve.value = "";
    hozzavaloMertekegyseg.value = "";
    hozzavaloMennyiseg.value = "";
}

function cellaUjraSzamlal() {
    const szamlaloCellak = document.querySelectorAll("#tbody_hozzavalok .szamlalo");
    let index = 1;
    
    for (const cell of szamlaloCellak) {
        cell.innerHTML = index;
        index++;
    }
    szamlalo = szamlaloCellak.length + 1;
}


document.getElementById("btn_hozzaad").addEventListener("click", receptFeltolto);
