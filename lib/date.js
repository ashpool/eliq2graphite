function pad (number) {
	var r = String(number);
	if (r.length === 1) {
		r = '0' + r;
	}
	return r;
}

function datePart (date) {
	return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate());
}

function timePart (date) {
	return 'T' + pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
}

function zonePart (date) {
	return '.' + String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + 'Z';
}

module.exports = {
	toISO: function toISO (date) {
		return datePart(date) + timePart(date) + zonePart(date);
	},
	toISODay: function yyymmdd (date) {
		return datePart(date) + 'T00:00:00' + zonePart(date);
	},
	toISOHour: function toISO (date) {
		return datePart(date) + 'T' + pad(date.getUTCHours()) + ':00:00' + zonePart(date);
	}
};




