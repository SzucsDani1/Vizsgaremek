export async function jogosultsagLeker(felhasznalo_id, ul){
    try {
        let lekerJog = await fetch("../adatbazisInterakciok/jogosultsag",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "felhasznalo_id" : felhasznalo_id
            })

        })
        let valasz = await lekerJog.json()
        if(lekerJog.ok){
            console.log(valasz);
            if(valasz[0].joga_id == 1){
                jogosultsagGeneral(ul)
            }
            else{
                return;
            }
        }
        else{
            console.log(valasz.valasz);
        }
    } catch (error) {
        console.log(error);
    }
}

function jogosultsagGeneral(ul){
    let li = document.createElement("li");
    li.classList = "nav-item  text-center";

    let a = document.createElement("a");
    a.classList = "nav-link";
    a.href = "../adminElfogad/adminElfogad.php";
    a.innerHTML = "Recept elfogadása";

    ul.appendChild(li);
    li.appendChild(a);
}