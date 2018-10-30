import fiona from '../../../kitchen'

if (process.browser) {
  window.fiona = fiona // eslint-disable-line
}

export default fiona
