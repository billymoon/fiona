import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>shuffle</span>}>
    <p>A seeded utility to shuffle passed array, without modifying the original input.</p>

    <Sample input={`
    fiona(${seed}).shuffle(['my', 'is', 'Fiona', 'name', 'Moon']).join(' ')
    `} output={`
    ${fiona(seed).shuffle(['my', 'is', 'Fiona', 'name', 'Moon']).join(' ')}
    `} />

    <p><b>n.b.</b> this method is actually shorthand for <code>seeded.choose(arr.length, arr)</code></p>
  </ApiSection>

export default injectState(Section)
