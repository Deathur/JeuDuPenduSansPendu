# Le jeu du pendu (sans pendu car Youtube Friendly)

Le principe est celui du jeu du pendu... mais sans pendu car c'est cruel. Du coup on a changé pour un nombre d'erreur seulement.

# Objectif du projet
C'est un jeu qui se joue à 2 ou plus, une personne mets un mot correpondant à une suite de lettres sans accent (pas besoin de savoir si le mot existe), et c'est à 1 ou plusieurs autres joueurs de deviner le mot avant de perdre toute sa vie, ce qui correspond à 10 erreurs. Le principe est d'avoir autant de rejouabilité que l'imagination des personnes, en plus d'accepter la majorité des mots sans accent.

# Règle du jeu
Le joueur choisis un mot à deviner (il faut que ce soit une suite de lettre de l'alphabet latin, sans accent et aussi, il ne peut pas mettre rien du tout). Puis le second joueur pourra taper la lettre qu'il veut et appuyer sur la touche Entrée, et ca vérifiera si la touche est valide (**Attention: Ne rien mettre en tant que proposition est considéré comme une erreur, de même pour le fait de remettre la même lettre déjà proposé**). Le jeu se finit soit dans le cas où le mot est trouvé en entier, soit dans le cas où la personne fait 10 erreurs. En cas de défaite, le mot à deviner sera affiché. Une fois fini, le joueur pourra appuyer sur le bouton "Recommencer à jouer" afin de refaire une partie. Vous ne pouvez pas abandonner la partie en cours de route.

# Découpage du projet
**Mot aléatoire**: Choix du joueur qui deviendra un tableau avec chaque lettre.

**Commencer une partie**: Bouton s'affichant ou se cachant selon l'état du jeu.

**Cacher les lettres**: Création d'un second tableau avec des "_" au lieu des lettres.

**Compter les erreurs/Défaites**: condition + incrémentation de valeurs pour les erreurs -> défaite si trop d'erreur.

**Vérifier les entrées**: Comparaison du tableau de chaque lettres + compter les répétitions.

**Victoire**: Voir si le tableau final est résolu.

# Fonctions principales
**Fonction "commencerJeu()"** -> on demande à un joueur, un nom à mettre en prompt afin de créer le mot contenu (il doit respecter la norme de ce qu'on demande, à savoir ne contenir que de l'alphabet). Le mot peut être écrit en minuscule ou non car dans tout les cas, le programme transforme le mot en majuscule pour plus de lisibilité. Le bouton se désafiche durant la partie, et se réaffiche avec le texte "Recommencer à jouer" après une victoire ou une défaite, permettant de rejouer.

**Fonction "verification()"** -> Après avoir mis une proposition de lettre via la touche Entrée (avec une vérification sur le fait que c'est une lettre de l'alphabet), on demande alors de comparer cette lettre à chaque lettre du mot qu'on devine, on appelle les fonctions correpondantes à savoir "fauxPerdu()" et "conditionVictoire()" qui se chargeront de faire la vérification avec des variables globaux dont on remets leurs valeurs à 0 après la vérification.

**Fonction "fauxPerdu()"** -> On vérifie si il y a eu une erreur OU si la lettre est déjà proposé (ou même si la personne n'a rien mis comme proposition), elle incrémente le compteur d'erreur et fait appelle à la fonction "maVie()" en plus d'afficher la valeur d'erreur à l'écran. Si c'est perdu, on affiche un modal nous disant qu'on a perdu, et nous donnant le mot à deviner.

**Fonction "conditionVictoire()"** -> On vérifie si les tableaux sont exacts, pour cela on retransforme les "tableaux" en "string" car on ne peut pas faire de comparaison avec un tableau, étant donné que la comparaison des tableau ne cible que l'espace mémoire affecté et non sa valeur. Si c'est égale, alors on mets un modal qui nous dit qu'on a gagné.

**Fonction "maVie()"** -> Cette fonction permet de changer l'affichage de la barre de vie selon les erreurs, elle descend de 10% en 10% étant donné qu'on a considéré qu'on avait maximum 10 erreurs. A 50% de la barre de vie elle devient jaune, et à 20% de la barre de vie elle devient rouge.