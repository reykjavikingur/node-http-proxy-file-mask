var fs = require('fs');

/**
 * Converts URL to path relative to given root.
 * @param  {string} root The ancestor directory
 * @param  {string} url  The remote location
 * @param  {string} indexBase The default file relative to a directory URL
 * @param  {function} cb Function(err, path)
 */
function resolvePath(root, url, indexBase, cb) {
	if (!Boolean(indexBase)) {
		indexBase = 'index.html';
	}

	if (url === '') {
		url = '/';
	}

	if (endsWith(url, '/')) {
		url += indexBase;
	}

	var path = root + url;

	filePathExists(path, function(err, exists) {
		if (err) {
			cb(err);
		} else if (exists) {
			cb(null, path);
		} else {
			path += '/' + indexBase;
			filePathExists(path, function(err, exists) {
				if (err) {
					cb(err);
				} else if (exists) {
					cb(null, path);
				} else {
					cb(new Error('file does not exist'));
				}
			});
		}
	});

}

function filePathExists(path, cb) {
	fs.stat(path, function(err, stat) {
		if (err) {
			cb(err);
		} else if (stat.isFile()) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	});
}

function beginsWith(string, prefix) {
	return string.indexOf(prefix) === 0;
}

function endsWith(string, suffix) {
	return string.lastIndexOf(suffix) === string.length - 1;
}

module.exports = resolvePath;