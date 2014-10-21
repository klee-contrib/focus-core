# Example => button "transalationKey", icon="heart" id="12" class="btn-danger" type="submit"
Handlebars.registerHelper "button",(text_key, options) ->
  #console.log "button", i18n.t(text_key)
  opt = options.hash or {}
  if opt.role  isnt undefined and !Fmk.Helpers.userHelper.hasRole(opt.role)
    return ""
  isLoading =  opt.isLoading
  cssClass = opt.class or ""
  cssId = opt.id or guid()
  dataAttributes = opt.dataAttributes or "" 
  type = opt.type or "button"
  action = if opt.action? then "data-action=#{action}" else ""
  loading = ->
    if isLoading or type is 'submit'
      return "data-loading data-loading-text='#{opt.loadingText or i18n.t('button.loading')}'"
    return ""
  icon = ()->
     if opt.icon? then "<i class='fa fa-fw fa-#{opt.icon}'></i>" else ""
  button = "<button type='#{type}' #{action}  #{dataAttributes} class='btn #{cssClass}' id='#{cssId}' #{loading()}>#{icon()} #{if text_key isnt '' then i18n.t(text_key) else ''}</button>"
  new Handlebars.SafeString(button)
