var argv = require('minimist')(process.argv.slice(2)),
    home = require('./../lib/homepath'),
    config = require(home.path() + '/.eliq2graphite/config.json'),
    eliq = require('eliq-promise')(config),
    logger = require('log4js-extras')(config).getLogger(__filename),
    graphite = require('./../lib/graphite')(config);

var usage = '\
Usage: \n\
eliq2graphite [--age number-of-hours] [--resolution hour|6min]\n\
\n\
Options: \n\
-a, --age=number of hours (default 2 hours)\n\
-r, --resolution=6min|hour|day (default 6min) \n\
-h, --help (show this)\
\n';

if (argv.h || argv.help) {
    console.log(usage);
} else {
    eliq.getFrom(24 || argv.a || argv.age || 2, 'hour' || argv.r || argv.resolution || '6min').then(function (value) {
        graphite.log(value)
    }, function (value) {
        logger.error(value);
    });
}
