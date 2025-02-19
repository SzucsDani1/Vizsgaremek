let index = 0;

async function receptek(){
    try {
        let leker = await fetch("./receptek");
        if(leker.ok){
            let receptek = await leker.json();
            kartyaBetoltes(receptek);
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
    
}


function kartyaBetoltes(receptek){
    let napszakok = new Set();
    for(let i of receptek){
        napszakok.add(i.napszak);
    }
    for(let napszak of napszakok){
        let divContainer = document.getElementById(napszak);
        divContainer.innerHTML = "";  

        let divRow = document.createElement("div");
        divRow.classList = "row";
        
        divContainer.innerHTML = "";

        divContainer.appendChild(divRow);


        //Kártya generálás
        let divCard = document.createElement("div");
        divCard.classList = "card col-12 col-lg-3 col-md-6 col-sm-12 p-2 mx-auto my-3"; 
        divCard.style = "width: 18rem;";
        divCard.id = receptek[index].neve;

        //Kép generálása
        let img = document.createElement("img");
        img.src = receptek[index].kepek;
        img.classList = "card-img-top";
        img.alt = receptek[index].neve;
        img.width = 250
        img.height = 200

        //Body rész generálása
        let divCardBody = document.createElement("div");
        divCardBody.classList = "card-body";

        let h5 = document.createElement("h5");
        h5.classList = "card-title";
        h5.innerHTML = receptek[0].neve;

        let pJellemzok = document.createElement("p");
        pJellemzok.classList = "text-body-secondary fw-light";
        pJellemzok.innerHTML = receptek[index].kaloria+" kcal | "+ receptek[index].nehezseg + " | " + receptek[index].ido + " perc | " + receptek[index].adag;

        //TODO
        /*let pCardText = document.createElement("card-text");
        pCardText.innerHTML = receptek.leiras;*/

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
        //divCardBody.appendChild(pCardText);
        divCardBody.appendChild(br);
        divCardBody.appendChild(inputButton);

        index++;
    }

}


window.addEventListener("load", receptek)