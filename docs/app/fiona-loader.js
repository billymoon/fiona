import Fiona from 'fiona'

if (process.browser) {
  window.Fiona = Fiona // eslint-disable-line
}

export default Fiona
