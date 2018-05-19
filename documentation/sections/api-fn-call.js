import { fiona, injectState, ApiSection } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.</small>call</>}>
    <p>See Quickstart section in <a href='/'>Overview</a></p>
  </ApiSection>

export default injectState(Section)
