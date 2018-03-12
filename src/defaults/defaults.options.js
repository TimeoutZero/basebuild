'use strict';

var nodePlugins = require('gulp-load-plugins')({
  pattern: [
    '*',
    '!gulp',
    '!protractor',
    '!mocha',
    '!babel',
    '!babel-cli'
  ]
});

var _ = nodePlugins.lodash;
const path = require('path'),
  defaultsDeep        = require('../merger.js').defaultsDeep,
  generalWebpackRules = require('../defaults/webpack.defaults').rules;




module.exports = function(){

  /*
    ==========================
    Basic Options
    ==========================
  */
  var defaultOptions = {

    // Source folder, where source code is present.
    src: 'src'
  };

  /*
    ==========================
    Stream Errors
    ==========================
  */
  defaultOptions.errorHandler = function(title) {
    return function(err) {
      nodePlugins.util.log(nodePlugins.util.colors.red('[' + title + ']'), err.toString());
      nodePlugins.util.beep();
      _.isFunction(this.emit) && this.emit('end');
    };
  };


  defaultOptions.plugins = nodePlugins;
  defaultOptions.generalWebpackRules = {generalWebpackRules};


  // Common initial properties
  // for(key in defaultOptions.modules){
  //   defaultOptions.modulesData[key].isEnabled = true;
  //   defaultOptions.modulesData[key].uses = defaultOptions.modulesData[key].defaultValue;
  // }


  // Migrate properties
  defaultOptions.migrate = {
    active : true,
    trace: false
  };

  /**
   * Basebuild works with modules.
   * There's a module for each feature,
    Built-in modules: {
      utils     : {}
      build     : {}
      proxy     : {}
      dev       : {}
      unitTests : {}
      watch     : {}
    }
   */
  defaultOptions.modules = {

    unitTests: {
      defaultValue: path.resolve('../unit-tests/unit-tests.module.js'),
      initializerClass: require('../unit-tests/unit-tests.initializer.js'),
      variables: {
        mochaOptions: '--ui "bdd" --colors true',
        specsRegexp: /.+\.spec\.(js|jsx|ts|tsx|coffee)$/
      },
      settings: {}
    }
  };



  return defaultOptions;

}