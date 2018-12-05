import { Fiona, consume, Sample } from '../../app'

const Section = ({ seed }) => (
  <section>
    <p>
      {Fiona(seed).regex(
        `Fiona is a (helper|tool|library) for (creating|generating) (large)? (chunks|sets) of (seeded|pseudo|mock) random data\\. (At it's core it uses|It is based around) a (Xorshift(128)? )?(PRNG|pseudo random number generator) that (enables|assists with|makes a mockery of) (generating|creating) (repeatable|predictable) (seemingly|apparently|authentic (feeling|looking)) random data\\.`
      )}
    </p>
    <p>
      Fiona can be used to simulate random data conforming to defined
      structures, making testing large datasets predictable and developing
      against future changes a little easier.
    </p>
    <Sample
      input={`
  const Fiona = require('fiona')

  const seeded = Fiona(${seed})

  const data = seeded.object({
    name: Fiona.Fullname,
    age: Fiona.Number({ max: 100 })
  })

  console.log(data)
  `}
      output={`
    ${Fiona(seed).json({
      name: Fiona.Fullname,
      age: Fiona.Number({ max: 100 })
    })}
  `}
    />
    <p>
      <b>n.b.</b> you can change the seed by choosing the dots in the page
      banner, choosing the same seed will result in the same data
    </p>
  </section>
)

export default consume(Section)
