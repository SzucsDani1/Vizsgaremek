<?php
session_start();

    // Check if the session variable 'userpicture' is set
    if (isset($_SESSION['profilkep'])) {
        echo $_SESSION['profilkep']; // Output the session value (user's picture path)
}   else {
    echo 'No picture set'; // Fallback if no picture is set
}
?>