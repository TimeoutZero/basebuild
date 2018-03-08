
/**
 * Imports
 */
const path = require("path");
const generalWebpackRules = require('../defaults/webpack.defaults').rules;

/**
 * Module Export
 */
module.exports = BasebuildUnitTestsModule;

/**
 * Module class
 */
class BasebuildUnitTestsModule {

  buildSettings(defaults) {
    return  {
      module: {
        rules: [
          generalWebpackRules.javascript,
          generalWebpackRules.coffeescript,
          generalWebpackRules.typescript
        ]
      },

      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.coffee'],
        modules: [
          path.resolve(__dirname, '../node_modules'),
          'node_modules'
        ]
      }
    };
  }

  registerTasks(gulp){
  }

};
