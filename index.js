'use strict'
const path = require('path')

const webpack = require('webpack')
const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack')

const app = express()
const compiler = webpack(config)
const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') {
  app.use(devMiddleware(compiler, {
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    quiet: false,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    stats: { colors: true }
  }))

  app.use(hotMiddleware(compiler))
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, (err) => {
  if (err) console.error(err)

  console.info(`Listening on http://localhost:${PORT}`)
})
