# eliq2graphite
Fetches power consumption from ELIQ and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

```
[INFO] lib/graphite.js - logged { home: { power: { average: 1542 } } } Sat Feb 14 2015 18:09:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 1478 } } } Sat Feb 14 2015 18:15:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 2370 } } } Sat Feb 14 2015 18:21:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 2185 } } } Sat Feb 14 2015 18:27:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 2004 } } } Sat Feb 14 2015 18:33:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 1775 } } } Sat Feb 14 2015 18:39:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 1465 } } } Sat Feb 14 2015 18:45:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 2140 } } } Sat Feb 14 2015 18:51:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 1915 } } } Sat Feb 14 2015 18:57:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { home: { power: { average: 2160 } } } Sat Feb 14 2015 19:03:00 GMT+0100 (CET)
```

## Install
npm install eliq2graphite

## Setup

``~/.eliq2graphite/config.json``

```
{
  "eliqAccesstoken": "...",
  "graphiteUrl": "plaintext://127.0.0.1:2003/",
   "format": "home.power.average",
   "logLevel": "INFO"
}
```

## Usage

```
crontab -e
```

Add this line to update average power every minute with a 6 minute resolution
```
* * * * * node <path to>/eliq2graphite/node_modules/.bin/eliq2graphite
```

[npm-url]: https://npmjs.org/package/eliq2graphite
[downloads-image]: http://img.shields.io/npm/dm/eliq2graphite.svg
[npm-image]: http://img.shields.io/npm/v/eliq2graphite.svg
[travis-url]: https://travis-ci.org/ashpool/eliq2graphite
[travis-image]: http://img.shields.io/travis/ashpool/eliq2graphite.svg
