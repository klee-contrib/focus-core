# Helper in order to display a progress bar.
Handlebars.registerHelper "progress", (property, options)->
  #Add each element of the property
  addElements = (elements)->
    html = ""
    sum = 0
    elements.forEach((elt)->
      if(not _.isEmpty(elt))
        sum+= elt.value 
    )
    elements.forEach((elt)->
      if(not _.isEmpty(elt))
        html += "<div class='progress-bar progress-bar-#{elt.type}' style='width: #{Math.floor(elt.value*100/sum)}%'>
          #{elt.label}
        </div>"
    )
    #console.log "progress", html
    return html
  return new Handlebars.SafeString("<div class='progress'>#{addElements(@[property])}</div>")
