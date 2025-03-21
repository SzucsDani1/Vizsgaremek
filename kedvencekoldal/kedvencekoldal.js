let kategoriak = [];
let receptek = [];
let hozzavalok = [];
let felhasznalo_id = 5;
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
    let feltolt = await fetch("./adatbazisInterakciok/bevasarlolistaleker",{
      method : "POST",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({
          "felhasznalo_id" : felhasznalo_id
      })
  })

  let valasz = await feltolt.json();
  if(feltolt.ok){
    //console.log(valasz[0].hozzavalo);
    accordionGeneral(valasz, divAccordion);
    //console.log(valasz.valasz);
    
  }
  else{
    console.log(valasz.valasz);

  }
  } catch (error) {
    console.log(error);
  }
}

function accordionGeneral(hozzavalok, divAccordion){
  
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



window.addEventListener("load", kedvencReceptLeker)
//window.addEventListener("load", segedFuggvenyInditashoz);

 
