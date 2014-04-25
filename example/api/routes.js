var Hapi = require('hapi');
///var Types = require('hapi').Types;
module.exports = [{
	method: 'GET',
	path: '/CIL',
	config: {
		handler: getCIL
	}
},{
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
		// query: {
		// 	name: Types.String()
		// }
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
function getCIL(request, reply){
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