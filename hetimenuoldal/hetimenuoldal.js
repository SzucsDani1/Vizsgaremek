let index = 0;

async function receptek(){
    try {
        let leker = await fetch("./receptek");
        if(leker.ok){
            let receptek = await leker.json();
            receptekBetoltes(receptek);
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
    
}

async function napLeker(){
    try {
        let leker = await fetch("randomhetimenu.php");
        if(leker.ok){

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


window.addEventListener("load", receptek)








/*
document.addEventListener("DOMContentLoaded", async function () {
    try {
        let response = await fetch("random.php"); // A PHP script hívása
        if (!response.ok) throw new Error("Hálózati hiba!");

        let menu = await response.json();
        const days = ["hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat", "vasarnap"];
        const meals = ["reggeli", "ebéd", "vacsora"];
        
        days.forEach(day => {
            document.getElementById(`btn${capitalize(day)}`).addEventListener("click", () => {
                meals.forEach(meal => {
                    let mealData = menu[day][meal];
                    let mealDiv = document.getElementById(meal);
                    mealDiv.innerHTML = `<h4>${mealData.neve}</h4><img src='${mealData.kepek}' alt='${mealData.neve}' width='200'><p>${mealData.kaloria} kcal</p>`;
                });
            });
        });
    } catch (error) {
        console.error("Hiba történt: ", error);
    }
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}*/