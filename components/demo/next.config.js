const withTM = require('@weco/next-plugin-transpile-modules')

module.exports = withTM({
  transpileModules: ['jsx-components']
})

