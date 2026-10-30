# Smart TV Salon • Interface fluide pour Titan OS

![Aperçu de l'interface](./preview.svg)

Une interface d'accueil légère, épurée et ultra réactive pensée pour les téléviseurs équipés de **Titan OS**.

Développé intégralement en **HTML5, CSS3 et JavaScript natif** (aucun framework, aucune dépendance externe), ce projet démontre qu'il est possible d'offrir sur un téléviseur Titan OS une expérience fluide à **60 images par seconde**, pilotable directement avec les **flèches directionnelles de la télécommande** sans subir la lourdeur de l'accueil d'origine ni la lenteur d'un curseur de souris virtuel.

---

## Pourquoi ce projet ?

Sur de nombreux téléviseurs connectés récents sous Titan OS, l'interface par défaut multiplie les bandeaux promotionnels, les requêtes réseau en arrière plan et les effets de flou gourmands pour le processeur graphique. De plus, le navigateur internet intégré impose souvent un pointeur virtuel peu ergonomique à la télécommande.

Ce projet explore une approche minimaliste inspirée des boîtiers multimédias de salon :
* **Navigation directionnelle native** : déplacement instantané de tuile en tuile avec les flèches de la télécommande (ou du clavier) et validation directe avec `OK`.
* **Rendu optimisé à 60 ips** : animations matérielles via `transform: translate3d()` sans aucun filtre de flou coûteux (`backdrop-filter`), garantissant une fluidité immédiate sur les processeurs Smart TV.
* **Catalogue complet sur 4 rangées (24 tuiles)** : accès direct aux principales plateformes de streaming, chaînes françaises en replay, sport, musique ainsi qu'aux fonctions natives du téléviseur (**Paramètres**, **Sources HDMI**, **Chaînes TV**, **Guide TV**).
* **Tuile Portail Web personnalisable** : possibilité d'enregistrer l'adresse de son propre serveur multimédia (Jellyfin, Home Assistant, portail personnel). L'adresse saisie reste stockée exclusivement dans le `localStorage` du téléviseur.
* **Respect total de la vie privée** : aucun traceur, aucune télémétrie, politique `no-referrer` activée et validation stricte des adresses personnalisées.

---

## Architecture du dépôt

```text
.
├── index.html          # Interface complète autonome (HTML5 / CSS3 / JS Vanilla)
├── preview.svg         # Aperçu vectoriel haute définition de l'interface
├── msx/
│   ├── start.json      # Descripteur d'entrée pour portail Smart TV (Media Station X)
│   └── content.json    # Redirection plein écran sans curseur virtuel
├── _headers            # En têtes CORS pour hébergement statique
└── LICENSE             # Licence open source MIT
```

---

## Tester l'interface

### 1. Depuis un ordinateur (démo navigateur)
Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur moderne (ou hébergez ce dépôt gratuitement via **GitHub Pages**). Utilisez les **touches fléchées** du clavier pour parcourir les 4 rangées et la touche **Entrée** pour ouvrir un service.

### 2. Sur un téléviseur Titan OS (sans aucune modification système)
Il est possible d'exécuter ce portail en plein écran natif (avec prise en charge directe des flèches de la télécommande, sans souris virtuelle) grâce à l'application officielle **Media Station X** disponible gratuitement dans la boutique d'applications du téléviseur :

1. Hébergez ce dépôt sur **GitHub Pages** (ou tout autre hébergeur statique HTTPS comme Cloudflare Pages ou Vercel).
2. Installez et ouvrez **Media Station X** depuis le catalogue d'applications de votre téléviseur.
3. Rendez vous dans `Settings` > `Start Parameter` > `Setup`, saisissez l'adresse de votre page hébergée (sans `https://`), puis validez.

*Cette méthode utilise uniquement une application officielle du catalogue : elle ne modifie aucun fichier interne du téléviseur et peut être réinitialisée à tout moment depuis les paramètres de Media Station X.*

---

## Mentions légales

Projet open source indépendant réalisé à titre de démonstration technique et d'expérimentation d'interface utilisateur.
Ce dépôt n'est affilié ni approuvé par Titan OS S.L., TP Vision / Philips, Apple Inc. ou les éditeurs des services référencés. Les noms et visuels des services appartiennent à leurs propriétaires respectifs.

Distribué sous licence **MIT**.
