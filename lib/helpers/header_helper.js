module.exports = {
  //Process all the data from the header.
  process: function processHeader(headersElements) {
    var headerData = [];
    for (var i = 0, l = headersElements.length; i < l; i++) {
      var active = i === 0 ? "active" : "";
      var name = headersElements[i].name;
      var jsonElement = {
        cssId: "nav-" + name,
        active: active,
        name: name,
        transalationKey: "header." + name
      };
      if(headersElements[i].url !== undefined){
        jsonElement.url = headersElements[i].url;
      }
      headerData.push(jsonElement);
    }
    return headerData;
  }
};