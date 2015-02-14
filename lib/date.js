function pad(number) {
	var r = String(number);
	if ( r.length === 1 ) {
		r = '0' + r;
	}
	return r;
}

module.exports = {
	yyyymmdd: function yyymmdd (date) {
		var yyyy = date.getFullYear().toString(),
			mm = (date.getMonth() + 1).toString(),
			dd = date.getDate().toString();
		return [yyyy, pad(mm), pad(dd)].join('-');
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
	}
};




