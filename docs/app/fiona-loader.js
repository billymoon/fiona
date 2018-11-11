import Fiona from '../../src'

if (process.browser) {
  window.Fiona = Fiona // eslint-disable-line
}

export default Fiona
