express = require 'express'
totalCount = require '../total_count'

describe 'total count', ->

  beforeEach (done) ->
    app = express()
    app.get '*', (req, res, next) ->
      res.set('x-total-count': 500).send('hi')
    @server = app.listen 6000, -> done()

  afterEach ->
    @server.close()

  it 'makes a HEAD request for the total count from the API', (done) ->
    totalCount('foo', 'http://localhost:6000').then (count) ->
      count.should.equal '500'
      done()