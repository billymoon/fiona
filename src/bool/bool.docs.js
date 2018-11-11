import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Bool
      </span>
    }
  >
    <p>
      A seeded utility to return true or false. Takes `chance` option to change
      the probability of true as decimal value between 0 and 1 which defaults to
      0.5.
    </p>

    <Sample
      input={`
    Fiona(${seed}).bool()
    `}
      output={`
    ${Fiona(seed).bool()}
    `}
    />

    <Sample
      input={`
    Fiona(${seed}).string\`The rumour is \${Fiona.Bool}\`
    `}
      output={`
    ${JSON.stringify(Fiona(seed).string`The rumour is ${Fiona.Bool}`)}
    `}
    />

    <Sample
      input={`
    Fiona(${seed}).array(5, Fiona.Bool({ chance: 0.3 }))
    `}
      output={`
    ${JSON.stringify(Fiona(seed).array(5, Fiona.Bool({ chance: 0.3 })))}
    `}
    />
  </ApiSection>
)

export default consume(Section)
