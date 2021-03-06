

var nodePlugins = require('gulp-load-plugins')({
  pattern: [
    '*',
    '!gulp',
    '!protractor'
  ]
});

var _ = nodePlugins.lodash;



/**
 * Basebuild utils module, to work with common functions
 * @param {Object} options Merged options between default and user options
 */
var UtilsModule = function(options) {

  /*
   * Required resources
   */
  var defaultOptions = options.defaultOptions;
  var chalk          = nodePlugins.chalk;

  /*
   * Methods
   */

  /**
   * Requires a basebuild module
   * @param  {String} key module name
   * @return {Function} module
   */
  function requireModule (key) {
    var moduleName = options.modules[key].uses;
    var data       = options.modules[key];
    var module     = null;

    if(data.isDefault){
      module = require(moduleName);
    } else {
      module = require(process.cwd() + '/' + moduleName);
    }

    return module;
  }


  /**
   * Get colored basebuild name
   * @param  {Booles} onlyText if true so will return the name without '[]' wrapper
   * @return {String} basebuild name
   */
  function getBaseBuildName(onlyText){
    return chalk.white('[ basebuild ]' )  + ' ';
  }

  /**
   * Get colored TimeoutZero's name
   * @return {String} TimeoutZero's name
   */
  function getTimeoutZeroName(){
    return chalk.white('Timeout') + chalk.cyan('Zero');
  }


  /**
   * Get colored redspark's name
   * @return {String} redspark's name
   */
  function getRedsparkName(){
    return chalk.white( chalk.red('red')  + 'spark' )
  }

  /*
   * Logs information only on debug mode
   */
  function debugLog (title, label) {
    title = '\n' + getBaseBuildName() + chalk.cyan('[' + chalk.magenta(' DEBUG ') + title + ' ]');
    return function(){
      if(options.debug){
        var args  = Array.prototype.slice.call(arguments);
        var label = arguments[0];
        delete arguments[0];

        label     = chalk.yellow(label);

        console.log(title, label);
        for(var key in arguments){
          var item = arguments[key];
          console.log(chalk.magenta(' ARG ' + key + ' '), item);
        }

        console.log('\n');
      }
    }
  }



  /**
   * API
   */
  return {
    requireModule      : requireModule,
    getBaseBuildName   : getBaseBuildName,
    getTimeoutZeroName : getTimeoutZeroName,
    getRedsparkName    : getRedsparkName,
    debugLog           : debugLog,
    plugins            : nodePlugins
  }
}


/**
 * Module exports
 */
module.exports = UtilsModule;