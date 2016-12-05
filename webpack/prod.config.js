'use strict'
const path = require('path')

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.join(__dirname, '..'),
  entry: { main: './src/' },
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: '[name]-[hash].min.js',
    publicPath: '/public/'
  },
  plugins: [
    new HtmlPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css', { allChunks: true }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __CLIENT__: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.databaseURL': JSON.stringify(process.env.databaseURL),
      'process.env.storageBucket': JSON.stringify(process.env.storageBucket),
      'process.env.authDomain': JSON.stringify(process.env.authDomain),
      'process.env.apiKey': JSON.stringify(process.env.apiKey),
      'process.env.messagingSenderId': JSON.stringify(process.env.messagingSenderId)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, '..', 'src')
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!resolve-url!sass?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]'
      }
    ]
  },
  postcss: () => [autoprefixer]
}