import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Firstname
      </span>
    }
  >
    <p>
      A seeded utility to return a single firstname, optionally taking a gender
      to adhere to.
    </p>

    <Sample
      input={`
    Fiona(${seed}).firstname() // can be either gender
    Fiona(${seed}).firstname({ gender: 'male' }) // always male
    `}
      output={`
    ${Fiona(seed).firstname()}
    ${Fiona(seed).firstname({ gender: 'male' })}
    `}
    />
  </ApiSection>
)

export default consume(Section)
