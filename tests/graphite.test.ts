import {Graphite} from "../src";

describe('#logSnapshot', () => {
  it('logs a single snapshot power measurement', async () => {
    const snapshot = {
      createddate: '2018-02-23T16:15:44',
      power: 2661
    };
    const client = {
      write: jest.fn(),
    }; //{ write: stub.resolves({}) };
    client.write.mockReturnValue({});
    const config = {client: client};
    const graphite = new Graphite(config);
    await graphite.logSnapshot(snapshot);
    expect(client.write).toBeCalled();
    expect(client.write).toBeCalledWith({ eliq: { snapshot: { power: 2661 } } }, 1519398944000);
  });
});

describe('#log', () => {
  it('logs a bunch of measurements', async () => {
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
    const client = {write: jest.fn()};
    const config = {client: client};
    const graphite = new Graphite(config);

    await graphite.log(period);
    expect(client.write).toBeCalled();
    expect(client.write).toBeCalledWith({ eliq: { hour: { avgpower: 1710, energy: 1709 } } }, 1423697400000);
    expect(client.write).toBeCalledWith({ eliq: { hour: { avgpower: 1820, energy: 1821 } } }, 1423755000000);
  });
});
