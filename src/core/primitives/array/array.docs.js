import { Fiona, consume, ApiSection, Sample } from '../../../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Array
      </span>
    }
  >
    <p>
      A seeded array generation utility, which takes <code>qty</code> (how many
      items in array) and a callback that is called with <code>seeded</code>{' '}
      which should return the value of each array item.
    </p>

    <Sample
      input={`
    Fiona(${seed}).array(10, Fiona.Number)
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).array(10, Fiona.Number),
        null,
        2
      )}`}
    />

    <p>
      You can also pass a callback for access to the seeded instance, which can
      be useful for adding distribution weighting to values
    </p>

    <Sample
      input={`
    const spreadLow = i => i ** 10
    const numberCallback = seeded => seeded.distribution(spreadLow).number()

    Fiona(${seed}).array(10, numberCallback)
    `}
      output={`\n${JSON.stringify(
        Fiona(seed).array(10, seeded =>
          seeded.distribution(i => i ** 10).number()
        ),
        null,
        2
      )}`}
    />
  </ApiSection>
)

export default consume(Section)
