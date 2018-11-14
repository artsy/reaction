_ = require 'ramda'

module.exports = _.pick process.env, [
  'APP_NAME'
]
