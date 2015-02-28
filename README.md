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
crontab -e
```
Fetch average power for this hour with 6 minutes resolution
```
*/6 * * * * node <path to>/eliq2graphite/node_modules/eliq2graphite/bin/hour
```

Fetch average power for today with 1 hour resolution
```
0 * * * * node <path to>/eliq2graphite/node_modules/eliq2graphite/bin/day
```

[npm-url]: https://npmjs.org/package/eliq2graphite
[downloads-image]: http://img.shields.io/npm/dm/eliq2graphite.svg
[npm-image]: http://img.shields.io/npm/v/eliq2graphite.svg
[travis-url]: https://travis-ci.org/ashpool/eliq2graphite
[travis-image]: http://img.shields.io/travis/ashpool/eliq2graphite.svg
