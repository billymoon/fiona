import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.fn.</small>surname</span>}>
    <p>A seeded utility to return a single surname.</p>

    <Sample input={`
    fiona(${seed}).surname()
    `} output={`
    ${fiona(seed).surname()}
    `} />
  </ApiSection>

export default consume(Section)
