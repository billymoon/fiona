import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>para</span>}>
    <p>A seeded utility to return a paragraph of lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).para()
    `} output={`
    ${fiona(seed).para()}
    `} />
  </ApiSection>

export default injectState(Section)
