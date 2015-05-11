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
