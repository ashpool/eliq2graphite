import * as sinon from 'sinon';
import * as chai from 'chai';
import {Graphite} from '../src/graphite'
const assert = chai.assert;

describe('graphite', () => {
  describe('#logSnapshot', () => {
    it('logs a single snapshot power measurement', async (done) => {
      const snapshot = {
        createddate: '2018-02-23T16:15:44',
        power: 2661
      };
      const stub = sinon.stub();
      const client = { write: stub.resolves({}) };
      const config = { client: client };
      const graphite = new Graphite(config);
      return graphite.logSnapshot(snapshot).then(() => {
        //expect(client.write.calledOnce).to.be.true;
        //expect(client.write.calledWith({ eliq: { snapshot: { power: 2661 } } }, 1519398944000)).to.be.true;
        return done();
      }, (error: any) => {
        assert.fail(error);
        done();
      });
    });
  });

  describe('#log', () => {
    it('logs a bunch of measurements', (done) => {
      const period = {
        startdate: '2015-02-12T00:00:00',
        enddate: '2015-02-13T00:00:00',
        intervaltype: 'hour',
        data:
          [{
            avgpower: 1710,
            energy: 1709,
            temp_out: 1,
            time_start: '2015-02-12T00:00:00',
            time_end: '2015-02-12T01:00:00'
          },
            {
              avgpower: 1820,
              energy: 1821,
              temp_out: 2,
              time_start: '2015-02-12T16:00:00',
              time_end: '2015-02-12T17:00:00'
            }]
      };
      const stub = sinon.stub();
      const client = { write: stub.resolves({}) };
      const config = { client: client };
      const graphite = new Graphite(config);

      return graphite.log(period).then(() => {
        //expect(client.write.calledTwice).to.be.true;
        //expect(client.write.calledWith({ eliq: { hour: { avgpower: 1710, energy: 1709 } } }, 1423697400000)).to.be.true;
        //expect(client.write.calledWith({ eliq: { hour: { avgpower: 1820, energy: 1821 } } }, 1423755000000)).to.be.true;
       return done();
      }, (error: any) => {
        assert.fail(error);
        done();
      });
    });
  });
});
