/*global Fmk, jQuery, $, Backbone*/

/*Test du retour pour les backbone model promisify*/
//Création d'une extension à un model.
var Model = Backbone.Model.extend({urlRoot: "http://localhost:8080/vm"});
var model = new Model();
//Création d'un model promisifié.
var promisifyModel  = Fmk.Helpers.promisifyHelper.Convert.Model(model);
promisifyModel.set({test: "test"});
promisifyModel.save().then(function(s){console.log("succçès de la sauvegarde",s);}, function(e){console.log("erreur de la sauvegarde.",e);});




var domains = {
  "DO_ENTIER": {
    "type": "number",
    "validation": [{
      "type": "number"
    }],
  },
  "DO_DATE": {
    "type": "date"
  },
  "DO_TEXTE_50": {
    "type": "text",
    "validation": [{
      "type": "string",
      "options": {
        "maxLength": 50
      }
    }],
    "style": ["cssClassDomain1", "cssClassDomain2"],
    "decorator": "testHelper"
  },
  "DO_LISTE": {
    "type": "number",
  },
  "DO_ID": {
    "type": "text"
  },
  "DO_TEXTE_30": {
    "type": "text",
    "validation": [{
      "type": "string",
      "options": {
        "maxLength": 30
      }
    }]
  },
  "DO_EMAIL": {
    "type": "email",
    "validation": [{
      "type": "email"
    }, {
      "type": "string",
      "options": {
        "minLength": 4
      }
    }],
    "symbol": "@"
  },
  "DO_BOOLEEN": {
    "type": "boolean"
  },
  "DO_DEVISE": {
    "type": "number",
    "validation": {
      "type": "number",
      "options": {
        "min": 0
      }
    },
    "formatter": "devise"
  }
};

var entityDefinitions = {
  "coreModel": {

  },
  contact: {
    firstName: {
      domain: "DO_TEXTE_30",
      required: true
    },
    lastName: {
      domain: "DO_TEXTE_30",
      required: false
    },
    email: {
      domain: "DO_EMAIL"
    }
  }

};
i18n.init({
  resStore: {},
  lng: "en-US"
}, function(content) {
  console.log('Translation correctly initialized.')
});
//Initialize metadatas and 
Fmk.initialize({
  domains: domains,
  metadatas: entityDefinitions
});
jQuery.fn.test = function() {
  console.log('JQURY PLUGIN TEST');
  this.each(function() {
    $(this).css("background-color", "#ff00ff");
  });
  return this;
};

//Registering a helper for post rendering.
Fmk.Helpers.postRenderingHelper.registerHelper({
  name: "testHelper",
  fn: "test",
  options: "test"
});
//Creation of a test model.
var TestModel = Fmk.Models.Model.extend({
  modelName: "test",
  metadatas: {
    email: {
      symbol: "@"
    }
  }
});
var TestView = Fmk.Views.CoreView.extend({
  template: Example.templates.contact
});
var view = new TestView({
  model: new TestModel({
    firstName: "Jon",
    lastName: "Jiap",
    testProgress: [{
      label: "Test1",
      type: "warning",
      value: 10
    }, {
      label: "Test2",
      type: "success",
      value: 40
    }, {
      label: "Test3",
      type: "error",
      value: 50
    }]
  })
});
$('div#testViewContainer').html(view.render().el);


//Initialization
//Create a json collection.
var collectionJSON = Fmk.Helpers.utilHelper.generateFake.collection({
  firstName: "a",
  lastName: "b",
  email: "aaaaa@bbbbb.com"
}, 7);
//console.log("collectionJSON", collectionJSON);
//Create a backbone model.
var Contact = Fmk.Models.Model.extend({
  modelName: "contact"
});
var Contacts = Backbone.Collection.extend({
  modelName: "contacts",
  model: Contact
});
var contacts = new Contacts(collectionJSON);
Fmk.Helpers.modelValidationPromise.validateAll(contacts).then(function(s) {
  console.log(s);
}, function(err) {
  console.error(err);
});



