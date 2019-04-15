import { Fiona, consume, ApiSection, Sample } from '../../../docs/app'

const Section = ({ seed }) => (
  <ApiSection
    heading={
      <span>
        <small>Fiona.</small>Distribution
      </span>
    }
  >
    <p>
      A utility to manipulate the result of seeded random nambers, allowing
      control over the distribution of values. Distribution functions influence{' '}
      <code>Fiona.Random</code>, <code>Fiona.Bool</code>,{' '}
      <code>Fiona.Number</code>, <code>Fiona.OneOf</code>,{' '}
      <code>Fiona.Choice</code> and any other methods that rely on them. The
      primary use case for this method is to create more realistic data.
    </p>

    <p>
      The distribution method sets the distribution function on a seeded
      instance so that future calls to <code>seeded.random</code> are passed
      through the distribution function.
    </p>

    <Sample
      input={`
    Fiona(${seed}).number()
    
    Fiona(${seed}).distribution(i => i ** 3).number()
    `}
      output={`
    ${Fiona(seed).number()}

    ${Fiona(seed)
      .distribution(i => i ** 3)
      .number()}
    `}
    />

    <p>
      In most cases the upper and lower limits remain the same, but the
      distribution of the values in between change as with all the predefined
      functions, but you can also create custom functions that can be used for
      any purpose, for example to clamp outputs to min and max values.
    </p>

    <Sample
      input={`
    const clamp = i => i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i
  
    Fiona(${seed}).distribution(clamp).random()

    Fiona(${seed}).distribution(clamp).number({ max: 100 })
    `}
      output={`
    // value is clamped from 0.5-0.7
    ${Fiona(seed)
      .distribution(i => (i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i))
      .random()}
    // value is clamped from 50-70
    ${Fiona(seed)
      .distribution(i => (i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i))
      .number({ max: 100 })}
    `}
    />
  </ApiSection>
)

export default consume(Section)
