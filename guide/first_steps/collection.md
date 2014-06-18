
## Collection.md (1/3)

- A collection is a group of model.
- It has methods to iterate, sort
- It can be use to save a list of data.

## Collection (2/3)
```:javascript
//Dependencies.
var URL = require('../URL');
var Contact = require('./contact');

module.exports = Fmk.Models.PaginatedCollection.extend({
    model: Contact,
    modelName: "demo.contact",
    url: URL.demo.contact
});

```

## Collection (3/3)
Collection have been extended in order to :

- Have pagination
- Sort
- A track of changes

```:json
changes:{
  creates:[],
  deletes:[],
  updates: []
}
```