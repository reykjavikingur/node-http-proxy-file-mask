var browserSync = require('browser-sync');

var middlewareFactory = require('../');
var proxyMiddleware = middlewareFactory({
	proxyTarget: 'http://xkcd.com',
	baseDir: './html'
});

var bs = browserSync.create();

bs.init({
	server: {
		baseDir: './html'
	},
	files: ['./html/**/*'],
	middleware: [proxyMiddleware]
}, function(err, bs) {
	if (!err) {
		console.log('BrowserSync is ready!');
	}
});