// Dependencies
var wreck = require('wreck');

exports.register = function(server, options, next) {

	var api = {};
	var remote = options;
	var cache = server.cache({});

	var requestData = function(endpoint, callback) {

		cache.get(endpoint, function(err, value, cached, log) {

			// Attempt to get from cache first
			if(value === null) {

				wreck.get(endpoint, null, function(err, res, data) {

					if(err) {
						server.log(['error'], err);
						callback(null);
					}
					else {

						var json = JSON.parse(data);
						
						// Cache results
						cache.set(endpoint, json, 60 * 1000, function(err) {
							callback(json);
						});
					}
				});
			}
			else {
				callback(value);
			}
		});
	}	

	// Get products
	api.getProducts = function(callback) {
		var url = remote.products;
		requestData(url, callback);
	}

	// Get users
	api.getUsers = function(callback) {
		var url = remote.users;
		requestData(url, callback);
	}

	// Get accolades
	api.getAccolades = function(callback) {
		var url = remote.accolades;
		requestData(url, callback);
	}

	// Get articles
	api.getArticles = function(callback) {
		var url = remote.articles;
		requestData(url, callback);
	}

	server.expose(api);

	next();
}


exports.register.attributes = {
	name: 'webservice-adapter'
}