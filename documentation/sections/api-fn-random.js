import { fiona, injectState, ApiSection } from '../app'
import { Sample } from '../components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>random</>}>
    <p>Seeded version of native `Math.random` method.</p>

    <Sample input={`
    fiona(${seed}).random()
    `} output={`
    ${fiona(seed).random().toString()}
    `} />
  </ApiSection>

export default injectState(Section)
