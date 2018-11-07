import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Lorem</span>}>
    <p>A seeded utility to return lorem ipsum text, optionally takes `qty` which is approximate number of words and defaults to `15`.</p>

    <Sample input={`
    fiona(${seed}).lorem()

    fiona(${seed}).lorem({ qty: 3 })

    fiona(${seed}).lorem({ qty: 50 })
    `} output={`
    ${fiona(seed).lorem()}

    ${fiona(seed).lorem({ qty: 3 })}

    ${fiona(seed).lorem({ qty: 50 })}
    `} />
  </ApiSection>

export default consume(Section)
