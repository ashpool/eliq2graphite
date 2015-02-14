var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	mocha = require('gulp-mocha');

gulp.task('default', ['lint', 'test'], function () {
});

gulp.task('lint', function () {
	return gulp.src(['./lib/*.js', './bin/*.js','./test/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('test', function () {
	return gulp.src('./test', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});