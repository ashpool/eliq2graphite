var RSVP = require('rsvp'),
    metric = require('./metric'),
    _ = require('lodash'),
    graphite = require('graphite-promise');


module.exports = function (config) {
    var logger = require('log4js-extras')(config).getLogger(__filename),
        format = config.format || 'eliq';

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
    function log (period) {
        var client = graphite.createClient(config.graphiteUrl);

        function _log (data) {
            var m = metric.create(format + '.' + period.intervaltype, data),
                timestamp = (new Date(data.time_start).getTime() + new Date(data.time_end).getTime()) / 2;
            return client.write(m, timestamp);
        }

        var promises = period.data.map(_log);
        RSVP.allSettled(promises).then(function (results) {
            var fulfilleds = _.pluck(_.where(results, {state: 'fulfilled'}), 'value');
            var rejects = _.pluck(_.where(results, {state: 'rejected'}), 'reason');
            fulfilleds.map(function (fulfilled) {
                logger.info('Logged:', JSON.stringify(fulfilled));
            });
            rejects.map(function (rejected) {
                logger.warn('Rejected:', rejected);
            });
        }).catch(logger.error).finally(client.end);
    }

    return {
        log: log
    };
};
