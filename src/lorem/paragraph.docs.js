import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Paragraph
      </span>
    }
  >
    <p>A seeded utility to return a paragraph of lorem ipsum text.</p>

    <Sample
      input={`
    Fiona(${seed}).paragraph()
    `}
      output={`
    ${Fiona(seed).paragraph()}
    `}
    />
  </ApiSection>
)

export default consume(Section)
