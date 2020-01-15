isXp = false;

function switchCss() {
    let theme = getUrlParameter('theme');

    if (theme == "xp") {
        $('head').append($('<link id="css" rel="stylesheet" href="styleXp.css">'));
    } else {
        $('head').append($('<link id="css" rel="stylesheet" href="style.css">'));
    }

}