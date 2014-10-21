
###
  Helper pour uniformiser l'utilisation des formulaires.
  Exemple: {{#form}} {{input_for "firstName"}} {{/form}}
###
Handlebars.registerHelper 'form', (options)->
    return "<form novalidate class='form-horizontal' role='form'>#{options.fn(@)}</form>"