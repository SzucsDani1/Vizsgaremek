
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

document.getElementById("btnKijelentkezes").addEventListener("click", kijelentkezesLeker);
