async function regisztracio(){
    let jelszo=document.getElementById("Regpassword").value;
    let jelszoBiztos =document.getElementById("RegpasswordMegint").value;
    let felhasznalonev = document.getElementById("Regfelhasznalonev").value;
    let email = document.getElementById("Regemail").value;

    if(jelszo.trim().length != 0 && jelszoBiztos.trim().length != 0  && felhasznalonev.trim().length != 0 && email.trim().length != 0 && jelszo == jelszoBiztos){
      
        try {
            //./adatbazisInterakciok/adatbazisInterakciok.php
            let kuldes = await fetch("./adatbazisInterakciok/regisztracio.php", {
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
        alert("Kérem minden adatott helyesen töltsön ki!");
    }

}

function torol(){
    document.getElementById("Regpassword").value = "";
    document.getElementById("Regfelhasznalonev").value = "";
    document.getElementById("RegpasswordMegint").value = "";
    document.getElementById("Regemail").value = "";
}

document.getElementById("regisztral").addEventListener("click", regisztracio)