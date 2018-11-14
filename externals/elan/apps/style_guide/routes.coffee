_ = require 'ramda'
fs = require 'fs'
{ resolve } = require 'path'
sections = require './sections'
colors = require '../../components/lib/variables/colors'
typeSizes = require '../../components/lib/variables/typography'

@index = (req, res) ->
  res.redirect "/#{sections[0]}"

@section = (req, res, next) ->
  if _.contains(req.params.section, sections) or req.params.section is 'stage'
    res.render req.params.section,
      sections: sections
      colors: colors
      typeSizes: typeSizes

  else
    err = new Error 'Not Found'
    err.status = 404
    next err
