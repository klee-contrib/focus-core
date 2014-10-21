###
  Helper pour uniformiser l'utilisation des formulaires.
  Exemple: {{#criteria}}{{#form}} {{input_for "firstName"}} {{/form}}{{/criteria}}
###
Handlebars.registerHelper 'criteria', (title, options)->
  options = options or {}
  if _.isObject(title)
      options = title 
      title = undefined
    title =  if not title? then "" else i18n.t(title)
  html = "
      <div class='criteria'>
        <h2>#{title}</h2>
        #{options.fn(@)}
      </div>
  "
  return html