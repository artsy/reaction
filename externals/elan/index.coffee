express = require 'express'
setup = require './lib/setup'

module.exports = app = express()

setup app, -> app.listen process.env.PORT
