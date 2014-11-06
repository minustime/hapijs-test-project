exports.register = function(plugin, options, next) {

	var ws = plugin.plugins['webservice-adapter'];
	var home = require('./Home')(ws);

	// Define the routes
	plugin.route({
		method: 'GET',
		path: '/',
		handler: function(request, reply) {
			
			home.getContent(function(content) {
				reply.view('home', content);
			});
		}
	});

	next();
}

exports.register.attributes = {
	name: 'project-home'
}
