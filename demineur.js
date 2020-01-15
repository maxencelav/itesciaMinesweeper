isXp = false;

function switchCss() {
    //console.log("isXP?: " + isXp);

    console.log(location.getUrlParameter('theme'))

    /*
        if (isXp) {
            $('head').append($('<link id="css" rel="stylesheet" href="style.css">'));
            $('head').remove($('<link id="css" rel="stylesheet" href="styleXp.css">'));
            location.reload()
            isXp = false;

        } else {
            $('head').remove($('<link id="css" rel="stylesheet" href="style.css">'));
            $('head').append($('<link id="css" rel="stylesheet" href="styleXp.css">'));
            location.reload()
            isXp = true;
        }
        
        */
}