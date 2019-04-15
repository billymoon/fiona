import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Sentence
      </span>
    }
  >
    <p>A seeded utility to return a sentence of lorem ipsum text.</p>

    <Sample
      input={`
    Fiona(${seed}).sentence()
    `}
      output={`
    ${Fiona(seed).sentence()}
    `}
    />
  </ApiSection>
)

export default consume(Section)
