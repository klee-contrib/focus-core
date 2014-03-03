/*global Backbone, Promise, _*/
// Backbone model with **promise** CRUD method instead of its own methods.
var PromiseModel = Backbone.Model.extend({
	//Ovverride the save method on the model in order to Return a promise.
	save: function saveModel() {
		var model = this;
		var method = this.isNew() ? 'create' : 'update';
		return new Promise(
			function(resolve, reject) {
				Backbone.sync(method, model, {
					success: resolve,
					error: reject
				});
			}
		);
	},
	//Replacing the classic destroy model with a promise.
	destroy: function promiseDestroyModel() {
		var model = this;
		return new Promise(
			function(resolve, reject) {
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
		console.log('promiseFetchModel', model);
		return new Promise(function(resolve, reject) {
			/*Don't use underscore but could have because bacckbone has a dependency on it.*/
			options.success = resolve;
			options.error = reject;
			Backbone.sync('read', model, options);
		});
	}

});

// Backbone collection with **promise** CRUD method instead of its own methods.
var PromiseCollection = Backbone.Collection.extend({
	//Override the default collection fetch method, using and returning a promise.
	//Options is the options object which is sent to the jquery method.
	fetch: function promiseFetchCollection(options) {
		options = options || {};
		var collection = this;
		return new Promise(function(resolve, reject) {
			/*Don't use underscore but could have because bacckbone has a dependency on it.*/
			options.success = resolve;
			options.error = reject;
			Backbone.sync('read', collection, options);
		});
	}
});

//Convert an existing Backbone model to a _promise_ version of it.
var ConvertModel = function ConvertBackBoneModelToPromiseModel(model) {
	if (model.url === undefined || model.urlRoot === undefined) {
		throw new Error("ConvertBackBoneModelToPromiseModel: The model url cannot be undefined.");
	}
	var fields = {};
	if(model.has('id')){
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
		throw new Error("The collection url cannot be undefined.");
	}
	var promiseCollection = new PromiseCollection();
	promiseCollection.url = collection.url;
	return promiseCollection;
};

module.exports = {
	Model: PromiseModel,
	Collection: PromiseCollection,
	Convert: {
		Model: ConvertModel,
		Collection: ConvertCollection
	}
};