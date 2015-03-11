/*jshint undef:false */
var chai = require('chai'),
    expect = chai.expect,
    metric = require('../lib/metric');

describe('metric', function () {
    describe('#create', function () {
        it('creates an object based on format string', function () {
            var format = 'eliq',
                value = {
                    avgpower: 1337,
                    energy: 1234
                };
            expect(metric.create(format, value).eliq.avgpower).to.equal(1337);
            expect(metric.create(format, value).eliq.energy).to.equal(1234);
        });
        it('format string can be anything', function () {
            var format = 'fuu.bar.boo.baz.fuz.foz',
                value = {
                    avgpower: 43,
                    energy: 44
                };
            expect(metric.create(format, value).fuu.bar.boo.baz.fuz.foz.avgpower).to.equal(43);
            expect(metric.create(format, value).fuu.bar.boo.baz.fuz.foz.energy).to.equal(44);
        });
        it('format string can be just one word', function () {
            var format = 'averagepower',
                value = {
                    avgpower: 1234,
                    energy: 4321
                };
            expect(metric.create(format, value).averagepower.avgpower).to.equal(1234);
            expect(metric.create(format, value).averagepower.energy).to.equal(4321);
        });
        it('reqognizes power, avgpower, and energy', function () {
            var data = {power: 1285, avgpower: 1337, energy: 42},
                m = metric.create('for.mat', data);
            expect(m.for.mat.power).to.equal(1285);
            expect(m.for.mat.avgpower).to.equal(1337);
            expect(m.for.mat.energy).to.equal(42);
        });
        it('actually reqognizes whatever property that is put in data', function () {
            var data = {foo: 1285, bar: 1337, fuu: 42},
                m = metric.create('for.mat', data);
            expect(m.for.mat.foo).to.equal(1285);
            expect(m.for.mat.bar).to.equal(1337);
            expect(m.for.mat.fuu).to.equal(42);
        });
    });
});
