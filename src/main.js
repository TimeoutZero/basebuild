'use strict';

/**
 * Imports
 */
const _              = require('lodash');
const chalk          = require('chalk');
const gutil          = require('gulp-util');
const packageJSON    = require('../package.json');


var basebuildMainScript = function(options, addOnDefaults){

  /*
    ==========================
    Imaginations
    ==========================
  */
  console.log('\n\n');
  console.log(' ____                 _             _     _         ' );
  console.log('| __ )  __ _ ___  ___| |__  _   _(_) | __| |       '  );
  console.log('|  _ \\ / _` / __|/ _ | `_ \\| | | | | |/ _` | '      );
  console.log('| |_) | (_| \\__ \\  __/ |_) | |_| | | | (_| |'       );
  console.log('|____/ \\__,_|___/\\___|_.__/ \\__,_|_|_|\\__,_|    ' );
  console.log('                                   '     + chalk.red('' + chalk.green('v' + packageJSON.version)) );
  console.log('\n\n');

  console.log( chalk.bgBlue('This module is under development and it will be available soon ;)') );
  console.log('\n\n');

  /**
   * Config phase
   */
  let configModule   = require('./config/config.module.js');
  configModule       = new configModule(options, addOnDefaults);
  configModule.setup();

  const finalOptions = configModule.finalOptions;
  const defaults     = finalOptions.defaults;

  /**
   * Utils
   */
  let bbUtils        = require('./utils.js')(finalOptions);
  let baseBuildName  = bbUtils.getBaseBuildName();
  const gulp         = finalOptions.gulp;
  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(let key in finalOptions.modules){
    let value      = finalOptions.modules[key].initializerClass;
    let category   = chalk.green(' external ');
    let useMode    = '';

    !finalOptions.modules[key] && (finalOptions.modules[key] = {});
    let bbModule = finalOptions.modules[key];

    // New modules which "active" property is not defined will be actives by default
    bbModule.active = bbModule.active !== false;

    !bbModule.suppressTaskRegisterOnStart ? (useMode = 'requiring tasks') : (useMode = 'using');
    bbModule.requireName = value;

    let forcesToBeExternal = bbModule.isExternal;
    let isDefaultModule = defaults.modules[key] && value === defaults.modules[key].defaultInitializerClassPath && !forcesToBeExternal;

    if(isDefaultModule){
      category = chalk.cyan(' built-in ');
    } else {
      bbModule.isDefault  = false;
      bbModule.isExternal = true;
      bbModule.requireName = process.cwd() + "/" + value;
    }

    if(bbModule.active){
      if(!bbModule.suppressTaskRegisterOnStart){
        // let moduleFunction = require( bbModule.requireName );
        // _.isFunction(moduleFunction) && moduleFunction(finalOptions);

        if(bbModule.initializerInstance){
          let bbRegisterTasksParams = {
            basebuild: {
              finalOptions: finalOptions
            },
            module: bbModule,
            moduleSettings: bbModule.settings
          };

          bbModule.initializerInstance.registerTasks(finalOptions.gulp, bbRegisterTasksParams);
        }
      }

      if(!bbModule.suppressLogOnRegisterTasks){
        let initializerPath = '';
        if(_.isString(bbModule.initializerClass)){
          initializerPath = `as ${bbModule.initializerClass}`;
        }

        console.log( chalk.white( baseBuildName ) + useMode + category + chalk.magenta(key) +  ` module ${chalk.magenta(initializerPath)}` );
      }
    }

  }

  console.log('\n');

};


/*
  ==========================
  Export
  ==========================
*/
module.exports = basebuildMainScript;