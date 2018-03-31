
'use strict';

/**
 * Imports
 */
const rootPath       = '..';
const bbDefaults     = require(`${rootPath}/defaults/defaults.options`)(),
      chalk          = require('chalk'),
      _              = require('lodash'),
      path           = require('path'),
      MigrateModule  = require(`${rootPath}/migrate.js`);
      // defaultsDeep   = require(`${rootPath}/merger.js`).defaultsDeep;


const defaultsDeep   = _.partialRight(_.merge, function recursiveDefaults () {
  // Ensure dates and arrays are not recursively merged
  if (_.isArray(arguments[0]) || _.isDate(arguments[0])) {
    return arguments[0];
  }
  return _.merge(arguments[0], arguments[1], recursiveDefaults);
});

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
   setup(userOptions = this.userOptions) {
    userOptions         = userOptions;

    // Basebuild modules
    this.buildModulesSettings(bbDefaults.modules);

    // addOn modules
    this.buildModulesSettings(this.defaults.modules);

    // External modules
    this.buildModulesSettings(userOptions.modules);

    // Merge all options (including add on and user options)
    this.finalOptions   = this.mergeWithDefaultOptions(this.finalOptions);

    if(!this.finalOptions.gulp){
      this.finalOptions.gulp = require(this.finalOptions.gulpSettings.requireName);
    }

    // Set default options in global options to never require ./defaults.js more than once
    this.finalOptions.addOnDefaults    = this.defaults;
    this.finalOptions.basebuidDefaults = bbDefaults;
    this.finalOptions.defaults         = defaultsDeep({}, this.finalOptions.addOnDefaults, this.finalOptions.basebuidDefaults);

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
    return defaultsDeep(options, this.userOptions, this.defaults, bbDefaults);
  }


  buildModulesSettings(modules = {}){
    for(let key in modules){
      let basebuildModule  = modules[key];

      // Initialing by a class
      if(basebuildModule.initializerClass){
        let initializerClass        = basebuildModule.initializerClass;
        let basebuildModuleDefaults = undefined;

        if(_.isString(basebuildModule.initializerClass)){
          let cwd              = this.userOptions.cwd || this.defaults.cwd || process.cwd();
          let initializerPath  = path.resolve(cwd, basebuildModule.initializerClass);
          initializerClass = require(initializerPath);
        }

        basebuildModule.initializerInstance = new initializerClass();
        let bbBuildSettingsParams    = {
          /**
           * @description {Object} addOnDefaults Default object of settings provided by an basebuild add-on like "basebuild-angular"
           */
          addOnDefaults: this.defaults,
          defaults: bbDefaults,
          moduleDefauls: this.defaults[key] || bbDefaults[key],
          isDefaultAddOnModule: !_.isUndefined(this.defaults[key]),
          isDefaultBasebuildModule: !_.isUndefined(bbDefaults[key])
        };

        basebuildModule.settings = basebuildModule.initializerInstance.buildSettings({
          basebuild: bbBuildSettingsParams,
          preDefinedModuleSettings: basebuildModule.settings
        });

      }

    }
  }

}


/**
 * Module exports
 */
module.exports = ConfigModule;