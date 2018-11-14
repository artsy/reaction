express = require 'express'
routes = require './routes'

module.exports = app = express()
app.set 'views', "#{__dirname}/templates"
app.set 'view engine', 'jade'

app.get '/', routes.index
app.get '/:section', routes.section
