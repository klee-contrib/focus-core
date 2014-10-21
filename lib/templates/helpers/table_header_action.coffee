# `{totalRecords: totalRecords}`
Handlebars.registerHelper "tableHeaderAction", (options)->
  options = options or {}
  options = options.hash or {}
  totalRecords = this.totalRecords or 0
  resultString = i18n.t(options.resultLabel or 'search.result')
  exportButton = ->
    if options.exportUrl? && totalRecords > 0
      return "
        <div class='pull-right export'>
          <button   data-bypass class='btn btnExport'><i class='fa fa-table'></i>#{i18n.t('search.export')}</button>
          <a href='#{options.exportUrl}' data-bypass class='btn hidden btnExport'><i class='fa fa-table'></i> #{i18n.t('search.export')}</a>
        </div>
        "
    return ""
  generateTotal = ()->
    return "<span class='badge'>#{totalRecords}</span> #{resultString}"
  html = "<div class='tableAction'>
            <div class='pull-left'>
                #{generateTotal()}
            </div>
            #{exportButton()}
          </div>"
  return new Handlebars.SafeString(html)