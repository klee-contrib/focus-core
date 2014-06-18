
## Router (1/3)

+ The router is responsible for routing the url on the client side.
+ A route can have parameters
+ A Route can be a regex
+ A Route must have an handler

## Router (2/3)

```:javascript
//Registering routes
Router.prototype.routes = {
    '': 'home',
    'about': 'about',
    'contact': 'contact',
    'signin': 'signin',
    'contact/:id': 'loadContact'
  };
//Handler
var loadContact = function(id) {
    return application.layout.content.show(
      new ContactView({
        model: new Contact({id: id})
      }
    ));
  };

```

## Router (3/3)
The router in the Fmk.js has been modified in order to perform the following actions:

+ Right validation (base on the sitemap roles)
+ Redirection
+ Middleware strategy
+ Deals with transverse notifications

