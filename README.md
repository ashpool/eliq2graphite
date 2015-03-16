# eliq2graphite
Fetches power consumption from ELIQ and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

## Install
npm install eliq2graphite

## Setup

```Bash
~/.eliq2graphite/config.json
```

```Javascript
{
  "eliqAccesstoken": "...",
  "graphiteUrl": "plaintext://127.0.0.1:2003/",
  "format": "eliq",
  "logLevel": "INFO"
}
```
### Formatting
The format string can be anything, e.g ``home.power``

## Usage

```Bash
eliq2graphite [--age number-of-hours] [--resolution hour|6min]
```

### Options

* -a, --age=number of hours (default 2 hours)
* -r, --resolution=6min|hour|day (default 6min)
* -h, --help (show this)


### Examples

``eliq2graphite`` is ideally run as a cron job

```Bash
crontab -e
```

Fetch energy and average power:

... default settings: last 2 hours with 6 minutes resolution
```Bash
*/6 * * * * node <path to>/eliq2graphite/.bin/eliq2graphite
```

... last 3 hours with 6 minutes resolution
```Bash
*/6 * * * * node <path to>/eliq2graphite/.bin/eliq2graphite -a 3 -r 6min
```

... last 24 hours with 1 hour resolution
```Bash
0 * * * * node <path to>/eliq2graphite/.bin/eliq2graphite --age 24 --resolution hour
```

... last 4 days with 1 day resolution
```Bash
0 0 * * * node <path to>/eliq2graphite/.bin/eliq2graphite --age 96 --resolution day
```

[npm-url]: https://npmjs.org/package/eliq2graphite
[downloads-image]: http://img.shields.io/npm/dm/eliq2graphite.svg
[npm-image]: http://img.shields.io/npm/v/eliq2graphite.svg
[travis-url]: https://travis-ci.org/ashpool/eliq2graphite
[travis-image]: http://img.shields.io/travis/ashpool/eliq2graphite.svg
