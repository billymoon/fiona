import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>lastname</>}>
    <p>A seeded utility to return a single lastname.</p>

    <Sample input={`
    fiona(${seed}).lastname()
    `} output={`
    ${fiona(seed).lastname()}
    `} />
  </ApiSection>

export default injectState(Section)
