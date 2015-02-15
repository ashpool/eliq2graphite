/*jshint undef:false */
var chai = require('chai'),
	expect = chai.expect;

describe('eliqurl', function () {
	describe('#day', function () {
		it('reads config.eliqUrl and accessToken', function () {
			var config = {eliqUrl: 'https://eliq.url', eliqAccesstoken: 'xxxxx'},
				eliqurl = require('./../lib/eliqurl')(config),
				date = new Date(Date.UTC(1973, 0, 13, 0, 0, 0));
			expect(eliqurl.day(date)).to.equal('https://eliq.url/?accesstoken=xxxxx&startdate=1973-01-13T00:00:00.000Z&intervaltype=hour');
		});
	});
});