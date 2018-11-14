{ resolve } = require 'path'
express = require 'express'
logger = require 'morgan'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
config = require '../config'

module.exports = (app, done) ->
  app.use logger('dev')
  app.use bodyParser.json()
  app.use bodyParser.urlencoded extended: true
  app.use cookieParser()

  app.use express.static(resolve __dirname, '../public')

  app.use require '../middleware/assets'

  # Mount apps
  app.use require '../apps/assets'
  app.use require '../apps/style_guide'

  done()
