import { Fiona, consume, ApiSection, Sample } from '../../../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Number
      </span>
    }
  >
    <p>
      A seeded utility to return a number, taking options min and max and
      precision, which default to 0 and 1,000,000 and 0.
    </p>

    <Sample
      input={`
    Fiona(${seed}).number()
    Fiona(${seed}).number({ max: 10 })
    Fiona(${seed}).number({ min: 10, max: 20 })
    `}
      output={[
        Fiona(seed).number(),
        Fiona(seed).number({ max: 10 }),
        Fiona(seed).number({ min: 10, max: 20 })
      ].join('\n')}
    />

    <p>
      If you add a precision, instead of an integer you will get a float rounded
      to specified precision.
    </p>

    <Sample
      input={`
    Fiona(${seed}).number({ precision: 2 })
    Fiona(${seed}).number({ precision: -2 })
    `}
      output={[
        Fiona(seed).number({ precision: 2 }),
        Fiona(seed).number({ precision: -2 })
      ].join('\n')}
    />
  </ApiSection>
)

export default consume(Section)
