_ = require 'ramda'
express = require 'express'
s3URL = require '../../lib/s3_url'

module.exports = app = express()

app.get '/production/manifest.json', (req, res) ->
  manifest = try
    require '../../public/rev-manifest'
  catch err
    {}

  res.send _.mapObj s3URL, manifest

app.get '/production/stylesheets/index.css', (req, res) ->
  res.redirect '/' + res.locals.assets('stylesheets/index.css')

app.get '/production/javascripts/index.js', (req, res) ->
  res.redirect '/' + res.locals.assets('javascripts/index.js')
