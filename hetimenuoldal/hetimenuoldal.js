let index = 0;
const napok = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
const napszakok = ["reggeli","tizorai","ebed", "uzsonna", "vacsora"];
async function receptek(){
    try {
        let leker = await fetch("./adatbazisInterakciok/hetimenuleker");
        if(leker.ok){
            let receptek = await leker.json();
            let kiiratasok = document.getElementsByName("hetNapjai");
            receptekBetoltes(receptek);
            for (let kiirat of kiiratasok) {
                kiirat.addEventListener("change", function() {
                    receptekBetoltes(receptek);
                });
            }
            
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
    
}

async function hetNapjaLeker(){
    try {
        let leker = await fetch("./adatbazisInterakciok/hetnapja");
        let nap = await leker.json();
        if(leker.ok){
            console.log(nap.valasz)
            document.getElementById("btn"+nap.valasz).checked = true;
        }
        else{
            console.log(nap.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}

function receptekBetoltes(receptek){
    let napSzamlalo = 0;
    let kivalasztottNap = document.querySelector('input[name="hetNapjai"]:checked')?.value;
    if (!kivalasztottNap || !receptek[kivalasztottNap]) {
        console.log("Hiba: "+kivalasztottNap);
        return;
    }
    for(let napszak of napszakok){
        if(receptek[kivalasztottNap].napszak == napszak){
            let hetimenuKiir = document.getElementById(napszak+"Megjelenites");
            hetimenuKiir.innerHTML = "";

            let divCard = document.createElement("div");
            divCard.classList = "card col-12 col-lg-3 p-2 col-md-6 col-sm-12 mx-auto my-3"; 
            divCard.style = "width: 18rem;";
            divCard.id = receptek[kivalasztottNap].neve;
    
            let img = document.createElement("img");
            img.src = ""//receptek[kivalasztottNap].kepek;
            img.classList = "card-img-top";
            img.alt = receptek[kivalasztottNap].neve;
            img.width = 250;
            img.height = 200;
    
            let divCardBody = document.createElement("div");
            divCardBody.classList = "card-body";
    
            let h5 = document.createElement("h5");
            h5.classList = "card-title";
            h5.innerHTML = receptek[kivalasztottNap].neve;
    
            let pJellemzok = document.createElement("p");
            pJellemzok.classList = "text-body-secondary fw-light";
            pJellemzok.innerHTML = receptek[kivalasztottNap].kaloria+" kcal | "+ receptek[kivalasztottNap].nehezseg + " | " + receptek[kivalasztottNap].ido + " perc";
    
            let br = document.createElement("br");
    
            let inputButton = document.createElement("input");
            inputButton.type = "button";
            inputButton.classList = "btn btn-warning";
            inputButton.value = "Részletek";
    
            let pFeltolto = document.createElement("p");
            pFeltolto.classList = "text-body-secondary fw-light mt-2";
            pFeltolto.innerHTML = receptek[kivalasztottNap].felhnev + "\t|\t"+ receptek[kivalasztottNap].mikor_feltolt;
    
    
            hetimenuKiir.appendChild(divCard);
    
            divCard.appendChild(img);
            divCard.appendChild(divCardBody);
    
            divCardBody.appendChild(pJellemzok);
            divCardBody.appendChild(h5);
            divCardBody.appendChild(br);
            divCardBody.appendChild(inputButton);
            divCardBody.appendChild(pFeltolto);

            napSzamlalo++;
        }
    }
  
  }


window.addEventListener("load", function(){
    receptek();
    hetNapjaLeker();
})
