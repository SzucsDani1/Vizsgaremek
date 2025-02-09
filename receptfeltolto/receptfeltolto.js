// A globális számlálót eltávolítjuk, mert mostantól minden táblázatnak saját számlálója lesz.
let kategoriaSzamlalo = 0;

function receptFeltolto(inputNev, inputMertekegyseg, inputMennyiseg, divTablazat) {
    // Elrejtjük a figyelmeztető üzenetet
    document.getElementById("figyelmezteto_uzenet").hidden = true;
    
    // Ha nincs minden mező kitöltve, figyelmeztetünk
    if (inputMennyiseg.value === "" || inputMertekegyseg.value === "" || inputNev.value === "") {
        document.getElementById("figyelmezteto_uzenet").innerHTML = "Kérem töltsön ki minden mezőt!";
        document.getElementById("figyelmezteto_uzenet").hidden = false;
        return;
    }
    
    let table, tbody, counter;
    
    if (divTablazat) {
        // Ha egy kategóriás filterboxban dolgozunk, keressük meg annak tartalmában a táblázatot
        table = divTablazat.querySelector("table");
        if (!table) {
            // Ha még nincs létrehozva, egyszer létrehozzuk a táblázatot
            table = document.createElement("table");
            table.classList = "table table-success";
            
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
            
            // Táblázat törzs létrehozása
            tbody = document.createElement("tbody");
            table.appendChild(tbody);
            
            // Hozzáadjuk a táblázatot a kategóriához tartozó divhez,
            // és inicializáljuk a saját számlálóját (kezdjük 1-el)
            table.dataset.counter = "1";
            divTablazat.appendChild(table);
        } else {
            tbody = table.querySelector("tbody");
        }
        counter = parseInt(table.dataset.counter, 10);
    } else {
        // Ha a fő hozzávalók filterboxról dolgozunk,
        // akkor a HTML-ben létező táblázatot használjuk
        table = document.getElementById("table_hozzavalok");
        tbody = document.getElementById("tbody_hozzavalok");
        table.hidden = false;
        // Ha még nincs számláló érték beállítva, inicializáljuk
        if (!table.dataset.counter) {
            table.dataset.counter = "1";
        }
        counter = parseInt(table.dataset.counter, 10);
    }
    
    // Új sor létrehozása a táblázathoz
    const trTbody = document.createElement("tr");
    
    const tdSzamlalo = document.createElement("td");
    tdSzamlalo.classList.add("szamlalo");
    tdSzamlalo.innerHTML = counter;
    
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
        // Az adott táblázatban újraszámozzuk a sorokat
        cellaUjraSzamlal(table);
        if (tbody.children.length === 0) {
            table.hidden = true;
        }
    });
    tdTorles.appendChild(tdTorlesGomb);
    
    // A sor celláinak összeállítása
    trTbody.appendChild(tdSzamlalo);
    trTbody.appendChild(tdHozzvaloNeve);
    trTbody.appendChild(tdHozzvaloMennyiseg);
    trTbody.appendChild(tdHozzvaloMertekegyseg);
    trTbody.appendChild(tdTorles);
    
    // Az új sor beszúrása a táblázat törzsébe
    tbody.appendChild(trTbody);
    
    // Frissítjük a táblázathoz tartozó számlálót
    counter++;
    table.dataset.counter = counter;
    
    // A mezők törlése a felhasználói élmény javítása érdekében
    inputNev.value = "";
    inputMennyiseg.value = "";
    inputMertekegyseg.value = "";
}

function cellaUjraSzamlal(table) {
    // Az adott táblázat törzsében újraszámozzuk az összes sorszámot
    const tbody = table.querySelector("tbody");
    let index = 1;
    for (const row of tbody.children) {
        const cell = row.querySelector(".szamlalo");
        cell.innerHTML = index;
        index++;
    }
    // Frissítjük a táblázathoz tartozó számlálót
    table.dataset.counter = index;
}


function kategoriaHozzaadasa() {
    const kategoriakKiir = document.getElementById("hozzavaloKategoriak");
    const divTablazat = document.createElement("div"); 

    // Figyelmeztető elem létrehozása, ha nem adnak nevet
    const divFigyelmeztet = document.createElement("div");
    divFigyelmeztet.classList = "alert alert-danger";
    divFigyelmeztet.role = "alert";
    divFigyelmeztet.innerHTML = "Kérem adjon nevet a Kategóriának!";
    divFigyelmeztet.hidden = true;
    divFigyelmeztet.id = "kategoriaFigyelmeztet" + kategoriaSzamlalo;

    const divFilterBox = document.createElement("div");
    divFilterBox.classList = "filter-box border p-3 bg-light rounded my-3";

    const btnTorlesKategoria = document.createElement("button");
    btnTorlesKategoria.type = "button";
    btnTorlesKategoria.classList = "btn btn-danger btn-sm mb-3";
    btnTorlesKategoria.innerHTML = "X";
    btnTorlesKategoria.addEventListener("click", function () {
        divFilterBox.remove();
        divFigyelmeztet.remove();
    });

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
    
    // A kategória filter box és figyelmeztető elem hozzáadása a konténerhez
    kategoriakKiir.appendChild(divFilterBox);
    kategoriakKiir.appendChild(divFigyelmeztet);
    // Itt hozzuk létre a hozzá tartozó táblázatot (amely majd saját számlálóval működik)
    kategoriakKiir.appendChild(divTablazat);

    // A filter box tartalomának összeállítása
    divFilterBox.appendChild(btnTorlesKategoria);
    divFilterBox.appendChild(h4);
    divFilterBox.appendChild(divRow);
    divRow.appendChild(divCols);
    divRow.appendChild(btn_hozzaad);
    divCols.appendChild(form);
    form.appendChild(input);
    form.appendChild(label);

    kategoriaSzamlalo++;

    // Ha a "Hozzáad" gombra kattintunk, az adott kategória átalakul Hozzávalókká
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
    // Töröljük a kategória név megadására szolgáló elemeket,
    // így a box tartalma átalakul csak Hozzávalókká
    divFilterBox.innerHTML = "";

    // Törlés gomb létrehozása (jobb felső sarokban) – a teljes Hozzávalók box törlésére
    const btnTorlesHozzavalo = document.createElement("button");
    btnTorlesHozzavalo.type = "button";
    btnTorlesHozzavalo.classList = "btn btn-danger btn-sm mb-3";
    btnTorlesHozzavalo.innerHTML = "X";
    btnTorlesHozzavalo.addEventListener("click", function () {
        divFilterBox.remove();
        divTablazat.remove();
    });
    divFilterBox.appendChild(btnTorlesHozzavalo);

    // Hozzávalók fejléc létrehozása
    const h4 = document.createElement("h4");
    h4.classList = "display-6 text-start";
    h4.innerHTML = "Hozzávalók";

    // Egy új sor a mezők számára
    const divRow = document.createElement("div");
    divRow.classList = "row";

    // Hozzávaló neve input
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

    // Hozzávaló mennyiség input
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

    // Hozzávaló mértékegység input
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

    // Hozzáadás gomb
    const btnHozzaad = document.createElement("button");
    btnHozzaad.type = "button";
    btnHozzaad.classList = "btn btn-success";
    btnHozzaad.innerHTML = "Hozzáad";

    // Összeállítjuk a hierarchiát
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


document.getElementById("btn_hozzaad").addEventListener("click", function () {
    // A fő hozzávalók esetén nincs saját divTablazat, így a receptFeltolto() a fő táblázatot használja
    const inputNev = document.getElementById("hozzavalo_neve");
    const inputMennyiseg = document.getElementById("hozzavalo_mennyiseg");
    const inputMertekegyseg = document.getElementById("hozzavalo_mertekegyseg");
    receptFeltolto(inputNev, inputMertekegyseg, inputMennyiseg);
});
document.getElementById("hozzaadKategoriaGomb").addEventListener("click", kategoriaHozzaadasa);
