# Component

Cette partie de focus a pour vocation de fournir les outils nécessaires à la création de composants.

## builder

Builder est une fonction qui permet de créer à partir d'un mixin d'exposer un objet `{mixin: myMixin, component: Component(myMixin)}`

```javascript
var builder = focus.component.builder;
var myMixin = {
  getInitialState: function getInitialStateMyMixin{
    return {
      papa: 'singe'
    }
  }
}
builder(myMixin);
//Retourne
//{mixin: myMixin, component: React.createClass(myMixin)};
```

## Types

Cette méthode a pour but de simplifier l'écriture des [proptypes de react](https://facebook.github.io/react/docs/reusable-components.html)
Exaemple:
```javascript
var type = require('focus').component.types;
var inputTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: 'text',
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type('string'),
    value: type(['string', 'number']),
    name: type('string'),
    style: type('object')
  }
}
```
