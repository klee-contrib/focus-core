// include gulp
var gulp = require('gulp');

// include plug-ins
//var jshint = require('gulp-jshint');
var gulpif = require('gulp-if');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var stylish = require('jshint-stylish');
var coffeelint = require('gulp-coffeelint');

// JS and coffee lint task
//gulp.task('lint', function() {
//  //Js linting.
//  gulp.src('./lib/*/*.js')
//    .pipe(jshint())
//    .pipe(jshint.reporter(stylish));
//  //Coffee linting
//  gulp.src('./lib/*/*.coffee')
//    .pipe(coffeelint())
//    .pipe(coffeelint.reporter());
//});

//Build all the javascripts file.
gulp.task('browser-build', function() {
  //Build the js file for the browser.
  gulp.src([ './lib/main.js', 'lib/helpers/custom_exception.coffee','lib/helpers/validators.js','./lib/models/*', 'lib/views/notifications-view.js', 'lib/helpers/post_rendering_helper.js', './lib/helpers/*', './lib/views/*'])
    .pipe(gulpif(/[.]coffee$/, coffee())).on('error', gutil.log) //browser deploy
  .pipe(concat('fmk.js'))
    .pipe(gulp.dest('./dist/browser/'))
    .pipe(gulp.dest('./example/app/js/'))
    //Destination du projet.
    .pipe(gulp.dest('../../../../UESL_Gimini/Main/Sources/Nantissement.SPA/vendor/'));
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

//All tasks by default.
gulp.task('build', ['browser-build', 'node-build'/*, 'templates'*/]);

//Gulp build example templates into a template.js file
//var handlebars = require('gulp-handlebars');
//var defineModule = require('gulp-define-module');
//var declare = require('gulp-declare');
//var concat = require('gulp-concat');

//gulp.task('templates', function(){
//  gulp.src(['example/app/templates/*.hbs'])
//    .pipe(handlebars())
//    .pipe(defineModule('plain'))
//    .pipe(declare({
//      namespace: 'Example.templates'
//    }))
//    .pipe(concat('templates.js'))
//    .pipe(gulp.dest('example/app/js/'));
//});

//gulp.task('serve', startExpress);
//function startExpress() {
 
//  var express = require('express');
//  var app = express();
//  app.use(express.static(__dirname + '/example/app/'));
//  app.listen(4000);
//}


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build'/*, 'serve'*/]);
