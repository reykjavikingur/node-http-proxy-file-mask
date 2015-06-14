var httpProxy = require('http-proxy');
var liberateCookie = require('./liberate-cookie');

/**
 * Creates proxy
 * @param  {Object} options - target:string
 * @return {httpProxy}
 */
function proxyFactory(options) {
	var proxy = httpProxy.createProxyServer({
		target: options.target,
		secure: false
	});

	proxy.on('error', function(err, req, res) {
		console.error('Proxy error:', err);
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		res.end('Something went wrong with the proxy transfer.');
	});

	proxy.on('proxyRes', function(proxyRes, req, res) {
		// lift restrictions on cookies
		try {
			proxyRes.headers['set-cookie'] = liberateCookie(proxyRes.headers['set-cookie']);
		}
		catch (e) {
			console.warn('[Proxy] Error liberating cookie:', e);
		}
		/*
		proxyRes.on('data', function(chunk) {
			console.debug('got %d bytes of data', chunk.length);
			console.debug('got some data');
		});
		proxyRes.on('end', function() {
			console.debug('there will be no more data');
		});
		//*/
		
	});

	return proxy;
}

module.exports = proxyFactory;