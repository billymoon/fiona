import fiona from '../..'
import '../../plugins'

if (process.browser) {
  window.fiona = fiona // eslint-disable-line
}

export default fiona
