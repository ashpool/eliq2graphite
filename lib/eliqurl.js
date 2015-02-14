var date = require('./date');

module.exports = function (config) {

	function day (startDate) {
		return config.eliqUrl + '/?accesstoken=' + config.eliqAccesstoken + '&startdate=' + date.toISO(startDate) + '&intervaltype=hour';

	}

	function hour () {

	}

	return {
		day: day,
		hour: hour
	}
};