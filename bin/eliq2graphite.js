const argv = require('minimist')(process.argv.slice(2));
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const config = process.env;
const eliq = require('eliq-promise')(config);
const graphite = require('./../lib/graphite')(config);


const usage = '\
Usage: \n\
eliq2graphite [--age number-of-hours] [--resolution hour|6min]\n\
\n\
Options: \n\
-a, --age=number of hours (default 2 hours)\n\
-r, --resolution=6min|hour|day (default 6min) \n\
-n, --now \n\
-h, --help (show this)\
\n';

if (argv.h || argv.help) {
  console.log(usage);
} else if (argv.n || argv.now) {
  eliq.getNow().then(graphite.logSnapshot).then(console.log).catch(console.error);
} else {
  eliq.getFrom(argv.a || argv.age || 2, argv.r || argv.resolution || '6min').then(graphite.log).then(console.log).catch(console.error);
}
