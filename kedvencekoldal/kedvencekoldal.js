let kategoriak = [];
//let receptek = [];
//let hozzavalok = [];
let felhasznalo_id = 6;
let receptek_id = 1;




async function receptLeker(){
    try {
        let leker = await fetch("./adatbazisInterakciok/receptleker",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_id" : receptek_id
            })
        });
        
        if(leker.ok){
            let receptekLista = await leker.json();
            for(let recept of receptekLista){
              receptek.push(recept);
            }
            console.log(receptek);
            receptMegjelenit();
            receptInfoList();
        }
        else{
            let receptekLista = await leker.json();
            console.log(receptekLista.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}


/*async function hozzavalokLeker(){
  try {
    let leker = await fetch("./adatbazisInterakciok/hozzavalokleker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "recept_id" : receptek_id
        })
    });
    
    let hozzavalokLista = await leker.json();

    if(leker.ok){
      console.log(hozzavalok);
      for(let hozzavalo of hozzavalokLista){
        hozzavalok.push(hozzavalo);
      }
      hozzavalokTablazatGeneral();
    }
    else{
        console.log(hozzavalokLista.valasz);
    }
} catch (error) {
    console.log(error);
}
}

*/


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
      divContainer.classList = "alert alert-danger text-center";
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
  if(lekerHozzavalok.ok && lekerHozzavalok.ok){
    //console.log(valasz[0].hozzavalo);
    console.log(valaszReceptek);
    accordionGeneral(valaszHozzavalok, valaszReceptek,divAccordion);
    //console.log(valasz.valasz);
    
  }
  else{
    console.log(valaszReceptek.valasz+"; "+ valaszHozzavalok.valasz);

  }
  } catch (error) {
    console.log(error);
  }
}

function accordionGeneral(hozzavalok, receptek,divAccordion){

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
      let divListGroupItem = document.createElement("div");
      divListGroupItem.classList = "list-group-item";

      let divTartalom = document.createElement("div");
      divTartalom.classList = "d-flex w-100 justify-content-between";

      let pHozzavalo = document.createElement("p");
      pHozzavalo.innerHTML = "Neve: "+hozzavalo.hozzavalo+" - "+hozzavalo.mennyiseg + " "+ hozzavalo.mertek_egyseg+" - "+hozzavalo.kategoria;

      let btnTorles = document.createElement("input");
      btnTorles.type = "button";
      btnTorles.value = "Törlés";
      btnTorles.classList = "btn btn-danger";
      btnTorles.id = hozzavalo.hozzavalo+"-"+hozzavalo.hozzavalok_id;

      divListGroup.appendChild(divListGroupItem);

      divListGroupItem.appendChild(divTartalom);

      divTartalom.appendChild(pHozzavalo);
      divTartalom.appendChild(btnTorles);

      /*let li = document.createElement("li");
      li.classList = "list-group-item";
      li.innerHTML = "Neve: "+hozzavalo.hozzavalo+" - "+hozzavalo.mennyiseg + " "+ hozzavalo.mertek_egyseg+" - "+hozzavalo.kategoria;
      
      divListGroup.appendChild(li);*/
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

 
