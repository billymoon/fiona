import { fiona, injectState, ApiSection } from '../../documentation/app'
import { Sample } from '../../documentation/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.</small>call</>}>
    <p>See Quickstart section in <a href='/'>Overview</a></p>
  </ApiSection>

export default injectState(Section)
