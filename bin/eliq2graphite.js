const argv = require('minimist')(process.argv.slice(2));
const config = process.env;
const eliq = require('eliq-promise')(config);
const graphite = require('./../lib/graphite')(config);

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
  eliq.getFrom(argv.a || argv.age || 2, argv.r || argv.resolution || '6min').then(graphite.log).catch(console.error);
}
