import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

// TODO: tell the story about Fiona.Random in docs
const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Random
      </span>
    }
  >
    <p>
      Seeded version of native <code>Math.random</code> method.
    </p>

    <Sample
      input={`
    Fiona(${seed}).random()
    `}
      output={`
    ${Fiona(seed)
      .random()
      .toString()}
    `}
    />
  </ApiSection>
)

export default consume(Section)
