var argv = require('minimist')(process.argv.slice(2)),
    home = require('./../lib/homepath'),
    config = require(home.path() + '/.eliq2graphite/config.json'),
    eliq = require('eliq-promise')(config),
    graphite = require('./../lib/graphite')(config);

var usage = '\
Usage: \n\
eliq2graphite [--now] [--age number-of-hours] [--resolution hour|6min]\n\
\n\
Options: \n\
-n, --now \n\
-a, --age=number of hours (default 2 hours)\n\
-r, --resolution=6min|hour|day (default 6min) \n\
-h, --help (show this)\
\n';

if (argv.h || argv.help) {
    console.log(usage);
} else if (argv.n || argv.now) {
    eliq.getNow().then(console.log).catch(console.log);
} else {
    eliq.getFrom(argv.a || argv.age || 2, argv.r || argv.resolution || '6min').then(graphite.log).catch(console.log);
}
