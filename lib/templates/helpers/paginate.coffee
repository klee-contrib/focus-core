# display pagination on table 
# consume an object in the this which is : 
# `{currentPage: currentPage, firstPage: firstPage, totalPages: totalPages, perPage: perPage, totalRecords: totalRecords}`
Handlebars.registerHelper "paginate", (property, options)->
  options = options or {}
  options = options.hash or {}
  return "" if not @collection?
  return "" if @collection? and @collection.length is 0
  currentPage = this.currentPage
  firstPage = this.firstPage or 1
  endPage = this.totalPages or 0

  nbPrint = 4;
  firstPagePrint = Math.max(firstPage, currentPage - nbPrint)
  lastPagePrint = Math.min(endPage, currentPage + nbPrint)
  nbPagePrint = lastPagePrint - firstPagePrint
  if nbPagePrint < nbPrint * 2
    if endPage - lastPagePrint > nbPrint
      lastPagePrint += nbPrint * 2 - nbPagePrint
    else
      firstPagePrint -= nbPrint * 2 - nbPagePrint
  
  firstPagePrint = Math.max(firstPagePrint, 1);
   
  perPage = this.perPage or 10
  totalRecords = this.totalRecords
  generateLeftArrow = ()->
    className = if currentPage is firstPage then "disabled" else ""
    return "<li class='#{className}'><a href='#' data-bypass data-page='#{firstPage}'>&laquo;</a></li>"
  generatePageNumber= ()->
    html = ""
    (html+= "<li class='#{if i is currentPage then 'active' else ''}'><a href='#' data-bypass data-page='#{i}'>#{i}</a></li>") for i in [firstPagePrint..lastPagePrint]
    return html
  generateRigthArrow = ()->
    className = if currentPage is endPage then "disabled" else ""
    return "<li class='#{className}'><a href='#' data-bypass  data-page='#{endPage}'>&raquo;</a></li>"
  generatePagination = ->
    return "" if totalRecords <= perPage
    return "#{generateLeftArrow()}#{generatePageNumber()}#{generateRigthArrow()}"
  generatePageFilter = ()->
    pageString = i18n.t("application.pages")
    generateOptions = ()->
      html = ""
      for i in [1..4]
        html += "<option value='#{5*i}' #{if 5*i is perPage then 'selected'}>#{5*i} #{pageString}</option>"
      return html
      
    return "<select class='form-control pageFilter'>
              #{generateOptions()} 
            </select>"
  generateTotal = ()->
    resultString = i18n.t('search.result')
    return if options.showResultNumber then "<div class='badgeResult'>#{resultString} <span class='badge'>#{totalRecords}</span></div>" else ""
    
  html = "<div class='col-md-8'>
            <ul class='pagination'>#{generatePagination()}</ul>
          </div>
          <div class='col-md-2 pagination'>
            #{generateTotal()}
          </div>
          <div class='col-md-2 pagination'>
            #{generatePageFilter()}
          </div>"
  return new Handlebars.SafeString(html)
