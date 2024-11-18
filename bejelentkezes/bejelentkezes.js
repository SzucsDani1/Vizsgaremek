function regisztracio(){
    let jelszo=document.getElementById("password").value;
    let jelszoBiztos =document.getElementById("passwordMegint").value;
    let felhasznalonev = document.getElementById("felhasznalonev").value;
    let email = document.getElementById("email").value;

    if(jelszo.trim().length != 0 ||jelszoBiztos.trim().length != 0  ||felhasznalonev.trim().length != 0 ||email.trim().length != 0 ){

    }
    else{
        alert("Kérem minden adatott töltsön ki!");
    }

}



document.getElementById("regisztral").addEventListener("click", regisztracio)