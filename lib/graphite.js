var RSVP = require('rsvp'),
    metric = require('./metric'),
    graphite = require('graphite');


module.exports = function (config) {
    var logger = require('log4js-extras')(config).getLogger(__filename),
        client = graphite.createClient(config.graphiteUrl),
        format = config.format || 'eliq',
        REQOGNIZED_KEYS = ['power', 'avgpower', 'energy'];

    /**
     * @param values
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
    function log (values) {
        var filteredValues = {};
        for (var key in REQOGNIZED_KEYS) {
            if (values.hasOwnProperty(key)) {
                filteredValues[key] = values[key];
            }
        }
        return filteredValues.data.map(function (data) {
            var m = metric.create(format + '.' + filteredValues.intervaltype, data),
                timestamp = data.createddate ?
                    new Date(data.createddate) :
                (new Date(data.time_start).getTime() + new Date(data.time_end).getTime()) / 2;
            return logMetric(m, timestamp);
        });
    }

    function logMetric (m, timestamp) {
        return new RSVP.Promise(function (resolve, reject) {
            client.write(m, timestamp, function (err) {
                if (!!err) {
                    return reject(err);
                }
                logger.info('logged', m, new Date(timestamp));
                resolve(m);
            });
        });
    }

    return {
        log: log
    };
};
