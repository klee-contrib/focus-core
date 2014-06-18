## Template.js (1/4)

+ Based on the [Handlebars.js](http://handlebarsjs.com)
+ Simple templating language
+ A template consume a *json* object
+ Properties are accessed with `{{key}}`
+ A set of helpers is available
+ Custom Helpers can be written

## Template.js (2/4)

```:handlebars
<form>
  {{input_for "fisrtName"}}
  {{input_for "lastName"}}
  {{input_for "age"}}
  <button type='submit'>Save</button>
</form>
```

## Template.js (3/4)

In the fmk, there are custom helpers: they take care of rendering, using metadatas.

- **input_for** : Deals with inputs
- **options_selected** : Deals with inputs
- **display_for** : Read only fields
- **hasRole** : Deals with roler
- **t** : Deals with translations.

## Template.js (4/4)
Example of code for the button:
```:coffee
Handlebars.registerHelper "statusIcon", (property, options)->
  if typeof(this[property] == "boolean")
    if this[property] then icon = "fa fa-check" else icon = "fa fa-exclamation"
  else switch this[property]
    when 0 then icon = "fa fa-ban";
    when 1 then icon = "fa fa-exclamation";
    when 2 then icon = "fa fa-clock-o";
    when 3 then icon = "fa fa-check";
    else icon = ""
  return new Handlebars.SafeString("<i class='#{icon}'><i>");
```

