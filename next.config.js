const { copyFileSync } = require('fs')

const withTM = require('@weco/next-plugin-transpile-modules')

module.exports = withTM({
  transpileModules: ['jsx-components'],
  exportPathMap: defaults => {
    copyFileSync('./fiona.min.js', 'out/static/fiona.min.js')
    copyFileSync('./fiona.core.min.js', 'out/static/fiona.core.min.js')
    return defaults
  }
})
