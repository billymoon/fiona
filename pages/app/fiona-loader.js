import fiona from '../../src'
import '../../src/plugins'

if (process.browser) {
  window.fiona = fiona // eslint-disable-line
}

export default fiona
