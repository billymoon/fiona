import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Date
      </span>
    }
  >
    <p>
      A seeded utility to return a date as a string in format `YYYY-MM-DD`.
      Range is between `min` and `max` options, which default to 1940 and 2000
      and can be overridden with strings parsable by the native `Date()` method.
      There is also a `long` to output full `Date.prototype.toISOString` format.
    </p>

    <Sample
      input={`
    Fiona(${seed}).date()

    Fiona(${seed}).date({
      min: '1980',
      max: '2080',
      long: true
    })
    `}
      output={`
    "${Fiona(seed).date()}"

    "${Fiona(seed).date({ min: '1980', max: '2080', long: true })}"
    `}
    />
  </ApiSection>
)

export default consume(Section)
