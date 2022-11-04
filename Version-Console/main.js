let randomNumber = Math.floor(Math.random() * 100) + 1;

let trialNumber = 0;
let trialNumberMax;

let namePlayerCharMax;
let namePlayerValid = false;
let namePlayer = "";

let playerPlace;
let sortTable = [];
let configTable = [];
let recordedScoreMax;

const prompt = require("prompt-sync")();
const fs = require('fs');
const readLine = require('readline');

configuration();

function configuration() {
  var file = './configuration.txt';
  var conf = readLine.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
  });

  conf.on('line', function (text) {
    configTable.push(text);

    if (configTable.length == 10) {
      run(configTable);
    }
  });
}

function run(configTable) {

  recordedScoreMax = configTable[1];
  namePlayerCharMax = configTable[3];

  console.log("======= Niveau de difficulté =======\n 1. Facile (" + configTable[5] + " essais maximum)\n 2. Moyen (" + configTable[7] + " essais maximum)\n 3. Difficile (" + configTable[9] + " essais maximum)");

  let difficultyLevel = prompt("Choississez un niveau de difficulté : ");

  while ((difficultyLevel < 0) || (difficultyLevel > 3)) {
    difficultyLevel = prompt("Choississez un niveau de difficulté valide : ");
  }

  switch (difficultyLevel) {
    case 1:
      trialNumberMax = configTable[6];
      break;
    case 2:
      trialNumberMax = configTable[8];
      break;
    case 3:
      trialNumberMax = configTable[10];
      break;
    default:
      break;
  }

  console.log("\nUn nombre aléatoire a été choisit !\n")
  console.log(randomNumber);

  let numberChoose = prompt("Entrez un nombre entre 1 et 99 : ");

  if (numberChoose != null) {
    console.log(`Vous avez choisit le nombre : ` + numberChoose + `\n`);
    trialNumber++;
  }

  while ((randomNumber != numberChoose) && (trialNumber < trialNumberMax)) {

    if (numberChoose > randomNumber) {
      console.log("Le nombre choisit est trop haut !");
    }

    if (numberChoose < randomNumber) {
      console.log("Le nombre choisit est trop bas !\n");
    }

    numberChoose = prompt("Entrez un nombre entre 1 et 99 : ");

    if (numberChoose != null) {
      console.log(`Vous avez choisit le nombre : ` + numberChoose + `\n`);
      trialNumber++;
    }
  }

  if (numberChoose == randomNumber) {
    console.log("Bravo, vous avez trouvé ! Nombre de coups : " + trialNumber + "\n");

    namePlayer = prompt("Entrez votre pseudo (maximum " + namePlayerCharMax + " caractères) : ");
    namePlayerValid = valideName(namePlayer);

    while (namePlayerValid == false) {
      namePlayer = prompt("Entrez un pseudo valide (maximum " + namePlayerCharMax + " caractères) : ");
      namePlayerValid = valideName(namePlayer);
    }

    fs.appendFile('highscore.txt', namePlayer + " : " + trialNumber + "\r\n", function (err) {
      if (err) throw err;

      sortScore(sortTable);

      for (let i = 0; i < sortTable.length; i++) {
        if ((sortTable[i][0] == namePlayer) && (sortTable[i][2] == trialNumber)) {
          playerPlace = i + 1;
        }
      }

      if (playerPlace < recordedScoreMax) {
        console.log('Score enregistré, merci !\n');
        console.log("Vous êtes à la place " + playerPlace + " du classement.\n");
      } else {
        console.log("Score trop bas, il ne s'affichera pas dans le classement, désolé.\n");
      }
    });

    var file = './highscore.txt';
    var rl = readLine.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });

    rl.on('line', function (text) {
      sortTable.push(text.split(' '));
    });
  } else {
    console.log("Nombre d'essai maximum atteint!\n");
  }
}

function sortScore(sortTable) {
  sortTable.sort((a, b) => {
    return a[2] - b[2];
  })

  var filePath = './highscoreTrie.txt';

  fs.unlink(filePath, function (err) {
    if (err) throw err;
  });

  var logger = fs.createWriteStream('highscoreTrie.txt', {
    flags: 'a'
  })

  for (let i = 0; i < sortTable.length; i++) {
    line = sortTable[i][0] + " : " + sortTable[i][2] + "\n";
    logger.write(line), function (err) {
      if (err) throw err;
    };
  }
}

function valideName(namePlayer) {
  if (namePlayer == "") {
    return false;
  } else if (namePlayer.length > namePlayerCharMax) {
    return false;
  } else if (namePlayer.includes(" ")) {
    return false;
  } else {
    return true;
  }
}