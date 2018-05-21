import { fiona, injectState, ApiSection } from '../../../documentation/app'
import { Sample } from '../../../documentation/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>lorem</>}>
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

export default injectState(Section)
