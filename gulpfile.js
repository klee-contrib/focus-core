// include gulp
var gulp = require('gulp');
 
// include plug-ins
var jshint = require('gulp-jshint');
var gulpif = require('gulp-if');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
 var gutil = require('gulp-util');
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./lib/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//
gulp.task('build', function(){
  gulp.src(['./lib/helpers/*'])
    .pipe(gulpif(/[.]coffee$/, coffee())).on('error', gutil.log)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dest'));
});