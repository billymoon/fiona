import { Fiona, consume, ApiSection, Sample } from '../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Choose
      </span>
    }
  >
    <p>
      A seeded weighted method to select a specified number of items from a
      passed array.
    </p>

    <Sample
      input={`
    Fiona(${seed}).choose(2, ['pink', 'powder blue', 'purple'])
    `}
      output={`
    ${JSON.stringify(Fiona(seed).choose(2, ['pink', 'powder blue', 'purple']))}
    `}
    />

    <p>
      Like `Fiona.OneOf`, the current distribution function will influence the
      choice.
    </p>

    <Sample
      input={`
    Fiona(${seed}).distribution(i => i * i * i).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    `}
      output={`
    ${JSON.stringify(
      Fiona(seed)
        .distribution(i => i * i * i)
        .choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    )}
    `}
    />
  </ApiSection>
)

export default consume(Section)
