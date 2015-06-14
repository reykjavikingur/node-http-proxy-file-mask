# Conditional Reverse Proxy

1. Configure local web server to serve files from local document root.
1. Point local web server to proxy target by host, e.g. https://example.com, http://domain.tl:1235
1. Provide criteria for whether to serve from local or proxy target, given web request
1. Specify URL rewriting rules, if any.
1. Specify HTML transform rules, if any.

## Scenarios

### Add Content

Make some URL's come from local directory and others come from remote server.

Example: Proxy everything from remote server but handle URL's beginning with "/improv" by serving from local "improv" directory.

### Modify Content

Of the URL's coming from remote server, change the response body.

Example: Proxy everything from remote server normally but append `<link href="http://cdn.com/improv.css"/>` to HTML head element to response from `/index.html`.

