var trialsNumber = 0;
var entree = document.getElementById("enter");
var boutonValider = document.getElementById("butonValid");
var resultat = document.getElementById("message");
var randomNumber = Math.floor(Math.random() * 2) + 1;

boutonValider.onclick = function () {
    afficheMessage();
}

function compare(value) {
    var retour = 0;
    if (value > randomNumber) { retour = -1; }
    if (value < randomNumber) { retour = 1; }
    return retour;
}

function afficheMessage() {
    var proposition = parseInt(entree.value);
    var nouveauMessage = "";
    if (isNaN(proposition)) {
        nouveauMessage = "Erreur de saisie";
    } else {
        trialsNumber++;
        switch (compare(proposition)) {
            case -1:
                nouveauMessage = "C'est moins";
                break;
            case 0:
                nouveauMessage = "Bravo ! Vous avez trouvé en : " + trialsNumber + " essai(s).";
                break;
            case 1:
                nouveauMessage = "C'est plus";
                break;
        }
    }
    entree.value = "";
    resultat.innerHTML = nouveauMessage;
}
