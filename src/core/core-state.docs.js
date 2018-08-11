import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <span>
    {/* TODO: document state */}
    {false &&
    <ApiSection heading={<span><small>fiona.fn.</small>state</span>}>
      <p>state...</p>

      <Sample input={`
      fiona(${seed})
      `} output={`
      ${fiona(seed)}
      `} />
    </ApiSection>
    }
  </span>

export default consume(Section)
