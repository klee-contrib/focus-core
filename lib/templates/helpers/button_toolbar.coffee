###
  Helper pour uniformiser l'utilisation des formulaires.
  Exemple: {{#button_toolbar}} {{{button_cancel}} {{button_save}} {{/button_toolbar}}
###
Handlebars.registerHelper 'btn_toolbar', (options)->
    return "<div class='btn-toolbar'><div class='btn-group'>#{options.fn(@)}</div></div>"