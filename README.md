# Nom du projet
Le principe est celui du jeu du pendu... mais sans pendu car c'est cruel. Du coup on a changé pour un nombre d'erreur seulement.

# Objectif du projet
C'est un jeu qui se joue à 2 ou plus, une personne mets un mot correpondant à une suite de lettres sans accent (pas besoin de savoir si le mot existe), et c'est à 1 ou plusieurs autres joueurs de deviner le mot avant de perdre toute sa vie, ce qui correspond à 10 erreurs. Le principe est d'avoir autant de rejouabilité que l'imagination des personnes, en plus d'accepter la majorité des mots sans accent.

# Découpage du projet
Mot aléatoire: Choix du joueur qui deviendra un tableau avec chaque lettre
Commencer une partie: Bouton
Cacher les lettres: Création d'un second tableau avec des "_" au lieu des lettres
Compter les erreurs/Défaites: condition + incrémentation de valeurs pour les erreurs -> défaite si trop d'erreur
Vérifier les entrées: Comparaison du tableau de chaque lettres + compter les répétitions
Victoire: Voir si le tableau final est résolu

# Fonctions principales
fonction "commencerJeu()" -> on demande à un joueur, un nom à mettre en prompt afin de créer le mot contenu (il doit respecter la norme de ce qu'on demande, à savoir ne contenir que de l'alphabet). Le mot peut être écrit en minuscule ou non car dans tout les cas, le programme transforme le mot en majuscule pour plus de lisibilité. Le bouton se désafiche durant la partie, et se réaffiche avec le texte "Recommencer à jouer" après une victoire ou une défaite, permettant de rejouer.

fonction "verification()" -> Après avoir mis une proposition de lettre via la touche Entrée (avec une vérification sur le fait que c'est un alphabet), on demande alors de comparer cette lettre à chaque lettre du mot qu'on devine, on appelle les fonction correpondantes qui se chargeront de faire la vérification avec des variables globaux dont on remets leurs valeurs à 0 après la vérification.

fonction "FauxPerdu" -> On vérifie si il y a eu une erreur OU si la lettre est déjà proposé (ou même si la personne n'a rien mis comme proposition), elle incrémente le compteur d'erreur et fait appelle à la fonction "MaVie()" en plus d'afficher la valeur d'erreur à l'écran. Si c'est perdu, on affiche une popup nous disant qu'on a perdu, et nous donnant le mot à deviner.

fonction "victoire" -> On vérifie si les tableaux sont exacts, pour cela on retransforme les "tableaux" en "string" car on ne peut pas faire de comparaison avec un tableau, étant donné que la comparaison des tableau ne cible que l'espace mémoire affecté et non sa valeur. Si c'est égale, alors on mets une popup qui nous dit qu'on a gagné.

fonction "MaVie()" -> Cette fonction permet de changer l'affichage de la barre de vie selon les erreurs, elle descend de 10% en 10% étant donné qu'on a considéré qu'on avait maximum 10 erreurs. J'ai fait en sorte qu'à 50% de la barre de vie elle devient jaune, et à 20% de la barre de vie, elle devient rouge.