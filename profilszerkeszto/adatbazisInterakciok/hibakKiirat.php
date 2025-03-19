<?php 
    function bejelentHiba($uzenet, $hibae){
        if(!empty($uzenet) && $hibae == true){
        echo "
            <div id='egyeniAlert' class='alert alert-danger text-center' role='alert'>
                $uzenet
            </div>
            <div id='progressBar' style=' height: 5px; background: red; width: 100%;'></div>

             <script>
                let progress = document.getElementById('progressBar');
                let alertBox = document.getElementById('egyeniAlert');
                let duration = 5000; // 5 seconds
                let step = 10; // update every 100ms
                let width = 100;
                let interval = setInterval(() => {
                    width -= (100 / (duration / step));
                    progress.style.width = width + '%';
                    if (width <= 0) {
                        clearInterval(interval);
                        alertBox.remove();  
                    }
                }, step);
            </script>
            ";
        }
        else if(!empty($uzenet) && $hibae == false ){
            echo "
            <div id='egyeniAlert' class='alert alert-success text-center' role='alert'>
                $uzenet
            </div>
            <div id='progressBar' style='height: 5px; background: green; width: 100%;'></div>

             <script>
                let progress = document.getElementById('progressBar');
                let alertBox = document.getElementById('egyeniAlert');
                let duration = 5000; // 5 seconds
                let step = 10; // update every 100ms
                let width = 100;
                let interval = setInterval(() => {
                    width -= (100 / (duration / step));
                    progress.style.width = width + '%';
                    if (width <= 0) {
                        clearInterval(interval);
                        alertBox.remove();
                    }
                }, step);
            </script>
            ";
        }
        else{
            echo "
            <div id='egyeniAlert' class='alert alert-success text-center' role='alert'>
                Nem kapott üzenet/hibae értéket a php!
            </div>
            <div id='progressBar' style='height: 5px; background: red; width: 100%;'></div>

             <script>
                let progress = document.getElementById('progressBar');
                let alertBox = document.getElementById('egyeniAlert');
                let duration = 5000; // 5 seconds
                let step = 100; // update every 100ms
                let width = 100;
                let interval = setInterval(() => {
                    width -= (100 / (duration / step));
                    progress.style.width = width + '%';
                    if (width <= 0) {
                        clearInterval(interval);
                        alertBox.remove();
                    }
                }, step);
            </script>
            ";
        }
    }


?>