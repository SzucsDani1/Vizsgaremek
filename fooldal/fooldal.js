
async function receptekLeker(){
    try {
        let leker = await fetch("./legujabbreceptek");

        if(leker.ok){
            let legujabbReceptek = await leker.json();
            console.log(legujabbReceptek)
            let divContainer = document.getElementById("legujabbReceptekKartyak");

            legujabbReceptekBetoltes(legujabbReceptek, divContainer);
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
}


async function ajanlottReceptekLeker(){
    try {
        let leker = await fetch("./ajanlottreceptek");

        if(leker.ok){
            let ajanlottReceptek = await leker.json();
            console.log(ajanlottReceptek)
            let divContainer = document.getElementById("ajanlottReceptekKartyak");

            legujabbReceptekBetoltes(ajanlottReceptek, divContainer);
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
}


function receptekBetoltes(receptek, divContainer){
    divContainer.innerHTML = "";  

    let divRow = document.createElement("div");
    divRow.classList = "row";
    
    divContainer.innerHTML = "";

    divContainer.appendChild(divRow);


    for(let recept of receptek){
        let divCard = document.createElement("div");
        divCard.classList = "card col-12 col-lg-3 col-md-6 col-sm-12 p-2 mx-auto my-3"; 
        divCard.style = "width: 18rem;";
        divCard.id = recept.neve;

        let img = document.createElement("img");
        img.src = recept.kep;
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

        divRow.appendChild(divCard);

        divCard.appendChild(img);
        divCard.appendChild(divCardBody);

        divCardBody.appendChild(pJellemzok);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(br);
        divCardBody.appendChild(inputButton);
        divCardBody.appendChild(pFeltolto);

    }

}



async function kereses(){
    try {
        let keresesiSzoveg = document.getElementById("text_kereses").value.trim().toLowerCase(); 

        let keresesiTalalat = document.getElementById("keresesiTalalat");

        let leker = await fetch("./keresesrecept",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_neve" : keresesiSzoveg
            })
        });
        if(leker.ok){
            let receptek = await leker.json();
            legujabbReceptekBetoltes(receptek, keresesiTalalat);
        }
        else{
            let szoveg = await leker.json();
            keresesiTalalat.innerHTML = szoveg.valasz;
            keresesiTalalat.classList = "alert alert-danger text-center mx-auto my-3";
            keresesiTalalat.role = "alert";
            keresesiTalalat.style.width = "80%";

            let input = document.createElement("input");
            input.type = "button";
            input.classList = "btn-close position-absolute top-50 end-0 translate-middle-y me-3";
            input.setAttribute("data-bs-dismiss", "alert");
            input.setAttribute("aria-label", "Close");;

            keresesiTalalat.appendChild(input);
        }
    } catch (error) {
        console.log(error);
    }
}


document.getElementById("button_kereses").addEventListener("click", kereses)
window.addEventListener("load", receptekLeker)
window.addEventListener("load", ajanlottReceptekLeker)