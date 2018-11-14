module.exports = (path) ->
  "//s3.amazonaws.com/#{process.env.AWS_S3_BUCKET}/#{path}.gz"
