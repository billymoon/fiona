const { execWithArgs } = require('./utils')

execWithArgs('NODE_OPTIONS="--inspect-brk" next dev -p ${PORT:-3000}')
