/*jshint undef:false */
var chai = require('chai'),
	expect = chai.expect;

describe('metric', function () {
	describe('#create', function () {
		it('creates an object based on format string', function () {
			var format = 'home.power.average',
				value = 1337,
				metric = require('../lib/metric');
			expect(metric.create(format, value).home.power.average).to.equal(1337);
		});
		it('format string can be anything', function () {
			var format = 'fuu.bar.boo.baz.fuz.foz',
				value = 43,
				metric = require('../lib/metric');
			expect(metric.create(format, value).fuu.bar.boo.baz.fuz.foz).to.equal(43);
		});
		it('format string can be just one word', function () {
			var format = 'averagepower',
				value = 1234,
				metric = require('../lib/metric');
			expect(metric.create(format, value).averagepower).to.equal(1234);
		});
	});
});
