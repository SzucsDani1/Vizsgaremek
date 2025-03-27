<?php
// Betöltjük a session konfigurációs fájlt
require_once 'sessionConfig.php';

// Töröljük az összes session változót
$_SESSION = array();

// Ha van session cookie, azt is töröljük
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Megszüntetjük a session-t
session_destroy();

// Átirányítjuk a felhasználót a bejelentkező oldalra
header("Location: bejelentkezes.php");
exit();
?>
