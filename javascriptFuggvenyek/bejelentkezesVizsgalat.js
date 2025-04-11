
async function bejelenzkezesVizsg(){
    let felhasznaloId
    await fetch('../adatbazisInterakciok/sessionLekerFelhasznaloId') 
    .then(response => response.text())  
    .then(id => {
    if (id) {
        felhasznaloId = id;
    } 
    })
    .catch(error => console.error('Error fetching session data:', error));
    
 

    let oldalTeljesElerese = window.location.pathname

    let megnyitottOldal = oldalTeljesElerese.substring(oldalTeljesElerese.lastIndexOf('/') + 1)
    console.log(felhasznaloId.trim() );
    console.log(megnyitottOldal);
    if(felhasznaloId == "" || felhasznaloId.trim() == "No id"){ //van e bejelentkezet felhasználó
        console.log("asdf")
        if (megnyitottOldal != "bejelentkezes.php") {
           window.open("../bejelentkezes/bejelentkezes.php", "_self");
        }
    }
    else{
        if (megnyitottOldal == "bejelentkezes.php") {
            window.open("../fooldal/fooldal.php", "_self");
        }
    }
}

window.addEventListener("load",bejelenzkezesVizsg); 

