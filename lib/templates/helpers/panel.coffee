###
  Helper pour uniformiser l'utilisation des panel.
  Exemple: {{#panel}} {{{#form}} {{/form}} {{/panel}}
  Exemple: {{#panel "titlekey"}} {{{#form}} {{/form}} {{/panel}}
###
Handlebars.registerHelper 'panel', (title, options)->
    opt = (options or {}).hash or {}
    if _.isObject(title)
      options = title 
      title = undefined
    editButton = ->
      return if opt.edit then Handlebars.helpers.button_edit.call(@, {hash: {icon: "pencil"}}) else ""
    saveButton = ->
      return if opt.save then Handlebars.helpers.button_save.call(@, undefined, {hash: {icon: "save"}}) else ""
    cancelButton = ->
      return if opt.save then Handlebars.helpers.button_cancel.call(@, {hash: {icon: "undo"}}) else ""
    title =  if not title? then "" else i18n.t(title)
    html = "<div class='panel panel-default'>
          <div class='panel-heading'>#{title} #{editButton()} #{saveButton()} #{cancelButton()}</div>
          <div class='panel-body'>#{options.fn(@)}</div>
        </div>"
    return html