const metric = require('./metric');
const graphite = require('graphite-promise');

module.exports = function(config) {
  const format = config.format || 'eliq';
  const client = graphite.createClient(config);

  /**
   * @param period
   *
   *
   {
       startdate: '2015-02-12T00:00:00',
       enddate: '2015-02-13T00:00:00',
       intervaltype: 'hour',
       data:
       [ { avgpower: 1710,
       energy: 1709,
       temp_out: 1,
       time_start: '2015-02-12T00:00:00',
       time_end: '2015-02-12T01:00:00' },
       ...
       { avgpower: 1820,
       energy: 1821,
       temp_out: 2,
       time_start: '2015-02-12T16:00:00',
       time_end: '2015-02-12T17:00:00' } ]
   }
   */
  function log(period) {
    return Promise.all(period.data.map(d => {
      d.intervaltype = period.intervaltype;
      d.timestamp = (new Date(d.time_start).getTime() + new Date(d.time_end).getTime()) / 2;
      return d;
    }).map(_log));
  }

  /***
   * @param snapshot
   *
   {
     createddate: '2018-02-23T16:15:44',
     power: 2661
    }
   */
  function logSnapshot(snapshot) {
    snapshot.intervaltype = 'snapshot';
    snapshot.timestamp = new Date(snapshot.createddate).getTime();
    return _log(snapshot);
  }

  function _log(data) {
    return new Promise(function(resolve, reject) {
      var m = metric.create([format, data.intervaltype].join('.'), data);
      client.write(m, data.timestamp).then(function(value) {
        console.log(value);
        resolve(value);
      }, function(error) {
        reject(error);
      });
    });
  }

  return {
    log: log,
    logSnapshot: logSnapshot
  };
};
