// include gulp
var gulp = require('gulp');

// include plug-ins
var gulpif = require('gulp-if');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

//buildConfig:
var buildConf = require('./build.json');

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
  Building css files
**********************/
gulp.task('css-build', function() {
  gulp.src('./lib/styles/*.css')
  .pipe(concat('fmk.css'))
  .pipe(gulp.dest('./example/app/css/'))
  .pipe(gulp.dest('./dist/browser/'))
  .pipe(gulp.dest(buildConf.spaDirectory));
});
/**********************
  Building js files
**********************/


//Build all the javascripts file.
gulp.task('browser-build', ['infos', 'templates'], function() {
  //Build the js file for the browser.
  gulp.src([
    './lib/infos.js',
    './lib/main.js',
    './lib/templates/templates.js',
    './lib/helpers/custom_exception.coffee',
    './lib/core/http_response_parser.js',
    './lib/helpers/session_helper.js',
    './lib/helpers/user_helper.js',
    './lib/helpers/site_description_helper.js',
    './lib/helpers/site_description_builder.js',
    './lib/helpers/validators.js',
    './lib/models/*',
    './lib/views/notifications-view.js',
    './lib/helpers/post_rendering_helper.js',
    './lib/helpers/metadata_builder.coffee',
    './lib/helpers/util_helper.js',
    './lib/helpers/url_helper.js',
    "./lib/helpers/backbone_notification.js",
      //All helpers
    "./lib/helpers/post_rendering_builder.js",
    "./lib/helpers/post_rendering_helper.js",
    "./lib/helpers/ustom_exception.coffee",
    "./lib/helpers/error_helper.js",
    "./lib/helpers/reference_helper.js",
    "./lib/helpers/form_helper.js",
    "./lib/helpers/router.js",
    "./lib/helpers/formatter_helper.coffee",
    "./lib/helpers/session_helper.js",
    "./lib/helpers/header_helper.js",
    "./lib/helpers/site_description_builder.js",
    "./lib/helpers/language_helper.coffee",
    "./lib/helpers/site_description_helper.js",
    //"./lib/helpers/message_helper.js",
    "./lib/helpers/url_helper.js",
    "./lib/helpers/metadata_builder.coffee",
    //"./lib/helpers/backbone_notification.js",
    "./lib/helpers/user_helper.js",
    "./lib/helpers/util_helper.js",
    "./lib/helpers/odata_helper.js",
    "./lib/helpers/promisify_helper.js",
    "./lib/helpers/model_validation_promise.js",
    "./lib/helpers/validators.js",
    "./lib/helpers/view_helper.coffee",
    //End all helpers'./lib/helpers/*',
    './lib/views/core-view.js',
    './lib/views/consult-edit-view.js',
    './lib/views/*',
    "./lib/helpers/message_helper.js"
  ]).pipe(gulpif(/[.]coffee$/, coffee())).on('error', gutil.log) //browser deploy
  .pipe(concat('fmk.js'))
    .pipe(gulp.dest('./dist/browser/'))
    .pipe(gulp.dest('./example/app/js/'))
    //Current project destination.
    //.pipe(gulp.dest('../SPA-skeleton/vendor'));
    .pipe(gulp.dest(buildConf.spaDirectory));
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

  return gulp.src(["lib/templates/hbs/*.hbs"])
    .pipe(handlebars())
    .pipe(defineModule('plain'))
    .pipe(declare({
      namespace: 'Fmk.templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('lib/templates/'));
});

gulp.task('templateHelper', function(){
  //Build the js file for the browser.
    gulp.src([
      './lib/templates/helpers/common/*.js',
      './lib/templates/helpers/common/*.coffee',
      './lib/templates/helpers/*.js',
      './lib/templates/helpers/*.coffee'
    ])
    .pipe(gulpif(/[.]coffee$/, coffee())).on('error', gutil.log) //browser deploy
    .pipe(concat('templateHelper.js'))
    .pipe(gulp.dest('./lib/templates/'));
});
//Grouping build tasks.
//Async build
gulp.task('build', ['css-build', 'browser-build', 'node-build'], function() {

});
/*gulp.task('build', function (callback) {
    var runSequence = require('run-sequence');
    console.log('runSequence');
    runSequence('infos','css-build','templates', ['browser-build', 'node-build'],callback);
});*/

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


//Build a file from the package.json in order to have it present in the fmk.js file.
gulp.task('infos', function () {
    
    var fs = require('fs');
    var pajson = require('./package.json');
  var string = '/* name: ' + pajson.name + ' , version: ' + pajson.version + ' description: ' + pajson.description + "*/ \n (function initialization(container) {var fmk = container.Fmk || {};fmk.name = '"+ pajson.name+"';fmk.version = '"+ pajson.version+"';container.Fmk = fmk;})(typeof module === 'undefined' && typeof window !== 'undefined' ? window : exports);";
  fs.writeFile("lib/infos.js", string, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The infos.js file was created.");
        }
    });
});

/**********************
  Documentation
**********************/
/*
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