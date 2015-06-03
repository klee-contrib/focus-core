var render = require('../application/render');
var Backbone = require('backbone');
module.exports = Backbone.Router.extend({
  /**
   * Render the compoennt into the page content.
   */
  _pageContent(component, options){
    return render(component, '[data-focus="page-content"]', options);
  }
});
