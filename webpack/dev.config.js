'use strict'
const path = require('path')

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  context: path.join(__dirname, '..'),
  entry: {
    main: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './src/'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __CLIENT__: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.databaseURL': JSON.stringify(process.env.databaseURL),
      'process.env.storageBucket': JSON.stringify(process.env.storageBucket),
      'process.env.authDomain': JSON.stringify(process.env.authDomain),
      'process.env.apiKey': JSON.stringify(process.env.apiKey),
      'process.env.messagingSenderId': JSON.stringify(process.env.messagingSenderId)
    })
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'standard',
      include: path.join(__dirname, '..', 'src')
    }],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, '..', 'src')
      },
      {
        test: /\.sass$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  postcss: () => [autoprefixer]
}
