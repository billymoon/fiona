import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <span>
    {/* TODO: document data */}
    {false &&
    <ApiSection heading={<span><small>fiona.fn.</small>data</span>}>
      <p>data...</p>

      <Sample input={`
      fiona(${seed})
      `} output={`
      ${fiona(seed)}
      `} />
    </ApiSection>
    }
  </span>

export default consume(Section)
