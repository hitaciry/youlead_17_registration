var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry:  ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devServer: {
    port: 3000, // most common port
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    hot:true
  },
  plugins:[
["transform-runtime", { "polyfill": false }]//,
    //new webpack.optimize.UglifyJsPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}