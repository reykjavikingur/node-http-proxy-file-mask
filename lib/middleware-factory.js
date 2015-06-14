var proxyFactory = require('./proxy-factory');
var resolvePath = require('./resolve-path');

/**
 * Creates middleware function
 * @param  {Object} options - proxyTarget:string, baseDir:string
 * @return {Function}
 */
function middlewareFactory(options) {
	var proxy = proxyFactory({
		target: options.proxyTarget
	});
	return function(req, res, next) {
		resolvePath(options.baseDir, req.url, 'index.html', function(err, path) {
			//console.log('[Proxy]', req.url, err, path);
			if (err) {
				// There is no local file corresponding to the URL.
				proxy.web(req, res, {
					target: options.proxyTarget,
					changeOrigin: true
				});
			} else {
				// There is a local file corresponding to the URL.
				next();
			}
		});
	};
}

module.exports = middlewareFactory;