
/**
 * Imports
 */
const path = require("path");
const webpackDevServer = require('webpack-dev-server');

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
      },

      devServer: {
        publicPath: '/tests-in-memory-folder/',
        filename: 'tests.in-memory-bundle.js',
        contentBase: path.resolve(__dirname + '/config')
      }
    };
  }

  registerTasks(gulp, params){
    gulp.task("test:web-auto", function(done) {
      this.runWebTestAuto(params, done);
    });
  }

  runWebTestAuto(params, done){
     const settings = params.modules.settings;
     settings.entry = "mocha-loader?ui=bdd!" + path.resolve(settings.entry);

     var compiler = webpack(settings);

     compiler.plugin("done", function(stats) {
       console.log("done compiling")

       theServer.middleware.waitUntilValid(function(){
           console.log('Package is in a valid state', new Date());
       });

     })

    //  var inlineDevServerParams = {
    //   publicPath: '/tests/',
    //   filename: 'test.build.js',
    //   contentBase: path.resolve(__dirname + '/config')
    // };
     var theServer = new webpackDevServer(compiler);


     theServer.listen(8080, "localhost", function(err) {
       if (err) throw new Error("webpack-dev-server", err);

       // Server listening
       console.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
     });
  }

};
