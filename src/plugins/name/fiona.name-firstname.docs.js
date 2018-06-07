import { fiona, injectState, ApiSection } from '../../docs/app'
import { Sample } from '../../docs/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>firstname</>}>
    <p>A seeded utility to return a single firstname, optionally taking a gender to adhere to.</p>

    <Sample input={`
    fiona(${seed}).firstname() // can be either gender
    fiona(${seed}).firstname({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).firstname()}
    ${fiona(seed).firstname({ gender: 'male' })}
    `} />
  </ApiSection>

export default injectState(Section)