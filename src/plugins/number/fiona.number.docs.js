import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>number</span>}>
    <p>A seeded utility to return a number, taking options min and max and precision, which default to 0 and 1,000,000 and 0.</p>

    <Sample input={`
    fiona(${seed}).number()
    fiona(${seed}).number({ max: 10 })
    fiona(${seed}).number({ min: 10, max: 20 })
    `} output={`
    ${fiona(seed).number()}
    ${fiona(seed).number({ max: 10 })}
    ${fiona(seed).number({ min: 10, max: 20 })}
    `} />

    <p>If you add a precision, instead of an integer you will get a float rounded to specified precision.</p>

    <Sample input={`
    fiona(${seed}).number({ precision: 2 })
    fiona(${seed}).number({ precision: -2 })
    `} output={`
    ${fiona(seed).number({ precision: 2 })}
    ${fiona(seed).number({ precision: -2 })}
    `} />
  </ApiSection>

export default injectState(Section)
