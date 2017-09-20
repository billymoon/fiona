import fiona from './core.js'
import * as methods from './methods'

Object.keys(methods).forEach(key => {
  fiona.fn[key] = methods[key]
})

export default fiona
