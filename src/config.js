
'use strict';

/**
 * Imports
 */
const bbDefaults     = require('./defaults/defaults.options')(),
      chalk          = require('chalk'),
      _              = require('lodash'),
      MigrateModule  = require('./migrate.js'),
      defaultsDeep   = require('./merger.js').defaultsDeep;




/**
 * Basebuild config module, to setup everything before start working
 */
class ConfigModule {


  constructor(userOptions, defaults){
    this.defaults      = defaults    || {};
    this.userOptions   = userOptions || {};
    this.finalOptions  = {};
    this.migrateModule = null;
  }


  /*
   * Methods
   */

  /**
   Prepares options to start
   * @param  {Object} userOptions user options
   * @return {Object} user options, merged with default options and analyzed by necessary files
   */
   setup(userOptions) {
    userOptions       = userOptions || this.userOptions;
    this.finalOptions = this.mergeWithDefaultOptions(this.finalOptions);

    // Set default options in global options to never require ./defaults.js more than once
    this.finalOptions.defaults = this.defaults;

    this.migrateModule = new MigrateModule(this.finalOptions, userOptions, this.defaults);
    this.migrateModule.migrate();

    return this.finalOptions;
  }

  /**
   Merges user options with default
   * @param  {Object} options user options
   * @param  {Object} options merged with default options
   */
  mergeWithDefaultOptions(options) {
    return defaultsDeep(options, this.defaults, bbDefaults);
  }

}


/**
 * Module exports
 */
module.exports = ConfigModule;