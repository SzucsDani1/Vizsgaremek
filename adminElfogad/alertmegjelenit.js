let alertSzamlalo = 0;


export function alertMegjelenit(uzenet, hibae, alertBox){

    let duration = 5000; // 5 seconds
    let step = 5; // update every 100ms
    let width = 100;

    alertBox.hidden = false;
    alertSzamlalo++;
    if(hibae == true){
 
      alertBox.classList = "alert alert-danger text-center";
    }
    else{
     
      alertBox.classList = "alert alert-success text-center";
    }
    alertBox.innerHTML = uzenet;
    if(alertSzamlalo > 1){
      return;
    }
    let interval = setInterval(() => {
        width -= (100 / (duration / step));
        
        if (width <= 0) {
            clearInterval(interval);
            alertBox.hidden = true;
    
            alertSzamlalo = 0;
        }
    }, step);
  
}
