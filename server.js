var Hapi = require('hapi');
var Good = require('good');
var config = require('./config/config');

var server = module.exports = new Hapi.Server('0.0.0.0', config.server.port, {debug:{request:['error']}});

// Serve static files, in production Nginx would take care of this
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
      directory: {
          path: 'public'
      }
  }  
});

// Setup the views
server.views({
  engines: {
    jade: require('jade')
  },
  isCached: config.server.cacheTemplates,
  path: './server/views'
});

// Register all the plugins that make up the site
server.pack.register([

  // Utils
  {
    plugin: require('./server/plugins/webservice-adapter'),
    options: config.webservice_adapter
  },  

  // Site sections
  {plugin: require('./server/facets/home')},
  {plugin: require('./server/facets/products')},
  {plugin: require('./server/facets/about')},

  // Logging
  {
    plugin: require('good'),
    options: {reporters: [{reporter: Good.GoodConsole}]}
  }
 
], function(err) {

    if (err) throw err;

    if( ! module.parent) {
      server.start(function() {
          console.log("Hapi server started @ " + server.info.uri);
      });  
    }
});