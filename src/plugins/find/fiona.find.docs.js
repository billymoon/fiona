import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <span>
  {/* TODO: document find
  <ApiSection heading={<span><small>fiona.fn.</small>find</span>}>
    <p>find...</p>

    <Sample input={`
    fiona(${seed})
    `} output={`
    ${fiona(seed)}
    `} />
  </ApiSection>
  */}
  </span>

export default consume(Section)
