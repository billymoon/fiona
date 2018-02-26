const glob = require('glob')

module.exports = {
  exportPathMap: () => glob.sync('pages/**/*.js').reduce((memo, pathIn) => {
    const myPath = pathIn.replace(/^pages/, '').replace(/^(\/.*?)\/?index\.js$/, '$1')
    memo[myPath] = { page: myPath }
    return memo
  }, {})
}
