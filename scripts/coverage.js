const { execWithArgs } = require('./utils')

execWithArgs('nyc --reporter=lcov --reporter=text ava')
