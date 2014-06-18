## Service (1/3)

+ Service layer is a Klee customization
+ This layer handle all the requests to the server.
+ This layer can also have a 'local' database strategy
+ This layer can decide to add a cache

## Service (2/3)

```:javascript
var Reference = require('../models/reference');
var References = require('../models/references');
var Promisify = require('../models/promisify');
/*Instances of both model and collection of virtual machines.*/
var promiseReference = Promisify.Convert.Model(new Reference());
var promiseReferences = Promisify.Convert.Collection(new References());

function saveReference(jsonModel) {
  promiseReference.clear({
    silent: true
  });
  return promiseReference.save(jsonModel);
}

//Load all the references of the application
function loadReferences() {
  promiseReferences.reset(null, {silent: true});
  return promiseReferences.fetch();
}
module.exports = {
  save: saveReference,
  loadAll: loadReferences
};
```
## Service (3/3)

+ The service can add cache on the client side if it is necessary
+ **Input** and **Output** can only be _JSON_
+ The service layer is build on the top of a future JavaScript core concept: **Promises**.


## Promises

## Callback problem

- Answer to the callback problem which are difficult to manage when the workflow is complex.
- If an **exception** occurs, the **thread** is **broken**.
- A callback must be **register before** its **called**.
- A callback can be trigger **multiple** times. 

## State

- **Pending**: don't get a result.
- **Fullfilled**: unable to get a result.
- **Rejected**: a problem occurs.
- **Setteled**: fullfilled  or rejected

## How it works

- Must be followed by a `then(onFullFilled, [,onRejected])`
- Each argument is optional and must be a function
- Only one will be called, **once**
- The call is **asynchronous**

## The code

```:javascript
var promise = new Promise(function(resolve, reject) {
    //Do something maybe asynchronous or not
    var isOk = treatement();
    if (isOk) {
      resolve("It works...");
    } else {
      reject(Error("It does not work!"))
}).then(console.log, console.error);
```