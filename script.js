/**
 * Variable de Regex  pour vérifier la composition du mot ou de la lettre proposé
 */
let regmotADeviner = /^[a-z]+$/i;
let regpropositionLettre = /^[^a-zA-Z]+$/;
let regWhiteSpace = /^s+$/;
/**
 * Variable d'initialisation pour les fonctions ou pour pointer des éléments du HTML afin de changer le contenu
 */
let motADeviner;
let tabADeviner;
let longueur;
let tabComplet;
let propositionLettre;
let errorCount = 0;
let lettreDejaPropose = [];
let enJeu = false;
let errorVerify = false;
let dejaPropose = false;
//Selecteur d'élément HTML
let afficherMotDeviner = document.querySelector(".MotDeviner");
let afficherLettrePropose = document.querySelector(".lettrePropose");
let afficherError = document.querySelector(".error");
let boutonCommencer = document.querySelector(".StartGame");
let pourcentageVie = document.querySelector(".pourcentagevie");
let boutonPopup = document.querySelector(".boutonpopup");
let popup = document.querySelector(".popup");
let textPopup = document.querySelector(".textpopup");
let inputLetter = document.querySelector(".inputLetter");
let barreDeVie = document.querySelector(".border2");
let modeDifficile = document.querySelector(".modedifficile");
let divPropose = document.querySelector(".div-propose");
let infoMode = document.querySelector(".infoMode");
/**
 * Evenement permettant d'afficher ou de cacher les lettres déjà proposés (pour plus de challenge)
 */
modeDifficile.addEventListener("click", () => {
  if (modeDifficile.innerText == "Passer en mode difficile") {
    divPropose.style.display = "none";
    modeDifficile.innerText = "Passer en mode facile";
  } else {
    divPropose.style.display = "block";
    modeDifficile.innerText = "Passer en mode difficile";
  }
});
/**
 * Evenement permettant de désafficher la popup de fin de partie qui annonce si c'est perdu ou gagné grâce à la touche Entrée
 */
boutonPopup.addEventListener("click", () => {
  popup.style.display = "none";
});

document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    popup.style.display = "none";
    verification();
  }
});
/**
 * Evenement permettant de commencer la partie en cliquant sur le bouton pour commencer la partie
 */
boutonCommencer.addEventListener("click", commencerJeu);
/**
 * 
 * Fonction permettant d'initialiser le jeu en demandant au joueur un mot en plus de vérifier si le mot ne contient que des lettres de l'alphabet seulement 
 * @returns {void}
*/
function commencerJeu() {
  if (enJeu == false) {
    pourcentageVie.innerText = "100%";
    motADeviner = prompt("Choisissez un mot à deviner").toUpperCase();
    if (
      motADeviner == null ||
      !regmotADeviner.test(motADeviner) ||
      regWhiteSpace.test(motADeviner)
    ) {
      alert("Veuillez écrire un mot contenant les lettres de A à Z !");
      return;
    }
    barreDeVie.style.width = "100%";
    barreDeVie.style.backgroundColor = "green";
    tabADeviner = motADeviner.split("");
    longueur = tabADeviner.length;
    tabComplet = new Array(longueur).fill("_");
    afficherMotDeviner.textContent = tabComplet.join(" ");

    enJeu = true;
    document.querySelector(".inputLetter").value = "";
    console.log("Game start !");
    lettreDejaPropose = [];
    afficherLettrePropose.textContent = " ";
    errorCount = 0;
    afficherError.innerText = errorCount;
    boutonCommencer.style.visibility = "hidden";
    inputLetter.disabled = false;
    inputLetter.focus();
    modeDifficile.style.visibility = "hidden";
    infoMode.style.visibility = "hidden";
    return;
  }
}
/**
 * Fonction permettant de Vérifier la valeur entrée par la personne, si la valeur est valide selon le Regex, elle est alors comparé à chaque lettre du mot pour vérifier si elle est bien dedans. Elle appelle la fonction "fauxPerdu()" afin de dire si c'est une erreur et "conditionVictoire()" pour voir si les lettres ont tous étaient trouvés.
 * @returns {void}
 */
function verification() {
  if (enJeu == true) {
    propositionLettre = inputLetter.value.toUpperCase();
    if (regpropositionLettre.test(propositionLettre)) {
      inputLetter.value = "";
      alert("Veuillez entrer une lettre entre A et Z !");
      return;
    }
    //Vérification de la lettre dans le mot
    for (i = 0; i < tabADeviner.length; i++) {
      if (tabADeviner[i] == propositionLettre) {
        tabComplet[i] = propositionLettre;
        errorVerify = true;
        afficherMotDeviner.textContent = tabComplet.join(" ");
      }
    }
    //Vérification du cas pour mettre la lettre dans le tableau des lettres déjà proposé
    for (i = 0; i < lettreDejaPropose.length; i++) {
      if (lettreDejaPropose[i] == propositionLettre) {
        dejaPropose = true;
      }
    }
    if (dejaPropose == false) {
      lettreDejaPropose.push(propositionLettre);
    }
    fauxPerdu();
    conditionVictoire();
    errorVerify = false;
    dejaPropose = false;
    inputLetter.value = "";
    afficherLettrePropose.textContent = lettreDejaPropose.join(" ");
    afficherError.innerText = errorCount;
    return;
  }
}
/**
 * Fonction permettant de compter les erreurs et la condition de défaite. Elle appelle la fonction "MaVie()" afin d'afficher la vie restante
 * 
 */
function fauxPerdu() {
  if (errorVerify == false || dejaPropose == true) {
    errorCount += 1;
  }
  maVie();
  if (errorCount >= 10) {
    textPopup.innerText = `Vous avez perdu ! Le mot à retrouver était ${motADeviner}`;
    popup.style.display = "block";
    boutonCommencer.innerText = "Recommencer à jouer";
    boutonCommencer.style.visibility = "visible";
    modeDifficile.style.visibility = "visible";
    infoMode.style.visibility = "visible";
    enJeu = false;
    inputLetter.disabled = true;
  }
}
/**
 * Fonction permettant de vérifier la condition de victoire, elle est appelé à chaque proposition dans la fonction "verification()"
 * 
 */
function conditionVictoire() {
  if (tabADeviner.toString() == tabComplet.toString()) {
    textPopup.innerText = "Vous avez gagné !";
    popup.style.display = "block";
    enJeu = false;
    inputLetter.disabled = true;
    boutonCommencer.innerText = "Recommencer à jouer";
    boutonCommencer.style.visibility = "visible";
    modeDifficile.style.visibility = "visible";
    infoMode.style.visibility = "visible";
  }
}
/**
 * Fonction permettant d'actualiser la barre de vie et de changer de couleur selon le pourcentage restant
 * 
 */
function maVie() {
  console.log(errorCount);
  switch (errorCount) {
    case 0:
      barreDeVie.style.width = "100%";
      pourcentageVie.innerText = "100%";
      break;
    case 1:
      barreDeVie.style.width = "90%";
      pourcentageVie.innerText = "90%";
      break;
    case 2:
      barreDeVie.style.width = "80%";
      pourcentageVie.innerText = "80%";
      break;
    case 3:
      barreDeVie.style.width = "70%";
      pourcentageVie.innerText = "70%";
      break;
    case 4:
      barreDeVie.style.width = "60%";
      pourcentageVie.innerText = "60%";
      break;
    case 5:
      barreDeVie.style.width = "50%";
      pourcentageVie.innerText = "50%";
      barreDeVie.style.backgroundColor = "Yellow";
      break;
    case 6:
      barreDeVie.style.width = "40%";
      pourcentageVie.innerText = "40%";
      break;
    case 7:
      barreDeVie.style.width = "30%";
      pourcentageVie.innerText = "30%";
      break;
    case 8:
      barreDeVie.style.width = "20%";
      pourcentageVie.innerText = "20%";
      barreDeVie.style.backgroundColor = "Red";
      break;
    case 9:
      barreDeVie.style.width = "10%";
      pourcentageVie.innerText = "10%";
      break;
    case 10:
      barreDeVie.style.width = "0%";
      pourcentageVie.innerText = "0%";
      break;
  }
}
