import { fiona, injectState, ApiSection } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>gender</>}>
    <p>A seeded utility to return `male` or `female` evenly distributed.</p>

    <Sample input={`
    fiona(${seed}).gender()
    `} output={`
    ${fiona(seed).gender()}
    `} />
  </ApiSection>

export default injectState(Section)
