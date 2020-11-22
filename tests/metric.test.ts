import metric from '../src/metric';

describe('metric', () => {
  describe('#create', () => {
    it('creates an object based on format string', () => {
      const format = 'eliq',
        value = {
          avgpower: 1337,
          energy: 1234
        };
      expect(metric.create(format, value).eliq.avgpower).toEqual(1337);
      expect(metric.create(format, value).eliq.energy).toEqual(1234);
    });
    it('format string can be anything', () => {
      const format = 'fuu.bar.boo.baz.fuz.foz',
        value = {
          avgpower: 43,
          energy: 44
        };
      expect(metric.create(format, value).fuu.bar.boo.baz.fuz.foz.avgpower).toEqual(43);
      expect(metric.create(format, value).fuu.bar.boo.baz.fuz.foz.energy).toEqual(44);
    });
    it('format string can be just one word', () => {
      const format = 'averagepower',
        value = {
          avgpower: 1234,
          energy: 4321
        };
      expect(metric.create(format, value).averagepower.avgpower).toEqual(1234);
      expect(metric.create(format, value).averagepower.energy).toEqual(4321);
    });
  });
});
