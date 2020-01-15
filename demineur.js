isXp = false;

function switchCss() {
    let origin = window.location.origin; // Returns base URL (https://example.com)
    let theme = getUrlParameter('theme');

    if (theme == "xp") {
        location.replace(origin)
    } else {
        location.replace(origin + "/?theme=xp")
    }

}