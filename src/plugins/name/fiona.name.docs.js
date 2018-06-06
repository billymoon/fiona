import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>name</>}>
    <p>A seeded utility to return a full name, optionally taking a gender to adhere to. This is useful for producing more realistic name data where people might have multiple first and middle names, and sometimes double barrel lastnames joined with hyphen.</p>

    <Sample input={`
    fiona(${seed}).name() // can be either gender
    fiona(${seed}).name({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).name()}
    ${fiona(seed).name({ gender: 'male' })}
    `} />
  </ApiSection>

export default injectState(Section)
