/**
 * Efface l’écran de la console * @return void
 */
function cls() {
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        system('cls');
    } else {
        system('clear');
    }
}