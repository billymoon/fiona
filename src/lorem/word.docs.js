import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Word
      </span>
    }
  >
    <p>A seeded utility to return a single word from lorem ipsum text.</p>

    <Sample
      input={`
    Fiona(${seed}).word()
    `}
      output={`
    ${Fiona(seed).word()}
    `}
    />
  </ApiSection>
)

export default consume(Section)
