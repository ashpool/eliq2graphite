import * as chai from 'chai';
import metric from '../src/metric';
const expect = chai.expect;

describe('metric', function () {
  describe('#create', function () {
    it('creates an object based on format string', function () {
      const format = 'eliq',
        value = {
          avgpower: 1337,
          energy: 1234
        };
        expect(metric.create(format, value).eliq.avgpower).to.equal(1337);
      expect(metric.create(format, value).eliq.energy).to.equal(1234);
    });
    it('format string can be anything', function () {
      const format = 'fuu.bar.boo.baz.fuz.foz',
        value = {
          avgpower: 43,
          energy: 44
        };
      expect(metric.create(format, value).fuu.bar.boo.baz.fuz.foz.avgpower).to.equal(43);
      expect(metric.create(format, value).fuu.bar.boo.baz.fuz.foz.energy).to.equal(44);
    });
    it('format string can be just one word', function () {
      const format = 'averagepower',
        value = {
          avgpower: 1234,
          energy: 4321
        };
      expect(metric.create(format, value).averagepower.avgpower).to.equal(1234);
      expect(metric.create(format, value).averagepower.energy).to.equal(4321);
    });
  });
});
