exports.register = function(plugin, options, next) {

	var ws = plugin.plugins['webservice-adapter'];

	// Define the routes
	plugin.route({
		method: 'GET',
		path: '/products',
		handler: function(request, reply) {						
			ws.getProducts(function(content) {
				reply.view('product', {'products':content});
			});
		}
	});

	next();
}

exports.register.attributes = {
	name: 'project-products'
}