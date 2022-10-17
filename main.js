let nbAleatoire = Math.floor(Math.random() * 100) + 1;
let nbEssai = 0;

const prompt = require("prompt-sync")();

console.log("Un nombre aléatoire a été choisit !")
console.log(nbAleatoire);

console.log();

let nbChoisit = prompt("Entrez un nombre entre 1 et 99 : ");

if (nbChoisit != null) {
  console.log(`Vous avez choisit le nombre : ` + nbChoisit + `\n`);
  nbEssai++;
} 

while(nbAleatoire != nbChoisit) {

  if (nbChoisit > nbAleatoire) {
    console.log("Le nombre choisit est trop haut !");
  } 
  
  if (nbChoisit < nbAleatoire) {
    console.log("Le nombre choisit est trop bas !\n");
  } 

  console.log();
  nbChoisit = prompt("Entrez un nombre entre 1 et 99 : ");

  if (nbChoisit != null) {
    console.log(`Vous avez choisit le nombre : ` + nbChoisit + `\n`);
    nbEssai++;
  } 

}

if (nbChoisit == nbAleatoire) {
  console.log();
  console.log("Bravo, vous avez trouvé ! Nombre de coups : " + nbEssai);
} 

