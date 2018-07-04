import { fiona, injectState, ApiSection, Sample } from '../../docs/app'

const Section = ({ state: { seed } }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>lastname</span>}>
    <p>A seeded utility to return a single lastname.</p>

    <Sample input={`
    fiona(${seed}).lastname()
    `} output={`
    ${fiona(seed).lastname()}
    `} />
  </ApiSection>

export default injectState(Section)
