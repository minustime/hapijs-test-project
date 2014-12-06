var async = require('async');

exports.register = function(plugin, options, next) {

	// Global utilities
	var ws = plugin.plugins['webservice-adapter'];

	// Page level modules
	var accolades = require('../../modules/accolades')(plugin, ws);
	var articles = require('../../modules/articles')(plugin, ws);

	plugin.views({
		engines: {jade: require('jade')},
		path: __dirname + '/views'
	});
		
	// Define the routes
	plugin.route({
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
