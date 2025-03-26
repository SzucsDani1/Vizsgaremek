let alertSzamlalo = 0;


export function alertMegjelenit(uzenet, hibae, alertBox, progress){

    let duration = 5000; // 5 seconds
    let step = 5; // update every 100ms
    let width = 100;
    progress.hidden = false;
    alertBox.hidden = false;
    alertSzamlalo++;
    if(hibae == true){
      progress.style.background = "red";
      alertBox.classList = "alert alert-danger text-center";
    }
    else{
      progress.style.background = "green";
      alertBox.classList = "alert alert-success text-center";
    }
    alertBox.innerHTML = uzenet;
    if(alertSzamlalo > 1){
      return;
    }
    let interval = setInterval(() => {
        width -= (100 / (duration / step));
        progress.style.width = width + '%';
        if (width <= 0) {
            clearInterval(interval);
            alertBox.hidden = true;
            progress.hidden = true;
            alertSzamlalo = 0;
        }
    }, step);
  
}