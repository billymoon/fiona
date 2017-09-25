import fiona from './src/fiona'
import Pretender from 'fetch-pretender'

let pretender = new Pretender()

fiona.fn.pretend = function (route, handler) {
  pretender.get(route, request => [
    200,
    { 'Content-Type': 'application/json' },
    JSON.stringify(handler(request))
  ])
}
