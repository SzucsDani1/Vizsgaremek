export async function kijelentkezes(){
    let felhasznaloId
    await fetch("../bejelentkezes/backendBejelentkezes/sessionGetFelhasznaloId.php")  
          .then(response => response.text())  
          .then(id => {
        if (id) {
          felhasznaloId = id;
        }
    })
    .catch(error => console.error('Error fetching session data:', error));
    
 
    let oldalTeljesElerese = window.location.pathname

    let megnyitottOldal = oldalTeljesElerese.substring(oldalTeljesElerese.lastIndexOf('/') + 1)
      if (megnyitottOldal != "bejelentkezes.php") {
        window.open("../bejelentkezes/bejelentkezes.php", "_self");
      }
}
