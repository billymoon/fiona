import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <span>
    {/* TODO: document info */}
    {false &&
    <ApiSection heading={<span><small>fiona.fn.</small>info</span>}>
      <p>info...</p>

      <Sample input={`
      fiona(${seed})
      `} output={`
      ${fiona(seed)}
      `} />
    </ApiSection>
    }
  </span>

export default consume(Section)
