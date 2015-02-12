# eliq2graphite
Fetches energy consumption from Eliq and forwards them to Graphite.

```
[INFO] lib/graphite.js - logged { power: { average: { hour: 1710 } } } Thu Feb 12 2015 01:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1685 } } } Thu Feb 12 2015 02:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1718 } } } Thu Feb 12 2015 03:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1844 } } } Thu Feb 12 2015 04:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1887 } } } Thu Feb 12 2015 05:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 2020 } } } Thu Feb 12 2015 06:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1802 } } } Thu Feb 12 2015 07:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 2759 } } } Thu Feb 12 2015 08:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 2308 } } } Thu Feb 12 2015 09:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 2026 } } } Thu Feb 12 2015 10:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 2428 } } } Thu Feb 12 2015 11:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1847 } } } Thu Feb 12 2015 12:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1873 } } } Thu Feb 12 2015 13:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 2681 } } } Thu Feb 12 2015 14:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1651 } } } Thu Feb 12 2015 15:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1785 } } } Thu Feb 12 2015 16:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 1820 } } } Thu Feb 12 2015 17:30:00 GMT+0100 (CET)
[INFO] lib/graphite.js - logged { power: { average: { hour: 3010 } } } Thu Feb 12 2015 18:30:00 GMT+0100 (CET)
```

## Install
npm install eliq2graphite

## Setup

``~/.eliq2graphite/config.json``

```
{
  "eliqAccesstoken": "...",
  "graphiteUrl": "plaintext://127.0.0.1:2003/"
}
```

## Usage

```
crontab -e
```

Add this line to update sensors every minute
```
0 * * * * node <path to>/eliq2graphite/node_modules/.bin/eliq2graphite
```
