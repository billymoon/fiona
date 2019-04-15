import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Lorem
      </span>
    }
  >
    <p>
      A seeded utility to return lorem ipsum text, optionally takes `qty` which
      is approximate number of words and defaults to `15`.
    </p>

    <Sample
      input={`
    Fiona(${seed}).lorem()

    Fiona(${seed}).lorem({ qty: 3 })

    Fiona(${seed}).lorem({ qty: 50 })
    `}
      output={`
    ${Fiona(seed).lorem()}

    ${Fiona(seed).lorem({ qty: 3 })}

    ${Fiona(seed).lorem({ qty: 50 })}
    `}
    />
  </ApiSection>
)

export default consume(Section)
