<?php
    session_set_cookie_params([
        'lifetime' => 2592000,  // egy hónap mp-ben (30 * 86400)
        'path' => '/',          // Elérhető legyen az aloldalokon
        'httponly' => false      // engedélyezi a JavaScript hozzáférést
    ]);
    session_start(); 
   
?>