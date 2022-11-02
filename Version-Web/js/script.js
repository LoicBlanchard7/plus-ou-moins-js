var charNameMax = 10;
var maxScoreSave = 10;
var trialsNumberMax = 0;
var trialsNumber = 0;
var entree = document.getElementById("enter");
var essais = document.getElementById("essais");

var name = document.getElementById("name");
var place = document.getElementById("place");

var messageName = document.getElementById("messageName");
var boutonValider = document.getElementById("butonValid");
var butonSaveScore = document.getElementById("butonSaveScore");
var butonDeleteScore = document.getElementById("butonDeleteScore");

var resultat = document.getElementById("message");
var randomNumber = Math.floor(Math.random() * 100) + 1;
butonSaveScore.disabled = true;
var listScore = document.getElementById("score");

var butonChooseDifficulty = document.getElementById("butonChooseDifficulty");
var form = document.getElementById("difficultyCadre");

var butonReload = document.getElementById("butonReload");

boutonValider.disabled = true;

afficheHighscore();

butonDeleteScore.onclick = function () {
    deleteScore();
}

boutonValider.onclick = function () {
    afficheMessage();
}

butonReload.onclick = function () {
    location.reload();
}

function viewButonReload() {
    butonReload.type="button";
}

form.addEventListener("submit", function (event) {
    var data = new FormData(form);
    var output = "";
    for (const entry of data) {
        output = entry[1];
    };

    switch (output) {
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

butonSaveScore.onclick = function () {
    takeName();
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
    var trialsRemaining = trialsNumberMax - trialsNumber;

    if (trialsRemaining > 1) {
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
                    nouveauMessage = "Bravo ! Vous avez trouvé en : " + trialsNumber + " essai(s). <br> Vous pouvez maintenant enregistrer votre Score !";
                    butonSaveScore.disabled = false;
                    boutonValider.disabled = true;
                    break;
                case 1:
                    nouveauMessage = "C'est plus";
                    break;
            }
        }
        entree.value = "";
        resultat.innerHTML = nouveauMessage;
    } else {
        trialsNumber++;
        boutonValider.disabled = false;
        nouveauMessage = "Perdu ! Vous avez utilisé tout vos essais.";
    }
}

function difficultySelect() {
    butonChooseDifficulty.disabled = true;
    boutonValider.disabled = false;
    essais.innerHTML = "Il vous reste : " + (trialsNumberMax - trialsNumber) + " essais.";
}

function takeName() {
    var nameTemp = name.value;
    var nouveauMessage = "";
    nouveauMessage = nameTemp;

    if (nameTemp != null && nameTemp != ' ' && nameTemp.length < charNameMax) {
        nouveauMessage = "Votre score est enregistré ! <br> Pour rejouer, appuyez sur F5 ou appuyez sur Rejouer.";
        butonSaveScore.disabled = true;
        saveScore();
    } else {
        nouveauMessage = "Entre un pseudo valide ! (Maximum " + charNameMax + " caractères.";
    }

    messageName.innerHTML = nouveauMessage;
    name.value = "";
}

function saveScore() {
    localStorage.setItem(name.value, trialsNumber);
    afficheHighscore();
    viewButonReload();
}

function deleteScore() {
    localStorage.clear();
    afficheHighscore();
}

function afficheHighscore() {
    listScore.innerHTML = "";

    let sortScore = [];
    let maxHighscore;

    for (let i = 0; i < localStorage.length; i++) {
        sortScore.push([localStorage.key(i), localStorage.getItem(localStorage.key(i))]);
    }

    sortScore.sort(function (a, b) {
        return a[1] - b[1];
    });

    if(sortScore.length < maxScoreSave) {
        maxHighscore = sortScore.length;
    } else {
        maxHighscore = maxScoreSave;
    }

    for (let i = 0; i < maxHighscore; i++) {
        listScore.innerHTML += i + 1 + " - Pseudo : " + sortScore[i][0] + " - Score : " + sortScore[i][1] + "<br>";
    }

    for (let i = 0; i < sortScore.length; i++) {
        if (sortScore[i][0] == name.value && sortScore[i][1] == trialsNumber) {
            place.innerHTML = "Vous êtes à la place numéro : " + (i + 1);
        }
    }
}