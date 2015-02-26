var home = require('./../lib/homepath'),
	config = require(home.path() + '/.eliq2graphite/config.json'),
	eliq = require('eliq-promise')(config),
	graphite = require('./../lib/graphite')(config);

eliq.getToday().then(graphite.log);
