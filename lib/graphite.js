const metric = require('./metric');
const graphite = require('graphite-promise');

module.exports = function(config) {
  const format = config.format || 'eliq';
  const client = config.client || graphite.createClient(config);

  function log(period) {
    return Promise.all(period.data.map(d => {
      d.intervaltype = period.intervaltype;
      d.timestamp = (new Date(d.time_start).getTime() + new Date(d.time_end).getTime()) / 2;
      return d;
    }).map(_log));
  }

  function logSnapshot(snapshot) {
    snapshot.intervaltype = 'snapshot';
    snapshot.timestamp = new Date(snapshot.createddate).getTime();
    return _log(snapshot);
  }

  function _log(data) {
    return new Promise(function(resolve, reject) {
      var m = metric.create([format, data.intervaltype].join('.'), data);
      client.write(m, data.timestamp).then(function(value) {
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
