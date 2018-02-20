var gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp.task('default', ['test'], function() {
});

gulp.task('test', function() {
  return gulp.src('./test', { read: false })
    .pipe(mocha({ reporter: 'nyan' }))
    .pipe(gulp.dest('reports'));
});
