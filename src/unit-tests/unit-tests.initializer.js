
/**
 * Imports
 */
const path = require("path");

/**
 * Module class
 */
module.exports = class BasebuildUnitTestsInitializerModule {

  buildSettings(params) {
    return  {
      module: {
        rules: [
          params.basebuild.defaults.webpackUtils.generalWebpackRules.javascript,
          params.basebuild.defaults.webpackUtils.generalWebpackRules.coffeescript,
          params.basebuild.defaults.webpackUtils.generalWebpackRules.typescript
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
