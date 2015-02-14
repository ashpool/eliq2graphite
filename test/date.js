var chai = require('chai'),
	expect = chai.expect,
	date = require('../lib/date');


describe('date', function () {
	describe('#yyyymmddhhmmss', function () {
		it('formats date into YYYY-MM-DDTHH:MM:SS', function () {
			var aDate = new Date(Date.UTC(1973, 0, 13, 0, 0, 0));
			expect(date.toISO(aDate)).to.equal('1973-01-13T00:00:00.000Z');
		});
		it('handles a second to midnight', function () {
			var aDate = new Date(Date.UTC(1973, 0, 13, 23, 59, 59));
			expect(date.toISO(aDate)).to.equal('1973-01-13T23:59:59.000Z');
		});
	});
});
