import { fiona, connect, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>lastname</span>}>
    <p>A seeded utility to return a single lastname.</p>

    <Sample input={`
    fiona(${seed}).lastname()
    `} output={`
    ${fiona(seed).lastname()}
    `} />
  </ApiSection>

export default connect(Section)
