## Domaine

### Définir un domaine:

Les différentes propriétés réglables sont les suivantes:
- `validator` => Une fonction de validation. Cette fonction doit renvoyer true si valide et le message d'erreur si non valide.
- `formatter`=> Une fonction de formattage
- `unformatter` => Une fonction pour reconstruire la donnée à partir de l'input
- `isRequired` => Définit si une propriété est requise ou non
- `FieldComponent` => Surcharger le composant de field par défaut (utilisation rare)
- `InputLabelComponent` => Surecharge du composant Field mais uniquement dans le cas d'une checkbox ou d'un composannt input embarqué dans le label.
- `InputComponent`=> Surcharge de l'input
- `DisplayComponent`=> Surcharge du composant de display.
- `TextComponent`=> Surcharge du composant de rendu textuel

### Exemple

```javascript
'DO_DATE': {
    'InputComponent': focusComponents.common.input.date.component,
    'formatter': function(date){
      var monthNames = [
      'January', "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
        ];
        date = new Date(date);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return "" + day +" "+ monthNames[monthIndex] +" "+ year;
    }

`DO_BOOLEAN`: {
  "FieldComponent": focusComponents.common.input.toggle.component
}

```

### Définir les domaines de focus

Voici comment définir les domaines de focus.
`Focus.definition.domain.container.setAll(domain);`

## Definition

Les définitions peuvent être centralisées et générées depuis le model de données au format json.
Ces définitions seront utilisées par les composants servant à afficher des données chargées depuis le serveur.

### Exemple

```javascript
var entities ={
"contact": {
  "firstName": {
    "domain": "DO_TEXT",
    "required": false
  },
  "lastName": {
    "domain": "DO_TEXT",
    "required": true
  },
  "age": {
    "domain": "DO_NUMBER",
    "required": false
  },
  "email": {
    "domain": "DO_EMAIL",
    "required": false
  }
}};
```

### Définir les définitions de focus

Afin que focus soit capable d'utiliser les définitions, il faut les setter dans le framework via la commande suivante.
`Focus.definition.entity.container.setEntityConfiguration(entities);` où `entities` est un objet contenant les définitions.
