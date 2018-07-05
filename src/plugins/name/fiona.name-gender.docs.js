import { fiona, connect, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>gender</span>}>
    <p>A seeded utility to return `male` or `female` evenly distributed.</p>

    <Sample input={`
    fiona(${seed}).gender()
    `} output={`
    ${fiona(seed).gender()}
    `} />
  </ApiSection>

export default connect(Section)
