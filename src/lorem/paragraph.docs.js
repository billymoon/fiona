import { fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) =>
  <ApiSection heading={<span><small>fiona.</small>Paragraph</span>}>
    <p>A seeded utility to return a paragraph of lorem ipsum text.</p>

    <Sample input={`
    fiona(${seed}).paragraph()
    `} output={`
    ${fiona(seed).paragraph()}
    `} />
  </ApiSection>

export default consume(Section)
