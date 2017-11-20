const glob = require('glob')

const nonPageFolders = ['utils', 'components', 'app']

const pagesGlobPattern = `pages/{,!(${nonPageFolders.join('|')})**}/index.js`

module.exports = {
  pagesGlobPattern: pagesGlobPattern,
  exportPathMap: () => glob.sync(pagesGlobPattern).reduce((memo, pathIn) => {
    const myPath = pathIn.replace(/^pages/, '').replace(/index\.js$/, '')
    memo[myPath] = { page: myPath }
    return memo
  }, {})
}
