// Dependencies
var request = require('request');

exports.register = function(plugin, options, next) {

	var api = {};
	var endpoint = options;

	var requestData = function(endpoint, callback) {
		request({
			uri: endpoint,
			json: true,
		}, function(err, response, body){
			if(!err && response.statusCode == 200) {
				callback(body);
			}
			else {
				callback(null);
				console.log(err);
			}
		});
	}	

	// Get products
	api.getProducts = function(callback) {
		var url = endpoint.products;
		requestData(url, callback);
	}

	// Get users
	api.getUsers = function(callback) {
		var url = endpoint.users;
		requestData(url, callback);
	}

	plugin.expose(api);

	next();
}


exports.register.attributes = {
	name: 'webservice-adapter'
}