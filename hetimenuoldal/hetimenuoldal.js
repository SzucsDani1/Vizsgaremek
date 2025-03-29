let index = 0;
const napok = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
const napszakok = ["reggeli","tízórai","ebéd", "uzsonna", "vacsora"];
async function receptek(){
    try {
        let leker = await fetch("./adatbazisInterakciok/hetimenuleker");
        if(leker.ok){
            let receptek = await leker.json();
            let kiiratasok = document.getElementsByName("hetNapjai");
            //receptekBetoltes(receptek);
            for (let kiirat of kiiratasok) {
                kiirat.addEventListener("change", function() {
                    receptekBetoltes(receptek);
                });
            }
            receptekBetoltes(receptek);
            
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



  function receptekBetoltes(receptek) {
    const kivalasztottNap = document.querySelector('input[name="hetNapjai"]:checked')?.value;
    
    const napszakok = ["reggeli", "tízórai", "ebéd", "uzsonna", "vacsora"];
    
    for (let napszak of napszakok) {
        let receptMegjelenit = document.getElementById(napszak + "Megjelenites");
        if (receptMegjelenit) {
            receptMegjelenit.innerHTML = "";
        }
    }
    
    let receptekNapszakja = {};
    for (let napszak of napszakok) {
        receptekNapszakja[napszak.toUpperCase()] = [];
    }
    
    for (let recept of receptek) {
        if (receptekNapszakja.hasOwnProperty(recept.napszak)) {
            receptekNapszakja[recept.napszak].push(recept);
        }
    }
    
    for (let napszak of napszakok) {
        let kivalasztottReceptek = receptekNapszakja[napszak.toUpperCase()];
        if (kivalasztottReceptek.length > kivalasztottNap) {
            let kivalasztottRecept = kivalasztottReceptek[kivalasztottNap];
            let receptMegjelenit = document.getElementById(napszak + "Megjelenites");
            
            let divCard = document.createElement("div");
            divCard.classList = "card col-12 col-lg-3 p-2 col-md-6 col-sm-12 mx-auto my-3";
            divCard.style = "width: 18rem;";
            divCard.id = kivalasztottRecept.neve;
            
            let img = document.createElement("img");
            img.src = kivalasztottRecept.kepek || "";
            img.classList = "card-img-top";
            img.alt = kivalasztottRecept.neve;
            img.width = 250;
            img.height = 200;
            
            let divCardBody = document.createElement("div");
            divCardBody.classList = "card-body";
            
            let h5 = document.createElement("h5");
            h5.classList = "card-title";
            h5.innerHTML = kivalasztottRecept.neve;
            
            let pJellemzok = document.createElement("p");
            pJellemzok.classList = "text-body-secondary fw-light";
            pJellemzok.innerHTML = kivalasztottRecept.kaloria + " kcal | " + kivalasztottRecept.nehezseg + " | " + kivalasztottRecept.ido + " perc";
            
            let br = document.createElement("br");
            
            let inputButton = document.createElement("input");
            inputButton.type = "button";
            inputButton.classList = "btn btn-warning";
            inputButton.value = "Részletek";
            
            let pFeltolto = document.createElement("p");
            pFeltolto.classList = "text-body-secondary fw-light mt-2";
            pFeltolto.innerHTML = kivalasztottRecept.felhnev + "\t|\t" + kivalasztottRecept.mikor_feltolt;
            
            divCardBody.appendChild(h5);
            divCardBody.appendChild(pJellemzok);
            divCardBody.appendChild(br);
            divCardBody.appendChild(inputButton);
            divCardBody.appendChild(pFeltolto);
            
            divCard.appendChild(img);
            divCard.appendChild(divCardBody);
            
            receptMegjelenit.appendChild(divCard);
        }
    }
}



window.addEventListener("load", function(){
    receptek();
    hetNapjaLeker();
})
