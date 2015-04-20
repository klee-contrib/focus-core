Définir un domaine:

Les différentes propriétés réglables sont les suivantes:
- `validator` => Une fonction de validation
- `formatter`=> Une fonction de formattage
- `FieldComponent` => Surcharger le composant de field par défaut (utilisation rare)
- `InputLabelComponent` => Surecharge du composant Field mais uniquement dans le cas d'une checkbox ou d'un composannt input embarqué dans le label.
- `InputComponent`=> Surcharge de l'input
- `DisplayComponent`=> Surcharge du composant de display.
- `TextComponent`=> Surcharge du composant de rendu textuel



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
