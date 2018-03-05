/**
 * imports
 */
const path = require('path');


const rules = {
  typescript: {
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname , '../tsconfig.json')
      }
    }
  },

  javascript: {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        env: {
          testing: {
            presets: [
              ['airbnb', { 'modules': 'umd' }]
            ]
          }
        },
        presets: [
          ['airbnb', { 'modules': 'umd' }]
        ],
      }
    }
  },


  coffeescript: {
    test: /\.coffee$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'coffee-loader'
  },
};

module.exports = {
  rules: rules
}