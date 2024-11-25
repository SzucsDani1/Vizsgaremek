async function regisztracio(){
    let jelszo=document.getElementById("password").value;
    let jelszoBiztos =document.getElementById("passwordMegint").value;
    let felhasznalonev = document.getElementById("felhasznalonev").value;
    let email = document.getElementById("email").value;

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
        } catch (error) {
            console.log(error);
        }
    }
    else{
        alert("Kérem minden adatott töltsön ki!");
    }

}



document.getElementById("regisztral").addEventListener("click", regisztracio)