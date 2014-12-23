var Hapi = require('hapi');
var config = require('./config/config');

var server = new Hapi.Server({
  cache: {
    engine: require('catbox-memcached'),
    host: config.memcached.host,
    port: config.memcached.port
  }
});

server.connection({
  host: '0.0.0.0',
  port: 8000
});

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
server.register([

  // Utils
  {register: require('./server/plugins/webservice-adapter'),
    options: config.webservice_adapter},  

  // Site sections
  {register: require('./server/facets/home')},
  {register: require('./server/facets/products')},
  {register: require('./server/facets/about')},

  // Logging
  {register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'), 
        args:[{ log: '*', request: '*', error: '*', response: '*'}]
      },
      {
        reporter: require('good-file'),
        args:['logs/app.log',
              {log: '*', request: '*', error: '*', response: '*'}],
      }]
    }
  }
 
], function(err) {

    if (err) throw err;

    server.start(function() {
        console.log("Hapi server started @ " + server.info.uri);
    });  
    
});