import {alertMegjelenit} from "../javascriptFuggvenyek/alertmegjelenit.js";


async function regisztracio(){
    let jelszo=document.getElementById("Regpassword").value;
    let jelszoBiztos =document.getElementById("RegpasswordMegint").value;
    let felhasznalonev = document.getElementById("Regfelhasznalonev").value;
    let email = document.getElementById("Regemail").value;

    let alertBox = document.getElementById("regisztracioAlert");
    let progressBar = document.getElementById("regisztracioProgressBar");

    if(jelszo.trim().length != 0 && jelszoBiztos.trim().length != 0  && felhasznalonev.trim().length != 0 && email.trim().length != 0 && jelszo == jelszoBiztos){
      
        try {
            let kuldes = await fetch("./backendBejelentkezes/regisztracio.php", {
                method: "POST",
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    felhnev: felhasznalonev,
                    email: email,
                    jelszo : jelszo
                })
            })
            let valasz = await kuldes.json();
            console.log(valasz)
            alert(valasz["message"]);
            if(valasz["message"] == "Sikeres regisztráció!"){
                torol()
            }
        } catch (error) {
            console.log(error);
        }
    }
    else{
        //alert("Kérem minden adatott helyesen töltsön ki!");
        alertMegjelenit("Kérem minden adatott helyesen töltsön ki!", true, alertBox, progressBar);
    }

}

function torol(){
    location.reload(true);
}

document.getElementById("regisztral").addEventListener("click", regisztracio)