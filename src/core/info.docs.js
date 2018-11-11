import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Info
      </span>
    }
  >
    <p>
      Method that returns info about seeded instance, currently only the{' '}
      <code>initseed</code> property is exposed. The initseed can be used to
      faithfully reproduce data given the same structure.
    </p>

    <Sample
      input={`
    Fiona(${seed}).info()
    `}
      output={`
    ${JSON.stringify(Fiona(seed).info())}
    `}
    />
  </ApiSection>
)

export default consume(Section)
