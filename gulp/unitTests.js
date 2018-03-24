/**
 * Imports
 */
var gulp      = require('gulp');
var mocha     = require('gulp-mocha');
var istanbul  = require('gulp-istanbul');
var path      = require('path');


/**
 * Module
 */
module.exports = function() {


  function errorHandler(title) {
    return function(err){
      console.log(title, err);
    }
  }

  function runTests (argument) {
    return gulp.src('src/**/*.spec.js', {read: false})
      .pipe(mocha({reporter: 'nyan'})).on('error', errorHandler('Mocha')) // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(istanbul.writeReports());
  }

  function setupCoverage () {
    return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js', '!./src/**/*.mock.js'])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire()).on('error', errorHandler('Coverage'));
  }

  /**
   * Tasks
   */
  gulp.task('setup-coverage', []                                       , setupCoverage);
  gulp.task('test'          , ['setup-coverage']                       , runTests);
  gulp.task('test:auto'     , ['watchTests', 'test', 'setup-coverage'] , function(){
    return gulp.watch(['../src/**/*.js', '../src/**/*.spec.js'], runTests);
  });

  // Run all unit tests in debug mode
  gulp.task('test-debug', function () {
    var spawn = require('child_process').spawn;
    spawn(path.resolve('node_modules/mocha/bin/_mocha'), [
      'src/**/*.spec.js',
      '--debug-brk'
    ], { stdio: 'inherit' });
  });

}