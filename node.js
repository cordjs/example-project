var fs = require('fs.extra');
var exec  = require('child_process').exec;

// remove target
fs.rmrf('./target', function (err) {
	if (!err) {
		// copy files
		fs.copyRecursive('./public', './target', function (err) {
			if (!err) {
				// compiler js-files
				exec('coffee -c target', function(error, stdout, stderr) {
					if (error == null) {
						// compiler css-files
						exec('sass --update target', function(error, stdout, stderr) {
							//run
							var server = require('./target/bundles/cord/core/nodeInit');
						});
					}
				});
			}
		});
	}
});
