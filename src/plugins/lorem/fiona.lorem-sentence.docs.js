import { fiona, injectState, ApiSection } from '../../../documentation/app'
import { Sample } from '../../../documentation/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>sentence</>}>
    <p>A seeded utility to return a sentence of lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).sentence()
    `} output={`
    ${fiona(seed).sentence()}
    `} />
  </ApiSection>

export default injectState(Section)
