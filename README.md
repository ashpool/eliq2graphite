# eliq2graphite
Fetches power consumption from ELIQ and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

## Install
npm install eliq2graphite

## Setup

``~/.eliq2graphite/config.json``

```
{
  "eliqAccesstoken": "...",
  "graphiteUrl": "plaintext://127.0.0.1:2003/",
  "format": "power.average",
  "logLevel": "INFO"
}
```
### Formatting
The format string can be anything, e.g ``home.power.average``

## Usage

```
eliq2graphite [--age number-of-hours] [--resolution hour|6min]
```

### Options

* -a, --age=number of hours (default 2 hours)
* -r, --resolution=hour|6min (default 6min)
* -h, --help (show this)


### Examples

``eliq2graphite`` is ideally run as a cron job
```
crontab -e
```

Fetch average power:
* with default settings: last 2 hours with 6 minutes resolution
```
*/6 * * * * node <path to>/eliq2graphite/.bin/eliq2graphite
```

* for the last 3 hours with 6 minutes resolution
```
*/6 * * * * node <path to>/eliq2graphite/.bin/eliq2graphite -a 3 -r 6min
```

* for last 24 hours with 1 hour resolution
```
0 * * * * node <path to>/eliq2graphite/.bin/eliq2graphite --age 24 --resolution hour
```

[npm-url]: https://npmjs.org/package/eliq2graphite
[downloads-image]: http://img.shields.io/npm/dm/eliq2graphite.svg
[npm-image]: http://img.shields.io/npm/v/eliq2graphite.svg
[travis-url]: https://travis-ci.org/ashpool/eliq2graphite
[travis-image]: http://img.shields.io/travis/ashpool/eliq2graphite.svg
