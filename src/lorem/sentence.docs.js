import { fiona, consume, ApiSection, Sample } from '../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Sentence</span>}>
    <p>A seeded utility to return a sentence of lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).sentence()
    `} output={`
    ${fiona(seed).sentence()}
    `} />
  </ApiSection>

export default consume(Section)
