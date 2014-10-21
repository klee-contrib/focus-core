# Create the default _opening_ html for table result. Works as a tag.
# Works with _close_result_table_ helper.
Handlebars.registerHelper "result", (options)->
  options = options or {}
  opt = options.hash or {}
  isTable = if opt.isTable? then opt.isTable else true
  resultLabel = if opt.resultLabel then i18n.t(opt.resultLabel) else undefined
  listTagName = if isTable then "table" else "ul"
  elementTagName = if isTable then "tr" else "li"
  striped = if opt.striped? then opt.stripped else true
  cssClass = if isTable then "table table-condensed" else "list-group"
  if opt.cssClass? then cssClass= "#{cssClass} opt.cssClass"
  if striped 
    cssClass = cssClass + "  table-striped"
  # Generate the header actions.
  tableHeaderActions = ()=>
    showHeaderActions = if opt.showHeaderActions? then opt.showHeaderActions else true
    return if showHeaderActions then "#{Handlebars.helpers.tableHeaderAction.call(this, {hash:{resultLabel: '', exportUrl: this.exportUrl, resultLabel: resultLabel}})} <hr />" else ""
  # Render the pagination Pagination.
  paginate = ()=>
    isPaginate = if opt.isPaginate? then opt.isPaginate else true
    if isPaginate
      Handlebars.helpers.paginate.call(this, {hash:{showResultNumber:false}})
    else ""
  # Produce the html to render.
  html = " #{tableHeaderActions()}
              <#{listTagName} class='#{cssClass}'>
                #{options.fn(@)}
              </#{listTagName}>
            #{paginate()}
          <div id='lineSelectionContainer'></div>
  "
  return new Handlebars.SafeString(html)