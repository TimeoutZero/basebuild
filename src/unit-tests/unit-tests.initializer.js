
/**
 * Imports
 */
const path = require("path");
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const chalk = require('chalk');
// const DashboardPlugin = require('webpack-dashboard/plugin');

/**
 * Module class
 */
module.exports = class BasebuildUnitTestsInitializerModule {

  buildSettings(params) {
    return  {
      mode: 'development',
      entry:  path.resolve(__dirname, 'config/index.js'),

      module: {
        rules: [
          params.basebuild.defaults.webpackUtils.generalWebpackRules.javascript,
          params.basebuild.defaults.webpackUtils.generalWebpackRules.coffeescript,
          params.basebuild.defaults.webpackUtils.generalWebpackRules.typescript,
          {
            test: /\.css$/,
            loader: 'null-loader'
          },

          {
            test: /\.(jpg|jpeg|png|gif)/,
            loader: 'null-loader'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
      },

      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.coffee', '.json'],
        modules: [
          path.resolve(__dirname, '../node_modules'),
          'node_modules'
        ]
      },

      plugins : [
        new webpack.ContextReplacementPlugin(/\$projectRoot.*/, this.contextReplacementPluginCallback),
        new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core/,
          process.cwd(), // location of your src
          { }
        )
      ],

      devServer: {
        open: true,
        openPage: path.resolve(__dirname, 'config/index.html'),
        port: 8080,
        host: "localhost",
        publicPath: '/unit-tests-server/',
        filename: 'tests.dev-server-bundle.js',
        index: path.resolve(__dirname, 'config/index.html'),
        contentBase: path.resolve(__dirname, 'config')
      }
    };
  }

  registerTasks(gulp, params){
    gulp.task("test:web-auto", (done) => {
      this.runWebTestAuto(params, done);
    });
  }

  runWebTestAuto(params, done){
     const settings = params.module.settings;
     settings.entry = "mocha-loader?ui=bdd!" + path.resolve(settings.entry);

     var compiler = webpack(settings);


     compiler.plugin("done", function(stats) {
       console.log("done compiling")

       theServer.middleware.waitUntilValid(function(){
         console.log(chalk.green('Package is in a valid state'), new Date());

         // Server listening
         console.log(chalk.green("[webpack-dev-server]"), chalk.cyan(`http://localhost:${settings.devServer.port}/webpack-dev-server${settings.devServer.publicPath}main`));
        });

      })

      // const dashboard = new DashboardPlugin();
      // dashboard.apply(compiler);
      var theServer = new webpackDevServer(compiler, settings.devServer);


     theServer.listen(settings.devServer.port, settings.devServer.host, function(err) {
       if (err) throw new Error("webpack-dev-server", err);
     });
  }

  contextReplacementPluginCallback(options) {
    options.request = options.request.replace('$projectRoot', process.cwd());
    options.request = path.resolve(options.request);
    return options;
  };

};
