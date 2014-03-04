// include gulp
var gulp = require('gulp');
 
// include plug-ins
var jshint = require('gulp-jshint');
var gulpif = require('gulp-if');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var stylish = require('jshint-stylish');
var coffeelint = require('gulp-coffeelint');

// JS hint task
gulp.task('jshint', function() {
  //Js linting.
  gulp.src('./lib/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
  //Coffee linting
  gulp.src('./lib/*/*.coffee')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter());
});

//Build all the javascripts file.
gulp.task('build', function(){
  //Build the js file for the browser.
  gulp.src(['./lib/helpers/*'])
    .pipe(gulpif(/[.]coffee$/, coffee())).on('error', gutil.log)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/browser/'));
  // Build the node sources.
  gulp.src(['./lib/helpers/*'])
    .pipe(gulp.dest('./dist/node/helpers/'));
});