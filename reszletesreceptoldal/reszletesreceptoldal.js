
// Frissíti a csillagok megjelenítését az adott értékelés alapján
function ertekelesMegjelenit() {
  const csillagok = document.querySelectorAll('.star');
  let ertekelesSzama = 3;
  for (const csillag of csillagok) {
      if (csillag.getAttribute('data-value') <= ertekelesSzama) {
      csillag.classList.add('filled');
      csillag.innerHTML = '&#9733;'; // kitöltött csillag
      } else {
      csillag.classList.remove('filled');
      csillag.innerHTML = '&#9734;'; // üres csillag
      }
  }
}
  
  
// Inicializálás az oldal betöltésekor
window.addEventListener('load', ertekelesMegjelenit);


/*function csillagErtekelo() {
    const csillagok = document.querySelectorAll('.star');
    const ertekelesEredmeny = document.getElementById('ertekeles-eredmeny');
    let ertekelesSzama = 0;
  
    // Frissíti a csillagok megjelenítését az adott értékelés alapján
    function frissitCsillagok(ertekelesSzama) {
      for (const csillag of csillagok) {
        if (csillag.getAttribute('data-value') <= ertekelesSzama) {
          csillag.classList.add('filled');
          csillag.innerHTML = '&#9733;'; // kitöltött csillag
        } else {
          csillag.classList.remove('filled');
          csillag.innerHTML = '&#9734;'; // üres csillag
        }
      }
    }
  
    for (const csillag of csillagok) {
      // Kattintáskor rögzítjük az értékelést
      csillag.addEventListener('click', function() {
        ertekelesSzama = csillag.getAttribute('data-value');
        frissitCsillagok(ertekelesSzama);
        ertekelesEredmeny.textContent = "Értékelés: " + ertekelesSzama + " csillag";
      });
  
    }
  }
  
  // Inicializálás az oldal betöltésekor
  document.addEventListener('DOMContentLoaded', csillagErtekelo);*/


