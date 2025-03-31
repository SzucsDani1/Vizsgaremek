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

window.addEventListener("load", async function(){
    await felhasznaloIdLeker();
    await jogosultsagLeker(felhasznalo_id, document.getElementById("navbarUl"));
})

document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);
