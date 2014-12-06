module.exports = function(plugin) {
	
	var mod = {};

	mod.render = function(callback) {

		// Fetch data
		// ...

		var options = {
			path: __dirname + '/views'
		};

		// Render it
		plugin.render('accolades', {'test':'accolades works!'}, options, function(err, rendered, config) {
			callback(rendered);
		});
	}

	return mod;
}