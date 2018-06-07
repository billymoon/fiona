import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>shuffle</span>}>
    <p>A seeded utility to shuffle passed array, without modifying the original input.</p>

    <Sample input={`
    fiona(${seed}).shuffle(['Moon', 'is', 'Fiona', 'My', 'name']).join(' ')
    `} output={`
    ${fiona(seed).shuffle(['Moon', 'is', 'Fiona', 'My', 'name']).join(' ')}
    `} />
  </ApiSection>

export default injectState(Section)
