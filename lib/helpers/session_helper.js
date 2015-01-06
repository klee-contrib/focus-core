//Session helper. Min browser: IE8, FF 3.5, Safari 4, Chrome 4, Opera 10.5. See [CanIUSE](http://caniuse.com/#feat=namevalue-storage)
/* global window, Promise*/
"use strict";
//Filename: helpers/session_helper.js
//Dependency gestion depending on the fact that we are in the browser or in node.
var ArgumentInvalidException = require("./custom_exception").ArgumentInvalidException;

//Config of the storage.
var config = {
  description: 'Session storage of the user.',
  name: 'Session helper.',
  // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
  // we can use without a prompt.
  size: 4980736,
  storeName: 'userSession',
  version: 1.0
};

//Container for the storage.
var storage;
try {
  // Initialize storage with session storage and create a variable to use it.
  storage = window.sessionStorage;
} catch (e) {
  throw new Error("Your browser does not seem to have session storage.");
}

//Serialize the data to be save.
function _serialize(data) {
  if (data !== null && data !== undefined) {
    return JSON.stringify(data);
  }
  return undefined;
}

//Deserialize the data.
function _deserialize(data) {
  if (typeof data !== "string") {
    throw new ArgumentInvalidException('The data to deserialize must be a string.', data);
  }
  return JSON.parse(data);
}

//Dave the data into the storage and return a promise.
// The Promise is fullfilled only if there is data to save.
function saveItem(key, data) {
  return new Promise(function(resolve, reject) {
    if (data === null || data === undefined) {
      reject(new ArgumentInvalidException('The data to save must be define.', data));
    } else {
      storage.setItem(key, _serialize(data));
      resolve({
        key: key,
        data: data
      });
    }
  });
}

//Get data with a promise.
// The Promise is fullfilled only if the item exists.
function getItem(key) {
  return new Promise(function(resolve, reject) {
    if (typeof key !== "string") {
      reject(new ArgumentInvalidException("The key must be a string", key));
    }
    var stringData = storage.getItem(key);
    if (stringData === null || stringData === undefined) {
      resolve(null);
    } else {
      resolve(_deserialize(stringData));
    }
  });
}

//Remove an item from the session and return a promise.
// The Promise is fullfilled only if the item exists.
function removeItem(key) {
  return new Promise(function(resolve, reject) {
    if (typeof key !== "string") {
      reject(new ArgumentInvalidException("The key must be a string", key));
    }
    var stringData = storage.getItem(key);
    if (stringData === null || stringData === undefined) {
      reject(null);
    }else {
      storage.removeItem(key);
      resolve(key);
    }
  });
}

//Promise of clearing the storage.
//Promise is fullfilled only if it works.
function clear() {
  return new Promise(function(resolve, reject) {
    try {
      storage.clear();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

var sessionHelper = {
  clear: clear,
  saveItem: saveItem,
  getItem: getItem,
  removeItem: removeItem
};

module.exports = sessionHelper;