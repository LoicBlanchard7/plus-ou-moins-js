var charNameMax = 12;
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
var randomNumber = Math.floor(Math.random() * 2) + 1;
butonSaveScore.disabled=true;
var listScore = document.getElementById("score");

butonDeleteScore.onclick = function () {
    deleteScore();
}

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

butonSaveScore.onclick = function() {
    takeName();
}

afficheHighscore();

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
        switch (compare(proposition)) {
            case -1:
                nouveauMessage = "C'est moins";
                break;
            case 0:
                nouveauMessage = "Bravo ! Vous avez trouvé en : " + trialsNumber + " essai(s). <br> Vous pouvez maintenant enregistrer votre Score !";
                butonSaveScore.disabled=false;

                break;
            case 1:
                nouveauMessage = "C'est plus";
                break;
        }
    }

        
    entree.value = "";
    resultat.innerHTML = nouveauMessage;
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

    if (nameTemp!= null && nameTemp != ' ') {
        nouveauMessage = "Votre score est enregistré !";
        saveScore();
    } else {
        nouveauMessage = "Entre un pseudo valide !";
    }

    messageName.innerHTML = nouveauMessage;
}

function saveScore() {
    localStorage.setItem(name.value, trialsNumber);
    afficheHighscore();
}

function deleteScore() {
    localStorage.clear();
    afficheHighscore();
}

function afficheHighscore() {
    listScore.innerHTML = "";

    let sortScore = [];

    for( let i = 0; i < localStorage.length; i++){
        sortScore.push([localStorage.key(i), localStorage.getItem(localStorage.key(i))]);
    }

    sortScore.sort(function(a, b) {
        return a[1] - b[1];
    });

    for( let i = 0; i < sortScore.length; i++){
        listScore.innerHTML += i+1 + " - Pseudo : " + sortScore[i][0] + " - Score : " + sortScore[i][1] + "<br>";
    }

    for( let i = 0; i < sortScore.length; i++){
        if(sortScore[i][0] == name.value && sortScore[i][1] == trialsNumber) {
            place.innerHTML = "Vous êtes à la place numéro : " + (i+1);
        }

    }

    console.log(sortScore);

}