var jade = require('jade');

module.exports = function(ws) {
	
	var mod = {};

	mod.render = function(callback) {

		// Fetch data
		ws.getAccolades(function(results) {

			// Merge template + data
			var html = jade.renderFile(__dirname +'/views/template.jade', {
				'accolades': results
			});

			callback(html);
		});
	}

	return mod;
}