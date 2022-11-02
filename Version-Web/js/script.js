var trialsNumber = 0;
var entree = document.getElementById("enter");
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

boutonValider.onclick = function () {
    afficheMessage();
}

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
    if (isNaN(proposition)) {
        nouveauMessage = "Erreur de saisie";
    } else {
        trialsNumber++;
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