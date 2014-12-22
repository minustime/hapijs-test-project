var async = require('async');

module.exports = function(ws) {

	var Home = {};

	Home.getContent = function(callback) {

			// Fetch the content, render the page when everything has returned
			async.parallel({
				'users': function(cb) {
					ws.getUsers(function(results) {
						cb(null, results);
					});
				},		
				'products': function(cb) {
					ws.getProducts(function(results) {
						cb(null, results);
					});			
				}
			}, function(err, results) {
				callback(results);
			});

	}

	return Home;
}