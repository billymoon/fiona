import { fiona, injectState, ApiSection } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>word</>}>
    <p>A seeded utility to return a single word from lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).word()
    `} output={`
    ${fiona(seed).word()}
    `} />
  </ApiSection>

export default injectState(Section)
