# Node HTTP Proxy File Mask

This is a Node module that generates HTTP server middleware
for a reverse proxy that hosts both remote and local content.

## Steps

* Run a local Node web server (using Connect or Browser-Sync)
* Specify a remote host and a local directory
* Use this module to generate middleware for your local web server

## Effects

When the local web server receives a request,
the middleware inspects the URL to determine whether it corresponds
to a file under the local directory.
If so, then the response is the contents of that file.
If not, then the request is proxied to the remote server,
and the response is whatever the remote server sent.

## Motivation

You can run a local web development environment
without hosting the entire site locally
and without synchronizing to a remote server until deployment.
You can make and test your changes locally,
and then you can transfer your files to the remote server
all at once already knowing how they will integrate with
pre-existing content.

## Example

Suppose you want to proxy `http://example.com` and serve from a local directory `./html`.

```
# configure proxy file mask
var httpProxyFileMask = require('http-proxy-file-mask');
var middleware = httpProxyFileMask({
	proxyTarget: 'http://example.com',
	baseDir: './html'
});

# configure local web server
var browserSync = require('browser-sync');
var bs = browserSync.create();
bs.init({
	server: { baseDir: './html' },
	middleware: [middleware]
});

```
