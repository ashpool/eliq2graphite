/*jshint undef:false */
var chai = require('chai'),
	expect = chai.expect,
	home = require('../lib/homepath');

describe('homepath', function () {
	describe('#path', function () {
		it('returns the path of the home depending on the current platform', function () {
			process.platform === 'darwin' && expect(home.path()).to.equal(process.env.HOME);
			process.platform === 'linux' && expect(home.path()).to.equal(process.env.HOMEPATH);
			process.platform === 'win32' && expect(home.path()).to.equal(process.env.USERPROFILE);
		});
	});
});
