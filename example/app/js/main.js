/*global Fmk, jQuery, $*/

//Initialize metadatas and 
Fmk.initialize({domains: domains, metadatas: {}});
jQuery.fn.test = function() {
    console.log('JQURY PLUGIN TEST');
    this.each(function() {
       $(this).css("background-color", "#ff00ff");
    });
    return this;
};

//Registering a helper for post rendering.
Fmk.Helpers.postRenderingHelper.registerHelper({name: "testHelper", fn: "test", options: "test"});
//Creation of a test model.
var TestModel = Fmk.Models.Model.extend({
  modelName: "test",
  metadatas:{
    firstName: {domain: "DO_TEXTE_50", decorator: "testHelper"},
    age: {domain: "DO"}
  }
});
var TestView = Fmk.Views.CoreView.extend({
   template: Example.templates.contact
});
var view = new TestView({model :new TestModel({firstName: "Jon", lastName: "Jiap"})});
$('div#testViewContainer').html(view.render().el);

