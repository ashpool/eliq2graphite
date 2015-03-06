var RSVP = require('rsvp'),
	metric = require('./metric'),
	graphite = require('graphite');


module.exports = function (config) {
	var logger = require('log4js-extras')(config).getLogger(__filename),
		client = graphite.createClient(config.graphiteUrl),
		format = config.format || 'eliq';

	/**
	 * @param today
	 *
	 *
	 {
	 	startdate: '2015-02-12T00:00:00',
	 	enddate: '2015-02-13T00:00:00',
	 	intervaltype: 'hour',
	 	data:
	 	[ { avgpower: 1710,
	 	energy: 1709,
	 	temp_out: 1,
	 	time_start: '2015-02-12T00:00:00',
	 	time_end: '2015-02-12T01:00:00' },
	 	...
	 	{ avgpower: 1820,
	 	energy: 1821,
	 	temp_out: 2,
	 	time_start: '2015-02-12T16:00:00',
	 	time_end: '2015-02-12T17:00:00' } ]
	 }
	 */
	function log (today) {
		return today.data.map(function (data) {
			var m = metric.create(format + '.' + today.intervaltype, data),
				timestamp = (new Date(data.time_start).getTime() + new Date(data.time_end).getTime()) / 2;
			return logMetric(m, timestamp);
		});
	}

	function logMetric (metric, timestamp) {
		return new RSVP.Promise(function (resolve, reject) {
			client.write(metric, timestamp, function (err) {
				if (!!err) {
					return reject(err);
				}
				logger.info('logged', metric, new Date(timestamp));
				resolve(metric);
			});
		});
	}

	return {
		log: log
	};
};
