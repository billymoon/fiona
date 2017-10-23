import fiona from '../src/fiona'

fiona.fn.date = function (earliest, latest, full) {
  const early = new Date(earliest || '1940') * 1
  const late = new Date(latest || '2000') * 1
  const diff = late - early
  const date = new Date(this.number(diff) + early).toISOString()
  return full ? date : date.slice(0, 10)
}
