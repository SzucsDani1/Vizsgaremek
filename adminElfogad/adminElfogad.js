
import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
import {jogosultsagLeker} from "../javascriptFuggvenyek/adminFelulet.js";



async function elfogadandoReceptLeker() {
    try {
        let leker = await fetch("../adatbazisInterakciok/receptekNemElf");
        let kiirat = document.getElementById("receptek");
        kiirat.innerHTML = "";
        kiirat.classList = "text-center";
        kiirat.role = "";
        if(leker.ok){
            let adatok = await leker.json()
            console.log(adatok)
            kartyaGeneral(adatok)
        }
        else{
          
          kiirat.classList = "alert alert-warning text-center";
          kiirat.role = "alert";
          kiirat.innerHTML = "Nincs elfogadásra váró recept!"; 
          console.log("asd")
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
    if(receptek != "Nincs találat!"){
    for(let recept of receptek){
        let divCard = document.createElement("div");
        divCard.classList = "card col-12 col-lg-3 p-2 col-md-6 col-sm-12 mx-auto my-3"; 
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
        
        
        btnTorles.addEventListener("click", function() {
          window.location.href = `segitseg.php?recept_id=${recept.id}`;
        });
        

        
        
  
        
  
        divCardBody.appendChild(pJellemzok);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(br);
        
        divCardBody.appendChild(pFeltolto);
        divCardBody.appendChild(btnTorles);

        divCard.appendChild(div);
        div.appendChild(img);
        divCard.appendChild(divCardBody);
        
        sor.appendChild(divCard);
    }
  
        kiirat.appendChild(sor)
    }
    else{
        alertMegjelenit("Nincsen elfogadásra váró recept!", false)
    }
}

function alertMegjelenit(uzenet, hibae){
    let kiirat = document.getElementById("receptek")
    let alert = document.createElement("div")

    if(hibae == true){
      alert.classList = "alert alert-danger text-center";
    }
    else{
      alert.classList = "alert alert-success text-center";
    }
    alert.innerHTML = uzenet;
   
    kiirat.appendChild(alert)
}


async function kijelentkezesLeker(){
    try {
        let leker = await fetch("../adatbazisInterakciok/kijelentkezes");
        if(leker.ok){
            kijelentkezes();
        }
    } catch (error) {
        console.log(error);
    }
}

let felhasznalo_id
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


window.addEventListener("load", async function(){
    await felhasznaloIdLeker();
    await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
})

document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);



window.addEventListener("load" , elfogadandoReceptLeker)









