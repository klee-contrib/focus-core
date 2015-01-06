/* global  _ , $, Promise */

"use strict";
//Filename: helpers/util_helper.js

var ArgumentInvalidException = require("./custom_exception").ArgumentInvalidException;

var JSON = {};

// Unflatten a json object.
// from an object `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
// Gives a `{contact: {nom: "nom", prenom: "prenom"}}`
JSON.unflatten = function (data) {
  if (Object(data) !== data || Array.isArray(data))
    return data;
  if ("" in data)
    return data[""];
  var result = {},
    cur, prop, idx, last, temp;
  for (var p in data) {
    cur = result;
    prop = "";
    last = 0;
    do {
      idx = p.indexOf(".", last);
      temp = p.substring(last, idx !== -1 ? idx : undefined);
      cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
      prop = temp;
      last = idx + 1;
    } while (idx >= 0);
    cur[prop] = data[p];
  }
  return result[""];
};

//Flatten a json object.
// from an object`{contact: {nom: "nom", prenom: "prenom"}}`
// Gives a one level object:  `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
JSON.flatten = function (data) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop ? prop + "." + i : "" + i);
      if (l === 0)
        result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty)
        result[prop] = {};
    }
  }

  recurse(data, "");
  return result;
};
//Deeply combine an arbitrary number of JS objects.
function combine() {
  var res = {};
  var args = _.map(arguments, function (item) {
    return item && !_.isEmpty(item) ? JSON.flatten(item) : {};
  });
  args.unshift(res);
  _.extend.apply(this, args);
  return JSON.unflatten(res);
}
//Deeply combine two json.
function combineTwo(json1, json2) {
  var res = {};
  _.extend(
    res,
    JSON.flatten(json1),
    JSON.flatten(json2)
  );
  return JSON.unflatten(res);
}
//Group datas by split char.
function groupBySplitChar(data, options) {
  options = options || {};
  if (!_.isObject(data)) {
    throw new ArgumentInvalidException('Data must be an object', data);
  }
  var splitKey = options.splitKey || '.';
  var resutContainer = {};
  for (var prop in data) {
    var l = prop.split(splitKey).length;
    if (!_.isObject(resutContainer[l])) {
      resutContainer[l] = {};
    }
    resutContainer[l][prop] = data[prop];
  }
  return resutContainer;
}
//Generate four random hex digits.
function splitLevel(source, options) {
  options = options || {};
  var splitChar = options.splitChar || '.';
  var depth = options.depth || source.length;
  //if(depth === 0){return source;}
  return _.reduce(source.split(splitChar, depth), function (memo, val) {
    return memo + val + splitChar;
  }, '').slice(0, -1);
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * Generate a pseudo-GUID by concatenating random hexadecimal
 * @return {string} A guid.
 */
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

//This method allows the user to load a data (objet or list) in a promise
// Exampl call: refHelper.loadLocalData([{id: 1, label: "nom 1"}, {id: 1, label: "nom 2"}])
var loadLocalData = function loadLocalData(data) {
  return new Promise(function promiseLoadLocalList(resolve, reject) {
    resolve(data);
  });
};

//Generate fake datas.
var generateFake = {
  //Generate an aleafied object
  object: function generateFalseData(obj) {
    var objAla = {};
    for (var prop in obj) {
      //todo: differenciate the treatement swithcing on type.
      objAla[prop] = '' + obj[prop] + S4();
    }
    return objAla;
  },
  //Generate a fake collection from a single object, adding, nb is th array size.
  collection: function geenerateFalseCollection(obj, nb) {
    var res = [];
    for (var i = 0; i < nb; i++) {
      res.push(this.object(obj));
    }
    return res;
  }

};
/**
 * Sort an object by its keys.
 * @param  {object} object - The object to sort.
 * @return {object}        - The sorted object.
 */
var sortObject = function sortObject(object) {
  if (!_.isObject(object)) {
    throw new ArgumentInvalidException("object");
  }
  var tmp = {};
  var sortedKeys = _.sortBy(_.keys(object), function (d) {
    return d;
  });
  for (var i = 0; i < sortedKeys.length; i++) {
    tmp[sortedKeys[i]] = object[sortedKeys[i]];
  }
  return tmp;
};

//Method to call in order to know if a model is a model.
var isBackboneModel = function isBackboneModel(model) {
  return model !== undefined && model !== null && typeof model.has === "function";
};

// Method to call in order to know if a model is a collection.
var isBackboneCollection = function isBackboneCollection(collection) {
  return collection !== undefined && collection !== null && typeof collection.add === "function";
};

//Method to call in order to know of an object is a view.
var isBackboneView = function isBackboneView(view) {
  return view !== undefined && view !== null && typeof view.render === "function";
};

// This method perform an ajax request within a promise.
// Example call : utilHelper.promiseAjax({url: "http://localhost:8080/api/list/1", type: "GET"}).then(console.log,console.error);
var promiseAjax = function promiseAjax(ajaxSettings) {
  ajaxSettings = ajaxSettings || {};
  return new Promise(function promiseLoadList(resolve, reject) {
    //console.log("Errors", errors);
    $.ajax({
      url: ajaxSettings.url,
      type: ajaxSettings.type,
      data: ajaxSettings.data,
      dataType: "json",
      crossDomain: true,
      success: function (data) {
        //references[listDesc.name] = data; //In order to not reload the next time,  warning, as promises are asynchronous, when the promise is define, this could be false.
        resolve(data);
      },
      error: function (error) {
        reject(error);
      }
    });
  });
};

// Returns a promise that is automatically rejected with an error message.
var promiseRejectWithMessage = function promiseRejectWithMessage(messageKey) {
  return new Promise(function (resolve, reject) {
    reject({
      responseJSON: {
        "error": messageKey
      }
    });
  });
};

//Util helper.
var utilHelper = {
  flatten: JSON.flatten,
  unflatten: JSON.unflatten,
  combine: combine,
  groupBySplitChar: groupBySplitChar,
  splitLevel: splitLevel,
  loadLocalData: loadLocalData,
  guid: guid,
  generateFake: generateFake,
  isBackboneModel: isBackboneModel,
  isBackboneCollection: isBackboneCollection,
  isBackboneView: isBackboneView,
  promiseAjax: promiseAjax,
  promiseRejectWithMessage: promiseRejectWithMessage,
  sortObject: sortObject
};
module.exports = utilHelper;