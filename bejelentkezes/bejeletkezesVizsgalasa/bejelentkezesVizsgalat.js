
async function bejelenzkezesVizsg(){
    let felhasznaloId
    await fetch('./backendBejelentkezes/sessionGetFelhasznaloId.php')  // Fetch the PHP script
          .then(response => response.text())  // Get the response as text
          .then(id => {
        if (id) {
          felhasznaloId = 0;//itt id van 0 helyett
        }
    })
    .catch(error => console.error('Error fetching session data:', error));
    
 

    let oldalTeljesElerese = window.location.pathname

    let megnyitottOldal = oldalTeljesElerese.substring(oldalTeljesElerese.lastIndexOf('/') + 1)
    
    if(felhasznaloId == ""){ //van e bejelentkezet felhasználó
        if (megnyitottOldal != "bejelentkezes.php") {
           window.open("bejelentkezes.php", "_self");
        }
    }
    else{
        if (megnyitottOldal == "bejelentkezes.php") {
            window.open("tesztOldal.html", "_self");
        }
    }
}
//? felhasznalonev

function cookieLekeres(neve){ //megkeresi a cookieban a bejelentkezet felhasználó id-ját
    let nev = neve + "=";
    let cookiek = decodeURIComponent(document.cookie);
    let ca = cookiek.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(nev) == 0) {
        return c.substring(nev.length, c.length);
      }
    }
    return "";
}

window.addEventListener("load",bejelenzkezesVizsg); 