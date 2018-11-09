import { fiona, consume, ApiSection, Sample } from '../../docs/app'

// TODO: tell the story about fiona.Random in docs
const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Random</span>}>
    <p>Seeded version of native <code>Math.random</code> method.</p>

    <Sample input={`
    fiona(${seed}).random()
    `} output={`
    ${fiona(seed).random().toString()}
    `} />
  </ApiSection>

export default consume(Section)
