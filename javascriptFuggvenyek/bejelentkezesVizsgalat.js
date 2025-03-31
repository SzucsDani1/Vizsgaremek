
async function bejelenzkezesVizsg(){
    let felhasznaloId
    await fetch('../adatbazisInterakciok/sessionLekerFelhasznaloId')  // Fetch the PHP script
    .then(response => response.text())  // Get the response as text
    .then(id => {
    if (id) {
        felhasznaloId = id;
    } 
    })
    .catch(error => console.error('Error fetching session data:', error));
    
 

    let oldalTeljesElerese = window.location.pathname

    let megnyitottOldal = oldalTeljesElerese.substring(oldalTeljesElerese.lastIndexOf('/') + 1)
    if(felhasznaloId == "" || felhasznaloId == "Kijelentkezve"){ //van e bejelentkezet felhasználó
        if (megnyitottOldal != "bejelentkezes.php") {
           window.open("bejelentkezes.php", "_self");
        }
    }
    else{
        if (megnyitottOldal == "bejelentkezes.php") {
            window.open("../fooldal/fooldal.php", "_self");
        }
    }
}
//? felhasznalonev

window.addEventListener("load",bejelenzkezesVizsg); 

