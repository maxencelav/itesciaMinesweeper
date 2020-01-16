var timerTexte = document.getElementById('timer'),
    grille = document.getElementById("tableGrille"),
    isXp = false,
    secondes = 0,
    minutes = 0,
    nombreCases = 0;

//Detecte le fichier CSS et change à l'autre en fonction
function switchCss() {
    let origin = window.location.origin; //récupère le site ou on est (blabla.com)
    let theme = getUrlParameter('theme'); //on récupère la variable dans l'url (/?theme=xxx)

    if (theme == "xp") { //si on a indiqué qu'on voulait le thème xp
        location.replace(origin) //on recharge la page sans thème
    } else {
        location.replace(origin + "/?theme=xp") // on recharge la page avec thème
    }
}


function ajoutTemps() {

    secondes += 1; // on ajoute une seconde

    if (secondes >= 60) { // si on a 60 secondes
        secondes = 0; // on les remet à 0
        minutes++; //et on ajoute une minute
    }

    let timer = String(minutes).padStart(2, '0') + ":" + String(secondes).padStart(2, '0');
    // on force le texte à avoir deux chiffres minimum

    timerTexte.textContent = timer //on met le texte dans la balise timer

    attente(); // on attend une seconde
}

function attente() {
    timer = setTimeout(ajoutTemps, 1000);
    // on attend une seconde, puis on ajoute une seconde au compteur
}

function chronoStart() {
    clearInterval(timer); // on arrête l'attente
    attente(); // on lance l'attente
}

function genererGrille(value) {
    console.log(value) // on log la valeur de difficulté
    nombreCases = 0;
    let taille = 0; // on remet les variables à 0

    switch (value) {
        // on met en place la largeur/hauteur selon la difficulté
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
    while (grille.firstChild) { // tant que y'a des trucs dans la grille
        grille.removeChild(grille.firstChild)
        //on retire tous les éléments dans #grille
    }


    for (var i = 0; i < taille; i++) {
        // pour chaque ligne
        row = grille.insertRow(i); //on insère une ligne en HTML
        for (var j = 0; j < taille; j++) {
            //pour chaque colonne
            cell = row.insertCell(j);
            //on insère une colonne en HTML et donc une case

            nombreCases++; //on augemente le nombre de cases

            var mine = document.createAttribute("possedeMine");
            // on crée un attribut "possedemine"
            mine.value = "false"; // faux par défaut 
            cell.setAttributeNode(mine); // et on l'ajoute à la case


            var mine = document.createAttribute("id"); //on crée l'id de la case 
            mine.value = "bouton" + i + "." + j;
            // sous le format #bouton[ligne].[colonne]
            // 1re ligne/case = 0, pas 1
            cell.setAttributeNode(mine); // on l'ajoute à la case


            //Si on clique sur une case
            cell.onclick = function () {
                console.log("clic de " + $(this).attr('id'))

                clicCellule($(this).attr('id').replace(/[^\d.-]/g, ''));
                //on lance la fonction de clic en ne lui filant que [ligne].[colonne]
            };

            //Si on clique droit sur une case
            cell.oncontextmenu = function () {
                console.log("clic droit de " + $(this).attr('id'))
                $(this).toggleClass("flag")
                // on lui toggle la class flag
                // qui change l'image en drapeau si elle l'a pas (et inversement si elle l'a)
                return false; // on désactive le menu de clic droit par défaut
            };
        }
    }
    ajouterMines(value, taille); // à la fin de la génération du tableau on ajoute les mines


}

function nouvellePartie() {
    secondes = 0;
    minutes = 0;
    nombreCases = 0;
    //Lancement du chronomètre
    chronoStart();
    genererGrille($('#selectionDifficulte').find(":selected").val())

}

function ajouterMines(value, taille) {
    switch (value) {
        // on met en place le nombre de bombes selon la difficulté
        case '0':
            nombreBombes = 10;
            break;

        case '1':
            nombreBombes = 40;
            break;

        case '2':
            nombreBombes = 100;
            break;

        case '3':
            nombreBombes = 250;
            break;

        default:
            nombreBombes = 10;
            break;

    }

    // pour le nombre de bombes
    for (var i = 0; i < nombreBombes; i++) {

        var row = Math.floor(Math.random() * taille);
        var col = Math.floor(Math.random() * taille);
        // on génère des coordonnées aléatoires

        var cell = grille.rows[row].cells[col];
        console.log(cell);
        cell.setAttribute("possedeMine", "true");
        //on met l'attribut "possedemine" a true pour cette case
    }
}

function clicCellule(id) {
    console.log("traitement de la case: " + id)
    let coordCellules = id.split(".")
    // on sépare l'id en un array de deux cases, ligne et colonne

    console.log(coordCellules)

    // TODO
    // vérifier si case a la possedemine="true"
    // si false faire fonction check des 9 cases autour
    // avec bombesAdjacentes pour savoir la classe
}


function bombesAdjacentes(coordCellules) {
    let compteurBombes = 0;

    // TODO
    // pour les 9 cases autour de celle envoyées
    // regarder l'attribut "possedemine"
    // si "true", compteurBombes++;

    let classes = [ // liste de classes pour chaque nombre de bombes
        "empty", // 0   
        "one", // 1
        "two", // 2
        "three", // 3
        "four", // 4
        "five", // 5
        "six", // 6
        "seven", // 7
        "eight" // 8
    ]
    return classes[compteurBombes]; // return le nom de la classe correspondant au 
}