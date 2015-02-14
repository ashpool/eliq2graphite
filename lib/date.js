function pad(number) {
	var r = String(number);
	if ( r.length === 1 ) {
		r = '0' + r;
	}
	return r;
}

module.exports = {
	toISODay: function yyymmdd (date) {
		return date.getUTCFullYear()
			+ '-' + pad( date.getUTCMonth() + 1 )
			+ '-' + pad( date.getUTCDate() )
			+ 'T' + '00'
			+ ':' + '00'
			+ ':' + '00'
			+ '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
			+ 'Z';
	},
	toISO: function toISO(date) {
		return date.getUTCFullYear()
			+ '-' + pad( date.getUTCMonth() + 1 )
			+ '-' + pad( date.getUTCDate() )
			+ 'T' + pad( date.getUTCHours() )
			+ ':' + pad( date.getUTCMinutes() )
			+ ':' + pad( date.getUTCSeconds() )
			+ '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
			+ 'Z';
	},
	toISOHour: function toISO(date) {
		return date.getUTCFullYear()
			+ '-' + pad( date.getUTCMonth() + 1 )
			+ '-' + pad( date.getUTCDate() )
			+ 'T' + pad( date.getUTCHours() )
			+ ':' + '00'
			+ ':' + '00'
			+ '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
			+ 'Z';
	}
};




