import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Word</span>}>
    <p>A seeded utility to return a single word from lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).word()
    `} output={`
    ${fiona(seed).word()}
    `} />
  </ApiSection>

export default consume(Section)
