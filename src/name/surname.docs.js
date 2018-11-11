import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Surname
      </span>
    }
  >
    <p>A seeded utility to return a single surname.</p>

    <Sample
      input={`
    Fiona(${seed}).surname()
    `}
      output={`
    ${Fiona(seed).surname()}
    `}
    />
  </ApiSection>
)

export default consume(Section)
