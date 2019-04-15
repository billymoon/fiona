import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Gender
      </span>
    }
  >
    <p>
      A seeded utility to return <code>male</code> or <code>female</code> evenly
      distributed.
    </p>

    <Sample
      input={`
    Fiona(${seed}).gender()
    `}
      output={`
    ${Fiona(seed).gender()}
    `}
    />
  </ApiSection>
)

export default consume(Section)
