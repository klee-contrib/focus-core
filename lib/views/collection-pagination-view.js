/*global Backbone*/
//var template = require("../template/collection-pagination");

module.exports = Backbone.View.extend({
  Service: undefined,

  initialize: function initializePagination(){

  },

  events:{

  },

  goToPage: function goToPage(page){
    this.model.setPage(page);
  },

  nextPage: function nextPage(){
    this.model.setNextPage();
  },

  previousPage: function PreviousPage(){
    this.model.setPreviousPage();
  },

  render: function renderPagination(){
    if (this.model.length === 0) {
      this.$el.html("");
    }else{
      this.$el.html(this.template(this.model.pageInfo()));
    }
  }
});