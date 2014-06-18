## Model.js (1/3)

A model has to inherit from a [Backbone.Model](http://backbonejs.org/#Model).
It looks like this:
```:javascript
var ContactModel = Fmk.Models.Model.extend({
  modelName: "contact"
  url: "http://domain/api/contact",
  initialize: function(options){
    //Some initialization code here.
    if(!this.isNew()){
      this.set({creationDate: new Date()});
    }
  },
  metadatas:{
    firstName: {
      "doamain": "DO_SHORT_LABEL"
    }
  }
});
```
## Model.js (2/3)

+ Has an url property
+ Has metadatas
+ Maintain attributes (modelName and metadatas attributes)
+ Trigger events when updtated

## Model.js (3/3)

+ In the `Fmk.js` the default Backbone model has been extended  mainly in order to deal with medatdatas.
+ It also have special methods in order to be save.
+ The json model is the input and the output of the **services**.
