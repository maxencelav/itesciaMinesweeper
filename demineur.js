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

            var mine = document.createAttribute("possedeMine");
            mine.value = "false";
            cell.setAttributeNode(mine);

            var mine = document.createAttribute("id");
            mine.value = "bouton" + i + "." + j;
            cell.setAttributeNode(mine);


            //Si on clique sur une case
            cell.onclick = function () {

                //console.log("clic de " + $(this).attr('id'))

                clicCellule($(this).attr('id').replace(/[^\d.-]/g, ''));
            };

            //Si on clique droit sur une case
            cell.oncontextmenu = function () {
                console.log("clic droit de " + $(this).attr('id'))
                $(this).toggleClass("flag")
                return false; // cancel default menu
            };
        }
    }
    ajouterMines();


}

function nouvellePartie() {
    secondes = 0;
    minutes = 0;
    nombreCases = 0;
    //Lancement du chronomètre
    chronoStart();
    genererGrille($('#selectionDifficulte').find(":selected").val())

}

function ajouterMines(value) {
    switch (value) {
        case '0':
            nombreBombes = 9;
            break;

        case '1':
            nombreBombes = 16;
            break;

        case '2':
            nombreBombes = 22;
            break;

        case '3':
            nombreBombes = 30;
            break;

        default:
            nombreBombes = 9;
            break;

    }
    for (var i = 0; i < nombreBombes; i++) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grille.rows[row].cells[col];
        cell.setAttribute("possedeMine", "true");
    }
}

function clicCellule(id) {
    console.log("traitement de la case: " + id)
    let coordCellules = id.split(".")
    console.log(coordCellules)

    // vérifier si case a la possedemine="true"
}

function clicDroitCellule(id) {
    console.log("drapeau sur la case: " + id)
    let coordCellules = id.split(".")

    let idBouton = 'bouton' + coordCellules[0] + '.' + coordCellules[1]
    console.log("#" + idBouton)
    //$('#' + idBouton).attr("class", "flag")
    $('' + idBouton).remove()

}

function bombesAdjacentes(coordCellules) {}