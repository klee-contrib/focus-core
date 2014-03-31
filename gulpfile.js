// include gulp
var gulp = require('gulp');

// include plug-ins
var gulpif = require('gulp-if');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

/**********************
  Linting files
**********************/

// JS and coffee lint task
gulp.task('lint', function() {
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var coffeelint = require('gulp-coffeelint');
  //Js linting.
  gulp.src('./lib/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
  //Coffee linting
  gulp.src('./lib/*/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());
});

/**********************
  Building js files
**********************/

//Build all the javascripts file.
gulp.task('browser-build', function() {
  //Build the js file for the browser.
  gulp.src(['./lib/main.js', './lib/templates/templates.js', 'lib/helpers/custom_exception.coffee', 'lib/helpers/validators.js', './lib/models/*', 'lib/views/notifications-view.js', 'lib/helpers/post_rendering_helper.js', './lib/helpers/*', './lib/views/*'])
    .pipe(gulpif(/[.]coffee$/, coffee())).on('error', gutil.log) //browser deploy
  .pipe(concat('fmk.js'))
    .pipe(gulp.dest('./dist/browser/'))
    .pipe(gulp.dest('./example/app/js/'))
  //Current project destination.
  .pipe(gulp.dest('../../../../UESL_Gimini/Main/Sources/Nantissement.SPA/vendor/'));
});
//Build all the javascripts for node and unit tests.
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

//Gulp build example templates into a template.js file for the example.
gulp.task('templates', function() {
  var handlebars = require('gulp-handlebars');
  var defineModule = require('gulp-define-module');
  var declare = require('gulp-declare');

  gulp.src(["lib/templates/*.hbs"])
    .pipe(handlebars())
    .pipe(defineModule('plain'))
    .pipe(declare({
      namespace: 'Fmk.templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('lib/templates/'));
});


//Grouping build tasks.
gulp.task('build', ['templates', 'browser-build', 'node-build']);


/**********************
  Example templates
**********************/


//Gulp build example templates into a template.js file for the example.
gulp.task('templatesExample', function() {
  var handlebars = require('gulp-handlebars');
  var defineModule = require('gulp-define-module');
  var declare = require('gulp-declare');

  gulp.src(['example/app/templates/*.hbs', "lib/templates/*.hbs"])
    .pipe(handlebars())
    .pipe(defineModule('plain'))
    .pipe(declare({
      namespace: 'Example.templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('example/app/js/'));
});


/**********************
  Documentation
**********************//*
gulp.task('doc', function() {
  var docco = require("gulp-docco");
  gulp.src(['./lib/main.js', './lib/helpers/*','./lib/models/*', './lib/views/*'])
    .pipe(docco({layout: "linear"}))
    //.pipe(gulpif(/[*helpers]$/, gulp.dest('./doc/helpers')))
    .pipe(gulpif(/[*models]$/, gulp.dest('./doc/models')))
    .pipe(gulpif(/[*views]$/, gulp.dest('./doc/views')));
});

*/
/**********************
  Local example server
**********************/

//Start the local server.
gulp.task('serve', startExpress);
//Start an express local server in order to be able to serve the example app.
function startExpress() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname + '/example/app/'));
  app.listen(4000);
  gutil.log('Express server, serving example at http://localhost:4000');
}


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build', 'templates', 'serve']);