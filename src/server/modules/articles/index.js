var jade = require('jade');

module.exports = function(ws) {
	
	var mod = {};

	mod.render = function(callback) {

		// Fetch data
		ws.getArticles(function(results) {

			// Merge template + data
			var html = jade.renderFile(__dirname +'/views/template.jade', {
				'articles': results
			});

			callback(html);
		});
	}

	return mod;
}