s3URL = require '../lib/s3_url'

assetPath = (path) ->
  manifest = try
    require '../public/rev-manifest'
  catch err
    {}

  if manifest[path]?
    s3URL(manifest[path])
  else
    path

module.exports = (req, res, next) ->
  res.locals.assets = assetPath
  next()
