




async function elfogadandoReceptLeker() {
    try {
        let leker = await fetch("./adatbazisInterakciok/receptekNemElf");

        if(leker.ok){
            let adatok = await leker.json()
            kartyaGeneral(adatok)
        }
        else{
            console.log(leker)
        }
    } catch (error) {
        console.log(error)
    }
}

function kartyaGeneral(receptek){
    let kiirat = document.getElementById("receptek")
    console.log(receptek)

    let sor = document.createElement("div")
    sor.classList.add("row")

    for(let recept of receptek){
        let divCard = document.createElement("div");
        divCard.classList = "card col-12 col-lg-3 p-2 col-md-6 col-sm-12 mx-auto my-3"; 
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
        pJellemzok.innerHTML = recept.kaloria+" kcal | "+ recept.nehezseg + " | " + recept.ido + " perc";
  
        let br = document.createElement("br");
  

        let pFeltolto = document.createElement("p");
        pFeltolto.classList = "text-body-secondary fw-light mt-2";
        pFeltolto.innerHTML = recept.felhnev + "\t|\t"+ recept.mikor_feltolt;
  
        let btnTorles = document.createElement("input");
        btnTorles.type = "button";
        btnTorles.id = "btn"+recept.neve;
        btnTorles.value = "Részletek";
        btnTorles.classList = "btn btn-secondary w-100";
        
        /*
        btnTorles.addEventListener("click", function() {
          console.log("ID: "+recept.id);
            receptBetolt(recept.id);
        });
        */

        
        
  
        
  
        divCardBody.appendChild(pJellemzok);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(br);
        
        divCardBody.appendChild(pFeltolto);
        divCardBody.appendChild(btnTorles);

        divCard.appendChild(img);
        divCard.appendChild(divCardBody);
        
        sor.appendChild(divCard);
    }
  
    kiirat.appendChild(sor)

}



window.addEventListener("load", elfogadandoReceptLeker)