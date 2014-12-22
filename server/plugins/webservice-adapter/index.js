// Dependencies
var wreck = require('wreck');

exports.register = function(server, options, next) {

	var api = {};
	var endpoint = options;

	var requestData = function(endpoint, callback) {

		wreck.get(endpoint, null, function(err, res, data) {

			if(err) {
				server.log(['error'], err);
				callback(null);
			}
			else {
				var json = JSON.parse(data);
				callback(json);
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

	// Get accolades
	api.getAccolades = function(callback) {
		var url = endpoint.accolades;
		requestData(url, callback);
	}

	// Get articles
	api.getArticles = function(callback) {
		var url = endpoint.articles;
		requestData(url, callback);
	}

	server.expose(api);

	next();
}


exports.register.attributes = {
	name: 'webservice-adapter'
}