export function receptekBetoltes(receptek, divContainer, kedvencOldalE, felhasznalo_id){
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

        let div = document.createElement("div");
        div.classList = "mx-auto"
        div.style.height = "230px";
        div.style.width = "250px"

        let img = document.createElement("img");
        img.src = "../receptfeltolto/adatbazisInterakciok/"+recept.kepek;
        img.classList = "card-img-top";
        img.alt = recept.neve;
        img.style.maxWidth = "250px";
        img.style.maxHeight = "230px";

        let divCardBody = document.createElement("div");
        divCardBody.classList = "card-body text-center";

        let h5 = document.createElement("h5");
        h5.classList = "card-title";
        h5.innerHTML = recept.neve;

        let pJellemzok = document.createElement("p");
        pJellemzok.classList = "text-body-secondary fw-light";
        pJellemzok.innerHTML = recept.kaloria+" kcal | "+ recept.nehezseg + " | " + recept.ido + " perc";

        let br = document.createElement("br");
        let btnTorles = kedvencOldalE == true ? document.createElement("input") : "";
        if(kedvencOldalE == true){
            
            btnTorles.type = "button";
            btnTorles.id = "btn"+recept.neve;
            btnTorles.value = "Törlés";
            btnTorles.classList = "btn btn-danger w-100 mt-2";
            
            btnTorles.addEventListener("click", async function() {
                try {
                    let torol = await fetch("../adatbazisInterakciok/kedvencrecepttorol",{
                      method : "DELETE",
                      headers : {
                          "Content-Type" : "application/json"
                      },
                      body : JSON.stringify({
                          "receptek_id" : recept.id,
                          "felhasznalo_id" :felhasznalo_id
                      })
                    })
                    
                    if(torol.ok){
                      console.log("Sikeres törlés!");
                      //kedvencReceptLeker();
                      //receptekBetoltes(receptek, divContainer, true, felhasznalo_id);
                      window.location.reload()
                    }
                    else{
                      let valasz = await torol.json();
                      alert(valasz.valasz);
                    }
                  } catch (error) {
                    console.log(error);
                  }
            });
        }
        
        let inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.classList = "btn btn-warning";
        inputButton.value = "Részletek";
        inputButton.id = "btn"+recept.neve
        inputButton.addEventListener("click", function(){
            window.location.href = "../reszletesreceptoldal/reszletesreceptoldal.php?receptek_id=" + recept.id;
        })

        let pFeltolto = document.createElement("p");
        pFeltolto.classList = "text-body-secondary fw-light mt-2";
        pFeltolto.innerHTML = recept.felhnev + "\t|\t"+ recept.mikor_feltolt;

        divRow.appendChild(divCard);

        divCard.appendChild(div);
        div.appendChild(img);
        divCard.appendChild(divCardBody);

        divCardBody.appendChild(pJellemzok);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(br);
        divCardBody.appendChild(inputButton);
        if(kedvencOldalE == true){
          divCardBody.appendChild(btnTorles);
        }
        divCardBody.appendChild(pFeltolto);

    }

}
