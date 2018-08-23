import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <span>
    {/* TODO: document string
  <ApiSection heading={<span><small>fiona.fn.</small>string</span>}>
    <p>string...</p>

    <Sample input={`
    fiona(${seed})
    `} output={`
    ${fiona(seed)}
    `} />
  </ApiSection>
  */}
  </span>

export default consume(Section)
