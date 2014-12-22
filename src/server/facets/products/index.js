exports.register = function(server, options, next) {

	var ws = server.plugins['webservice-adapter'];

	// Define the routes
	server.route({
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