import fiona from '../../src'

if (process.browser) {
  window.fiona = fiona // eslint-disable-line
}

export default fiona
