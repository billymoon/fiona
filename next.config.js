const withTM = require('@weco/next-plugin-transpile-modules')

module.exports = withTM({
  transpileModules: ['jsx-components'],
  exportPathMap: () => ({
    '/': { page: '/' },
    '/api': { page: '/api' },
    '/examples': { page: '/examples' },
    '/examples/mock-api': { page: '/examples/mock-api' },
    '/examples/populate-template': { page: '/examples/populate-template' }
  })
})
