var home = require('./../lib/homepath'),
	config = require(home.path() + '/.eliq2graphite/config.json'),
	eliq = require('./../lib/eliq')(config),
	graphite = require('./../lib/graphite')(config);

eliq.getThisHour().then(graphite.log);
