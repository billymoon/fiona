import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Fullname
      </span>
    }
  >
    <p>
      A seeded utility to return a full name, optionally taking a gender to
      adhere to. This is useful for producing more realistic name data where
      people might have multiple first and middle names, and sometimes double
      barrel lastnames joined with hyphen.
    </p>

    <Sample
      input={`
    Fiona(${seed}).fullname() // can be either gender
    Fiona(${seed}).fullname({ gender: 'male' }) // always male
    `}
      output={`
    ${Fiona(seed).fullname()}
    ${Fiona(seed).fullname({ gender: 'male' })}
    `}
    />
  </ApiSection>
)

export default consume(Section)
