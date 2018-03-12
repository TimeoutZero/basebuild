
/**
 * Imports
 */
const path = require("path");
const generalWebpackRules = require('../defaults/webpack.defaults').rules;

/**
 * Module class
 */
module.exports = class BasebuildUnitTestsInitializerModule {

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
