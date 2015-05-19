# Application

Cette partie de focus a pour but de fournir des utilitaires afin de bénéficier d'un objet application.

## built in store

Focus fournit un store d'application déjà instancié. Ceci afin de pouvoir avoir une notion de store commun dans les composants.
Par exemple dans le cas de l'entête.

## Render
Cette fonction a pour but de simplifier le rendu d'un composant dans l'application.
On doit lui fournir le composant à rendre, le selecteur dans lequel on veut le rendre et les données à fournir au composant.

### Exemple

```javascript
var render = Focus.application.render;
var MyComponent = require('./my-component');
render(MyComponent, 'div.component-container', {props: {id: '12'}});
```

## Clear
Cette fonction permet de supprimer un composant actuellement rendu dans le DOM, et nettoie les eventuels listeners associés.
Elle prend en argument une chaine de caractère constituant le sélecteur du point de montage du composant.

### Exemple

```javascript
// console : Mounted components :  ["MY_TARGET_SELECTOR", "other", ...]
var clear = Focus.application.clear;
clear('MY_TARGET_SELECTOR');
// console : Component MY_TARGET_SELECTOR unmounted.
// console : Mounted components :  ["other", ...]
```
