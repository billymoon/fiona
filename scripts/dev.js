const { execWithArgs } = require('./utils')

execWithArgs('next dev -p ${PORT:-3000}')
