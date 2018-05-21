import { fiona, injectState, ApiSection } from '../../../documentation/app'
import { Sample } from '../../../documentation/components'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<><small>fiona.fn.</small>title</>}>
    <p>A seeded utility to return a salutation, optionally taking a gender to adhere to.</p>

    <Sample input={`
    fiona(${seed}).title() // can be either gender
    fiona(${seed}).title({ gender: 'male' }) // always male
    `} output={`
    ${fiona(seed).title()}
    ${fiona(seed).title({ gender: 'male' })}
    `} />
  </ApiSection>

export default injectState(Section)
