<?php 
    function bejelentHiba($uzenet, $hibae){
        if(!empty($uzenet) && $hibae == true){
        echo "
            <div class='alert alert-danger text-center' role='alert'>
                $uzenet
            </div>
            ";
        }
        else{
            echo "
            <div class='alert alert-success text-center' role='alert'>
                $uzenet
            </div>
            ";
        }
    }
?>