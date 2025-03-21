
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

function kartyaGeneral(adatok){
    let kiirat = document.getElementById("receptek")
    console.log(adatok)

    let sor = document.createElement("div")
    sor.classList.add("row")

    for (const adat of adatok) {
        let a = document.createElement("a")
        let card = document.createElement("div")
        let img = document.createElement("img")      
        let cardbody = document.createElement("div")
        let cardtitle = document.createElement("h5")

        card.classList.add("card" )
        card.style = "width: 18rem; height: 18rem;"
        a.classList.add("col-sm-12", "col-md-6" , "col-lg-4" , "mb-4", "mx-2")
        a.style = "width: 18rem; height: 18rem; "

        img.classList.add("card-img-top")
        cardbody.classList.add("card-body")
        cardtitle.classList.add("card-title")
        
        cardtitle.innerHTML = adat["neve"]
        
        a.href = "https://github.com/SzucsDani1/Vizsgaremek";
        a.target = "_blank";

        cardbody.appendChild(cardtitle)
        card.appendChild(cardbody)
        a.appendChild(card)
        sor.appendChild(a)
    }
    kiirat.appendChild(sor)

}



window.addEventListener("load", elfogadandoReceptLeker)