var charNameMax = 12;
var maxScoreSave = 10;
var trialsNumberMax = 0;
var trialsNumber = 0;
var entree = document.getElementById("enter");
var essais = document.getElementById("essais");
var boutonValider = document.getElementById("butonValid");
var resultat = document.getElementById("message");
var randomNumber = Math.floor(Math.random() * 2) + 1;

var butonChooseDifficulty = document.getElementById("butonChooseDifficulty");
var form = document.getElementById("difficultyCadre");

boutonValider.disabled = true;


boutonValider.onclick = function () {
    afficheMessage();
}

form.addEventListener("submit", function(event) {
    var data = new FormData(form);
    var output = "";
    for (const entry of data) {
      output = entry[1];
    };

    switch(output) {
        case "":
            logDifficulty.innerHTML = "Choissisez un niveau de difficulté valide !";
        case "Facile":
            trialsNumberMax = 15;
            difficultySelect();
            logDifficulty.innerHTML = "Niveau de difficulté choisit : facile !";
        break;
        case "Moyen":
            trialsNumberMax = 11;
            difficultySelect();
            logDifficulty.innerHTML = "Niveau de difficulté choisit : moyen !";

        break;
        case "Difficile":
            trialsNumberMax = 8;
            difficultySelect();
            logDifficulty.innerHTML = "Niveau de difficulté choisit : difficile !";
        break;
    }

    event.preventDefault();
  }, false);

function compare(value) {
    var retour = 0;
    if (value > randomNumber) { retour = -1; }
    if (value < randomNumber) { retour = 1; }
    return retour;
}

function afficheMessage() {
    var proposition = parseInt(entree.value);
    var nouveauMessage = "";
    var trialsRemaining = trialsNumberMax - trialsNumber;

    if(trialsRemaining>1) {
        if (isNaN(proposition)) {
            nouveauMessage = "Erreur de saisie";
        } else {
            trialsNumber++;
            essais.innerHTML = "Il vous reste : " + (trialsNumberMax - trialsNumber) + " essais.";
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
    } else {
        trialsNumber++;
        boutonValider.disabled = true;
        nouveauMessage = "Perdu ! Vous avez utilisé tout vos essais.";
    }

        
    entree.value = "";
    resultat.innerHTML = nouveauMessage;
}

function difficultySelect() {
    butonChooseDifficulty.disabled = true;
    boutonValider.disabled = false;
    essais.innerHTML = "Il vous reste : " + (trialsNumberMax - trialsNumber) + " essais.";
}