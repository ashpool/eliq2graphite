"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const eliq_promise_1 = require("eliq-promise");
const graphite_1 = require("./graphite");
const argv = require('minimist')(process.argv.slice(2));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const config = process.env;
const eliqClient = new eliq_promise_1.Eliq(config);
const graphiteClient = new graphite_1.Graphite(config);
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
}
else if (argv.n || argv.now) {
    eliqClient.getNow().then(graphiteClient.logSnapshot).then(console.log).catch(console.error);
}
else {
    eliqClient.getFrom(argv.a || argv.age || 2, argv.r || argv.resolution || '6min').then(graphiteClient.log).then(console.log).catch(console.error);
}
