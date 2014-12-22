var async = require('async');

exports.register = function(server, options, next) {

	// Global utilities
	var ws = server.plugins['webservice-adapter'];

	// Page level modules
	var accolades = require('../../modules/accolades')(ws);
	var articles = require('../../modules/articles')(ws);

	// Define the routes
	server.route({
		method: 'GET',
		path: '/about',
		handler: function(request, reply) {

			// Assemble the content
			async.parallel({
				'accolades': function(cb) {					
					accolades.render(function(content) {
						cb(null, content);
					});
				},		
				'articles': function(cb) {
					articles.render(function(content) {
						cb(null, content);
					});					
				}
			}, function(err, content) {
				reply.view('about', content);
			});
		}
	});

	next();
}

exports.register.attributes = {
	name: 'project-about'
}
