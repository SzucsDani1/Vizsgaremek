let tablazat = false;

function receptFeltolto(){
    tablazat = true;
    vanTablazat()
    const hozzavaloNeve = document.getElementById("hozzavalo_neve");
    const hozzavaloMennyiseg = document.getElementById("hozzavalo_mennyiseg");
    const hozzavaloMertekegyseg = document.getElementById("hozzavalo_mertekegyseg");
    const tbody = document.getElementById("tbody hozzavalok");

    const tr = document.createElement("tr");


}


function vanTablazat(){
    if(tablazat == true){
        document.getElementById("table_hozzavalok").hidden = false;
    }
    else{
        document.getElementById("table_hozzavalok").hidden = true;
    }
}

document.getElementById("btn_hozzaad").addEventListener("click", receptFeltolto);
window.addEventListener("load", vanTablazat)