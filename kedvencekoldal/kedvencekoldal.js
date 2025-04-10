import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
import {receptekBetoltes} from "../javascriptFuggvenyek/kartyageneralas.js";
import {jogosultsagLeker} from "../javascriptFuggvenyek/adminFelulet.js";


let felhasznalo_id;

async function felhasznaloIdLeker() {
  try {
    const response = await fetch('../bejelentkezes/backendBejelentkezes/sessionGetFelhasznaloId.php');
    if (response.ok) {
      felhasznalo_id = await response.text();
      console.log('Bejelentkezett felhasználó ID:', felhasznalo_id);
    } else {
      console.error('Hiba a felhasználó ID lekérése során');
    }
  } catch (error) {
    console.error('Hiba történt:', error);
  }
}



async function kijelentkezesLeker(){
    try {
        console.log("aaaa")
        let leker = await fetch("../adatbazisInterakciok/kijelentkezes");
        if(leker.ok){
            kijelentkezes();
        }
    } catch (error) {
        console.log(error);
    }
}


async function kedvencReceptLeker(){
  try {
    let divContainer = document.getElementById("kedvencReceptekKartyak");
    let leker = await fetch("../adatbazisInterakciok/kedvencreceptleker",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "felhasznalo_id" : felhasznalo_id
        })
    });
    
    let eredmeny = await leker.json();
    console.log("Eredmény:" +eredmeny.valasz);
    if(eredmeny.valasz == "Nincs találat!"){
      divContainer.classList = "alert alert-warning text-center";
      divContainer.role = "alert";
      divContainer.innerHTML = "Nincs kedvenc recept!";
      
    }
    else if(leker.ok){
      receptekBetoltes(eredmeny, divContainer, true, felhasznalo_id);
    }
    
} catch (error) {
    console.log(error);
}
}



async function bevasarloListaLeker(){
  try {
    let divAccordion = document.getElementById("accordionHozzavalok");
    let lekerHozzavalok = await fetch("../adatbazisInterakciok/bevasarlolistahozzavalokleker",{
      method : "POST",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          "felhasznalo_id" : felhasznalo_id
      })
  })

  let lekerReceptNev = await fetch("../adatbazisInterakciok/receptnevlekerbevasarlolistabol",{
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
  if(valaszHozzavalok.valasz == "Nincs találat!" || valaszReceptek.valasz == "Nincs találat!"){
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
        pHozzavalo.innerHTML = "<b>Kategória:</b> "+hozzavalo.kategoria+" - <b>Neve:</b> "+hozzavalo.hozzavalo+" - "+hozzavalo.mennyiseg*hozzavalo.adag + " "+ hozzavalo.mertek_egyseg;
        pHozzavalo.id = "list"+hozzavalo.neve+hozzavalo.kategoria;


        let btnTorles = document.createElement("input");
        btnTorles.type = "button";
        btnTorles.value = "Törlés";
        btnTorles.classList = "btn btn-danger";
        btnTorles.id = "btn"+hozzavalo.hozzavalo+"-"+hozzavalo.hozzavalok_id;
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
    let torol = await fetch("../adatbazisInterakciok/bevasarlolistatorol",{
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


async function indulas(){
  await felhasznaloIdLeker();
  await kedvencReceptLeker();
  await bevasarloListaLeker();
  await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
}
window.addEventListener("load", indulas())
document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);
 
