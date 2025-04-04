import {receptekBetoltes} from "../javascriptFuggvenyek/kartyageneralas.js";
import {kijelentkezes} from "../javascriptFuggvenyek/kijelentkezes.js";
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
        let leker = await fetch("../adatbazisInterakciok/kijelentkezes");
        if(leker.ok){
            kijelentkezes();
        }
    } catch (error) {
        console.log(error);
    }
}


async function receptekLeker(){
    try {
        let leker = await fetch("../adatbazisInterakciok/legujabbreceptek");

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
        let leker = await fetch("../adatbazisInterakciok/ajanlottreceptek");

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
        if(keresesiSzoveg == ""){
            return;
        }
        let keresesiTalalat = document.getElementById("keresesiTalalat");
        keresesiTalalat.innerHTML = "";
        keresesiTalalat.classList = "mx-auto"
        keresesiTalalat.role = "";
        let leker = await fetch("../adatbazisInterakciok/keresesrecept",{
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


async function inditas(){
    await felhasznaloIdLeker();
    await receptekLeker();
    await ajanlottReceptekLeker();
    await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
}

window.addEventListener("load", inditas());
document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);