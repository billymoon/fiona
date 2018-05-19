import { fiona, injectState, ApiSection } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>date</>}>
    <p>A seeded utility to return a date as a string in format `YYYY-MM-DD`. Range is between `min` and `max` options, which default to 1940 and 2000 and can be overridden with strings parsable by the native `Date()` method. There is also a `long` to output full `Date.prototype.toISOString` format.</p>

    <Sample input={`
    fiona(${seed}).date()

    fiona(${seed}).date({
      min: '1980',
      max: '2080',
      long: true
    })
    `} output={`
    "${fiona(seed).date()}"

    "${fiona(seed).date({ min: '1980', max: '2080', long: true })}"
    `} />
  </ApiSection>

export default injectState(Section)
