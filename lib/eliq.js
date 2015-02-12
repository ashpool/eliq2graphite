const RSVP = require('rsvp'),
	request = require('request'),
	logger = require('./logger').getLogger(__filename);

// Called when an uncaught error occurs within a promise
RSVP.on('error', function (reason) {
	logger.error(reason);
});

module.exports = function (conf) {
	'use strict';
	var eliqUrl = conf.eliqUrl || 'https://my.eliq.se/api/data';
	var eliqAcesstoken = conf.eliqAccesstoken;

	logger.info('Setting up eliq client', eliqUrl, 'using apiKey', eliqAcesstoken.substring(0, 3), '***');

	function getToday () {
		return new RSVP.Promise(function (resolve, reject) {
			var time = new Date(),
				today = require('./date').yyyymmdd(time),
				options = {
					url: eliqUrl + '/?accesstoken=' + eliqAcesstoken + '&startdate=' + today + '&intervaltype=hour',
					json: true,
					timeout: 3000
				};
			request(options, function (error, response, body) {
				logger.debug('eliq response', new Date().getTime() - time, 'ms');
				if (!error && response.statusCode === 200 || response.statusCode === 201) {
					resolve(body);
				} else {
					error = error || 'Got status code ' + response.statusCode + ' for ' + options.url;
					logger.error(error);
					reject(error);
				}
			});
		});
	}

	return {getToday: getToday};
};