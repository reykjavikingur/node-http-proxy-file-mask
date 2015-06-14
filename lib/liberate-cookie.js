var _ = require('underscore');

/**
 * Converts cookie string to eliminate restrictions.
 * @param  {String} cookie The cookie to be modified
 * @return {String}        The modified cookie
 */
function liberateCookie(cookie) {
	// preserve falsy value
	if (!Boolean(cookie)) {
		return cookie;
	}
	// recursively map array
	if (_.isArray(cookie)) {
		return _.map(cookie, liberateCookie);
	}
	// modify string
	var delim = '; ';
	var parts = _.filter(cookie.split(delim), function(part) {
		// lift restriction on https
		if (/^secure$/i.test(part)) return false;
		// lift restriction on domain
		if (/^domain=/i.test(part)) return false;
		return true;
	});
	return parts.join(delim);
}

module.exports = liberateCookie;