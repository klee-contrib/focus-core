
## View.js (1/4)

A view has to inherit from a [Backbone.View](http://backbonejs.org/#View).
It looks like this:
```:javascript
var ContactView = Backbone.View.extend({
  url: "http://domain/api/contact",
  template: contactTemplate,
  events:{
    "click button[type='submit']": "save"
  }
  initialize: function(options){
    //Some initialization code here.
    var currentView = this;
    this.contactSvc.load(this.model.get('id')).then(function(data){
      currentView.model.set(data);
    });
  },save: function(event){
    event.preventDefault();
    this.saveSvc.save().then(
    //...
    )
  }
});
```

## View.js (2/4)
+ Has to load the model from the service
+ Has to render the html when its ready
+ Has to bind the DOM event (events property)

## Views.js (3/4)

+ A set of views is defined in the Fmk in the `Fmk.Views` property. All these views has many options and has been designed to cover almost every need in the application. 
+ They come with a set of options which can be overriden using the `customOptions` attributes.
+ A view must have one or many template(s)
+ A view must have one or many services (search, load, save, delete...)

## Views.js (4/4)

- **core_view** : The mother of all views
- **consult_edit** : Deals with consultation and edition.
- **list_view** : Deals with lists but extend consult_edit.
- **search_view** : Deals with search.Has to be conbine with a **result_view**.
- **composite_view** : Deals with translations.
