import { fiona, injectState, ApiSection } from '../docs/app'
import { Sample } from 'jsx-components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>random</span>}>
    <p>Seeded version of native `Math.random` method.</p>

    <Sample input={`
    fiona(${seed}).random()
    `} output={`
    ${fiona(seed).random().toString()}
    `} />
  </ApiSection>

export default injectState(Section)
