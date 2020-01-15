var timerTexte = document.getElementById('timer'),
    grille = document.getElementById("tableGrille"),
    isXp = false,
    secondes = 0,
    minutes = 0,
    nombreCases = 0;

//Detecte le fichier CSS et change à l'autre en fonction
function switchCss() {
    let origin = window.location.origin;
    let theme = getUrlParameter('theme');

    if (theme == "xp") {
        location.replace(origin)
    } else {
        location.replace(origin + "/?theme=xp")
    }
}


function ajoutTemps() {

    secondes += 1;

    if (secondes >= 60) {
        secondes = 0;
        minutes++;
    }

    let timer = String(minutes).padStart(2, '0') + ":" + String(secondes).padStart(2, '0');
    timerTexte.textContent = timer
    attente();
}

function attente() {
    timer = setTimeout(ajoutTemps, 1000);
}

function chronoStart() {
    clearInterval(timer);
    start = Date.now();

    console.log("start " + start)
    tempsDernierLap = start;

    attente();
}

function genererGrille(value) {
    console.log(value)
    nombreCases = 0;
    let taille = 0;

    switch (value) {
        case '0':
            console.log("debutant");
            taille = 9;
            break;

        case '1':
            console.log("intermediaire")
            taille = 16;
            break;

        case '2':
            console.log("expert")
            taille = 22;
            break;

        case '3':
            console.log("maitre")
            taille = 30;
            break;

        default:
            console.log("invalide, on met debutant")
            taille = 9;
            break;

    }

    //vidage de la table
    while (grille.firstChild) {
        grille.removeChild(grille.firstChild)
    }


    for (var i = 0; i < taille; i++) {
        row = grille.insertRow(i);
        for (var j = 0; j < taille; j++) {
            nombreCases++;
            cell = row.insertCell(j);
            cell.onclick = function () {
                clicCellule(this);
            };
            var mine = document.createAttribute("possedeMine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    ajouterMines();


}

function nouvellePartie() {
    secondes = 0;
    minutes = 0;
    //Lancement du chronomètre
    chronoStart();
    genererGrille($('#selectionDifficulte').find(":selected").val())

}

function ajouterMines(value) {
    for (var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grille.rows[row].cells[col];
        cell.setAttribute("possedeMine", "true");
    }
}

function clicCellule() {

    console.log("clic de cellule")
}