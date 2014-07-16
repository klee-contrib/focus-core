/*global reply*/
var Hapi = require('hapi');
var _ = require('underscore');
///var Types = require('hapi').Types;
var data = {
	contacts: [{
		id: 1,
		firstName: "Pierre",
		lastName: "Besson",
		adress: "12 rue des fleurs 75000 Paris",
		email: "pierre@besson.com",
		age: 26
	}, {
		id: 2,
		firstName: "Jean",
		lastName: "Besson",
		adress: "12 rue des fleurs 75000 Paris",
		email: "jean@besson.com",
		age: 1
	}, {
		id: 3,
		firstName: "Jaques",
		lastName: "Besson",
		adress: "20 rue des ruelles 59000 Lille",
		email: "jacques@besson.com",
		age: 52
	}]
};

module.exports = [{
	method: 'GET',
	path: '/CIL',
	config: {
		handler: getCIL
	}
}, {
	method: 'GET',
	path: '/reference',
	config: {
		handler: getRefs
	}
}, {
	method: 'GET',
	path: '/vm',
	config: {
		handler: getVms
	}
}, {
	method: 'GET',
	path: '/vm/{id}',
	config: {
		handler: getVm
	}
}, {
	method: 'POST',
	path: '/vm',
	config: {
		handler: addVm,
		/*validate: {
			payload: {
				name: Hapi.types.String().required().min(3)
			}
		}*/
	}
}, {
	method: 'PUT',
	path: '/vm/{id}',
	config: {
		handler: updateVm
	}
}, {
	method: 'DELETE',
	path: '/vm/{id}',
	config: {
		handler: deleteVm
	}
}, {
	method: 'GET',
	path: '/contact/{id}',
	config: {
		handler: function(request, reply) {
			var contactId = request.params.id;
			console.log('/contact/' + contactId);
			reply({
				id: contactId,
				firstName: "Pierre",
				lastName: "Besson",
				adress: "12 rue des fleurs 75000 Paris",
				email: "pierre@besson.com",
				age: 26
			});
		}
	}
}, {
	method: 'GET',
	path: '/contact',
	config: {
		handler: function(request, reply) {
			console.log('/contact/');
			reply([{
				id: 1,
				firstName: "Pierre",
				lastName: "Besson",
				adress: "12 rue des fleurs 75000 Paris",
				email: "pierre@besson.com",
				age: 26
			}, {
				id: 2,
				firstName: "Jean",
				lastName: "Besson",
				adress: "12 rue des fleurs 75000 Paris",
				email: "jean@besson.com",
				age: 1
			}, {
				id: 3,
				firstName: "Jaques",
				lastName: "Besson",
				adress: "20 rue des ruelles 59000 Lille",
				email: "jacques@besson.com",
				age: 52
			}]);
		}
	}
}, {
	method: 'POST',
	path: '/contact',
	config: {
		payload: {
			parse: true
		},
		handler: function adContact(request, reply) {
			console.log("POST /contact");
			//var j = request.payload;
			var contact = {
				id: data.contacts.length + 1,
				firstName: request.payload.firstName,
				lastName: request.payload.lastName,
				adress: request.payload.adress,
				email: request.payload.email,
				age: request.payload.age,
			};

			data.contacts.push(contact);
			//console.log(contact);
			reply(contact);
		}
	}
}, {
	method: 'PUT',
	path: '/contact',
	config: {
		payload: {
			parse: true
		},
		handler: function updateContact(request, reply) {
			console.log('PUT /contact');
			var contact = {
				id: request.payload.id,
				firstName: request.payload.firstName,
				lastName: request.payload.lastName,
				adress: request.payload.adress,
				email: request.payload.email,
				age: request.payload.age,
			};
			console.log(contact);
			reply(contact);
		}
	}
}, {
	method: 'POST',
	path: '/contacts',
	config: {
		payload: {
			parse: true
		},
		handler: function(request, reply) {
			console.log('/contact/');
			var contactCriteria = {
				firstName: request.payload.firstName,
				lastName: request.payload.lastName,
				adress: request.payload.adress,
				email: request.payload.email,
				age: request.payload.age,
			};
			console.log('POST CONTACTS %j', contactCriteria);
			var res = _.filter(data.contacts, function(ctc) {
				var isFirstName = contactCriteria.firstName !== undefined ? ctc.firstName === contactCriteria.firstName : true;
				var isLastName = contactCriteria.lastName !== undefined ? ctc.lastName === contactCriteria.lastName : true;
				return isFirstName || isLastName;
			});
			reply({
				value: res,
				odata: {
					count: res.length
				}
			});
		}
	}
}, {
	method: 'DELETE',
	path: '/contact/{id}',
	config: {
		payload: {
			parse: true
		},
		handler: function updateContact(request, reply) {
			reply().code(204);
		}
	}
}];

var references = [{
	id: 1,
	name: 'Linux',
	translationKey: 'linux'
}, {
	id: 2,
	name: 'Windows',
	translationKey: 'windows'
}];

var vms = [{
	id: 0,
	name: 'VM1',
	nbCpu: 2,
	memory: 1000,
	diskTypeId: 1,
	diskCapacity: 300,
	users: undefined,
	osId: 3
}, {
	id: 1,
	name: 'VM2',
	nbCpu: 4,
	memory: 2000,
	diskTypeId: 1,
	diskCapacity: 300,
	users: undefined,
	osId: 1
}];

function getRefs(request, reply) {
	console.log('Get References');
	reply(references);
}

function getVms(request, reply) {
	console.log('getVMS request');
	if (request.query.name) {
		reply(vms);
	} else {
		reply(vms);
	}
}

function getVm(request, reply) {
	console.log('Get VM : id: ', request.params.id);
	reply(vms[request.params.id]);
}

function addVm(request, reply) {
	console.log('addVM', vms[vms.length - 1].id + 1);
	var vm = {
		id: vms[vms.length - 1].id + 1,
		name: request.payload.name,
		nbCpu: 4,
		memory: 2000,
		diskTypeId: 1,
		diskCapacity: 300,
		users: undefined,
		osId: 1
	};

	vms.push(vm);

	reply(vm).code(200);
}

function updateVm(request, reply) {
	console.log('Update VM', request, reply);
	//vms[vms.request.payload.id] = request.payload;
	//reply(request.payload).code(200);

	//error response
	reply({
		errors: [{
			fieldName: "memory",
			message: "la memoire est insuffisante."
		}, {
			fieldName: "",
			message: "erreur globale de la VM."
		}]
	}).code(501);
}

function deleteVm(request, reply) {
	console.log('delete VM', request.params.id);
	reply({
		"deleted": true,
		"id": request.params.id
	});
}
//Get CIL.
function getCIL(request, reply) {
	reply([{
		id: "1",
		label: "CIL1"
	}, {
		id: "2",
		label: "CIL2"
	}, {
		id: "3",
		label: "CIL3"
	}]);
}