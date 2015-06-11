// include gulp
var gulp = require('gulp');

// include plug-ins
//var gulpif = require('gulp-if');
//var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
//var gutil = require('gulp-util');

//buildConfig:
var buildConf = require('./build.json');
var sources = ['index.js', '{component,application,helper,network,router,store,util,definition,reference,user}/**/*'];
/**********************
  Linting files
**********************/

// JS and coffee lint task
gulp.task('lint', function() {
  var jshint = require('gulp-jshint');
  var stylish = require('jshint-stylish');
  var coffeelint = require('gulp-coffeelint');
  //Js linting.
  gulp
    .src('./lib/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
  //Coffee linting
  gulp
    .src('./lib/*/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());
});

//Eslint

gulp.task('eslint', function() {
  //gulp eslint 2>lint/lintErrors.txt
  var eslint = require('gulp-eslint');
  var options = {
    "globals": {
      "jQuery": false,
      "$": true,
      "require": true,
      "Backbone": true,
      "Fmk": true,
      "_": true,
      "Promise": true,
      "module": true
    },
    "env": {
      "browser": true,
      "node": true
    },
    rules: {
      "valid-jsdoc": [2, {
      /*  "prefer": {
          "return": "return"
        },*/
        "requireParamDescription": true
      }],
      "quotes": [0]
    }
  };
  var format = "compact"; //"compact", "checkstyle", "jslint-xml", "junit" and "tap".
  gulp
    .src(sources)
    .pipe(eslint(options))
  //.pipe(eslint.format(undefined, process.stdout))
  //.pipe(eslint.failOnError())
  .pipe(eslint.formatEach(format, process.stderr));
  //.on('error', gutil.log);
});


/*********************
Documentation generation using jsDoc
***/
// JS and coffee lint task
gulp.task('jsdoc', function() {
  var jsdoc = require('gulp-jsdoc');
  var infos = require('./package.json');
  var name = 'focus';
  //Js linting.
  gulp.src([
    './lib/helpers/binder_helper.js',
    "lib/views/consult-edit-view.js",
    "lib/views/core-view.js",
    "lib/views/index.js",
    "lib/views/search-view.js"
    ])
    .pipe(jsdoc.parser(infos, name))
    .pipe(jsdoc.generator('./jsDoc/'));
});
var concat = require("gulp-concat");

gulp.task("markdox", function(){

  var markdox = require("gulp-markdox");

  gulp.src([
    './lib/helpers/binder_helper.js'
    ])
    .pipe(markdox())
    .pipe(concat("doc.md"))
    .pipe(gulp.dest("./doc"));
});


/**********************
  Building css files
**********************/
gulp.task('style', function() {
  gulp.src('./lib/styles/*.css')
    .pipe(concat('focus.css'))
    .pipe(gulp.dest('./example/app/css/'))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest(buildConf.spaDirectory));
});
/**********************
  Building js files
**********************/

gulp.task('browserify', function(){
  var babelify = require("babelify"); //es6
  var browserify = require('browserify'); //build the source
  var source = require('vinyl-source-stream');
    var literalify = require('literalify');
    return browserify(({
        entries: ['./index.js'],
        extensions: ['.jsx'],
        standalone: "Focus"
      }))
      .transform(
        {global:true},
        literalify.configure({
        react: 'window.React',
        backbone: 'window.Backbone',
        moment: 'window.moment',
        i18n: 'window.i18n'
      }))
      .transform(babelify)
      .bundle()
      //Pass desired output filename to vinyl-source-stream
      //.pipe(source("focus-"+require('./package.json').version+".js"))
      .pipe(source("focus.js"))
      .pipe(gulp.dest('./dist/'))
      .pipe(gulp.dest('../focus-components/dist/js'))
      .pipe(gulp.dest('../rodolphe-demo/ui/vendor'))
      ;
});


//Grouping build tasks.
//Async build
gulp.task('build', ['style', 'browserify'], function() {

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



//Build focus components into the other repositories.
gulp.task('focus-npm', function() {
  var react = require('gulp-react');
  var babel = require('gulp-babel');
  var gulpif = require('gulp-if');
  gulp.src(['package.json','index.js','{component,application,helper,network,router,store,util,definition}/**/*'])
  .pipe(gulpif(/[.]js$/, react({harmony: true})))
  .pipe(gulpif(/[.]js$/, babel()))
  .pipe(gulp.dest('../focus-components/node_modules/focus/'))
  .pipe(gulp.dest('../rodolphe/app/node_modules/focus/'));
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

var browserSync = require('browser-sync');
var reload = browserSync.reload;
// Watch Files For Changes & Reload
gulp.task('serve', ['build'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['example/app']
    }
  });

  gulp.watch(['lib/**/*.{json,js, coffee}'],['browserify',reload]);
  gulp.watch(['lib/styles/*.{styl,css}'], ['style', reload]);
  gulp.watch(['package.json'], ['browserify',reload]);
  //gulp.watch(['app/scripts/**/*.js'], jshint);
  //gulp.watch(['app/images/**/*'], reload);
});


gulp.task('watch', function(){
  var src = '{application,component,definition,dispatcher,exception,helper,network,router,store,util,reference,user}/**/*.js';
  gulp.watch(['package.json','index.js',src],['browserify']);
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);
