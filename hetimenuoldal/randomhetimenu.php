<?php
session_start();
include "./sql_fuggvenyek.php";

function getRandomWeeklyMenu() {
    $menu = [];
    $napszakok = ['reggeli', 'ebéd', 'vacsora'];
    $napok = ['hetfo', 'kedd', 'szerda', 'csutortok', 'pentek', 'szombat', 'vasarnap'];
    
    foreach ($napok as $nap) {
        foreach ($napszakok as $napszak) {
            $query = "SELECT * FROM receptek WHERE napszak = '$napszak' ORDER BY RAND() LIMIT 1";
            $result = adatokLekerdezese($query);
            
            if (is_array($result) && !empty($result)) {
                $menu[$nap][$napszak] = $result[0];
            }
        }
    }
    
    return $menu;
}

// Ha még nincs heti menü generálva, hozzunk létre egyet és tároljuk session-ben
if (!isset($_SESSION['weekly_menu'])) {
    $_SESSION['weekly_menu'] = getRandomWeeklyMenu();
}

echo json_encode($_SESSION['weekly_menu'], JSON_UNESCAPED_UNICODE);
