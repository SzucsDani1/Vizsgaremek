let kategoriak = [];
let felhasznalo_id = 6;


async function kedvencReceptLeker(){
  try {
    let divContainer = document.getElementById("kedvencReceptekKartyak");
    let leker = await fetch("./adatbazisInterakciok/kedvencreceptleker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "felhasznalo_id" : felhasznalo_id
        })
    });
    
    let eredmeny = await leker.json();
    console.log("Eredmény:" +eredmeny);
    if(eredmeny == "Nincs találat!"){
      divContainer.classList = "alert alert-warning text-center";
      divContainer.role = "alert";
      divContainer.innerHTML = "Nincs kedvenc recept!";
      
    }
    else if(leker.ok){
      receptekBetoltes(eredmeny, divContainer);
    }
    
} catch (error) {
    console.log(error);
}
}



async function bevasarloListaLeker(){
  try {
    let divAccordion = document.getElementById("accordionHozzavalok");
    let lekerHozzavalok = await fetch("./adatbazisInterakciok/bevasarlolistahozzavalokleker",{
      method : "POST",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          "felhasznalo_id" : felhasznalo_id
      })
  })

  let lekerReceptNev = await fetch("./adatbazisInterakciok/receptnevlekerbevasarlolistabol",{
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({
        "felhasznalok_id" : felhasznalo_id
    })
  })
  let valaszReceptek = await lekerReceptNev.json();
  let valaszHozzavalok = await lekerHozzavalok.json();
  if(valaszHozzavalok == "Nincs találat!" || valaszReceptek == "Nincs találat!"){
    divAccordion.classList = "alert alert-warning text-center";
    divAccordion.role = "alert";
    divAccordion.innerHTML = "Nincs a bevásárlólistában hozzávaló!";
    
  }
  else if (lekerHozzavalok.ok && lekerReceptNev.ok){
    accordionGeneral(valaszHozzavalok, valaszReceptek,divAccordion);
    console.log(valaszReceptek);

  }
  else{
    console.log(valaszReceptek.valasz+"; "+ valaszHozzavalok.valasz);
  }
  } catch (error) {
    console.log(error);
  }
}

function accordionGeneral(hozzavalok, receptek,divAccordion){
  divAccordion.innerHTML = "";
  for(let recept of receptek){
    let divAccordionItem = document.createElement("div");
    divAccordionItem.classList = "accordion-item";
    
    let h2AccordionHeader = document.createElement("h2");
    h2AccordionHeader.classList = "accordion-header";
    //Heading id megadása
    h2AccordionHeader.id = "panelLenyitvaHeading-"+recept.neve+"-"+recept.id;
  
    let btnLenyit = document.createElement("button");
    btnLenyit.classList = "accordion-button";
    btnLenyit.type = "button";
    btnLenyit.setAttribute("data-bs-toggle", "collapse");
    //ID megadása
    btnLenyit.setAttribute("data-bs-target", "#panelLenyitva-"+recept.neve+"-"+recept.id);
    btnLenyit.setAttribute("aria-expanded", "true");
    btnLenyit.setAttribute("aria-controls", "panelLenyitva-"+recept.neve+"-"+recept.id);
    btnLenyit.innerHTML = recept.neve;
  
    let divPanelLenyitva = document.createElement("div");
    divPanelLenyitva.id = "panelLenyitva-"+recept.neve+"-"+recept.id;
    divPanelLenyitva.classList = "ccordion-collapse collapse show";
    divPanelLenyitva.setAttribute("aria-labelledby", "panelLenyitvaHeading-"+recept.neve+"-"+recept.id);
  
    let divAccordionBody = document.createElement("div");
    divAccordionBody.classList = "accordion-body";

    let divListGroup = document.createElement("ul");
    divListGroup.classList = "list-group";
    for(let hozzavalo of hozzavalok){
      if(recept.id == hozzavalo.recept_id){
        let divListGroupItem = document.createElement("div");
        divListGroupItem.classList = "list-group-item";

        let divTartalom = document.createElement("div");
        divTartalom.classList = "d-flex w-100 justify-content-between";

        let pHozzavalo = document.createElement("p");
        pHozzavalo.innerHTML = "<b>Kategória:</b> "+hozzavalo.kategoria+" - <b>Neve:</b> "+hozzavalo.hozzavalo+" - "+hozzavalo.mennyiseg + " "+ hozzavalo.mertek_egyseg;

        let btnTorles = document.createElement("input");
        btnTorles.type = "button";
        btnTorles.value = "Törlés";
        btnTorles.classList = "btn btn-danger";
        btnTorles.id = hozzavalo.hozzavalo+"-"+hozzavalo.hozzavalok_id;
        //Törlés eseménykezelő
        btnTorles.addEventListener("click", function(){
          hozzavaloTorolAccordionbol(hozzavalo.hozzavalok_id);
          console.log("Hozzávaló: "+hozzavalo.hozzavalok_id)
        })

        divListGroup.appendChild(divListGroupItem);

        divListGroupItem.appendChild(divTartalom);

        divTartalom.appendChild(pHozzavalo);
        divTartalom.appendChild(btnTorles);
      }
    }
    divAccordion.appendChild(divAccordionItem);

    divAccordionItem.appendChild(h2AccordionHeader);
    divAccordionItem.appendChild(divPanelLenyitva);

    divPanelLenyitva.appendChild(divAccordionBody);

    divAccordionBody.appendChild(divListGroup);

    divPanelLenyitva.appendChild
    h2AccordionHeader.appendChild(btnLenyit);

  }
  
}

async function hozzavaloTorolAccordionbol(hozzavalok_id){
  try {
    let torol = await fetch("./adatbazisInterakciok/bevasarlolistatorol",{
      method : "DELETE",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          "hozzavalok_id" : hozzavalok_id,
          "felhasznalo_id" :felhasznalo_id
      })
    })

    if(torol.ok){
      bevasarloListaLeker();
    }
    else{
      let valasz = await torol.json();
      console.log(valasz.valasz);
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

      let inputButton = document.createElement("input");
      inputButton.type = "button";
      inputButton.classList = "btn btn-warning";
      inputButton.value = "Részletek";

      let pFeltolto = document.createElement("p");
      pFeltolto.classList = "text-body-secondary fw-light mt-2";
      pFeltolto.innerHTML = recept.felhnev + "\t|\t"+ recept.mikor_feltolt;

      let btnTorles = document.createElement("input");
      btnTorles.type = "button";
      btnTorles.id = "btn"+recept.neve;
      btnTorles.value = "Törlés";
      btnTorles.classList = "btn btn-danger w-100";
      
      btnTorles.addEventListener("click", function() {
        console.log("ID: "+recept.id);
        kedvencReceptTorles(recept.id)
      });

      divRow.appendChild(divCard);

      divCard.appendChild(img);
      divCard.appendChild(divCardBody);

      divCardBody.appendChild(pJellemzok);
      divCardBody.appendChild(h5);
      divCardBody.appendChild(br);
      divCardBody.appendChild(inputButton);
      divCardBody.appendChild(pFeltolto);
      divCardBody.appendChild(btnTorles);

  }

}

async function kedvencReceptTorles(id){
  try {
    let torol = await fetch("./adatbazisInterakciok/kedvencrecepttorol",{
      method : "DELETE",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          "receptek_id" : id,
          "felhasznalo_id" :felhasznalo_id
      })
    })
    
    if(torol.ok){
      console.log("Sikeres törlés!");
      kedvencReceptLeker();
    }
    else{
      let valasz = await torol.json();
      alert(valasz.valasz);
    }
  } catch (error) {
    console.log(error);
  }
}


function alertMegjelenit(uzenet, hibae, alertBox, progress){

    let duration = 5000; // 5 seconds
    let step = 5; // update every 100ms
    let width = 100;
    progress.hidden = false;
    alertBox.hidden = false;
    alertSzamlalo++;
    if(hibae == true){
      progress.style.background = "red";
      alertBox.classList = "alert alert-danger text-center";
    }
    else{
      progress.style.background = "green";
      alertBox.classList = "alert alert-success text-center";
    }
    alertBox.innerHTML = uzenet;
    if(alertSzamlalo > 1){
      return;
    }
    let interval = setInterval(() => {
        width -= (100 / (duration / step));
        progress.style.width = width + '%';
        if (width <= 0) {
            clearInterval(interval);
            alertBox.hidden = true;
            progress.hidden = true;
            alertSzamlalo = 0;
        }
    }, step);
  
}



window.addEventListener("load", function(){
  kedvencReceptLeker();
  bevasarloListaLeker();
})
//window.addEventListener("load", segedFuggvenyInditashoz);

 
