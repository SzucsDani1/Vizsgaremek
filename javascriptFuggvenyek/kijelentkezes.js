export async function kijelentkezes(){
    let felhasznaloId
    await fetch("../bejelentkezes/backendBejelentkezes/sessionGetFelhasznaloId.php")  // Fetch the PHP script
          .then(response => response.text())  // Get the response as text
          .then(id => {
        if (id) {
          felhasznaloId = id;//itt id van 0 helyett
        }
    })
    .catch(error => console.error('Error fetching session data:', error));
    
 
    let oldalTeljesElerese = window.location.pathname

    let megnyitottOldal = oldalTeljesElerese.substring(oldalTeljesElerese.lastIndexOf('/') + 1)
      if (megnyitottOldal != "bejelentkezes.php") {
        window.open("../bejelentkezes/bejelentkezes.php", "_self");
      }
}
