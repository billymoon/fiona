import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <span>
    {/* TODO: document clone */}
    {false &&
    <ApiSection heading={<span><small>fiona.fn.</small>clone</span>}>
      <p>clone...</p>

      <Sample input={`
      fiona(${seed})
      `} output={`
      ${fiona(seed)}
      `} />
    </ApiSection>
    }
  </span>

export default consume(Section)
