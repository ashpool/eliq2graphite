var date = require('./date');

module.exports = function (config) {

	function baseUrl () {
		return (config.eliqUrl || 'https://my.eliq.se/api/data') + '/?accesstoken=' + config.eliqAccesstoken;
	}

	function day (startDate) {
		return baseUrl() + '&startdate=' + date.toISODay(startDate) + '&intervaltype=hour';
	}

	function hour (startDate) {
		return baseUrl() + '&startdate=' + date.toISOHour(startDate) + '&intervaltype=6min';
	}

	return {
		day: day,
		hour: hour
	}
};