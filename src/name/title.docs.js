import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Title
      </span>
    }
  >
    <p>
      A seeded utility to return a salutation, optionally taking a gender to
      adhere to.
    </p>

    <Sample
      input={`
    Fiona(${seed}).title() // can be either gender
    Fiona(${seed}).title({ gender: 'male' }) // always male
    `}
      output={`
    ${Fiona(seed).title()}
    ${Fiona(seed).title({ gender: 'male' })}
    `}
    />
  </ApiSection>
)

export default consume(Section)
