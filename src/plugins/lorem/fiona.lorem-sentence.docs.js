import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from 'jsx-components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>sentence</span>}>
    <p>A seeded utility to return a sentence of lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).sentence()
    `} output={`
    ${fiona(seed).sentence()}
    `} />
  </ApiSection>

export default injectState(Section)
