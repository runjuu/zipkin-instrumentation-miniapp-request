const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  plugins: [
    // new UglifyJsPlugin()
  ]
};