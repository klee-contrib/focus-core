/* global Backbone, Promise, _*/

"use strict";
//Filename: promisify_helper.js
var odataHelper = require("./odata_helper");
var httpResponseParser = require('../core/http_response_parser');
var listMetadataParser = require('../core/list_metadata_parser');
var ArgumentNullException = require("./custom_exception").ArgumentNullException;
var ArgumentInvalidException = require("./custom_exception").ArgumentInvalidException;
var fetch = require('../core/fetch');

// Backbone model with **promise** CRUD method instead of its own methods.
var PromiseModel = Backbone.Model.extend({
  /**
   * Set the data for a promise model.
   * @param  {object} json to set in the model.
   * @param  {object} options on the save function such as the url.
   * @return {undefined}
   */
  setData: function setDataPromiseModel(json, options) {
    options = options || {};
    if (_.isString(options.url)) {
      this.urlRoot = options.url;
    }
    this.clear({
      silent: true
    });
    this.set(json, {
      silent: true
    });
  },
  /**
   * Save the data for a promise model.
   * @param  {object} json to save in the model.
   * @param  {object} options on the save function such as the url.
   * @return {objet} a promise of save.
   */
  saveData: function setDataPromiseModel(json, options) {
    this.setData(json, options);
    return this.save();
  },
  /**
   * Fetch the model.
   * @param  {object} json to set to the model before loading.
   * @param  {object} options on the save function such as the url.
   * @return {objet} a promise of fetch.
   */
  fetchData: function fetchDataPromiseModel(json, options) {
    this.setData(json, options);
    return this.fetch();
  },
  //Ovverride the save method on the model in order to Return a promise.
  save: function saveModel(options) {
    var model = this;
    var method = this.isNew() ? 'create' : 'update';
    return new Promise(
      function (resolve, reject) {
        var opts = _.extend({
          success: function (data, textStatus, jqXHR) {
            resolve(httpResponseParser.parse(jqXHR));
          },
          error: function(jsonResponse){
            jsonResponse.responseJSON = _.extend({},jsonResponse.responseJSON,{type: "entity"});
            reject(jsonResponse);
          }
        }, options);
        Backbone.sync(method, model, opts);
      }
    );
  },
  //Replacing the classic destroy model with a promise.
  destroy: function promiseDestroyModel() {
    var model = this;
    return new Promise(
      function (resolve, reject) {
        Backbone.sync('delete', model, {
          success: resolve,
          error: reject
        });
      }
    );
  },
  //Replacing the classic backbone fetch with a promise, resolve and reject are givent as options.success, and options.error of the ajax.
  fetch: function promiseFetchModel(options) {
    options = options || {};
    var model = this;
    //console.log('promiseFetchModel', model);
    return new Promise(function (resolve, reject) {
      /*Don't use underscore but could have because bacckbone has a dependency on it.*/
      options.success = function (data, textStatus, jqXHR) {
        resolve(httpResponseParser.parse(jqXHR));
      };
      options.error = reject;
      Backbone.sync('read', model, options);
    });
  }

});

// Backbone collection with **promise** CRUD method instead of its own methods.
var PromiseCollection = Backbone.Collection.extend({
  search: function searchPromiseCollection(params, options) {
    options = options || {};
    params = params || {};
    if (!_.isObject(params)) {
      throw new ArgumentNullException('searchPromiseCollection: params should be an object, check your service');
    }
    if (!_.isObject(params.pagesInfos)) {
      throw new ArgumentInvalidException('searchPromiseCollection: params should have a pagesInfos property, check your service', params);
    }
    //Clean the shared collection.
    this.reset(null, {
      silent: true
    });
    //If the url wants to be changed it can be done.
    if (options.url) {
      this.url = options.url;
    } else {
      options.url = this.url;
    }
    params.pageInfo = params.pagesInfos;
    delete params.pagesInfos;
    var requestParams = listMetadataParser.createMetadataOptions(params, options);
    return fetch(requestParams);


  },
  /**
   * Fetch the collection datas, clean the share collection and parse.
   * @param  {object} this object should have the following structure: {criteria: {key: "val"}, pagesInfos: {}}.
   * @param  {object} options can contain a url.
   * @return {object} the promise of the fetch and the parse with the Odata.
   */
  fetchData: function fetchDataPromiseCollection(params, options) {
    options = options || {};
    params = params || {};
    if (!_.isObject(params)) {
      throw new ArgumentNullException('fetchDataPromiseCollection: params should be an object, check your service');
    }
    if (!_.isObject(params.pagesInfos)) {
      throw new ArgumentInvalidException('fetchDataPromiseCollection: params should have a pagesInfos property, check your service', params);
    }
    //Clean the shared collection.
    this.reset(null, {
      silent: true
    });
    //If the url wants to be changed it can be done.
    if (options.url) {
      this.url = options.url;
    }

    //Automatically call the odataHelper to create the options.
    return this.fetch(odataHelper.createOdataOptions(params.criteria, params.pagesInfos))
      .then(odataHelper.parseOdataResponse);
  },
  //Override the default collection fetch method, using and returning a promise.
  //Options is the options object which is sent to the jquery method.
  fetch: function promiseFetchCollection(options) {
    options = options || {};
    var collection = this;
    return new Promise(function (resolve, reject) {
      /*Don't use underscore but could have because bacckbone has a dependency on it.*/
      options.success = function (data, textStatus, jqXHR) {
        resolve(httpResponseParser.parse(jqXHR));
      };
      options.error = reject;
      var action = options.method === "POST" ? "create" : "read";
      Backbone.sync(action, collection, options);
    });
  },
  save: function saveCollection() {
    var model = this;
    var method = 'create';
    return new Promise(
      function (resolve, reject) {
        Backbone.sync(method, model, {
          success: function (data, textStatus, jqXHR) {
            resolve(httpResponseParser.parse(jqXHR));
          },
          error: function(jsonResponse){
            jsonResponse.responseJSON = _.extend({},jsonResponse.responseJSON,{type: "collection"});
            reject(jsonResponse);
          }
        });
      }
    );
  }
});

//Convert an existing Backbone model to a _promise_ version of it.
var ConvertModel = function ConvertBackBoneModelToPromiseModel(model) {
  if (model.url === undefined || model.urlRoot === undefined) {
    throw new Error("ConvertBackBoneModelToPromiseModel: The url of the model: " + model.modelName + " cannot be undefined.");
  }
  var fields = {};
  if (model.has('id')) {
    _.extend(fields, model.pick('id'));
  }
  var promiseModel = new PromiseModel(fields);
  var property = model.urlRoot !== undefined ? 'urlRoot' : 'url';
  promiseModel[property] = model[property];
  return promiseModel;
};

//Convert an existing Backbone collection to a _promise_ version of it.
var ConvertCollection = function ConvertBackboneCollectionToPromiseCollection(collection) {
  if (collection.url === undefined || collection.urlRoot === null) {
    throw new Error("ConvertCollection: The  url of the collection " + collection.modelName + " cannot be undefined.");
  }
  var promiseCollection = new PromiseCollection();
  promiseCollection.url = collection.url;
  return promiseCollection;
};

// Convert an existing Backbone collection to a promise version of its changes
// (when calling save, the { creates: [], deletes: [], updates: [] } object will be posted to collection.url)
var ConvertCollectionChanges = function ConvertBackboneCollectionToPromiseCollectionChanges(collection, changes) {
  if (collection.url === undefined || collection.urlRoot === null) {
    throw new Error("ConvertCollection: The  url of the collection " + collection.modelName + " cannot be undefined.");
  }
  var promiseCollectionChanges = new PromiseModel(new Backbone.Model(changes));
  promiseCollectionChanges.urlRoot = collection.url;
  return promiseCollectionChanges;
};

/**
 * Generate a modle from  a json object and a url.
 * @param  {string} url  - The server api url.
 * @param  {object} json - JSON object representing the model properties.
 * @return {PromiseModel}      - A backbone model promisified with the good url.
 */
var generateModel = function generateModel(url, json) {
  if (json !== undefined && json !== null && !_.isObject(json)) {
    throw new ArgumentInvalidException(json);
  }
  if (!_.isString(url)) {
    throw new ArgumentInvalidException(url);
  }
  var Model = PromiseModel.extend({
    urlRoot: url
  });
  return new Model(json);
};

/**
 * Generate a collection from an url , json and metadatas.
 * @param  {[type]} url       [description]
 * @param  {[type]} json      [description]
 * @param  {[type]} metadatas [description]
 * @return {[type]}           [description]
 */
var generateCollection = function generateCollection(url, json) {
  if (json !== undefined && !_.isArray(json)) {
    throw new ArgumentInvalidException(json);
  }
  if (!_.isString(url)) {
    throw new ArgumentInvalidException(url);
  }
  var Collection = PromiseCollection.extend({
    url: url
  });
  return new Collection(json);
};

//Todo: see if it is necessary to expose Model and collection promisified.
var promisifyHelper = {
  Model: PromiseModel,
  Collection: PromiseCollection,
  Convert: {
    Model: ConvertModel,
    Collection: ConvertCollection,
    CollectionChanges: ConvertCollectionChanges
  },
  model: generateModel,
  collection: generateCollection
};
module.exports = promisifyHelper;
