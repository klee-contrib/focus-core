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

// JS and coffee lint task
gulp.task('lint', function() {
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
gulp.task('browser-build', function() {
  //Build the js file for the browser.
  gulp.src(['./lib/main.js', './lib/models/*', 'lib/views/notifications-view.js', './lib/helpers/*', './lib/views/*'])
    .pipe(gulpif(/[.]coffee$/, coffee())).on('error', gutil.log) //browser deploy
  .pipe(concat('fmk.js'))
    .pipe(gulp.dest('./dist/browser/'))
    .pipe(gulp.dest('./example/app/js/'));
});

gulp.task('node-build', function() {
  // Build the node sources.
  gulp.src(['./lib/helpers/*'])
    .pipe(gulp.dest('./dist/node/helpers/'));
  gulp.src(['./lib/models/*'])
    .pipe(gulp.dest('./dist/node/models/'));
  gulp.src(['./lib/views/*'])
    .pipe(gulp.dest('./dist/node/views/'));
  gulp.src(['./lib/services/*'])
    .pipe(gulp.dest('./dist/node/services/'));

});

//
gulp.task('build', ['browser-build', 'node-build']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);

var express = require('express');
var path = require('path');
var lrserver = require('tiny-lr')(),
  express = require('express'),
  livereload = require('connect-livereload'),
  livereloadport = 35729,
  serverport = 5000;

//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));
// simple logger
server.use(function(req, res, next) {
  gutil.log('%s %s', req.method, req.url);
  next();
});
server.use(express.static(__dirname + '/example/app/'));

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);

  //Set up your livereload server
  lrserver.listen(livereloadport);
});