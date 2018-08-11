import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <span>
    {/* TODO: document callback */}
    {false &&
    <ApiSection heading={<span><small>fiona.fn.</small>callback</span>}>
      <p>callback...</p>

      <Sample input={`
      fiona(${seed})
      `} output={`
      ${fiona(seed)}
      `} />
    </ApiSection>
    }
  </span>

export default consume(Section)
