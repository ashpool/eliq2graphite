/*jshint undef:false */
var chai = require('chai'),
	expect = chai.expect,
	date = require('../lib/date');


describe('date', function () {
	describe('#toISO', function () {
		it('formats date into YYYY-MM-DDTHH:MM:SS.000Z', function () {
			var aDate = new Date(Date.UTC(1973, 0, 13, 0, 0, 0));
			expect(date.toISO(aDate)).to.equal('1973-01-13T00:00:00.000Z');
		});
		it('handles a second to midnight', function () {
			var aDate = new Date(Date.UTC(1973, 0, 13, 23, 59, 59));
			expect(date.toISO(aDate)).to.equal('1973-01-13T23:59:59.000Z');
		});
		it('handles a second after midnight', function () {
			var aDate = new Date(Date.UTC(1973, 0, 13, 0, 0, 1));
			expect(date.toISO(aDate)).to.equal('1973-01-13T00:00:01.000Z');
		});
	});
	describe('#toISODay', function() {
		it('formats date into YYYY-MM-DDT00:00:00.000Z', function() {
			var aDate = new Date(Date.UTC(1973, 0, 13, 1, 2, 3));
			expect(date.toISODay(aDate)).to.equal('1973-01-13T00:00:00.000Z');
		});
	});
	describe('#toISOHour', function() {
		it('formats date into YYYY-MM-DDTHH:00:00.000Z', function() {
			var aDate = new Date(Date.UTC(1973, 0, 13, 1, 2, 3));
			expect(date.toISOHour(aDate)).to.equal('1973-01-13T01:00:00.000Z');
		});
	});
});
