  /**
   * Created with JetBrains PhpStorm.
   * User: davojan
   * Date: 19.05.12
   * Time: 12:46
   * To change this template use File | Settings | File Templates.
   */

  var configPaths = require('./public/bundles/cord/core/configPaths');
  requirejs = require('requirejs');
  requirejs.config({
    nodeRequire: require,
    baseUrl: 'public'
  });
  requirejs.config( configPaths );

  var http = require('http');
  var static = require('node-static');

  requirejs(['app/application'], function(application) {
	  var file = new(static.Server)('./public/');

	  http.createServer(function (req, res) {
		  if (!application.process(req, res)) {
			  req.addListener('end', function () {
				  file.serve(req, res)
			  });
		  }
	  }).listen(1337, '127.0.0.1');

	  console.log('Server running at http://127.0.0.1:1337/');
	  console.log('Current directory: ' + process.cwd());
  });