Reference

Les références sont chargées dans un store construit par défaut. 

## Enregistrement de la configuration des listes de références.

Pour pouvoir utiliser une liste de référence, il faut que cette dernière soit enregistrée dans la configuration.
Une configuration est un nom et un service. 

Exemple: 
```javascript
//Exemple de la liste scope
Focus.referencee.config.set({'scopes': referenceService.getScopes});
```
Ensuite l'utilisation des listes de réference préchargées se fera dans le composant graphique.
Voir [FormMixin](https://github.com/KleeGroup/focus-components/blob/master/common/form/README.md)

## Fonctionnement de focus.reference

La partie config sert à enregistrer une configuration. 
Builder à construire l'arbre de dépendances de la partie référence. 
Le built in store et action sont utilisés afin de permettre le chargement des listes de références. 
