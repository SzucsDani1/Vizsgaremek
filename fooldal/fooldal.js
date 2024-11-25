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


function kartyaBetoltes(){
    let divContainer = document.getElementById("kartyak");
    let szamlalo = 0

    let divRow = document.createElement("div");
    divRow.classList = "row";

    divContainer.appendChild(divRow);

    for(let recept of receptek){
        //Kártya generálás
        let divCard = document.createElement("div");
        divCard.classList = "card col-12 col-lg-3 col-md-6 col-sm-12 p-2 mx-auto my-3"; 
        divCard.style = "width: 18rem;";

        let img = document.createElement("img");
        img.src = recept.kep;
        img.classList = "card-img-top";
        img.alt = recept.nev;
        img.width = 250
        img.height = 200

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


window.addEventListener("load", kartyaBetoltes);