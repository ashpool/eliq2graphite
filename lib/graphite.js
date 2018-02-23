var metric = require('./metric'),
  graphite = require('graphite-promise');

module.exports = function(config) {
  const format = config.format || 'eliq';

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
    var client = graphite.createClient(config);
    function _log(data) {
      var m = metric.create(format + '.' + period.intervaltype, data),
        timestamp = (new Date(data.time_start).getTime() + new Date(data.time_end).getTime()) / 2;
      return client.write(m, timestamp).then(function(value) {
        console.log(value);
      }, function(error) {
        console.error(error);
      });
    }

    return Promise.all(period.data.map(_log));
  }

  /*
  {
    channelid: 7659,
    createddate: '2018-02-23T16:15:44',
    power: 2661
   }
   */
  function logOne(data) {
    return new Promise(function(resolve, reject) {
      var client = graphite.createClient(config);
      var m = metric.create(format + '.snapshot' , data),
        timestamp = new Date(data.createddate).getTime();
      console.log(m);
      client.write(m, timestamp).then(function(value) {
        //console.log(value);
        resolve();
      }, function(error) {
        console.error(error);
        reject(error);
      });
    });
  }


  return {
    log: log,
    logOne: logOne
  };
};
