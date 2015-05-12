## Stores

Les stores sont des éléments qui ont vocation à être instanciés une fois au sein de l'application.
Ils seront mis à jour avec les données transitant via un dispatcher.

Au sein de focus, il y a un store 'par défaut' permettant de simplifier l'écriture.

Un store se base sur des définitions.
Il créé par défaut des fonctions permettant de s'abonner au changement de noeud d'un store.


Gestion des status

Un store est abonné à un Dispatcher, en pratique il n'y a qu'un Dispatcher dans l'applicaton.
Enuite à chaque fois qu'il recoit des données.
