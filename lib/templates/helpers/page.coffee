###
  Helper pour uniformiser l'utilisation des formulaires.
  Exemple: {{#page "page.title" panelTitle="page.panel.title"}} {{input_for "firstName"}} {{/page}}
###
Handlebars.registerHelper 'page', (title, options)->
  options = options or {}
  opt = options.hash or {}
  console.error("noTitleInYourTemplate")if not _.isString(title)    
  html = "
      <h1>#{i18n.t(title)}</h1>
      <div class='page-content'>
        #{options.fn(@)}
      </div>
  "
  return html