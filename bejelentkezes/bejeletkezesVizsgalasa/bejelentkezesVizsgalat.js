function bejelenzkezesVizsg(){
    
    let felhasznaloId = cookieLekeres("bejelentkezetFelhasznaloId")
    let oldalTeljesElerese = window.location.pathname

    let megnyitottOldal = oldalTeljesElerese.substring(oldalTeljesElerese.lastIndexOf('/') + 1)
    
    if(felhasznaloId == ""){ //van e bejelentkezet felhasználó
        if (megnyitottOldal != "bejelentkezes.php") {
           window.open("bejelentkezes.php", "_self");
        }
    }
    else{
        if (megnyitottOldal != "tesztOldal.html") {
            window.open("tesztOldal.html", "_self");
        }
    }
}


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