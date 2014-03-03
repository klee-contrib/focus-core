/*global Promise, $*/
// Container for all the references lists.
var references = {};


// Load a reference with its list name.
function loadListByName(listDesc) {
  return new Promise(function promiseLoadList(resolve, reject) {
    //console.log("Errors", errors);
    if (references[listDesc.name] !== undefined) {
      resolve(references[listDesc.name]);
    } else {
      $.ajax({
        url: listDesc.url,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(data) {
          references[listDesc.name] = data;//In order to not reload the next time,  warning, as promises are asynchronous, when the promise is define, this could be false.
          resolve(data);
        },
        error: function(error) {
          reject(error);
        }
      });
    }
  });
}

// Return an array of many promises for all the given lists.
function loadMany(names){
  var promises = [];
  names.forEach(function(name){
    promises.push(loadListByName(name));
  });
  return promises;
}


module.exports = {
  loadListByName: loadListByName,
  loadMany: loadMany
};