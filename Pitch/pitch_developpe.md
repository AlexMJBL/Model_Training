# Pitch Détaillé (Format Long - 30 minutes) : Classification d'images CIFAR-10 & Déploiement

*Note : Ce document a été considérablement enrichi pour tenir une présentation de 30 minutes. Il inclut des explications pédagogiques approfondies, des métaphores pour vulgariser les concepts techniques, et des pauses stratégiques. Prenez le temps de respirer, d'interagir avec votre auditoire et de bien articuler les concepts complexes.*

---

## Slide 1 : Introduction et Vision du Projet (approx. 3-4 min)

*(Prends une grande respiration, regarde l'auditoire, souris)*

"Bonjour à toutes et à tous. Aujourd'hui, j'ai le plaisir de vous présenter le fruit de mes recherches et de mon travail de développement sur un projet qui me passionne : la classification d'images par Intelligence Artificielle.

Quand on parle d'IA aujourd'hui, on pense souvent à des boîtes noires magiques ou à des services cloud tout prêts. Mais pour ce projet, mon objectif n'était pas d'utiliser une solution préfabriquée. Mon but était de comprendre la mécanique interne, de construire le 'cerveau' de l'algorithme de A à Z.

Mais je ne voulais pas m'arrêter là. Un modèle d'IA qui tourne uniquement dans un terminal de commande sur mon ordinateur portable, ça n'a pas une grande valeur métier. Ce que je voulais, c'était construire un **véritable produit logiciel complet**. 

Nous allons donc traverser ensemble tout le cycle de vie de ce projet :
1. D'abord, l'ingénierie des données et la création de l'architecture du réseau de neurones.
2. Ensuite, l'entraînement et les défis que j'ai rencontrés avec l'algorithme.
3. Et enfin, le déploiement réel de ce modèle dans une interface web moderne, réactive, propulsée par un backend robuste.

C'est un voyage qui va de la pure mathématique à l'ingénierie logicielle."

---

## Slide 2 : Le choix des technologies et de l'environnement (approx. 3 min)

*(Changement de slide)*

"Pour réaliser ce projet, il fallait choisir les bonnes fondations. Le cœur de l'IA a été développé avec **TensorFlow** et plus spécifiquement son API **Keras**. 

Vous pourriez me demander : *Pourquoi TensorFlow ? Pourquoi ne pas avoir utilisé ML.NET pour rester dans l'écosystème C# que nous connaissons bien, ou PyTorch qui est très à la mode ?*

La réponse tient en trois points :
1. **Le standard de l'industrie** : TensorFlow est développé par Google et reste l'outil le plus déployé en production dans les entreprises. Maîtriser TensorFlow, c'est acquérir une compétence directement valorisable sur le marché du travail.
2. **L'écosystème Python** : En Intelligence Artificielle, Python est roi. Si vous avez un problème de dimension de matrice ou un bug de convergence, la communauté, les forums, et la documentation en Python sont infiniment plus riches qu'en C#.
3. **La gestion matérielle** : TensorFlow gère de manière transparente l'accélération matérielle et la manipulation des tenseurs (qui sont de gigantesques matrices de données), ce qui est vital pour la performance.

Côté environnement de développement, j'ai dû être très rigoureux. L'écosystème Python peut vite devenir chaotique avec les conflits de versions. J'ai donc travaillé sous Visual Studio Code avec **Python 3.12**, en isolant toutes mes dépendances dans un environnement virtuel strict. C'est une bonne pratique indispensable pour garantir que mon code fonctionne de la même manière sur ma machine que sur un futur serveur."

---

## Slide 3 : Le défi des données : CIFAR-10 et Prétraitement (approx. 4 min)

*(Changement de slide)*

"Entrons maintenant dans la matière première de toute IA : les données. Le code ne fait pas tout, les données sont le véritable carburant. 

J'ai choisi de travailler avec le dataset **CIFAR-10**. C’est un jeu de données très célèbre en recherche, composé de 60 000 images réparties en 10 catégories : des avions, des voitures, des chats, des chiens, des bateaux, etc.

Mais il y a un piège majeur avec CIFAR-10 : **la résolution des images**. Chaque image fait exactement 32 par 32 pixels. 
*(Montrez l'image sur le slide)* 
Regardez bien. À cette résolution, un chien ou un cheval n'est qu'un amas de pixels un peu flou. Même pour un œil humain, c'est parfois difficile à identifier. Le défi de mon algorithme allait donc être d'extraire des caractéristiques extrêmement précises malgré cette contrainte de taille.

Avant même de donner ces images à l'algorithme, j'ai dû appliquer un **prétraitement essentiel : la normalisation**. 
Une image numérique est composée de pixels dont les valeurs vont de 0 (noir) à 255 (blanc pur). Si on injecte des valeurs aussi grandes dans un réseau de neurones, les calculs mathématiques s'emballent, les gradients explosent, et le modèle n'apprend rien. 
J'ai donc divisé chaque pixel par 255 pour ramener toutes les valeurs entre 0.0 et 1.0 (en format float). Cette simple division mathématique est le secret pour stabiliser le modèle et lui permettre de converger lors de l'apprentissage."

---

## Slide 4 : Comment l'IA 'voit' : Les Réseaux Convolutifs (CNN) (approx. 3 min)

*(Changement de slide)*

"Pour analyser ces images, j'ai implémenté ce qu'on appelle un **CNN** (Convolutional Neural Network - Réseau de Neurones Convolutifs). C'est l'algorithme roi en vision par ordinateur.

Comment ça fonctionne concrètement ? Contrairement à un réseau classique qui regarde l'image comme une simple liste de chiffres, le CNN regarde l'image spatialement. Il utilise des **filtres** (ou kernels) qui glissent sur l'image de gauche à droite et de haut en bas. 
- Les premiers filtres vont repérer des choses simples : des lignes verticales, des lignes horizontales, des contrastes.
- Les filtres suivants vont assembler ces lignes pour détecter des textures ou des courbes.
- Et les derniers filtres vont détecter des formes complexes : une oreille de chat, une roue de camion, la voile d'un bateau.

**La force du CNN**, c'est cette compréhension de la hiérarchie visuelle. 
**Sa faiblesse**, c'est qu'il est extrêmement sensible aux biais. Si, dans mon jeu de données, presque tous les bateaux sont pris en photo sur une mer bleue, le CNN (qui est un peu paresseux par nature) va finir par apprendre l'équation : `Couleur Bleue = Bateau`. Et le jour où je lui montre un avion dans un ciel bleu, il se trompera. C'est ce qu'on appelle un biais d'apprentissage."

---

## Slide 5 : L'astuce contre l'apprentissage par cœur : Data Augmentation (approx. 3 min)

*(Changement de slide)*

"Pour combattre ce biais et empêcher l'IA d'apprendre par cœur, j'ai introduit une technique redoutable : la **Data Augmentation** (l'augmentation de données).

L'idée est de modifier artificiellement nos images d'entraînement à chaque fois que le modèle les voit. 
J'ai appliqué des **retournements horizontaux** (si un chien regarde vers la gauche, c'est toujours un chien s'il regarde vers la droite) et des **translations** (décaler légèrement l'image sur les côtés). Cela force le modèle à se concentrer sur les formes du sujet plutôt que sur sa position exacte.

Mais attention, c'est ici qu'intervient une décision technique majeure de ma part : **j'ai volontairement interdit les rotations et les zooms.**
Pourquoi ? Rappelez-vous, nos images font 32 par 32 pixels. Si vous zoomez sur une image aussi petite, vous perdez la moitié du chien hors du cadre. Si vous la tournez, les coins de l'image deviennent des pixels noirs et l'objet est déformé. Dans mon cas précis, utiliser la rotation aurait détruit le peu d'informations dont on disposait. En IA, il faut toujours adapter la théorie à la réalité de nos données."

---

## Slide 6 : L'Architecture de pointe : Le Modèle V3 (approx. 4 min)

*(Changement de slide)*

"Après plusieurs itérations et tests décevants, j'ai conçu mon architecture finale, la **V3**. Elle est beaucoup plus complexe et robuste.

J'ai structuré mon réseau en trois grands blocs :
1. Le premier bloc utilise 32 filtres.
2. Le deuxième en utilise 64.
3. Le troisième en utilise 128.
*(Petite pause)*
Remarquez que j'utilise une **double couche de convolution** (deux couches successives de 3x3) dans chaque bloc. Enchaîner deux couches permet au réseau de combiner des motifs simples plus efficacement avant de réduire la résolution de l'image avec du *MaxPooling* (qui garde uniquement les pixels les plus intenses).

J'ai également intégré deux mécanismes de défense essentiels :
- Le **Batch Normalization** : Il normalise les données à la sortie de chaque couche. Ça évite que les erreurs de calcul ne s'amplifient d'une couche à l'autre.
- Le **Dropout** : C'est une technique fascinante. J'ai configuré le Dropout jusqu'à 50%. Ça veut dire qu'à chaque cycle d'apprentissage, on éteint aléatoirement la moitié des neurones du réseau. Ça l'oblige à ne pas se reposer sur un petit groupe de neurones sur-entraînés. C'est comme s'entraîner à courir avec des poids aux chevilles : le jour de la course, sans les poids, on est beaucoup plus performant et résistant."

---

## Slide 7 : L'Entraînement et l'Optimisation (approx. 3 min)

*(Changement de slide)*

"Une fois l'architecture définie, il faut l'entraîner. J'ai poussé l'apprentissage sur **50 époques** (le modèle voit l'intégralité des 60 000 images 50 fois).

Mais faire tourner un processeur pendant des heures coûte cher et risque de provoquer du surentraînement. J'ai donc implémenté un **Early Stopping** (arrêt prématuré) avec une "patience" de 3 époques. Le principe est simple : le système surveille le taux d'erreur sur un jeu de données de test (des images que le modèle n'a jamais vues). Si pendant 3 cycles consécutifs, le modèle n'arrive plus à s'améliorer, l'entraînement s'arrête automatiquement.

Tout ce processus est orchestré par l'optimiseur **Adam**, qui est très intelligent car il ajuste dynamiquement sa vitesse d'apprentissage en temps réel, et une fonction de perte appelée *Sparse Categorical Crossentropy*, idéale pour trier des objets en 10 catégories distinctes. À la fin, j'exporte mon modèle entraîné dans un fichier compact `.keras`."

---

## Slide 8 : Déploiement et Clean Architecture (approx. 3 min)

*(Changement de slide)*

"Nous avons maintenant notre cerveau numérique. Mais comment un utilisateur peut-il s'en servir ? C'est là que l'ingénierie logicielle prend le relais. J'ai mis en place une architecture modulaire et découplée.

Côté client, j'ai développé une application web en **React**. React permet de créer une interface très fluide, où l'utilisateur téléverse son image qui est encapsulée dans un format sécurisé (`FormData`).

Côté serveur, j'ai développé une API REST avec **FastAPI**, un framework Python moderne et asynchrone, hébergé sur un serveur haute performance appelé Uvicorn. FastAPI est exceptionnel car il gère très facilement les requêtes asynchrones et la configuration des **CORS** (Cross-Origin Resource Sharing). Le CORS était un point critique : il fallait configurer le serveur pour qu'il autorise le navigateur (qui tourne sur un autre port) à lui envoyer des données en toute sécurité."

---

## Slide 9 : La Rigueur du Backend (Le Prétraitement Invisible) (approx. 3 min)

*(Changement de slide)*

"Il y a un élément souvent sous-estimé dans le machine learning en production : l'API doit être impitoyable. 

Quand vous prenez une photo avec votre iPhone, l'image est peut-être en format HEIC, elle fait 4000 par 3000 pixels, et contient peut-être de la transparence (le canal Alpha). 
Or, mon modèle a été entraîné stricto sensu sur des images de 32x32 pixels, avec 3 canaux de couleur (Rouge, Vert, Bleu), normalisées entre 0 et 1.

Mon backend FastAPI effectue donc un pipeline de prétraitement chirurgical et invisible pour l'utilisateur :
1. Il force la conversion en RGB pur pour supprimer l'Alpha.
2. Il redimensionne drastiquement l'image en exactement 32 par 32 pixels.
3. Il divise chaque pixel par 255.0.
4. Et enfin, il modifie la forme de la matrice (avec `expand_dims`) pour simuler un "lot" (batch) d'images, car le modèle s'attend toujours à recevoir un tableau d'images, même s'il n'y en a qu'une.

Une fois que le modèle a calculé ses scores (qu'on appelle des logits), l'API applique une fonction mathématique **Softmax**. Le Softmax convertit ces scores bruts en véritables pourcentages dont la somme fait 100%. Le résultat final est renvoyé en format JSON au front-end React."

---

## Slide 10 : Conclusion avant la Démonstration (approx. 2 min)

*(Changement de slide)*

"Avant de passer à la démo, je voudrais partager avec vous le grand enseignement de ce projet. Il m'a fait réaliser un changement de paradigme fondamental.

En développement logiciel classique, si votre architecture est propre et votre code est sans bug, le résultat est garanti. 
En Intelligence Artificielle, ce n'est pas le cas. Le code de l'algorithme n'est qu'une toute petite fraction de l'équation. La vraie difficulté, et ce qui détermine la qualité du produit final, c'est **l'ingénierie et la préparation des données**. Vous pouvez avoir le réseau de neurones le plus sophistiqué du monde, s'il est nourri avec des données bruitées, biaisées ou mal formatées, ses résultats seront mauvais. 

Assez parlé de théorie, je vous propose maintenant de voir tout cela en pratique avec la démonstration !"

---

## La Démonstration : Le Rebondissement Théorie vs Pratique (approx. 5 min)

*(Transition vers l'application Web. Prenez votre temps pour montrer l'interface)*

"Pour cette démonstration, j'ai voulu pimenter l'expérience. Je n'ai pas branché un seul modèle à mon interface React. J'ai branché **trois modèles en parallèle**. Le but est de les voir 'réfléchir' et de comparer leurs prédictions en temps réel.

- **À gauche**, nous avons le Modèle V1 : c'était mon tout premier jet, assez basique.
- **Au centre**, nous avons la fameuse V3 : c'est le 'modèle parfait' en théorie. L'architecture de pointe dont je vous ai parlé, blindée de sécurité avec de la Data Augmentation, du Batch Normalization et 50% de Dropout.
- **À droite**, j'ai inclus un modèle que j'ai nommé *Overfit*. C'est un modèle 'brute force'. Il possède une couche gigantesque de 512 neurones, et je l'ai entraîné sur 50 époques **sans aucune protection** : zéro Dropout, zéro Data Augmentation. 

Théoriquement, tous les cours et manuels d'IA nous disent que ce modèle 'Overfit' devrait faire du surapprentissage massif. Il est censé avoir appris le dataset CIFAR-10 par cœur et être complètement incapable de reconnaître une image nouvelle qu'il n'a jamais vue.

Faisons le test."

*(Uploadez une image réelle, provenant d'internet ou de votre téléphone, idéalement un bateau, un avion ou une voiture)*

"Je ne vais pas utiliser une image de CIFAR-10, je prends une vraie photo téléchargée sur Google. Regardons les prédictions du serveur...
*(Laissez un peu de suspense le temps que les barres de progression s'affichent)*

Et là... c'est le grand rebondissement de mon projet. Contre toute attente théorique, regardez les scores : **c'est le modèle 'Overfit' qui s'en sort le mieux !**
Il donne la bonne réponse avec le plus grand niveau de confiance, tandis que notre modèle 'parfait', la V3, hésite fortement ou se trompe."

*(Souriez, adressez-vous à l'auditoire)*

"Pourquoi la pratique a-t-elle contredit la théorie de manière si flagrante ? 
L'explication se trouve dans les limites physiques de notre dataset : la fameuse contrainte des 32x32 pixels. 

À une résolution aussi faible, chaque pixel compte. En appliquant une régularisation extrêmement agressive sur la V3 — c'est-à-dire en désactivant 50% de ses neurones avec le Dropout, et en décalant l'image artificiellement avec la Data Augmentation — j'ai en réalité détruit trop d'informations vitales. En voulant protéger la V3 du surapprentissage, je l'ai empêchée d'apprendre correctement. La V3 s'est retrouvée **sous-entraînée** (underfitted) face à la complexité de l'image.

À l'inverse, le modèle 'Overfit' n'avait aucune entrave. Il a eu le droit d'utiliser 100% de sa capacité cognitive sur 100% des pixels disponibles à chaque cycle. Et même s'il a eu tendance à mémoriser les images, ses fondations brutes d'extraction de caractéristiques étaient tellement plus solides qu'il a finalement réussi à mieux généraliser dans la vraie vie que le modèle sur-protégé.

**C'est la plus grande leçon de ce projet :** En Deep Learning, l'architecture parfaite sur le papier ne survit pas toujours à l'épreuve de la réalité des données. L'expérimentation, l'analyse empirique et l'adaptation restent les seuls véritables juges de paix.

Je vous remercie chaleureusement pour votre écoute. J'espère que cette plongée dans les coulisses d'un projet d'IA complet vous a intéressé. Je suis maintenant à votre entière disposition pour répondre à toutes vos questions !"
