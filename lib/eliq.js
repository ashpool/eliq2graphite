const RSVP = require('rsvp'),
	request = require('request'),
	logger = require('./logger').getLogger(__filename);

// Called when an uncaught error occurs within a promise
RSVP.on('error', function (reason) {
	logger.error(reason);
});

module.exports = function (conf) {
	'use strict';
	var eliqUrl = require('./eliqurl')(conf);
	var eliqAcesstoken = conf.eliqAccesstoken;

	logger.info('Setting up eliq client', eliqUrl, 'using apiKey', eliqAcesstoken.substring(0, 3), '***');

	function fetchData (url) {
		return new RSVP.Promise(function (resolve, reject) {
			var time = new Date(),
				options = {
					url: url,
					json: true,
					timeout: 1000
				};
			request(options, function (error, response, body) {
				logger.debug('eliq response', new Date().getTime() - time, 'ms');
				if (!error && response && (response.statusCode === 200 || response.statusCode === 201)) {
					resolve(body);
				} else {
					error = error || 'Got status code ' + response.statusCode + ' for ' + options.url;
					logger.error(error);
					reject(error);
				}
			});
		});
	}

	function getToday () {
		return fetchData(eliqUrl.day(new Date()));
	}

	function getThisHour() {
		return fetchData(eliqUrl.hour(new Date()));
	}

	return {getToday: getToday, getThisHour: getThisHour};
};