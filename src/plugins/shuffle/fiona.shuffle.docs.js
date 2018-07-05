import { fiona, connect, ApiSection, Sample } from '../../docs/app'

// TODO: document fischer yates style, and qty param

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>shuffle</span>}>
    <p>A seeded utility to shuffle passed array, without modifying the original input.</p>

    <Sample input={`
    fiona(${seed}).shuffle(['my', 'is', 'Fiona', 'name', 'Moon']).join(' ')
    `} output={`
    ${fiona(seed).shuffle(['my', 'is', 'Fiona', 'name', 'Moon']).join(' ')}
    `} />

    <p><b>n.b.</b> this method is actually shorthand for <code>seeded.choose(arr.length, arr)</code></p>
  </ApiSection>

export default connect(Section)
