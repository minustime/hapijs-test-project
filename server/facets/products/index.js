exports.register = function(plugin, options, next) {

	// Define the routes
	plugin.route({
		method: 'GET',
		path: '/products',
		handler: function(request, reply) {

			var ws = plugin.plugins['webservice-adapter'];
			
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