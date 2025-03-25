import {receptekBetoltes} from "./kartyageneralas.js"

async function receptekLeker(){
    try {
        let leker = await fetch("./adatbazisInterakciok/legujabbreceptek");

        if(leker.ok){
            let legujabbReceptek = await leker.json();
            console.log(legujabbReceptek)
            let divContainer = document.getElementById("legujabbReceptekKartyak");

            receptekBetoltes(legujabbReceptek, divContainer);
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
}


async function ajanlottReceptekLeker(){
    try {
        let leker = await fetch("./adatbazisInterakciok/ajanlottreceptek");

        if(leker.ok){
            let ajanlottReceptek = await leker.json();
            console.log(ajanlottReceptek)
            let divContainer = document.getElementById("ajanlottReceptekKartyak");

            receptekBetoltes(ajanlottReceptek, divContainer);
        }
        else{
            console.log(leker.status);
        }
    } catch (error) {
        console.log(error);
    }
}



async function kereses(){
    try {
        let keresesiSzoveg = document.getElementById("text_kereses").value.trim().toLowerCase(); 

        let keresesiTalalat = document.getElementById("keresesiTalalat");

        let leker = await fetch("./adatbazisInterakciok/keresesrecept",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "recept_neve" : keresesiSzoveg
            })
        });
        if(leker.ok){
            let receptek = await leker.json();
            receptekBetoltes(receptek, keresesiTalalat);
        }
        else{
            let szoveg = await leker.json();
            keresesiTalalat.innerHTML = szoveg.valasz;
            keresesiTalalat.classList = "alert alert-danger text-center mx-auto my-3";
            keresesiTalalat.role = "alert";
            keresesiTalalat.style.width = "80%";
        }
    } catch (error) {
        console.log(error);
    }
}


document.getElementById("button_kereses").addEventListener("click", kereses)
window.addEventListener("load", receptekLeker)
window.addEventListener("load", ajanlottReceptekLeker)